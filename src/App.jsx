import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CosmicBackgroundCanvas from './components/CosmicBackgroundCanvas';
import HomeSection from './components/HomeSection';
import PlanetaryAtlasSection from './components/PlanetaryAtlasSection';
import StorySection from './components/StorySection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import OfflineToast from './components/OfflineToast';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [playbackMode, setPlaybackMode] = useState('hybrid'); // 'hybrid' | 'autoplay' | 'scroll'

  // IntersectionObserver-based section detection (off main thread, zero scroll jank)
  useEffect(() => {
    const sectionIds = ['about', 'story', 'atlas', 'home'];
    const observers = [];

    // Use IntersectionObserver instead of raw scroll math.
    // The browser's compositor thread handles visibility checks natively,
    // freeing the JS main thread on mobile during touch scrolling.
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most-visible section that is intersecting
        let bestEntry = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) {
          setCurrentSection(bestEntry.target.id);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-white flex flex-col font-sans selection:bg-emerald-900 selection:text-emerald-100">
      {/* Fixed Navbar with Home, Atlas, Story, About & 3-dot Cosmic Engine menu */}
      <Navbar
        activeSection={currentSection}
        playbackMode={playbackMode}
        onPlaybackModeChange={setPlaybackMode}
      />

      {/* Global 24 FPS Background Canvas */}
      <CosmicBackgroundCanvas
        currentSection={currentSection}
        playbackMode={playbackMode}
        onPlaybackModeChange={setPlaybackMode}
      />

      {/* Content Layers with Glassmorphic Panels */}
      <main className="relative z-10 flex-1">
        <HomeSection />
        <PlanetaryAtlasSection />
        <StorySection />
        <AboutSection />
      </main>

      {/* Clean Space Archive Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Offline / Cache Status Toast Notifications */}
      <OfflineToast />
    </div>
  );
}
