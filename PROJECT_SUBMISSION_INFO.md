# NASA Space Apps Challenge 2026 — Project Submission Information

This document contains the exact details required to complete the **Project Information** form for the NASA Space Apps Challenge submission.

---

## 1. Project Name
```text
Silent Sentinels
```
> **Alternative / Full Title (if needed):**
> `Silent Sentinels - NASA's Forgotten Hardware on Alien Worlds`

---

## 2. NASA Space Apps Challenge Category (from the 2026 site)
Select this challenge from the dropdown list:
```text
Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars
```
*(Note: If the dropdown categorizes challenges into broad thematic buckets, choose **Arts & Humanities**, **Storytelling / Education**, or **Planetary Science / Exploration**).*

---

## 3. Team URL on NASA's Global Website
Replace `<your-team-slug>` with the exact link from your team page on [spaceappschallenge.org](https://www.spaceappschallenge.org):
```text
https://www.spaceappschallenge.org/2026/find-a-team/<your-team-name>/
```
> **How to find it:**
> 1. Log in to [spaceappschallenge.org](https://www.spaceappschallenge.org).
> 2. Click on **My Team** / your user profile.
> 3. Copy the URL from your browser address bar.

---

## 4. Project Description

### Standard / Recommended Description (Rich & Impactful)
```text
Silent Sentinels is an immersive, interactive storytelling and educational web platform that re-envisions NASA’s dormant and discarded robotic equipment on the Moon and Mars not as abandoned debris, but as monumental milestones in humanity’s journey across the solar system. Designed for students, educators, and space enthusiasts, it features an interactive planetary atlas, mission telemetry timelines, authentic frame-by-frame visual scrubbing, audio logs, and historical narratives—spotlighting how historic hardware (such as Apollo descent stages, Surveyor 3, and the Opportunity & Spirit rovers) made groundbreaking science possible.
```

### Short Description (If tight character limit applies)
```text
Silent Sentinels transforms NASA’s catalog of dormant robotic equipment on the Moon and Mars into an interactive educational storytelling platform. Featuring an interactive planetary atlas, authentic visual scrubbers, telemetry data, and multimedia mission logs, it celebrates the legacy and scientific breakthroughs of humanity's off-world explorers.
```

---

## 5. NASA Data Sources Used
```text
NASA Planetary Data System (PDS), NASA Solar System Treks (Moon Trek & Mars Trek), NASA Image and Video Library API (images-api.nasa.gov), NASA Open Data Portal (data.nasa.gov), and the Apollo Lunar Surface Journal (ALSJ).
```

### Specific Datasets Referenced in Codebase:
- **PDS Lunar Geosciences:** `PDS-GEO-A11-LSR-V1.0`, `PDS-GEO-A12-ALSEP-PSE-V1.0`, `PDS-GEO-SURVEYOR-3-SOIL`
- **PDS Mars Geosciences:** `PDS-GEO-MER1-MB-EDR-V1.0` (Spirit), `PDS-GEO-MER2-APXS-EDR-V1.0` (Opportunity)
- **NASA Open APIs:** `https://images-api.nasa.gov` (Mission photo archives & telemetry imagery)
- **NASA GIS / Treks:** `https://trek.nasa.gov` (Planetary surface coordinate mapping)

---

## Additional Submission Reference Info
- **Repository URL:** `https://github.com/PhanTomXblade/Nasa_space.git`
- **Target Audience:** School-age students (Grades 4–12), educators, and planetary science enthusiasts.
- **Key Technologies:** React, Vite, Tailwind CSS, MapLibre GL, Web Audio API (NASA Quindar tone synthesizer).
