import React, { useState, useEffect } from 'react';
import { Compass, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Story', href: '#story', id: 'story' },
    { name: 'About Us', href: '#about', id: 'about' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6">
      <div className="max-w-5xl mx-auto pt-4 sm:pt-6 flex items-center justify-between">
        {/* Floating Fluid Island Bar */}
        <div className="pointer-events-auto w-full flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 shadow-2xl transition-all duration-500 ease-vanguard">
          {/* Top-Left Title & Telemetry Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center space-x-3 focus:outline-none"
            aria-label="Silent Sentinels - Home"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-950/70 border border-emerald-400/30 group-hover:border-emerald-400 transition-all duration-300">
              <Compass className="w-4 h-4 text-emerald-400 animate-[spin_20s_linear_infinite]" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base font-bold tracking-wider uppercase font-display radiant-headline">
                Silent Sentinels
              </span>
              <span className="hidden md:inline-block px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase radiant-badge rounded-full">
                <span className="radiant-badge-text font-semibold">NASA 2026</span>
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Pill-in-Pill Architecture) */}
          <nav className="hidden md:flex items-center space-x-1.5 p-1 rounded-full bg-white/[0.03] border border-white/5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs font-mono tracking-wide px-4 py-1.5 rounded-full transition-all duration-300 ease-vanguard ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-300 text-emerald-950 font-bold shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Menu className="w-4 h-4" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Staggered Glass Reveal) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 max-w-sm mx-auto p-4 rounded-3xl bg-black/90 backdrop-blur-3xl border border-white/10 ring-1 ring-white/5 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-2.5 text-sm font-mono rounded-2xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-300 text-emerald-950 font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
