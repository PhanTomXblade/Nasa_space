import React, { useState } from 'react';
import {
  Orbit,
  Compass,
  Radio,
  Activity,
  Cpu,
  MapPin,
  Telescope,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

const HERO_STORIES = [
  {
    id: 'oppy',
    world: 'Mars',
    title: 'Opportunity: The 90-Day Rover That Lived 15 Years',
    hero: 'Opportunity (Oppy)',
    shortName: 'Oppy',
    badge: 'Red Planet Marathon',
    tag: '5,111 Sols Active',
    location: 'Perseverance Valley, Mars',
    lifespan: '2004 - 2018 (5,111 Sols)',
    odometer: '45.16 km Driven',
    story:
      'Engineered for a strict 90-day mission, Oppy explored the Martian desert for 15 years. It survived severe dust storms, climbed steep crater rims, and drove 45 kilometers: completing the first human marathon on another world.',
    science:
      'Discovered microscopic hematite spherules nicknamed "blueberries," providing decisive physical proof that liquid water once flowed across the Martian surface.',
    status: 'Quietly resting in Perseverance Valley after a planet-wide dust storm shielded sunlight from its solar arrays in 2018.',
    icon: Compass,
  },
  {
    id: 'lrv',
    world: 'Moon',
    title: 'The Lunar Buggy: Electric Cruisers on the Moon',
    hero: 'Apollo Lunar Roving Vehicle',
    shortName: 'Apollo LRV',
    badge: 'Lunar Electric Vehicle',
    tag: '90.2 km Traverse',
    location: 'Hadley-Apennine, Moon',
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
    id: 'viking',
    world: 'Mars',
    title: 'Viking 1: Humanity\'s First Permanent Footprint on Mars',
    hero: 'Viking 1 Lander',
    shortName: 'Viking 1',
    badge: 'First Mars Touchdown',
    tag: '2,245 Sols Station',
    location: 'Chryse Planitia, Mars',
    lifespan: '1976 - 1982 (2,245 Sols)',
    odometer: 'First Operational Station',
    story:
      'On July 20, 1976, Viking 1 transmitted the first historic close-up photographs from the Martian surface. It operated for over 6 years in the freezing Martian desert.',
    science:
      'Conducted groundbreaking automated soil biology experiments, analyzed atmospheric chemistry, and recorded seasonal Martian dust storm cycles.',
    status: 'Silently standing in Chryse Planitia after its final engineering transmission in November 1982.',
    icon: Telescope,
  },
  {
    id: 'insight',
    world: 'Mars',
    title: 'InSight: Listening to the Red Planet Heartbeat',
    hero: 'InSight Geophysical Lander',
    shortName: 'InSight',
    badge: 'Seismic Observer',
    tag: '1,300+ Marsquakes',
    location: 'Elysium Planitia, Mars',
    lifespan: '2018 - 2022 (1,440 Sols)',
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
    shortName: 'Surveyor 3',
    badge: 'Pioneer Scout',
    tag: 'Apollo 12 Landmark',
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeStory = HERO_STORIES[currentIndex];
  const ActiveIcon = activeStory.icon;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === HERO_STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="story"
      className="relative py-12 xs:py-16 sm:py-24 px-3 xs:px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Main Double-Bezel Showcase Container */}
        <div className="relative max-w-6xl mx-auto rounded-2xl xs:rounded-[2.5rem] p-1 xs:p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-3xl shadow-[0_0_60px_rgba(16,185,129,0.18)]">
          <div className="relative overflow-hidden rounded-[calc(1rem-0.125rem)] xs:rounded-[calc(2.5rem-0.375rem)] px-3 xs:px-6 sm:px-10 py-8 xs:py-10 sm:py-16 bg-black/75 inner-highlight flex flex-col items-center">
            {/* Flowing Cosmic Nebula Mesh Background */}
            <div className="aurora-mesh-bg" aria-hidden="true" />

            {/* Inner Content Layer */}
            <div className="relative z-10 w-full flex flex-col items-center">
              
              {/* Top Floating Control Bar */}
              <div className="w-full max-w-3xl flex items-center justify-between gap-2 xs:gap-4 mb-6 xs:mb-8 sm:mb-12">
                <div className="flex items-center space-x-1.5 text-[9px] xs:text-[10px] sm:text-xs font-mono uppercase tracking-widest radiant-badge px-2.5 xs:px-3.5 py-1 xs:py-1.5 rounded-full">
                  <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-emerald-400" />
                  <span className="radiant-badge-text font-semibold">Planetary Archive</span>
                </div>

                {/* Center Previous / Next Carousel Controls */}
                <div className="flex items-center space-x-1 xs:space-x-1.5 bg-black/60 border border-white/10 rounded-full p-1 backdrop-blur-xl">
                  <button
                    onClick={handlePrev}
                    className="p-1 xs:p-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="Previous Monument"
                  >
                    <ChevronLeft className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                  </button>
                  <span className="px-1.5 xs:px-2 text-[9px] xs:text-[10px] font-mono text-emerald-400 font-bold">
                    0{currentIndex + 1} / 0{HERO_STORIES.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1 xs:p-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="Next Monument"
                  >
                    <ChevronRight className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                  </button>
                </div>

                <div className="hidden sm:flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Orbital Arc</span>
                </div>
              </div>

              {/* Orbital Arc Stage (Flanking Squircle Cards around Center Pedestal) */}
              <div className="relative w-full max-w-4xl py-6 sm:py-10 flex flex-col items-center">
                
                {/* Curved Orbital Trajectory Line (SVG Arch) */}
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-48 pointer-events-none opacity-40 z-0"
                  viewBox="0 0 800 200"
                  fill="none"
                >
                  <path
                    d="M 50 160 Q 400 -20 750 160"
                    stroke="url(#orbitGradient)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  <defs>
                    <linearGradient id="orbitGradient" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Arc Cards & Center Mount Grid */}
                <div className="relative z-10 w-full flex items-center justify-center gap-2 sm:gap-4 md:gap-7">
                  {HERO_STORIES.map((story, index) => {
                    const isSelected = index === currentIndex;
                    const StoryIcon = story.icon;

                    // Compute curved tilt and elevation offsets along parabolic arc
                    // Center (index 2): translateY(0), rotate(0)
                    // Index 0: -14deg, translate-y-12
                    // Index 1: -7deg, translate-y-4
                    // Index 3: +7deg, translate-y-4
                    // Index 4: +14deg, translate-y-12
                    const diff = index - 2;
                    let tiltClass = 'rotate-0 translate-y-0';
                    if (diff === -2) tiltClass = '-rotate-12 translate-y-8 sm:translate-y-12';
                    if (diff === -1) tiltClass = '-rotate-6 translate-y-2 sm:translate-y-4';
                    if (diff === 1) tiltClass = 'rotate-6 translate-y-2 sm:translate-y-4';
                    if (diff === 2) tiltClass = 'rotate-12 translate-y-8 sm:translate-y-12';

                    return (
                      <button
                        key={story.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`group relative flex flex-col items-center justify-center transition-all duration-500 ease-vanguard cursor-pointer select-none ${tiltClass} ${
                          isSelected
                            ? 'scale-110 sm:scale-120 z-20'
                            : 'scale-90 sm:scale-100 opacity-70 hover:opacity-100 hover:scale-95 sm:hover:scale-105 z-10'
                        }`}
                        aria-label={`Select ${story.hero}`}
                      >
                        {/* Squircle Card Container (Faithful to Matcha reference squircle cards) */}
                        <div
                          className={`w-14 h-14 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex flex-col items-center justify-center transition-all duration-500 ${
                            isSelected
                              ? 'bg-gradient-to-b from-white/20 to-white/5 border-2 border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.5)] backdrop-blur-2xl'
                              : 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 shadow-xl backdrop-blur-md'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-400/40 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                                : 'bg-white/5 text-slate-300 group-hover:text-emerald-300 border border-white/10'
                            }`}
                          >
                            <StoryIcon className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={1.5} />
                          </div>

                          {/* Mini Hardware Name */}
                          <span
                            className={`mt-1 sm:mt-1.5 text-[8px] sm:text-[10px] font-mono tracking-tight uppercase truncate max-w-full text-center ${
                              isSelected
                                ? 'text-emerald-300 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                                : 'text-slate-400'
                            }`}
                          >
                            {story.shortName}
                          </span>
                        </div>

                        {/* Active Selection Glow Beacon */}
                        {isSelected && (
                          <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Central Celestial Pedestal Summit (Mirroring Matcha mountain peak with product + tag) */}
                <div className="relative mt-8 sm:mt-12 flex flex-col items-center">
                  
                  {/* Floating Holographic Hardware Badge */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-emerald-950/90 via-black to-emerald-950/60 border-2 border-emerald-400/50 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.35)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-radial-gradient from-emerald-400/20 to-transparent pointer-events-none" />
                      <ActiveIcon className="w-9 h-9 sm:w-13 sm:h-13 text-emerald-300 animate-[spin_40s_linear_infinite]" strokeWidth={1.5} />
                    </div>

                    {/* Celestial Pedestal Peak Base (Sculpted mountain ridge contour) */}
                    <div className="w-36 sm:w-56 h-10 sm:h-14 -mt-5 bg-gradient-to-t from-emerald-950/70 via-emerald-900/40 to-transparent rounded-t-[2.5rem] border-t border-emerald-400/30 shadow-[0_-10px_25px_rgba(52,211,153,0.2)] flex items-end justify-center pb-2">
                      <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold opacity-80">
                        {activeStory.world} Surface Peak
                      </span>
                    </div>

                    {/* Floating Telemetry Tag (Directly inspired by the 19.33$ cart tag on the mountain in the reference) */}
                    <div className="-mt-3.5 z-20 px-4 py-2 rounded-2xl bg-white text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-white/80 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={2} />
                      <span className="text-xs font-mono font-extrabold tracking-wide text-slate-900">
                        {activeStory.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grand Editorial Headline (Mirroring "Chooise you matcha tea" from reference) */}
                <div className="text-center mt-8 sm:mt-10 mb-4 sm:mb-6">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display uppercase tracking-tight leading-[1.08] radiant-headline">
                    Choose Your Monument
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest uppercase radiant-subhead font-medium">
                    {activeStory.hero} | {activeStory.location}
                  </p>
                </div>
              </div>

              {/* Connected Detailed Mission Dossier Bento Block */}
              <div className="w-full max-w-5xl mt-6 grid grid-cols-12 gap-6 items-stretch">
                
                {/* Left Column: Mission Narrative & Discoveries Split Card */}
                <div className="col-span-12 lg:col-span-8 rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl">
                  <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 sm:p-10 bg-black/80 inner-highlight flex flex-col justify-between">
                    <div>
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-8">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]">
                            <ActiveIcon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest block radiant-badge-text font-semibold">
                              Destination World: {activeStory.world}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold font-display radiant-headline">
                              {activeStory.title}
                            </h3>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono px-3.5 py-1 rounded-full radiant-badge radiant-badge-text font-semibold">
                          {activeStory.badge}
                        </span>
                      </div>

                      {/* Narrative & Science Split */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2 radiant-subhead font-semibold">
                            The Mission Journey
                          </h4>
                          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                            {activeStory.story}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2 radiant-subhead font-semibold">
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
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-emerald-500/10 flex items-start space-x-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] mt-1 shrink-0" />
                        <span className="text-slate-300 font-sans text-xs leading-relaxed">
                          <strong className="radiant-badge-text font-mono uppercase mr-1">Current State:</strong>
                          {activeStory.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Telemetry & Milestone Bento Cards */}
                <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6">
                  {/* Telemetry Card 1: Coordinates */}
                  <div className="rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl flex-1">
                    <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 bg-black/80 inner-highlight flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)] mb-4">
                          <MapPin className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest block mb-1 radiant-badge-text font-semibold">
                          Resting Coordinates
                        </span>
                        <div className="text-sm sm:text-base font-bold font-sans radiant-headline">
                          {activeStory.location}
                        </div>
                      </div>
                      <div className="text-[11px] font-mono pt-4 border-t border-white/5 radiant-badge-text font-medium">
                        Permanent Solar Surface Archive
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Card 2: Lifespan & Odometer */}
                  <div className="rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl flex-1">
                    <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 bg-black/80 inner-highlight flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)] mb-4">
                          <Orbit className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest block mb-1 radiant-badge-text font-semibold">
                          Operational Lifespan
                        </span>
                        <div className="text-sm sm:text-base font-bold font-sans mb-1 radiant-headline">
                          {activeStory.lifespan}
                        </div>
                        <div className="text-xs text-slate-300 font-mono">
                          Traverse: {activeStory.odometer}
                        </div>
                      </div>
                      <div className="text-[11px] font-mono pt-4 border-t border-white/5 radiant-badge-text font-medium">
                        Documented Planetary Milestone
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
