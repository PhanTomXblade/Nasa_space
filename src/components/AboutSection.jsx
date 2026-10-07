import React from 'react';
import { ShieldCheck, Telescope, Award, Atom, HelpCircle } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'Monuments, Not Space Junk',
    subtitle: 'Space Archaeology',
    description:
      'Equipment resting on the Moon and Mars represents protected historical heritage. Each lander, wheel track, and retroreflector documents an epochal stride in human curiosity beyond Earth.',
  },
  {
    icon: Atom,
    title: 'Science Made Possible',
    subtitle: 'Breakthrough Instruments',
    description:
      'These robotic explorers confirmed ancient water basins on Mars, analyzed lunar soil chemistry, and enabled laser-ranging experiments that measure Earth-Moon distance down to millimeter precision.',
  },
  {
    icon: Telescope,
    title: 'Inspiring Future Explorers',
    subtitle: 'Youth STEM Education',
    description:
      'Engineered specifically for school-age space enthusiasts to discover robotics, astrophysics, and the engineering tenacity required to navigate the harsh planetary environments of our solar system.',
  },
];

const FAQS = [
  {
    question: 'Why does NASA leave hardware behind?',
    answer:
      'Launching equipment back off the Moon or Mars requires massive propulsion stages and fuel reserves. Leaving rovers and landers in place allows launch mass to be dedicated to scientific payloads and imaging systems.',
  },
  {
    question: 'Are any of these instruments still functioning?',
    answer:
      'Most completed primary science objectives and entered permanent dormancy due to battery depletion or atmospheric dust. However, passive optics like the Apollo laser retroreflectors continue to reflect ground-based laser pulses today.',
  },
  {
    question: 'What is the 2026 NASA Space Apps Challenge?',
    answer:
      'A global collaborative hackathon where students, educators, and developers utilize open NASA planetary archives to develop creative storytelling tools for real space exploration frontiers.',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header wrapped in Double-Bezel Frosted Glass for Maximum Text Legibility */}
        <div className="relative max-w-3xl mx-auto mb-12 rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)]">
          <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] px-6 sm:px-10 py-8 bg-black/75 inner-highlight text-center">
            {/* Flowing Cosmic Nebula Mesh Background */}
            <div className="aurora-mesh-bg" aria-hidden="true" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-display uppercase mb-4 leading-tight radiant-headline">
                Preserving Footprints in the Stars
              </h2>

              <p className="text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto radiant-subhead font-normal">
                Developed for the 2026 NASA Space Apps Challenge:
                <span className="block mt-2 text-xs sm:text-sm font-mono radiant-badge-text font-semibold">
                  "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars in Double-Bezel Bento Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative rounded-[2rem] p-1.5 ring-1 ring-emerald-500/20 bg-emerald-950/20 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:ring-emerald-500/40"
              >
                <div className="relative overflow-hidden h-full rounded-[calc(2rem-0.375rem)] p-8 bg-black/80 inner-highlight flex flex-col justify-between">
                  {/* Flowing Cosmic Nebula Mesh Background */}
                  <div className="aurora-mesh-bg" aria-hidden="true" />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)] mb-6">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>

                      <div className="text-[10px] font-mono tracking-[0.2em] uppercase mb-1 radiant-badge-text font-semibold">
                        {item.subtitle}
                      </div>

                      <h3 className="text-lg font-bold font-display mb-3 radiant-headline">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive FAQ Bento Block */}
        <div className="relative rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl mb-16">
          <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] p-8 sm:p-12 bg-black/80 inner-highlight">
            {/* Flowing Cosmic Nebula Mesh Background */}
            <div className="aurora-mesh-bg" aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <HelpCircle className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                <h3 className="text-xl sm:text-2xl font-bold font-display radiant-headline">
                  Planetary Archive Inquiries
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FAQS.map((faq, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold font-sans mb-3 radiant-subhead font-semibold">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Official NASA Challenge Credential Bar */}
        <div className="relative rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl">
          <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] p-8 bg-black/80 inner-highlight">
            {/* Flowing Cosmic Nebula Mesh Background */}
            <div className="aurora-mesh-bg" aria-hidden="true" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.25)]">
                  <Award className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest radiant-badge-text font-semibold">
                    Global Hackathon Submission
                  </div>
                  <div className="text-base sm:text-lg font-bold font-display radiant-headline">
                    2026 NASA Space Apps Challenge
                  </div>
                  <div className="text-xs text-slate-400 font-sans">
                    Categories: Astrophysics, Planets & Moons, Space Exploration
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-xs font-mono radiant-badge px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="radiant-badge-text font-semibold">Dedicated to School-Age Space Enthusiasts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
