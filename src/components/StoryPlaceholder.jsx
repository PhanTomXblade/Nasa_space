import React from 'react';
import { Film, Play, Sparkles, Award, Compass, ArrowRight } from 'lucide-react';

const UPCOMING_STORIES = [
  {
    title: 'Episode 1: The 90-Day Rover That Lived 15 Years',
    hero: 'Opportunity (Oppy) on Mars',
    badge: 'Red Planet Marathon',
    description:
      'How a robotic rover built for a three-month mission survived fifteen freezing Martian winters and completed a 45-kilometer journey across red craters.',
    icon: '🤖',
  },
  {
    title: 'Episode 2: The First Cars Left on the Moon',
    hero: 'Apollo Lunar Roving Vehicles (LRV)',
    badge: 'Lunar Electric Buggy',
    description:
      'Astronauts drove electric buggies across lunar dust at 8 mph and parked them facing Earth so the camera could film the Apollo ascent stages blasting back home.',
    icon: '🏎️',
  },
  {
    title: 'Episode 3: The Message in a Cosmic Bottle',
    hero: 'Voyager 1 & 2 Probes',
    badge: 'Interstellar Messenger',
    description:
      'Two robotic explorers carrying the Golden Record with Earth sounds, animal calls, and Mozart into the infinite space between the stars.',
    icon: '📀',
  },
  {
    title: 'Episode 4: Listening to the Red Planet Heartbeat',
    hero: 'InSight Mars Lander',
    badge: 'Marsquake Listener',
    description:
      'A stationary explorer that put a sensitive seismometer onto the Martian crust to detect over 1,300 Marsquakes before dust covered its solar wings.',
    icon: '🎧',
  },
];

export default function StoryPlaceholder() {
  return (
    <section id="story" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#030712] border-t border-slate-900">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider font-semibold">Kids Video Story Theater</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-300">Phase 2 In Development</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans mb-4">
            Tales of the Silent Pioneers
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            We are preparing an interactive video cinema designed specifically for school-age space enthusiasts.
            Here is a first look at the four hero journeys coming to this theater.
          </p>
        </div>

        {/* Story Episode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {UPCOMING_STORIES.map((story, index) => (
            <div
              key={index}
              className="group relative bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/40"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                  {story.icon}
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  {story.badge}
                </span>
              </div>

              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                {story.hero}
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-3 group-hover:text-cyan-300 transition-colors">
                {story.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed font-sans mb-6">
                {story.description}
              </p>

              <div className="flex items-center text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span>Video Reel Coming in Next Step</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Teaser Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-amber-950/40 border border-cyan-500/30 p-8 sm:p-10 text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
              Interactive Video Story Mode
            </h4>
            <p className="text-sm sm:text-base text-slate-300 mb-6 font-sans">
              This space will feature animated video clips, kid-friendly mission dials, and collectible achievement badges for young space detectives.
            </p>
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono">
              <span>Status: Video Story Module Ready for Implementation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
