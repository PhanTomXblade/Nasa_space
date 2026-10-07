import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Sparkles } from 'lucide-react';

const MILESTONES = [
  { year: 1966, label: 'Surveyor 1', body: 'Moon' },
  { year: 1969, label: 'Apollo 11', body: 'Moon' },
  { year: 1971, label: 'Apollo 15', body: 'Moon' },
  { year: 1976, label: 'Viking 1', body: 'Mars' },
  { year: 1997, label: 'Pathfinder', body: 'Mars' },
  { year: 2004, label: 'Oppy / Spirit', body: 'Mars' },
  { year: 2018, label: 'InSight', body: 'Mars' },
  { year: 2026, label: 'Present', body: 'All' }
];

export default function TimelineScrubber({
  currentYear,
  onYearChange,
  activeCount,
  totalCount,
  selectedBody,
  onMilestoneSelect
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  // Time-lapse auto-play
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        onYearChange((prevYear) => {
          if (prevYear >= 2026) {
            setIsPlaying(false);
            return 2026;
          }
          return prevYear + 1;
        });
      }, 650);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, onYearChange]);

  const handlePlayToggle = () => {
    if (currentYear >= 2026 && !isPlaying) {
      onYearChange(1964);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    onYearChange(2026);
  };

  return (
    <div className="w-full flex justify-center">
      {/* Compact Capsule Cockpit - Matches Navbar & Double-Bezel Web Theme */}
      <div className="relative max-w-xl sm:max-w-2xl w-full rounded-2xl sm:rounded-3xl p-1 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300">
        <div className="relative overflow-hidden rounded-[calc(1rem-0.125rem)] sm:rounded-[calc(1.5rem-0.125rem)] px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-black/85 inner-highlight flex flex-col justify-center">
          
          {/* Subtle Aurora Ambient Mesh */}
          <div className="aurora-mesh-bg opacity-20 pointer-events-none" aria-hidden="true" />

          {/* Compact Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
            
            {/* Left: Compact Label */}
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-300 font-semibold truncate max-w-[120px] sm:max-w-none">
                Timeline Scrubber
              </span>
            </div>

            {/* Center: Glowing Active Era Pill */}
            <div className="flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.25)]">
              <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">
                Era:
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
                {currentYear}
              </span>
            </div>

            {/* Right: Counter & Micro Controls */}
            <div className="flex items-center space-x-1.5">
              <span className="hidden xs:inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-300">
                <span className="text-emerald-400 font-bold">{activeCount}</span>/{totalCount} Sites
              </span>

              {/* Play / Pause */}
              <button
                onClick={handlePlayToggle}
                className={`p-1.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isPlaying
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                    : 'bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300'
                }`}
                title={isPlaying ? 'Pause Time-Lapse' : 'Play Time-Lapse (1964 - 2026)'}
                aria-label={isPlaying ? 'Pause Time-Lapse' : 'Play Time-Lapse'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              </button>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                title="Reset to Present (2026)"
                aria-label="Reset Timeline to 2026"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Compact Slider Track */}
          <div className="relative z-10 w-full pt-1 pb-1">
            <input
              type="range"
              min="1964"
              max="2026"
              step="1"
              value={currentYear}
              role="slider"
              aria-label="Mission Era Year Scrubber"
              aria-valuemin="1964"
              aria-valuemax="2026"
              aria-valuenow={currentYear}
              aria-valuetext={`Year ${currentYear}`}
              onChange={(e) => {
                setIsPlaying(false);
                onYearChange(parseInt(e.target.value, 10));
              }}
              className="w-full h-1.5 bg-slate-800/90 rounded-full appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            />

            {/* Milestone Tick Marks (Compact & Aligned) */}
            <div className="relative w-full flex justify-between mt-1 text-[8px] sm:text-[9px] font-mono text-slate-500 select-none">
              {MILESTONES.map((m) => {
                const isPassed = currentYear >= m.year;
                return (
                  <button
                    key={m.year}
                    onClick={() => {
                      setIsPlaying(false);
                      onYearChange(m.year);
                      if (onMilestoneSelect) onMilestoneSelect(m);
                    }}
                    aria-label={`Jump to ${m.label} (${m.year})`}
                    className={`group relative flex flex-col items-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded ${
                      isPassed ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full mb-0.5 transition-all ${
                        isPassed
                          ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.9)] scale-125'
                          : 'bg-slate-700 group-hover:bg-slate-500'
                      }`}
                    />
                    <span className="font-semibold text-[8px] sm:text-[9px]">{m.year}</span>
                    
                    {/* Hover Micro Tooltip with Milestone Name */}
                    <span className="absolute bottom-full mb-1.5 hidden group-hover:flex px-1.5 py-0.5 rounded bg-black/95 border border-emerald-500/40 text-[8px] font-mono text-emerald-300 whitespace-nowrap shadow-lg pointer-events-none z-30">
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
