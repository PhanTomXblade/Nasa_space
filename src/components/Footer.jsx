import React from 'react';
import { ArrowUp, Compass } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-black/90 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3.5">
          <img
            src="/logo.png"
            alt="Silent Sentinels"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]"
          />
          <div>
            <div className="text-sm font-bold uppercase font-display radiant-headline">
              Silent Sentinels
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              NASA's Forgotten Hardware on Alien Worlds | 2026 Space Apps Challenge
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-mono">
          <a href="#home" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded">Home</a>
          <a href="#atlas" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded">Atlas</a>
          <a href="#story" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded">Story</a>
          <a href="#about" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded">About Us</a>
        </div>

        {/* Button-in-Button Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center pl-4 pr-1.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all duration-300 ease-vanguard cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Back to top of page"
        >
          <span className="mr-2">Return to Earth Orbit</span>
          <span className="w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
            <ArrowUp className="w-3 h-3 text-emerald-400" strokeWidth={2} />
          </span>
        </button>
      </div>
    </footer>
  );
}
