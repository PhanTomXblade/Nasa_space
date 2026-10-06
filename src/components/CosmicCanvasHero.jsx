import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Orbit, ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 50;

// User specified exact layer mapping:
// Layer 1 (frames 1-15): Home
// Layer 2 (frames 16-35): Story
// Layer 3 (frames 36-50): About
const LAYERS = [
  {
    id: 'home',
    layerNum: 1,
    startFrame: 1,
    endFrame: 15,
    name: 'Home',
    stage: 'Home // Earth Departure Point',
    range: 'Frames 01 - 15',
    pillText: 'Layer 1: Home (Frames 01 - 15)',
    actionHint: 'Scroll to enter Story',
  },
  {
    id: 'story',
    layerNum: 2,
    startFrame: 16,
    endFrame: 35,
    name: 'Story',
    stage: 'Story // Moon & Mars Sentinels',
    range: 'Frames 16 - 35',
    pillText: 'Layer 2: Story (Frames 16 - 35)',
    actionHint: 'Scroll to enter About Us',
  },
  {
    id: 'about',
    layerNum: 3,
    startFrame: 36,
    endFrame: 50,
    name: 'About Us',
    stage: 'About Us // Interstellar Deep Space',
    range: 'Frames 36 - 50',
    pillText: 'Layer 3: About Us (Frames 36 - 50)',
    actionHint: 'Deep Space Horizon reached',
  },
];

export default function CosmicCanvasHero({ onSectionChange }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [activeLayer, setActiveLayer] = useState(LAYERS[0]);
  const [isReady, setIsReady] = useState(false);

  // Preload all 50 frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/Sequence/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Draw frame on canvas with aspect ratio preservation
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Cover math (preserving 16:9 without distortion)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Resize canvas to match screen dimensions with devicePixelRatio
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    renderFrame(currentFrame);
  }, [currentFrame, renderFrame]);

  useEffect(() => {
    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Scroll handler mapping scroll position to frame 1 - 50
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const frame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
      setCurrentFrame(frame);

      // Determine active layer:
      // Layer 1 (frames 1-15) = Home
      // Layer 2 (frames 16-35) = Story
      // Layer 3 (frames 36-50) = About
      let newLayer = LAYERS[0];
      if (frame >= 36) {
        newLayer = LAYERS[2];
      } else if (frame >= 16) {
        newLayer = LAYERS[1];
      } else {
        newLayer = LAYERS[0];
      }

      setActiveLayer(newLayer);
      if (onSectionChange) {
        onSectionChange(newLayer.id);
      }

      renderFrame(frame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderFrame, onSectionChange]);

  const progressPercent = Math.round((currentFrame / TOTAL_FRAMES) * 100);

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-[#030712]">
      {/* Invisible Navigation Anchors for exact frame jump */}
      <div id="home" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />
      <div id="story" className="absolute top-[31%] left-0 w-full h-1 pointer-events-none" />
      <div id="about" className="absolute top-[71%] left-0 w-full h-1 pointer-events-none" />

      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300"
        />

        {/* Loading Overlay */}
        {!isReady && (
          <div className="absolute inset-0 z-30 bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-white tracking-wider font-sans mb-1">
              INITIALIZING COSMIC TELEMETRY
            </h3>
            <p className="text-sm text-cyan-400 font-mono">
              Loading 5K frames: {loadedCount} / {TOTAL_FRAMES} ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
            </p>
          </div>
        )}

        {/* Top HUD Telemetry Bar */}
        <div className="relative z-10 pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wide uppercase font-semibold">Mission Telemetry</span>
            <span className="text-slate-500">|</span>
            <span>FRAME {String(currentFrame).padStart(2, '0')}/50</span>
            <span className="text-slate-500">|</span>
            <span>{progressPercent}%</span>
          </div>

          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-mono text-slate-300 pointer-events-auto">
            <Orbit className="w-3.5 h-3.5 text-amber-400" />
            <span>CURRENT SECTOR:</span>
            <span className="text-amber-300 font-semibold uppercase">{activeLayer.stage}</span>
          </div>
        </div>

        {/* Subtle Bottom Section Indicator & Scroll Prompt */}
        <div className="relative z-10 pb-8 px-4 flex items-center justify-center pointer-events-none">
          <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 pointer-events-auto">
            <span className="font-semibold text-white uppercase">{activeLayer.pillText}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">{activeLayer.actionHint}</span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
