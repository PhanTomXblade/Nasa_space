import React from 'react';
import { ShieldCheck, Telescope, Award, Users, BookOpen, Atom, HelpCircle } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'Monuments, Not Space Junk',
    subtitle: 'Space Archaeology',
    description:
      'Equipment left on the Moon and Mars is protected cultural heritage. Each lander, wheel track, and retroreflector marks a historic step in humanity leaving its home world.',
  },
  {
    icon: Atom,
    title: 'Science Made Possible',
    subtitle: 'Breakthrough Instruments',
    description:
      'These robotic explorers discovered subsurface water ice, confirmed ancient lake beds on Mars, and measured the distance from Earth to the Moon using Apollo laser reflectors.',
  },
  {
    icon: Telescope,
    title: 'Inspiring Future Explorers',
    subtitle: 'Youth STEM Education',
    description:
      'Designed specifically for school-age space enthusiasts to learn robotics, planetary science, and the engineering courage required to explore hostile worlds.',
  },
];

const FAQS = [
  {
    question: 'Why does NASA leave hardware behind?',
    answer:
      'Launching equipment back off the Moon or Mars requires enormous fuel and rocket boosters. Leaving scientific rovers and landers in place allows every kilogram of launch weight to be used for scientific sensors and cameras.',
  },
  {
    question: 'Are these machines still functioning?',
    answer:
      'Most have concluded their primary missions and entered quiet dormancy due to battery drain or dust storms. However, passive instruments like the Apollo laser retroreflectors are still actively measured from Earth observatories today.',
  },
  {
    question: 'What is the 2026 NASA Space Apps Challenge?',
    answer:
      'It is a global hackathon where students, developers, and scientists use open NASA planetary data to build creative solutions for real challenges in space exploration.',
  },
];

export default function AboutUs() {
  return (
    <section id="about-archive" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#02050e] border-t border-slate-900">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider font-semibold">About Silent Sentinels</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans mb-4">
            Preserving Humanity's Footprints in the Stars
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Created for the 2026 NASA Space Apps Challenge under the theme:
            <span className="text-cyan-400 font-semibold block mt-1">
              "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"
            </span>
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-950/70 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-xs font-mono text-amber-400 tracking-wider uppercase mb-1">
                  {item.subtitle}
                </div>

                <h3 className="text-xl font-bold text-white font-sans mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Q&A for Kids */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-20">
          <div className="flex items-center space-x-3 mb-8">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            <h3 className="text-2xl font-bold text-white font-sans">
              Frequently Asked Space Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80">
                <h4 className="text-base font-semibold text-cyan-300 font-sans mb-2">
                  {faq.question}
                </h4>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project & Event Overview Badge */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Official Event Category
              </div>
              <div className="text-lg font-bold text-white font-sans">
                2026 NASA Space Apps Challenge
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Subjects: Astrophysics, Planets & Moons, Space Exploration
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-4 py-2.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Built for School-Age Explorers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
