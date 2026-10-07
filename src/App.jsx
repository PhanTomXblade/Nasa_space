import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CosmicBackgroundCanvas from './components/CosmicBackgroundCanvas';
import HomeSection from './components/HomeSection';
import StorySection from './components/StorySection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      const storyEl = document.getElementById('story');
      const aboutEl = document.getElementById('about');

      if (aboutEl && scrollPosition >= aboutEl.offsetTop) {
        setCurrentSection('about');
      } else if (storyEl && scrollPosition >= storyEl.offsetTop) {
        setCurrentSection('story');
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
      {/* Fixed Navbar with Home, Story, About Us */}
      <Navbar activeSection={currentSection} />

      {/* Global 5K Scrollytelling Canvas in Background */}
      {/* Home: Frames 01-15 | Story: Frames 16-35 | About: Frames 36-50 */}
      <CosmicBackgroundCanvas currentSection={currentSection} />

      {/* Content Layers with Glassmorphic Panels */}
      <main className="relative z-10 flex-1">
        <HomeSection />
        <StorySection />
        <AboutSection />
      </main>

      {/* Clean Space Archive Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
