import React from 'react';
import {
  Compass,
  ArrowUp,
  Award,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 pt-16 sm:pt-20 pb-12 px-3 sm:px-6 lg:px-8 mt-12 sm:mt-16">
      {/* 1. Floating Banner with Full Logo (Website Color Theme) */}
      <div className="relative z-20 max-w-5xl mx-auto -mb-16 sm:-mb-20 px-2 sm:px-4">
        {/* Double-Bezel Frosted Emerald Glass Container */}
        <div className="rounded-2xl sm:rounded-[2rem] p-1 sm:p-1.5 ring-1 ring-emerald-400/35 bg-emerald-950/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.25)]">
          <div className="relative overflow-hidden rounded-[calc(1rem-0.125rem)] sm:rounded-[calc(2rem-0.375rem)] bg-black/85 inner-highlight p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 border border-emerald-500/20">
            {/* Flowing Cosmic Nebula Mesh Background */}
            <div className="aurora-mesh-bg opacity-40 pointer-events-none" aria-hidden="true" />

            {/* Full Logo Showcase */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-7 w-full justify-center md:justify-start">
              <div className="relative shrink-0 group">
                <picture>
                  <source media="(max-width: 768px)" srcSet="/logo-mobile.webp" type="image/webp" />
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img
                    src="/logo.png"
                    alt="Silent Sentinels Full Logo"
                    className="relative h-20 sm:h-28 md:h-32 w-auto object-contain drop-shadow-[0_0_25px_rgba(52,211,153,0.45)]"
                    decoding="async"
                  />
                </picture>
              </div>

              <div className="text-center sm:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full radiant-badge mb-2.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="radiant-badge-text text-[11px] font-mono font-semibold uppercase tracking-wider">
                    2026 NASA Space Apps Challenge
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display uppercase tracking-tight radiant-headline mb-1.5">
                  Silent Sentinels
                </h3>

                <p className="text-xs sm:text-sm radiant-subhead font-sans max-w-lg leading-relaxed">
                  "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="relative z-10 shrink-0 flex items-center">
              <a
                href="#atlas"
                className="group inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/40 hover:border-emerald-400 text-emerald-300 hover:text-white font-semibold font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.2)] hover:shadow-[0_0_30px_rgba(52,211,153,0.45)] hover:scale-105 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
                <span>Explore Atlas</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Cosmic Double-Bezel Footer Card */}
      <div className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-[2.5rem] p-1 sm:p-1.5 ring-1 ring-emerald-500/20 bg-emerald-950/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.12)]">
        <div className="relative overflow-hidden rounded-[calc(1rem-0.125rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-black/85 inner-highlight pt-24 sm:pt-32 pb-8 px-6 sm:px-12 border border-white/5">
          {/* Flowing Cosmic Nebula Mesh Background */}
          <div className="aurora-mesh-bg opacity-25 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 pb-10 border-b border-emerald-500/20">
            {/* Brand & Mission Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <picture>
                  <source media="(max-width: 768px)" srcSet="/logo-mobile.webp" type="image/webp" />
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img
                    src="/logo.png"
                    alt="Silent Sentinels"
                    className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                    decoding="async"
                  />
                </picture>
                <span className="text-lg sm:text-xl font-bold font-display uppercase radiant-headline">
                  Silent Sentinels
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-5 max-w-sm">
                Transforming NASA's catalog of dormant planetary equipment into an evocative, interactive educational journey across the Moon, Mars, and deep space.
              </p>

              <div className="inline-flex items-center space-x-2 text-xs font-mono radiant-badge px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="radiant-badge-text font-semibold">Global Hackathon Submission 2026</span>
              </div>
            </div>

            {/* Column 1: Core Navigation */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider radiant-badge-text mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                <li>
                  <a href="#home" className="hover:text-emerald-400 transition-colors">
                    Home Orbit
                  </a>
                </li>
                <li>
                  <a href="#atlas" className="hover:text-emerald-400 transition-colors">
                    Planetary Atlas
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-emerald-400 transition-colors">
                    Hero Stories
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-emerald-400 transition-colors">
                    About Mission
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Planetary Atlas Destinations */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider radiant-badge-text mb-4">
                Planetary Relics
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                <li>
                  <a href="#atlas" className="hover:text-emerald-400 transition-colors">
                    Lunar Monuments (Moon)
                  </a>
                </li>
                <li>
                  <a href="#atlas" className="hover:text-emerald-400 transition-colors">
                    Martian Pioneers (Mars)
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-emerald-400 transition-colors">
                    Apollo 15 LRV Narrative
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-emerald-400 transition-colors">
                    Opportunity Rover Sol Log
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: NASA Open Data Archives */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider radiant-badge-text mb-4">
                NASA Archives
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                <li>
                  <a
                    href="https://pds.jpl.nasa.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                  >
                    <span>Planetary Data System</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://trek.nasa.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                  >
                    <span>Solar System Treks</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hq.nasa.gov/alsj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                  >
                    <span>Apollo Surface Journal</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://data.nasa.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                  >
                    <span>data.nasa.gov</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Mission Actions */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider radiant-badge-text mb-4">
                Mission Actions
              </h4>
              <div className="space-y-3 text-xs text-slate-300 font-sans">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/40 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-xs font-semibold transition-all shadow-[0_0_15px_rgba(52,211,153,0.15)] cursor-pointer"
                >
                  <span>Return to Top</span>
                  <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-slate-400 font-sans leading-relaxed">
                  Curated for School-Age Space Enthusiasts (Grades 4-12)
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Working Project Links */}
          <div className="relative z-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div>
              © 2026 Silent Sentinels. Built for the NASA Space Apps Challenge.
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-slate-400">
              <a href="#home" className="hover:text-emerald-400 transition-colors">Home</a>
              <a href="#atlas" className="hover:text-emerald-400 transition-colors">Atlas</a>
              <a href="#story" className="hover:text-emerald-400 transition-colors">Story</a>
              <a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center space-x-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer ml-1"
                title="Return to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3 h-3 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
