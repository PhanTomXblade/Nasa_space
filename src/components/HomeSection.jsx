import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function HomeSection() {
  const scrollToStory = () => {
    const story = document.getElementById('story');
    if (story) {
      story.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[140vh] flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-28 z-10"
    >
      {/* Central Hero Block wrapped in Double-Bezel Frosted Glass for Maximum Text Legibility */}
      <div className="max-w-4xl mx-auto rounded-[2.5rem] p-1.5 ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-3xl shadow-2xl">
        <div className="rounded-[calc(2.5rem-0.375rem)] px-6 sm:px-12 py-10 sm:py-14 bg-black/75 inner-highlight flex flex-col items-center">
          {/* Ultra-Wide H1 (Strictly 2 Lines) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display uppercase mb-4 leading-[1.1] max-w-3xl">
            Silent Sentinels Across the Cosmos
          </h1>

          {/* Refined Sub-Head */}
          <p className="text-sm sm:text-lg font-mono text-cyan-300 mb-6 tracking-wide max-w-xl">
            NASA's Forgotten Hardware on Alien Worlds
          </p>

          {/* Narrative Hook */}
          <p className="text-sm sm:text-base text-slate-200 font-sans max-w-2xl leading-relaxed mb-8">
            Before humans took their first steps on extraterrestrial soil, robotic scouts braved cosmic radiation and absolute zero to chart the unknown. Today, these pioneers stand as eternal monuments of human curiosity.
          </p>

          {/* Button-in-Button Nested CTA Architecture */}
          <button
            onClick={scrollToStory}
            className="group relative inline-flex items-center pl-7 pr-2.5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] transition-all duration-300 ease-vanguard shadow-[0_0_30px_rgba(34,211,238,0.35)] cursor-pointer"
          >
            <span className="text-xs sm:text-sm font-bold font-sans tracking-wider uppercase text-cyan-950 mr-4">
              Begin The Voyage
            </span>
            <span className="w-8 h-8 rounded-full bg-cyan-950/20 border border-cyan-950/30 flex items-center justify-center group-hover:translate-y-0.5 group-hover:scale-105 transition-all duration-300 ease-vanguard">
              <ArrowDown className="w-3.5 h-3.5 text-cyan-950" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>

      {/* Floating Doppelrand Telemetry Scroll Indicator */}
      <div className="flex flex-col items-center pointer-events-none mt-16">
        <div className="rounded-full p-1 ring-1 ring-white/10 bg-white/[0.02] backdrop-blur-md">
          <div className="px-4 py-1.5 rounded-full bg-black/75 border border-white/5 inner-highlight flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Scroll to pull away from Earth</span>
          </div>
        </div>
      </div>
    </section>
  );
}
