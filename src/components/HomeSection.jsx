import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function HomeSection() {
  const scrollToAtlas = () => {
    const atlas = document.getElementById('atlas') || document.getElementById('story');
    if (atlas) {
      atlas.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-3.5 sm:px-6 lg:px-8 pt-20 xs:pt-24 pb-12 z-10"
    >
      {/* Central Hero Block wrapped in Double-Bezel Frosted Glass for Maximum Text Legibility */}
      <div className="relative max-w-4xl mx-auto rounded-2xl xs:rounded-[2.5rem] p-1 xs:p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.18)]">
        <div className="relative overflow-hidden rounded-[calc(1rem-0.125rem)] xs:rounded-[calc(2.5rem-0.375rem)] px-4 xs:px-6 sm:px-12 py-8 xs:py-10 sm:py-14 bg-black/70 inner-highlight flex flex-col items-center">
          {/* Flowing Cosmic Nebula Mesh Background */}
          <div className="aurora-mesh-bg" aria-hidden="true" />

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Official Mission Emblem Logo */}
            <div className="relative mb-5 sm:mb-7 max-w-xs sm:max-w-md md:max-w-xl transition-transform duration-500 hover:scale-[1.02]">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Silent Sentinels Across the Cosmos - NASA's Forgotten Hardware on Alien Worlds"
                  className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(52,211,153,0.4)] select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>

            <h1 className="sr-only">
              Silent Sentinels Across the Cosmos - NASA's Forgotten Hardware on Alien Worlds
            </h1>

            {/* Narrative Hook */}
            <p className="text-xs xs:text-sm sm:text-base text-slate-200 font-sans max-w-2xl leading-relaxed mb-6 xs:mb-8">
              Before humans took their first steps on extraterrestrial soil, robotic scouts braved cosmic radiation and absolute zero to chart the unknown. Today, these pioneers stand as eternal monuments of human curiosity.
            </p>

            {/* Button-in-Button Nested CTA Architecture */}
            <button
              onClick={scrollToAtlas}
              className="group relative inline-flex items-center pl-5 xs:pl-7 pr-2 xs:pr-2.5 py-2 xs:py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] transition-all duration-300 ease-vanguard shadow-[0_0_30px_rgba(52,211,153,0.45)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Begin The Voyage to the Planetary Atlas"
            >
              <span className="text-xs sm:text-sm font-bold font-sans tracking-wider uppercase text-emerald-950 mr-3 xs:mr-4">
                Begin The Voyage
              </span>
              <span className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-emerald-950/20 border border-emerald-950/30 flex items-center justify-center group-hover:translate-y-0.5 group-hover:scale-105 transition-all duration-300 ease-vanguard">
                <ArrowDown className="w-3.5 h-3.5 text-emerald-950" strokeWidth={2} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Doppelrand Telemetry Scroll Indicator */}
      <div className="flex flex-col items-center pointer-events-none mt-8">
        <div className="rounded-full p-1 radiant-badge">
          <div className="px-4 py-1.5 rounded-full bg-black/80 border border-emerald-500/20 inner-highlight flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            <span className="radiant-badge-text">Scroll to pull away from Earth</span>
          </div>
        </div>
      </div>
    </section>
  );
}
