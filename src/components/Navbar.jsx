import React, { useState, useEffect } from 'react';
import { Compass, Globe, Orbit, ShieldCheck } from 'lucide-react';

const TABS = [
  { id: 'home', name: 'Home', href: '#home', icon: Compass },
  { id: 'atlas', name: 'Atlas', href: '#atlas', icon: Globe },
  { id: 'story', name: 'Story', href: '#story', icon: Orbit },
  { id: 'about', name: 'About', href: '#about', icon: ShieldCheck },
];

export default function Navbar({ activeSection = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 pt-3 sm:pt-5 flex justify-center">
      {/* Unified Merged Floating Island Dock (Centered in Middle) */}
      <div className="pointer-events-auto relative max-w-full rounded-full bg-black/75 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 shadow-2xl p-1.5 flex items-center space-x-1.5 sm:space-x-3 overflow-visible transition-all duration-300">
        
        {/* Subtle Ambient Aurora Flow inside dock */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="aurora-mesh-bg opacity-25" aria-hidden="true" />
        </div>

        {/* 1. Left Brand / Logo Section */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="relative z-10 group flex items-center space-x-2 pl-1 pr-1.5 focus:outline-none shrink-0"
          aria-label="Silent Sentinels - Home"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-400/40 group-hover:border-emerald-300 transition-all duration-300 shadow-[0_0_12px_rgba(52,211,153,0.35)] shrink-0">
            <Compass className="w-4 h-4 text-emerald-400 animate-[spin_25s_linear_infinite]" strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
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

            {/* Seamless Scalloped Concave Cutout Stroke (Zero dark box artifact) */}
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
        <div className="relative z-10 hidden sm:flex items-center pr-1 shrink-0">
          <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase radiant-badge rounded-full">
            <span className="radiant-badge-text font-semibold">NASA 2026</span>
          </span>
        </div>

      </div>
    </header>
  );
}
