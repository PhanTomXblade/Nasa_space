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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      const aboutEl = document.getElementById('about');
      const storyEl = document.getElementById('story');
      const atlasEl = document.getElementById('atlas');

      if (aboutEl && scrollPosition >= aboutEl.offsetTop) {
        setCurrentSection('about');
      } else if (storyEl && scrollPosition >= storyEl.offsetTop) {
        setCurrentSection('story');
      } else if (atlasEl && scrollPosition >= atlasEl.offsetTop) {
        setCurrentSection('atlas');
      } else {
        setCurrentSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
