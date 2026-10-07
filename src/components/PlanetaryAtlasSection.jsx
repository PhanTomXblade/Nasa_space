import React, { useState, useMemo } from 'react';
import PlanetaryMap from './PlanetaryMap';
import TimelineScrubber from './TimelineScrubber';
import ObjectDetailPanel from './ObjectDetailPanel';
import moonData from '../data/moon-artifacts.json';
import marsData from '../data/mars-artifacts.json';
import { Globe, Sparkles, Navigation, Layers, Compass } from 'lucide-react';

export default function PlanetaryAtlasSection() {
  const [selectedBody, setSelectedBody] = useState('Moon'); // 'Moon' | 'Mars'
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedObject, setSelectedObject] = useState(null);
  const [flyToCoord, setFlyToCoord] = useState(null);

  // Active dataset based on planet
  const currentDataset = useMemo(() => {
    return selectedBody === 'Moon' ? moonData : marsData;
  }, [selectedBody]);

  // Filtered artifacts by timeline
  const activeFeatures = useMemo(() => {
    return currentDataset.features.filter((f) => f.properties.year <= currentYear);
  }, [currentDataset, currentYear]);

  // Handle switching bodies
  const handleBodyChange = (body) => {
    setSelectedBody(body);
    setSelectedObject(null);
  };

  // Quick jump helper for milestone pins
  const handleMilestoneSelect = (milestone) => {
    if (milestone.body !== 'All' && milestone.body !== selectedBody) {
      setSelectedBody(milestone.body);
    }
  };

  // Previous / Next artifact in active list
  const currentIndex = selectedObject
    ? activeFeatures.findIndex((f) => f.properties.id === selectedObject.properties.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevObj = activeFeatures[currentIndex - 1];
      setSelectedObject(prevObj);
      setFlyToCoord(prevObj.geometry.coordinates);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeFeatures.length - 1 && currentIndex !== -1) {
      const nextObj = activeFeatures[currentIndex + 1];
      setSelectedObject(nextObj);
      setFlyToCoord(nextObj.geometry.coordinates);
    }
  };

  const handleQuickSelect = (feature) => {
    setSelectedObject(feature);
    setFlyToCoord(feature.geometry.coordinates);
  };

  return (
    <section
      id="atlas"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
      aria-label="Interactive Planetary Atlas"
    >
      <div className="max-w-[1560px] mx-auto w-full flex flex-col items-center">
        
        {/* Header Block with Double-Bezel Frosted Glass */}
        <div className="relative max-w-4xl mx-auto mb-10 rounded-[2.5rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.18)]">
          <div className="relative overflow-hidden rounded-[calc(2.5rem-0.375rem)] px-6 sm:px-12 py-8 sm:py-10 bg-black/75 inner-highlight text-center flex flex-col items-center">
            {/* Mesh Glow Background */}
            <div className="aurora-mesh-bg" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest radiant-badge px-3.5 py-1.5 rounded-full mb-4">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="radiant-badge-text font-semibold">
                  NASA Solar System Treks • Cartographic Archive
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display uppercase mb-3 leading-tight radiant-headline">
                Interactive Planetary Atlas
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl leading-relaxed mb-4">
                Explore real NASA satellite basemaps of the Moon and Mars. Uncover historical rovers, stationary landers, and scientific instruments resting across alien soil.
              </p>

              {/* Quick Jump Landmark Carousel */}
              <div className="w-full flex items-center justify-center flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-1">
                  Featured Sites:
                </span>
                {activeFeatures.slice(0, 5).map((f) => (
                  <button
                    key={f.properties.id}
                    onClick={() => handleQuickSelect(f)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/[0.06] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {f.properties.name.split(' ')[0]} {f.properties.name.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map & Detail Stage with Side-by-Side Responsive Layout */}
        <div className="relative w-full flex flex-col space-y-6">
          
          {/* Main Interactive Stage Row: Map on Left, Telemetry Card on Right */}
          <div className="relative w-full flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Map Canvas (Transitions width smoothly so full map remains visible) */}
            <div
              className={`w-full transition-all duration-500 ease-out ${
                selectedObject ? 'lg:flex-1 lg:min-w-0' : 'w-full'
              }`}
            >
              <PlanetaryMap
                selectedBody={selectedBody}
                onBodyChange={handleBodyChange}
                artifacts={currentDataset}
                currentYear={currentYear}
                selectedObject={selectedObject}
                onSelectObject={setSelectedObject}
                onFlyToCoord={flyToCoord}
              />
            </div>

            {/* Object Telemetry Panel: Side-by-Side Companion Card on Desktop, Modal Anchored Below Navbar on Mobile */}
            {selectedObject && (
              <div
                className="fixed inset-0 z-40 pt-20 sm:pt-24 pb-3 sm:pb-4 px-2 xs:px-3 sm:px-4 flex items-start justify-center bg-black/75 backdrop-blur-sm lg:relative lg:inset-auto lg:z-auto lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:w-[460px] xl:w-[500px] lg:h-[620px] lg:sm:h-[700px] shrink-0 animate-in fade-in duration-300"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setSelectedObject(null);
                  }
                }}
              >
                <ObjectDetailPanel
                  selectedObject={selectedObject}
                  onClose={() => setSelectedObject(null)}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  hasPrev={currentIndex > 0}
                  hasNext={currentIndex < activeFeatures.length - 1 && currentIndex !== -1}
                  onFlyTo={(coord) => setFlyToCoord(coord)}
                />
              </div>
            )}
          </div>

          {/* Temporal Timeline Scrubber (Centered & Compact) */}
          <div className="w-full flex justify-center pt-1">
            <TimelineScrubber
              currentYear={currentYear}
              onYearChange={setCurrentYear}
              activeCount={activeFeatures.length}
              totalCount={currentDataset.features.length}
              selectedBody={selectedBody}
              onMilestoneSelect={handleMilestoneSelect}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
