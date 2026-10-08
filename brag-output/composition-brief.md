# Hyperframes Composition Brief: Silent Sentinels

## Objective
Create a short, cinematic launch-style brag video for Silent Sentinels (NASA Space Apps Challenge 2026).

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds (30 fps, 600 frames)

## Source Material
- Project root: `e:/Nasa_space`
- Primary files read: `PRODUCT.md`, `index.html`, `src/App.jsx`, `src/index.css`, `src/components/HomeSection.jsx`, `src/components/PlanetaryAtlasSection.jsx`, `src/components/StorySection.jsx`, `src/data/mars-artifacts.json`, `src/data/moon-artifacts.json`
- Product name: Silent Sentinels
- Tagline / strongest claim: "Before humans took their first steps on extraterrestrial soil, robotic scouts braved cosmic radiation and absolute zero to chart the unknown. Today, these pioneers stand as eternal monuments of human curiosity."
- Key UI or visual moment to recreate:
  - Official Mission Emblem (`/logo.png`)
  - Double-bezel frosted telemetry card architecture with radiant emerald halo
  - Real mission hardware dossiers (`/monuments/oppy-rover.jpg`, `/monuments/apollo-15-lrv.jpg`, `/monuments/surveyor-3.jpg`)
  - Precise lunar and martian coordinates (`1.9462° S, 354.4734° E`, `26.1322° N, 3.6339° E`)
- Copy that must appear verbatim:
  - "Silent Sentinels"
  - "Before humans walked on alien soil, robots went first."
  - "Abandoned on the Moon and Mars. But never forgotten."
  - "Opportunity Rover: Engineered for 90 days. Lived 15 years. 45.16 km marathon."
  - "Apollo Lunar Rover: Piano-wire tires. 90.2 km traverse. Cameras permanently facing Earth."
  - "Surveyor 3: The only robot touched by human astronauts on another world."
  - "Interactive Planetary Atlas & Field Telemetry"

## Creative Direction
- Tone preset: cinematic
- Creative direction: Epic planetary documentary launch — humanity's robotic monuments across alien worlds
- Interpretation: Deep space black contrast, slow deliberate camera drift, glowing starlight emerald badges, sharp telemetry typography, and high-impact reveals.
- Angle: Robotic hardware left on alien worlds is not abandoned space junk; it is an enduring network of heroic monuments.
- Hook (first 3.8s): The cosmic void and radar telemetry ping: "BEFORE HUMANS WALKED ON ALIEN SOIL... ROBOTS WENT FIRST."
- Outro / punchline (15.5s - 20s): "THEY NEVER CAME HOME. BUT THEY WILL NEVER BE FORGOTTEN."
- Avoid:
  - Generic SaaS or corporate marketing buzzwords
  - Abstract filler graphics or stock shapes
  - Fast unreadable text flashes

## Visual Identity
- Background: `#030712`
- Text: `#ffffff` / `#f1f5f9`
- Accent: `#34d399` (Emerald), `#22d3ee` (Cyan), `#fb923c` (Mars Amber)
- Display font: Space Grotesk
- Body font: Plus Jakarta Sans
- Monospace font: JetBrains Mono
- Visual references from the project: Double-bezel glass container, emerald aurora mesh background, NASA Solar System Treks telemetry badges, high-resolution mission photos from `/public/monuments/`.

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract:
1. Scene 1 (0.0s - 3.8s): The Void Hook — Telemetry crosshairs, space coordinates, and the opening statement.
2. Scene 2 (3.8s - 9.0s): The Monument Archive — Official mission emblem reveal, radiant typography, and the three planetary chapters. (Beat-locked reveal at 8.74s).
3. Scene 3 (9.0s - 15.5s): The Robotic Pioneers — 3 real hardware dossiers with mission photos, telemetry stats, and legendary accomplishments. (Beat-locked at 13.11s).
4. Scene 4 (15.5s - 20.0s): The Eternal Watch — Full emblem lock, closing tribute, and call to explore the live Planetary Atlas. (Beat-locked bell at 17.47s).

## Audio
- Audio role: Cinematic support with electronic pulse and authentic mission radio telemetry.
- Audio arc: Quiet atmospheric void with Quindar ping builds into a driving rhythmic pulse, swells during hardware achievements, and resolves into a reverent bell ring.
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: Plays across the entire 20.0s timeline at 0.35 volume, fading out smoothly between 19.0s and 20.0s.
- Music cue guidance:
  - Strong cues: 8.74s (Scene 2 lock), 13.11s (Scene 3 climax), 17.47s (Scene 4 emblem impact).
  - Beat-grid for sequential reveals: 9.29s, 11.46s, 13.64s.
- Audio-reactive treatment: Subtle; cosmic starfield and emerald aurora breathe gently with music RMS energy.
- SFX files:
  - `assets/sfx/impact/impactSoft_medium_001.ogg` (Scene 2 title arrival)
  - `assets/sfx/interface/drop_001.ogg` (Scene 3 hardware cards)
  - `assets/sfx/impact/impactBell_heavy_000.ogg` (Scene 4 final emblem lock at 17.47s)

## Hyperframes Instructions
- Composition directory: `brag-output/composition/`
- Use local assets copied into `brag-output/composition/assets/`.
- Ensure all text passes WCAG AA contrast and satisfies reading floors.
- Use CSS and requestAnimationFrame / native timing or GSAP for frame-accurate rendering.
- Check with `npx hyperframes check` before rendering to `brag-output/brag.mp4`.
