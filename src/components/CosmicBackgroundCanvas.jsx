import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, Compass, Zap } from 'lucide-react';

const TOTAL_FRAMES = 238;
const INITIAL_READY_FRAMES = 12; // Unblock UI once first 12 frames are buffered
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS; // ~41.667 ms per frame

// Detect mobile once at module level for consistent branching
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

/**
 * CosmicBackgroundCanvas
 * 
 * Cinematic 24 FPS Cosmic Background across all 238 frames in /SequenceF/:
 * - Frames 1 - 60: Earth Close-up & Ascent
 * - Frames 61 - 125: Full Solar System Alignment (All 8 planets + Sun & Moon)
 * - Frames 126 - 190: Milky Way Spiral Arms emergence
 * - Frames 191 - 238: Deep Space Panoramic Galaxy
 * 
 * Playback Modes Supported:
 * 1. Hybrid (Default): Autoplays at 24 FPS when idle so the background is always alive;
 *    scrubs forward/backward when the user scrolls!
 * 2. Scroll Scrub Only: Strictly locked to scroll position.
 * 3. Continuous 24 FPS Autoplay: Loops seamlessly as a 24 FPS live cosmic video.
 * 
 * Mobile Performance Optimizations:
 * - IntersectionObserver pauses animation loop when canvas is fully occluded
 * - DPR capped to 1.0 on mobile (avoids supersampling 238 frames at 3x)
 * - cosmic-frame-tick only dispatched when integer frame actually changes
 */
export default function CosmicBackgroundCanvas({
  currentSection,
  playbackMode = 'hybrid',
  onPlaybackModeChange
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  // Local state for UI buffering & readiness
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Animation values
  const currentFrameRef = useRef(1);
  const scrollTargetFrameRef = useRef(1);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Visibility tracking: pause rAF loop when canvas is fully off-screen
  const isVisibleRef = useRef(true);
  // Track last dispatched integer frame to avoid redundant DOM events
  const lastDispatchedFrameRef = useRef(0);

  // Helper to find closest available loaded frame (Guarantees zero blank screen)
  const getBestImage = useCallback((frameFloat) => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return null;

    const targetIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameFloat)));

    // 1. Check exact requested frame
    const exact = images[targetIndex - 1];
    if (exact && exact.complete && exact.naturalWidth > 0) {
      return exact;
    }

    // 2. Search outward for closest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prevIndex = targetIndex - offset;
      if (prevIndex >= 1) {
        const prevImg = images[prevIndex - 1];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          return prevImg;
        }
      }
      const nextIndex = targetIndex + offset;
      if (nextIndex <= TOTAL_FRAMES) {
        const nextImg = images[nextIndex - 1];
        if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
          return nextImg;
        }
      }
    }

    return null;
  }, []);

  // 1. Canvas Frame Drawing
  const drawFrame = useCallback((frameFloat) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

    const img = getBestImage(frameFloat);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    // Aspect-ratio cover math in native buffer coordinates
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = cw;
      drawHeight = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawHeight) / 2;
    } else {
      drawHeight = ch;
      drawWidth = ch * imgRatio;
      offsetX = (cw - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [getBestImage]);

  // 2. Preload all 238 WebP frames immediately in parallel
  useEffect(() => {
    let isMounted = true;
    const loadedImages = new Array(TOTAL_FRAMES);
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      const frameNum = String(i).padStart(3, '0');
      img.src = `/SequenceF/ezgif-frame-${frameNum}.webp`;

      const onLoad = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);

        if (count >= INITIAL_READY_FRAMES) {
          setIsReady(true);
        }

        // If newly loaded frame matches current position, draw it
        const currentInt = Math.round(currentFrameRef.current);
        if (Math.abs(currentInt - i) <= 1) {
          drawFrame(currentFrameRef.current);
        }
      };

      img.onload = onLoad;
      img.onerror = onLoad;
      loadedImages[i - 1] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // 3. Canvas Buffer Sizing (DPR capped to 1.0 on mobile to save GPU fill-rate)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Mobile: lock to 1.0 DPR to avoid supersampling 238 frames on a 3x Retina phone
    // Desktop: allow up to 1.25 DPR for crisp rendering
    const dpr = IS_MOBILE ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // 3b. IntersectionObserver: pause canvas rAF when fully occluded by content sections
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 } // consider visible if even 5% is showing
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 4. Locked 24 FPS Animation Loop (pauses when canvas is not visible)
  useEffect(() => {
    let isCancelled = false;
    lastFrameTimeRef.current = performance.now();

    const tick = (timestamp) => {
      if (isCancelled) return;

      // Skip drawing entirely when the canvas is fully off-screen
      // This saves significant CPU/GPU on mobile when user is deep in Story/About
      if (!isVisibleRef.current) {
        animFrameIdRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed >= FRAME_INTERVAL) {
        lastFrameTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);

        if (playbackMode === 'autoplay') {
          // Continuous looping 24 FPS cosmic playback
          currentFrameRef.current += 1;
          if (currentFrameRef.current > TOTAL_FRAMES) {
            currentFrameRef.current = 1;
          }
          drawFrame(currentFrameRef.current);
        } else if (playbackMode === 'scroll') {
          // Pure scroll-driven scrubbing
          const target = scrollTargetFrameRef.current;
          const current = currentFrameRef.current;
          const diff = target - current;

          if (Math.abs(diff) > 0.05) {
            currentFrameRef.current = current + diff * 0.25;
            drawFrame(currentFrameRef.current);
          }
        } else {
          // Hybrid mode:
          // If actively scrolling, lerp smoothly to scroll target.
          // If idle, slowly advance frame at 24 FPS ambient speed!
          if (isUserScrollingRef.current) {
            const target = scrollTargetFrameRef.current;
            const current = currentFrameRef.current;
            const diff = target - current;

            currentFrameRef.current = current + diff * 0.28;
            drawFrame(currentFrameRef.current);
          } else {
            // Ambient idle playback (1 frame every tick at 24fps)
            currentFrameRef.current += 0.5; // gentle ambient pace
            if (currentFrameRef.current > TOTAL_FRAMES) {
              currentFrameRef.current = 1;
            }
            drawFrame(currentFrameRef.current);
          }
        }

        // Notify Navbar telemetry HUD of active frame
        // Only dispatch when the integer frame actually changes to avoid
        // firing 24 redundant DOM events per second on mobile
        const currentInt = Math.round(currentFrameRef.current);
        if (currentInt !== lastDispatchedFrameRef.current) {
          lastDispatchedFrameRef.current = currentInt;
          window.dispatchEvent(new CustomEvent('cosmic-frame-tick', {
            detail: { frame: currentInt }
          }));
        }
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [playbackMode, drawFrame]);

  // 5. Scroll Position Tracking across the Entire Page
  useEffect(() => {
    const handleScroll = () => {
      isUserScrollingRef.current = true;

      // Reset idle timer after user stops scrolling
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 1200);

      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      // Smooth continuous global progress across all 238 frames
      const globalProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
      const targetFrame = 1 + globalProgress * (TOTAL_FRAMES - 1);

      scrollTargetFrameRef.current = Math.max(1, Math.min(TOTAL_FRAMES, targetFrame));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Section Description helper
  const getSectionPhase = (frame) => {
    if (frame <= 60) return 'PHASE 1: EARTH DEPARTURE & ASCENT';
    if (frame <= 125) return 'PHASE 2: SOLAR SYSTEM ALIGNMENT';
    if (frame <= 190) return 'PHASE 3: MILKY WAY SPIRAL ARMS';
    return 'PHASE 4: DEEP COSMOS HORIZON';
  };

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* 24 FPS Canvas */}
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
            Buffering frames: {loadedCount} / {TOTAL_FRAMES} ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
          </p>
        </div>
      )}

      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />
    </div>
  );
}
