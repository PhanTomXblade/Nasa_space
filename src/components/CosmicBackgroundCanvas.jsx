import React, { useRef, useEffect, useState, useCallback } from 'react';

const TOTAL_FRAMES = 50;

/**
 * CosmicBackgroundCanvas
 * Fixed fullscreen 5K canvas that smoothly transitions across:
 * - Home section: Frames 1 - 15 (Earth Departure)
 * - Story section: Frames 16 - 35 (Moon & Mars Orbit)
 * - About section: Frames 36 - 50 (Galactic Horizon / Deep Space)
 * 
 * Features physics-based lerp interpolation & sub-frame cross-fading for liquid video motion.
 */
export default function CosmicBackgroundCanvas({ currentSection }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameIdRef = useRef(null);

  // Smooth lerp state
  const targetFrameRef = useRef(1);
  const renderedFrameRef = useRef(1);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload all 50 5K frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/Sequence/ezgif-frame-${frameNum}.jpg`;

      const onLoad = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };

      img.onload = onLoad;
      img.onerror = onLoad;
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Canvas drawing with sub-frame cross-fade for seamless video transition
  const drawFrame = useCallback((frameFloat) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(frameFloat)));
    const nextIndex = Math.min(TOTAL_FRAMES, baseIndex + 1);
    const fraction = frameFloat - Math.floor(frameFloat);

    const img1 = imagesRef.current[baseIndex - 1];
    const img2 = imagesRef.current[nextIndex - 1];

    if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Aspect-ratio cover math
    const imgRatio = img1.naturalWidth / img1.naturalHeight;
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

    // Base frame
    ctx.globalAlpha = 1;
    ctx.drawImage(img1, offsetX, offsetY, drawWidth, drawHeight);

    // Cross-fade with next frame if interpolating
    if (fraction > 0.01 && img2 && img2.complete && img2.naturalWidth > 0 && baseIndex !== nextIndex) {
      ctx.globalAlpha = fraction;
      ctx.drawImage(img2, offsetX, offsetY, drawWidth, drawHeight);
      ctx.globalAlpha = 1;
    }
  }, []);

  // Resize canvas with devicePixelRatio
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

    drawFrame(renderedFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Map scroll position across Home, Atlas, Story, and About
  // Home: Frames 1 - 12 (Earth Departure)
  // Atlas: Frames 13 - 26 (Moon & Mars Orbital Approach)
  // Story: Frames 27 - 40 (Planetary Surface & Artifacts)
  // About: Frames 41 - 50 (Galactic Horizon / Space Archaeology)
  useEffect(() => {
    const handleScroll = () => {
      const homeEl = document.getElementById('home');
      const atlasEl = document.getElementById('atlas');
      const storyEl = document.getElementById('story');
      const aboutEl = document.getElementById('about');

      if (!homeEl || !storyEl || !aboutEl) return;

      const scrollY = window.scrollY;
      const homeTop = homeEl.offsetTop;
      const storyTop = storyEl.offsetTop;
      const atlasTop = atlasEl ? atlasEl.offsetTop : storyTop * 0.4;
      const aboutTop = aboutEl.offsetTop;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;

      let targetFrame = 1;

      if (atlasEl && scrollY < atlasTop) {
        // Within Home section: Frames 1 to 12
        const progress = Math.max(0, Math.min(1, (scrollY - homeTop) / Math.max(1, atlasTop - homeTop)));
        targetFrame = 1 + progress * (12 - 1);
      } else if (scrollY < storyTop) {
        // Within Atlas section: Frames 13 to 26
        const progress = Math.max(0, Math.min(1, (scrollY - atlasTop) / Math.max(1, storyTop - atlasTop)));
        targetFrame = 13 + progress * (26 - 13);
      } else if (scrollY < aboutTop) {
        // Within Story section: Frames 27 to 40
        const progress = Math.max(0, Math.min(1, (scrollY - storyTop) / Math.max(1, aboutTop - storyTop)));
        targetFrame = 27 + progress * (40 - 27);
      } else {
        // Within About section: Frames 41 to 50
        const progress = Math.max(0, Math.min(1, (scrollY - aboutTop) / Math.max(1, totalDocHeight - aboutTop)));
        targetFrame = 41 + progress * (50 - 41);
      }

      targetFrameRef.current = Math.max(1, Math.min(TOTAL_FRAMES, targetFrame));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous animation loop for buttery smooth momentum lerping
  useEffect(() => {
    const tick = () => {
      const current = renderedFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.005) {
        // Smooth ease factor for liquid video feel
        renderedFrameRef.current = current + diff * 0.12;
        drawFrame(renderedFrameRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* 5K Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Loading Overlay */}
      {!isReady && (
        <div className="absolute inset-0 z-30 bg-[#030712] flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
          <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
          <h3 className="text-xl font-bold text-white tracking-wider font-sans mb-1">
            INITIALIZING COSMIC TELEMETRY
          </h3>
          <p className="text-sm text-cyan-400 font-mono">
            Loading 5K frames: {loadedCount} / {TOTAL_FRAMES} ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
          </p>
        </div>
      )}

      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />
    </div>
  );
}
