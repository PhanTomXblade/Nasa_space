import React, { useState, useEffect, useRef } from 'react';
import { Compass, Globe, Orbit, ShieldCheck, MoreHorizontal, X, Activity } from 'lucide-react';

const TABS = [
  { id: 'home', name: 'Home', href: '#home', icon: Compass },
  { id: 'atlas', name: 'Atlas', href: '#atlas', icon: Globe },
  { id: 'story', name: 'Story', href: '#story', icon: Orbit },
  { id: 'about', name: 'About', href: '#about', icon: ShieldCheck },
];

export default function Navbar({
  activeSection = 'home',
  playbackMode = 'hybrid',
  onPlaybackModeChange = () => {}
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const frameDisplayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time telemetry frame listener (Zero React re-render overhead)
  useEffect(() => {
    const handleFrameTick = (e) => {
      if (frameDisplayRef.current && e.detail && e.detail.frame) {
        frameDisplayRef.current.textContent = String(e.detail.frame).padStart(3, '0');
      }
    };
    window.addEventListener('cosmic-frame-tick', handleFrameTick);
    return () => window.removeEventListener('cosmic-frame-tick', handleFrameTick);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const activeIndex = Math.max(0, TABS.findIndex((t) => t.id === activeSection));
  const activeTab = TABS[activeIndex] || TABS[0];
  const ActiveIcon = activeTab.icon;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 xs:px-4 pt-3 sm:pt-5 flex justify-center">
      {/* Unified Merged Floating Island Dock (Centered in Middle) */}
      <div className="pointer-events-auto relative max-w-full rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 shadow-2xl p-1.5 flex items-center space-x-1.5 sm:space-x-2.5 overflow-visible transition-all duration-300">
        
        {/* Subtle Ambient Aurora Flow inside dock */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="aurora-mesh-bg opacity-25" aria-hidden="true" />
        </div>

        {/* 1. Left Brand / Logo Section */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="relative z-10 group flex items-center space-x-2 pl-1 pr-1.5 focus:outline-none shrink-0 cursor-pointer"
          aria-label="Silent Sentinels - Home"
        >
          <div className="relative flex items-center justify-center h-8 px-1.5 rounded-full bg-emerald-950/70 border border-emerald-400/40 group-hover:border-emerald-300 transition-all duration-300 shadow-[0_0_12px_rgba(52,211,153,0.3)] shrink-0">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.png"
                alt="Silent Sentinels"
                className="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_0_6px_rgba(52,211,153,0.4)] group-hover:scale-105 transition-transform duration-300"
                decoding="async"
              />
            </picture>
          </div>

          <span className="hidden md:inline-block text-xs sm:text-sm font-bold tracking-wider uppercase font-display radiant-headline whitespace-nowrap">
            Silent Sentinels
          </span>
        </a>

        {/* Subtle Divider */}
        <div className="relative z-10 h-5 w-px bg-white/10 shrink-0" />

        {/* 2. Center: Dynamic Scalloped Navigation Dock */}
        <div className="relative flex items-center">
          
          {/* Sliding Dynamic Scallop Notch & Elevated Orb */}
          <div
            className="absolute top-0 left-0 h-full transition-transform duration-500 ease-vanguard pointer-events-none z-20 flex flex-col items-center"
            style={{
              width: `calc(100% / ${TABS.length})`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          >
            {/* Elevated Floating Circular Orb (poking above dock) */}
            <div className="absolute -top-4 sm:-top-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-white via-emerald-400 to-teal-500 text-slate-950 border-2 border-white/90 shadow-[0_0_20px_rgba(52,211,153,0.7)] flex items-center justify-center transition-all duration-300">
              <ActiveIcon className="w-4 h-4 text-emerald-950" strokeWidth={2} />
              <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_white] animate-pulse" />
            </div>

            {/* Seamless Scalloped Concave Cutout Stroke */}
            <svg
              className="absolute -top-0.5 w-[72px] sm:w-[84px] h-4.5 pointer-events-none drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
              viewBox="0 0 100 20"
              fill="none"
            >
              <path
                d="M 0 0 C 22 0, 30 18, 50 18 C 70 18, 78 0, 100 0"
                stroke="rgba(52, 211, 153, 0.85)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Navigation Tabs */}
          <nav className="relative z-10 flex items-center" aria-label="Main Navigation">
            {TABS.map((tab, index) => {
              const isActive = activeIndex === index;

              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => handleNavClick(e, tab.href)}
                  className={`relative w-14 xs:w-16 sm:w-22 md:w-24 h-8 xs:h-9 sm:h-10 flex items-center justify-center rounded-full transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={`text-[10px] xs:text-xs font-mono tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'radiant-badge-text font-bold scale-105'
                        : 'font-medium'
                    }`}
                  >
                    {tab.name}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Subtle Divider */}
        <div className="relative z-10 hidden sm:block h-5 w-px bg-white/10 shrink-0" />

        {/* 3. Right: NASA 2026 Credential Badge */}
        <div className="relative z-10 hidden sm:flex items-center pr-0.5 shrink-0">
          <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase radiant-badge rounded-full">
            <span className="radiant-badge-text font-semibold">NASA 2026</span>
          </span>
        </div>

        {/* 4. Three-Dot Options Menu Button & Popover */}
        <div className="relative z-10 flex items-center pr-1 shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer ${
              isMenuOpen
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/60 shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Cosmic Background Telemetry & Engine Settings"
            aria-expanded={isMenuOpen}
            title="Cosmic Background Telemetry & Controls"
          >
            {isMenuOpen ? (
              <X className="w-3.5 h-3.5 text-emerald-300" />
            ) : (
              <MoreHorizontal className="w-4 h-4" />
            )}
          </button>

          {/* Floating Dropdown Popover matching Double-Bezel Frosted Glass System (Narrow & Compact) */}
          {isMenuOpen && (
            <div className="fixed sm:absolute top-[68px] sm:top-full right-3 sm:right-0 mt-0 sm:mt-3 z-50 w-[285px] xs:w-[295px] sm:w-[305px] rounded-2xl p-1 ring-1 ring-emerald-500/30 bg-emerald-950/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.22)] animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
              
              {/* Flowing Cosmic Nebula Mesh Background */}
              <div className="aurora-mesh-bg opacity-35" aria-hidden="true" />

              {/* Inner Double-Bezel Card */}
              <div className="relative z-10 overflow-hidden rounded-[calc(1rem-0.125rem)] bg-black/85 inner-highlight p-3 flex flex-col gap-2.5">
                
                {/* Popover Header */}
                <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-4.5 h-4.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.35)] shrink-0">
                      <Activity className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider font-bold uppercase radiant-headline truncate">
                      Cosmic Telemetry
                    </span>
                  </div>

                  <span className="px-2 py-0.5 text-[8.5px] font-mono tracking-widest uppercase radiant-badge rounded-full shrink-0">
                    <span className="radiant-badge-text font-semibold">238 UHD</span>
                  </span>
                </div>

                {/* Telemetry Pill Widget Container */}
                <div className="relative overflow-hidden rounded-xl bg-black/90 border border-emerald-500/25 ring-1 ring-white/5 p-2 shadow-inner inner-highlight flex flex-col gap-2 font-mono text-[11px]">
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between px-1">
                    {/* 24 FPS pulse indicator */}
                    <div className="flex items-center gap-1.5 text-emerald-400 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                      <span className="font-bold text-[10.5px] tracking-wide glow-emerald">24 FPS</span>
                    </div>

                    <span className="text-emerald-500/30 select-none">|</span>

                    {/* Real-time Frame Counter */}
                    <div className="shrink-0 text-slate-300 text-[10.5px]">
                      <span className="text-white font-bold tracking-wider">
                        FRAME <span ref={frameDisplayRef} className="text-emerald-300 font-mono font-extrabold">001</span>
                      </span>
                      <span className="text-white/40"> / 238</span>
                    </div>
                  </div>

                  {/* Mode Switcher 3-Button Segmented Grid */}
                  <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-black/60 border border-white/5">
                    <button
                      type="button"
                      onClick={() => onPlaybackModeChange('hybrid')}
                      className={`py-1 px-1 rounded-md text-[9.5px] font-bold tracking-wider text-center transition-all duration-200 cursor-pointer ${
                        playbackMode === 'hybrid'
                          ? 'radiant-badge text-emerald-200 border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.35)] scale-[1.02]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      HYBRID
                    </button>

                    <button
                      type="button"
                      onClick={() => onPlaybackModeChange('autoplay')}
                      className={`py-1 px-1 rounded-md text-[9.5px] font-bold tracking-wider text-center transition-all duration-200 cursor-pointer ${
                        playbackMode === 'autoplay'
                          ? 'radiant-badge text-emerald-200 border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.35)] scale-[1.02]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      AUTOPLAY
                    </button>

                    <button
                      type="button"
                      onClick={() => onPlaybackModeChange('scroll')}
                      className={`py-1 px-1 rounded-md text-[9.5px] font-bold tracking-wider text-center transition-all duration-200 cursor-pointer ${
                        playbackMode === 'scroll'
                          ? 'radiant-badge text-emerald-200 border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.35)] scale-[1.02]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      SCROLL
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
