# Silent Sentinels

> **NASA Space Apps Challenge 2026**  
> **Challenge:** Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars

---

## About the Project

**Silent Sentinels** is an immersive, interactive storytelling and educational web platform that re-envisions NASA’s dormant robotic equipment on the Moon and Mars not as abandoned debris, but as monumental milestones in humanity’s journey across the solar system.

Designed for students, educators, and space enthusiasts, the platform transforms raw mission telemetry, historical archives, and planetary cartography into a museum-grade interactive experience. It honors the engineering marvels and enduring scientific legacy of iconic hardware—including the Apollo Lunar Roving Vehicles and descent stages, Surveyor 3, Viking 1, the Opportunity and Spirit rovers, and the InSight lander.

### Key Highlights

* **Interactive Planetary Atlas:** Explore accurate landing site coordinates on the Moon and Mars through an interactive, tile-rendered planetary cartography system.
* **Tactile Frame-by-Frame Scrubber:** An interactive canvas scrubber providing fluid, frame-by-frame visual scrubbing of authentic mission sequences and terrain transitions.
* **Episodic Mission Storytelling:** Rich, museum-grade narrative dossiers covering critical mission arcs, engineering triumphs, final transmissions, and groundbreaking discoveries.
* **Authentic Audio Synthesizer:** Real-time generation of authentic NASA Quindar communication beeps and atmospheric radio telemetry tones using native web audio synthesis.
* **Classroom & Kiosk Ready:** Engineered for zero-scroll jank, high visual fidelity, full responsive accessibility, and offline capability for museum displays and educational settings.

---

## Technologies Used

### Frontend & Core Architecture
* **React 18** — Component-driven reactive UI architecture.
* **Vite** — Next-generation frontend build tooling and development server.
* **Tailwind CSS & PostCSS** — Utility-first styling for dark-space aesthetic, typography, and responsive layouts.
* **Lucide React** — Minimalist technical iconography.

### Planetary Mapping & GIS
* **MapLibre GL** — Open-source GPU-accelerated planetary map rendering.
* **PMTiles** — Cloud-optimized planetary tile archive handling.
* **NASA Solar System Treks** — Cartographic surface tiles and coordinate basemaps (Moon Trek & Mars Trek).

### Graphics, Canvas & Audio
* **HTML5 Canvas API** — Custom 60fps cosmic starfield particle engine and interactive frame sequence scrubber.
* **Web Audio API** — Native synthesis of NASA Quindar radio communications and telemetry frequency tones without external audio file dependencies.
* **Sharp** — Server-side image optimization pipeline for mission imagery and frame sequences.

### Offline & Performance
* **Vite Plugin PWA & Workbox** — Progressive Web App architecture, service worker offline asset caching, and offline status handling.
* **Intersection Observer API** — Native browser compositor-driven section detection for smooth, non-blocking navigation.

### NASA Data Sources & Open APIs
* **NASA Planetary Data System (PDS):** Geosciences datasets for lunar and martian exploration (`PDS-GEO-A11-LSR`, `PDS-GEO-SURVEYOR-3-SOIL`, `PDS-GEO-MER1-MB`, `PDS-GEO-MER2-APXS`).
* **NASA Solar System Treks GIS:** Planetary coordinate layers and digital elevation mapping (`trek.nasa.gov`).
* **NASA Image and Video Library API:** Official public archive imagery and historical mission photography (`images-api.nasa.gov`).
* **NASA Open Data Portal:** Telemetry data, mission logs, and landing coordinates (`data.nasa.gov`).
* **Apollo Lunar Surface Journal (ALSJ):** Primary source transcripts, debriefing logs, and astronaut field reports.
