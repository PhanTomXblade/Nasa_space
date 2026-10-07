import React, { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Wifi, WifiOff, RefreshCw, X, CheckCircle } from 'lucide-react';

export default function OfflineToast() {
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [isCached, setIsCached] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      console.log('[PWA] Service Worker registered:', r);
    },
    onOfflineReady() {
      console.log('[PWA] App ready to work offline');
      setIsCached(true);
    },
    onNeedRefresh() {
      setShowUpdateBanner(true);
    }
  });

  // Online/offline detection
  useEffect(() => {
    const handleOffline = () => setShowOfflineBanner(true);
    const handleOnline = () => setShowOfflineBanner(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Check initial state
    if (!navigator.onLine) setShowOfflineBanner(true);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Auto-dismiss offline ready toast after 4 seconds
  useEffect(() => {
    if (offlineReady) {
      const timer = setTimeout(() => setOfflineReady(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [offlineReady, setOfflineReady]);

  return (
    <>
      {/* Offline Ready / Cached Confirmation Toast */}
      {offlineReady && (
        <div className="fixed bottom-24 right-4 z-[9999] animate-in slide-in-from-bottom">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-black/90 backdrop-blur-xl border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.25)] text-white max-w-xs">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                Atlas Cached ✓
              </p>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                Planetary maps & data saved. Works offline now!
              </p>
            </div>
            <button
              onClick={() => setOfflineReady(false)}
              className="ml-auto text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Offline Mode Active Banner */}
      {showOfflineBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top">
          <div className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-amber-950/90 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_25px_rgba(251,191,36,0.2)] text-white">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                Offline Mode — Cached Atlas Active
              </p>
              <p className="text-[10px] text-amber-200/70 font-sans mt-0.5">
                Serving planetary maps from local cache
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Update Available Banner */}
      {needRefresh && showUpdateBanner && (
        <div className="fixed bottom-24 right-4 z-[9999] animate-in slide-in-from-bottom">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-black/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.2)] text-white max-w-xs">
            <RefreshCw className="w-5 h-5 text-cyan-400 shrink-0 animate-spin" />
            <div>
              <p className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                Mission Update Available
              </p>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                New data loaded. Reload to activate.
              </p>
            </div>
            <div className="flex items-center space-x-1.5 ml-2">
              <button
                onClick={() => updateServiceWorker(true)}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono transition-colors cursor-pointer"
              >
                Reload
              </button>
              <button
                onClick={() => setShowUpdateBanner(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
