import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import * as pmtiles from 'pmtiles';
import { Compass, ZoomIn, ZoomOut, Maximize2, Layers, Search, Filter } from 'lucide-react';

// Register PMTiles protocol once globally
try {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);
} catch (e) {
  // Protocol already added or handled
}

// NASA & USGS Open Planetary Tile Endpoints
// Using single CartoCDN OPM source per planet (confirmed working, no CORS issues)
// Previously having BOTH CartoCDN + trek.nasa.gov caused the blur (both rendered simultaneously)
const PLANETARY_SOURCES = {
  Moon: {
    name: 'Moon (Lunar Surface)',
    // OpenPlanetary Moon basemap – NASA LRO data, hosted via CartoCDN (CORS-safe, confirmed working)
    tiles: [
      'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png'
    ],
    attribution: 'NASA / GSFC / ASU / USGS Astrogeology | OpenPlanetary Moon Basemap (LRO)',
    center: [0, 10],
    zoom: 1.8,
    minZoom: 0,
    maxZoom: 8
  },
  Mars: {
    name: 'Mars (Red Planet)',
    // OpenPlanetary Mars basemap – NASA Viking data, hosted via CartoCDN (CORS-safe, confirmed working)
    tiles: [
      'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-1/all/{z}/{x}/{y}.png'
    ],
    attribution: 'NASA / JPL-Caltech / USGS Astrogeology | OpenPlanetary Mars Basemap (Viking)',
    center: [0, 15],
    zoom: 1.8,
    minZoom: 0,
    maxZoom: 8
  }
};

export default function PlanetaryMap({
  selectedBody,
  onBodyChange,
  artifacts,
  currentYear,
  selectedObject,
  onSelectObject,
  onFlyToCoord
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'rover', 'lander', 'impact'
  const [searchQuery, setSearchQuery] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [bearing, setBearing] = useState(0);

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const bodyConfig = PLANETARY_SOURCES[selectedBody];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'planetary-tiles': {
            type: 'raster',
            tiles: bodyConfig.tiles,
            tileSize: 256,
            attribution: bodyConfig.attribution,
            maxzoom: bodyConfig.maxZoom // 8 - prevents tile 404s from source
          }
        },
        layers: [
          {
            id: 'planetary-layer',
            type: 'raster',
            source: 'planetary-tiles',
            minzoom: 0,
            maxzoom: 22, // allow continuous overzoom
            paint: {
              'raster-resampling': 'linear'
            }
          }
        ]
      },
      center: bodyConfig.center,
      zoom: bodyConfig.zoom,
      minZoom: 1,
      maxZoom: 14, // allow zooming in up to level 14
      renderWorldCopies: false,
      attributionControl: false,
      cooperativeGestures: true
    });

    map.on('load', () => {
      setMapLoaded(true);
    });

    map.on('rotate', () => {
      setBearing(Math.round(map.getBearing()));
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, [selectedBody]);

  // Auto-resize MapLibre GL whenever container dimensions change (e.g. sidebar toggle)
  useEffect(() => {
    if (!mapContainerRef.current || !mapLoaded) return;
    const ro = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    });
    ro.observe(mapContainerRef.current);
    return () => ro.disconnect();
  }, [mapLoaded]);

  // Update Markers whenever artifacts, year, or filter changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Filter features
    const visibleFeatures = artifacts.features.filter((f) => {
      const p = f.properties;
      const matchesYear = p.year <= currentYear;
      const matchesType = activeFilter === 'all' || p.type === activeFilter;
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mission.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesYear && matchesType && matchesSearch;
    });

    visibleFeatures.forEach((feature) => {
      const p = feature.properties;
      const coords = feature.geometry.coordinates;
      const isSelected = selectedObject?.properties?.id === p.id;

      // Custom DOM Marker element
      const el = document.createElement('div');
      el.className = 'group relative cursor-pointer select-none';

      // Pulse color based on planet / type
      const isRover = p.type === 'rover';
      const isLander = p.type === 'lander';
      const pulseColor = isRover
        ? 'rgba(52, 211, 153, 0.8)' // emerald
        : isLander
        ? 'rgba(56, 189, 248, 0.8)' // cyan
        : 'rgba(251, 191, 36, 0.8)'; // amber

      // Only animate radar pulse for the selected marker or on hover to preserve mobile GPU framerate
      const pulseHtml = isSelected
        ? `<div class="absolute w-10 h-10 rounded-full animate-ping opacity-75" style="background-color: ${pulseColor};"></div>`
        : `<div class="absolute w-8 h-8 rounded-full opacity-25 group-hover:animate-ping transition-opacity" style="background-color: ${pulseColor};"></div>`;

      el.innerHTML = `
        <div class="relative flex items-center justify-center">
          <!-- Radar Pulse (Active on selected or hover only) -->
          ${pulseHtml}
          
          <!-- Inner Core Marker Badge -->
          <div class="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-300 ${
            isSelected
              ? 'scale-125 border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.9)]'
              : 'border-emerald-400/80 bg-black/85 text-emerald-300 hover:scale-115 hover:border-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
          }">
            <span class="text-xs">${isRover ? '🏎️' : isLander ? '📡' : '💥'}</span>
          </div>

          <!-- Hover Tooltip -->
          <div class="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30 whitespace-nowrap">
            <div class="px-2.5 py-1 rounded-lg bg-black/90 border border-emerald-500/40 text-[10px] font-mono text-white shadow-xl backdrop-blur-md">
              <span class="font-bold text-emerald-400 block">${p.name}</span>
              <span class="text-slate-300 text-[9px]">${p.landingDate} • ${p.coordinatesFormatted}</span>
            </div>
            <div class="w-1.5 h-1.5 bg-black/90 rotate-45 -mt-0.5 border-r border-b border-emerald-500/40"></div>
          </div>
        </div>
      `;

      el.addEventListener('click', () => {
        onSelectObject(feature);
        map.flyTo({
          center: coords,
          zoom: Math.max(map.getZoom(), 4.2),
          speed: 1.2,
          curve: 1.4,
          essential: true
        });
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(coords)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [artifacts, currentYear, activeFilter, searchQuery, selectedObject, mapLoaded, onSelectObject]);

  // Support External FlyTo Calls
  useEffect(() => {
    if (onFlyToCoord && mapRef.current) {
      mapRef.current.flyTo({
        center: onFlyToCoord,
        zoom: 4.5,
        speed: 1.2,
        curve: 1.4,
        essential: true
      });
    }
  }, [onFlyToCoord]);

  // Map Navigation Actions
  const handleZoomIn = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!mapRef.current) return;
    mapRef.current.zoomIn({ duration: 300 });
  };

  const handleZoomOut = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!mapRef.current) return;
    mapRef.current.zoomOut({ duration: 300 });
  };

  const handleResetNorth = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const map = mapRef.current;
    if (!map) return;
    const bodyConfig = PLANETARY_SOURCES[selectedBody];

    // If rotated or tilted, reset bearing and pitch back to 0
    if (Math.abs(map.getBearing()) > 0.5 || Math.abs(map.getPitch()) > 0.5) {
      map.resetNorthPitch({ duration: 500 });
    } else {
      // If already facing north, reset camera to whole planet overview
      map.flyTo({
        center: bodyConfig.center,
        zoom: bodyConfig.zoom,
        bearing: 0,
        pitch: 0,
        duration: 800,
        essential: true
      });
    }
  };

  return (
    <div className="relative w-full h-[500px] xs:h-[580px] sm:h-[660px] lg:h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] bg-[#030712]">
      {/* MapLibre WebGL Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Floating Control Deck */}
      <div className="absolute top-3 xs:top-4 left-3 xs:left-4 right-3 xs:right-4 z-20 flex flex-wrap items-center justify-between gap-2 xs:gap-3 pointer-events-none">
        
        {/* Planet Toggle: Moon vs Mars */}
        <div className="pointer-events-auto flex items-center p-0.5 xs:p-1 rounded-xl xs:rounded-2xl bg-black/80 backdrop-blur-xl border border-emerald-500/30 shadow-2xl">
          <button
            onClick={() => onBodyChange('Moon')}
            className={`px-2.5 xs:px-4 py-1.5 xs:py-2 rounded-lg xs:rounded-xl text-[10px] xs:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-1 xs:space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              selectedBody === 'Moon'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-200/10 text-amber-200 border border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌕</span>
            <span>Moon</span>
          </button>

          <button
            onClick={() => onBodyChange('Mars')}
            className={`px-2.5 xs:px-4 py-1.5 xs:py-2 rounded-lg xs:rounded-xl text-[10px] xs:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-1 xs:space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              selectedBody === 'Mars'
                ? 'bg-gradient-to-r from-rose-500/20 to-red-400/10 text-rose-200 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔴</span>
            <span>Mars</span>
          </button>
        </div>

        {/* Quick Search & Filter HUD */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${selectedBody}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 xs:pl-8 pr-2.5 xs:pr-3 py-1.5 w-28 xs:w-36 sm:w-56 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-[11px] xs:text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all"
            />
          </div>

          {/* Type Filter Pills */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-slate-300">
            {['all', 'rover', 'lander'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  activeFilter === type
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All Types' : type + 's'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Map Navigation Widget (Right) */}
      <div className="absolute top-18 xs:top-20 right-2.5 sm:right-4 z-20 flex flex-col space-y-1.5 pointer-events-auto select-none">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 xs:w-9 xs:h-9 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all flex items-center justify-center cursor-pointer shadow-lg group"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 xs:w-9 xs:h-9 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all flex items-center justify-center cursor-pointer shadow-lg group"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={handleResetNorth}
          className="w-8 h-8 xs:w-9 xs:h-9 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all flex items-center justify-center cursor-pointer shadow-lg group"
          title={Math.abs(bearing) > 1 ? "Reset North Bearing" : "Reset Planet Overview"}
          aria-label="Reset Orientation or Overview"
        >
          <Compass
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
            style={{ transform: `rotate(${-bearing}deg)` }}
          />
        </button>
      </div>
    </div>
  );
}
