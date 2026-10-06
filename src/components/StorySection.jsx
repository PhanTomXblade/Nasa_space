import React, { useState } from 'react';
import { Orbit, Compass, Radio, Activity, Cpu, MapPin } from 'lucide-react';

const HERO_STORIES = [
  {
    id: 'oppy',
    world: 'Mars',
    title: 'Opportunity: The 90-Day Rover That Lived 15 Years',
    hero: 'Opportunity (Oppy)',
    badge: 'Red Planet Marathon',
    location: 'Perseverance Valley, Mars',
    lifespan: '2004 - 2018 (5,111 Sols / Days)',
    odometer: '45.16 km Driven',
    story:
      'Engineered for a strict 90-day mission, Oppy explored the Martian desert for 15 years. It survived severe dust storms, climbed steep crater rims, and drove 45 kilometers: completing the first human marathon on another world.',
    science:
      'Oppy discovered microscopic hematite spherules nicknamed "blueberries," providing decisive physical proof that liquid water once flowed across the Martian surface.',
    status: 'Quietly resting in Perseverance Valley after a planet-wide dust storm shielded sunlight from its solar arrays in 2018.',
    icon: Compass,
  },
  {
    id: 'lrv',
    world: 'Moon',
    title: 'The Lunar Buggy: Electric Cruisers on the Moon',
    hero: 'Apollo Lunar Roving Vehicle',
    badge: 'Lunar Electric Vehicle',
    location: 'Hadley-Apennine, Descartes, Taurus-Littrow',
    lifespan: 'Apollo 15, 16, & 17 (1971 - 1972)',
    odometer: '90.2 km Combined Traverse',
    story:
      'NASA built three specialized electric rovers that astronauts navigated across lunar dust at 8 mph. Before departing, astronauts parked each buggy facing Earth so the vehicle camera could record the Apollo ascent stage blasting into orbit.',
    science:
      'Extended astronaut exploration radius by kilometers, allowing crews to collect over 840 pounds of pristine lunar bedrock and revolutionize lunar geologic history.',
    status: 'All three rovers remain in pristine condition in the lunar vacuum, their cameras permanently facing Earth.',
    icon: Cpu,
  },
  {
    id: 'insight',
    world: 'Mars',
    title: 'InSight: Listening to the Red Planet Heartbeat',
    hero: 'InSight Geophysical Lander',
    badge: 'Seismic Observer',
    location: 'Elysium Planitia, Mars',
    lifespan: '2018 - 2022 (1,440 Sols / Days)',
    odometer: 'Stationary Listening Post',
    story:
      'Unlike wheeled rovers, InSight anchored in place and deployed an ultra-sensitive dome seismometer directly onto the Martian crust to record seismic tremors.',
    science:
      'Cataloged over 1,300 "Marsquakes" and meteorite impacts, mapping the depth of the Martian crust, mantle, and metallic liquid core for the first time.',
    status: 'Concluded operations in December 2022 after red atmospheric dust settled over its solar arrays, ending electrical power generation.',
    icon: Activity,
  },
  {
    id: 'surveyor',
    world: 'Moon',
    title: 'Surveyor 3: The Robot Visited by Human Hands',
    hero: 'Surveyor 3 Lunar Lander',
    badge: 'Pioneer Scout',
    location: 'Ocean of Storms, Moon',
    lifespan: 'April 1967 (Primary Mission)',
    odometer: 'Soft Landing Site',
    story:
      'Surveyor 3 completed a soft landing to prove lunar dust could support human footsteps. In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean walked directly to the silent lander to examine its condition.',
    science:
      'Astronauts retrieved its camera and returned it to terrestrial laboratories, allowing engineers to analyze the long-term impact of deep-space cosmic radiation on human hardware.',
    status: 'Preserved inside Surveyor Crater as a historic landmark touched by both robotic instruments and human astronauts.',
    icon: Radio,
  },
];

export default function StorySection() {
  const [activeStory, setActiveStory] = useState(HERO_STORIES[0]);
  const ActiveIcon = activeStory.icon;

  return (
    <section
      id="story"
      className="relative min-h-[160vh] py-32 md:py-44 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-between"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header wrapped in Double-Bezel Frosted Glass for Maximum Text Legibility */}
        <div className="max-w-3xl mx-auto mb-16 rounded-[2rem] p-1.5 ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-3xl shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] px-6 sm:px-10 py-8 bg-black/75 inner-highlight text-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display uppercase mb-4 leading-tight">
              Monuments in the Dust
            </h2>

            <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-2xl mx-auto">
              Over 500 metric tons of scientific instruments rest across the Moon and Mars.
              Explore the robotic explorers whose engineering opened new planetary frontiers.
            </p>
          </div>
        </div>

        {/* Fluid Pill Story Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {HERO_STORIES.map((item) => {
            const isSelected = activeStory.id === item.id;
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveStory(item)}
                className={`group flex items-center space-x-2.5 px-5 py-2.5 rounded-full text-xs font-mono tracking-wide transition-all duration-300 ease-vanguard cursor-pointer backdrop-blur-2xl ${
                  isSelected
                    ? 'bg-cyan-500 text-cyan-950 font-bold shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                    : 'bg-black/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                <ItemIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                <span>{item.hero}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Bento Grid with Double-Bezel Architecture */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Main Dossier Card (Span 8) */}
          <div className="col-span-12 lg:col-span-8 rounded-[2rem] p-1.5 ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl">
            <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 sm:p-10 bg-black/80 inner-highlight flex flex-col justify-between">
              <div>
                {/* Card Topline */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-8">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                      <ActiveIcon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                        Celestial Destination: {activeStory.world}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                        {activeStory.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-cyan-300 border border-white/10">
                    {activeStory.badge}
                  </span>
                </div>

                {/* Narrative & Science Split */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.2em] mb-2">
                      The Mission Journey
                    </h4>
                    <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                      {activeStory.story}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-2">
                      Scientific Discoveries
                    </h4>
                    <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                      {activeStory.science}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
                  <span className="text-slate-300 font-sans text-xs leading-relaxed">
                    <strong className="text-amber-300 font-mono uppercase mr-1">Current State:</strong>
                    {activeStory.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Telemetry Bento Stack (Span 4) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6">
            {/* Telemetry Card 1 */}
            <div className="rounded-[2rem] p-1.5 ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-xl flex-1">
              <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 bg-black/80 inner-highlight flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    Resting Coordinates
                  </span>
                  <div className="text-sm sm:text-base font-bold text-white font-sans">
                    {activeStory.location}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-cyan-400 pt-4 border-t border-white/5">
                  Permanent Solar Surface Archive
                </div>
              </div>
            </div>

            {/* Telemetry Card 2 */}
            <div className="rounded-[2rem] p-1.5 ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-xl flex-1">
              <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 bg-black/80 inner-highlight flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 mb-4">
                    <Orbit className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    Operational Lifespan
                  </span>
                  <div className="text-sm sm:text-base font-bold text-white font-sans mb-1">
                    {activeStory.lifespan}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Traverse: {activeStory.odometer}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-amber-300 pt-4 border-t border-white/5">
                  Documented Planetary Milestone
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Doppelrand Telemetry Scroll Indicator */}
      <div className="flex flex-col items-center pointer-events-none mt-20">
        <div className="rounded-full p-1 ring-1 ring-white/10 bg-white/[0.02] backdrop-blur-md">
          <div className="px-4 py-1.5 rounded-full bg-black/60 border border-white/5 inner-highlight flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Scroll into the Interstellar Void</span>
          </div>
        </div>
      </div>
    </section>
  );
}
