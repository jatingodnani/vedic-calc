<div align="center">

# vedic-calc

### High-Precision Vedic Astrology (Jyotish) SDK for Node.js & TypeScript

<p>
  <a href="https://www.npmjs.com/package/vedic-calc"><img src="https://img.shields.io/npm/v/vedic-calc.svg?style=flat-square&color=CB3837" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/vedic-calc"><img src="https://img.shields.io/npm/dm/vedic-calc.svg?style=flat-square&color=blue" alt="npm downloads"></a>
  <a href="https://github.com/jatingodnani/vedic-calc/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vedic-calc.svg?style=flat-square&color=green" alt="MIT License"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-%3E%3D16-339933?style=flat-square&logo=node.js" alt="Node.js"></a>
</p>

<p>
  Generate <strong>Rasi (D-1)</strong> & <strong>Navamsa (D-9)</strong> charts &middot; <strong>Vimshottari Dasha</strong> Timeline &middot; <strong>9 Planets</strong> &middot; <strong>27 Nakshatras</strong> &middot; <strong>SVG Rendering</strong> &middot; <strong>Swiss Ephemeris precision</strong>
</p>

</div>

---

## Table of Contents

- [Why vedic-calc?](#why-vedic-calc)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
  - [generateKundali](#generatekundalidate-latitude-longitude-timezone-options)
  - [generateRasiChart](#generaterasichartdate-latitude-longitude-timezone-nodetype)
  - [generateNavamsaChart](#generatenavamsachartrasichart)
  - [getVimshottariDasha](#getvimshottaridasharasi)
  - [generateNorthIndianChartSVG](#generatenorthindianchartssvgchart-options)
  - [Constants & Enums](#constants--enums)
- [SVG Chart Options](#svg-chart-options)
- [Usage Examples](#usage-examples)
  - [Basic Kundali](#1-basic-kundali)
  - [Calculate Vimshottari Dasha](#2-calculate-vimshottari-dasha)
  - [Save SVG to File](#3-save-svg-to-file)
  - [Embed in HTML](#4-embed-in-html)
  - [Express.js API](#5-expressjs-api-endpoint)
  - [Next.js / React](#6-nextjs--react)
- [TypeScript Types](#typescript-types)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Why vedic-calc?

Most astrology libraries are either Western-focused, inaccurate, or lack developer-friendly APIs. **vedic-calc** is built specifically for **Vedic (Jyotish) astrology** with:

- **NASA-grade precision** via Swiss Ephemeris (same engine used by AstroSage, Astro.com)
- **Developer-first API** — one function call to get a complete Kundali
- **Built-in SVG rendering** — no external charting libraries needed
- **Zero config** — ephemeris data files bundled in the package
- **Full TypeScript support** — complete type definitions included

---

## Features

| Feature | Details |
|-------------------------|--------------------------------------------------------------|
| **Rasi Chart (D-1)** | Complete birth chart with all 9 planets in 12 signs |
| **Navamsa Chart (D-9)** | Divisional chart for marriage & spiritual analysis |
| **Vimshottari Dasha** | Full 120-year chronological timeline & sub-periods |
| **9 Planets** | Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu |
| **12 Houses** | Whole Sign house system (traditional Vedic method) |
| **27 Nakshatras** | Full nakshatra name, pada (1–4), and nakshatra lord |
| **Ascendant (Lagna)** | Precise Lagna with sign, nakshatra, and pada |
| **Retrograde Detection** | Automatically detects and flags retrograde planets |
| **Lahiri Ayanamsa** | Industry-standard Chitrapaksha ayanamsa |
| **True / Mean Node** | Choose between True Node or Mean Node for Rahu/Ketu |
| **SVG Chart Rendering** | North Indian diamond-grid style chart |
| **Planet Details Table** | Inline SVG table with sign, degree, nakshatra, house |
| **TypeScript** | Full `.d.ts` type definitions included |

---

## Installation

```bash
npm install vedic-calc
```

```bash
yarn add vedic-calc
```

```bash
pnpm add vedic-calc
```

> **Requirements:** Node.js >= 16.0.0

---

## Quick Start

```typescript
import { generateKundali, generateNorthIndianChartSVG, Planet } from 'vedic-calc';

// One call to get both Rasi + Navamsa charts
const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'), // Date & time of birth
  16.5449,                                // Latitude
  81.5212,                                // Longitude
  'Asia/Kolkata'                          // Timezone
);

// Ascendant (Lagna)
console.log(`Ascendant: ${rasi.ascendant.signName} (${rasi.ascendant.nakshatra} Pada ${rasi.ascendant.nakshatraPada})`);

// All 9 planets
rasi.planets.forEach(p => {
  const retro = p.isRetrograde ? ' (R)' : '';
  console.log(`${Planet[p.planet]}: ${p.signName} ${p.degreeInSign.toFixed(2)} | ${p.nakshatra} Pada ${p.nakshatraPada} | House ${p.house}${retro}`);
});

// Generate SVG chart
const svg = generateNorthIndianChartSVG(rasi, { showTable: true });
```

**Sample Output:**
```
Ascendant: Virgo (Hasta Pada 2)
SUN:     Taurus  14.22 | Rohini Pada 2      | House 9
MOON:    Taurus   3.56 | Krittika Pada 3    | House 9
MARS:    Cancer  28.41 | Ashlesha Pada 4    | House 11
MERCURY: Aries   28.10 | Krittika Pada 1    | House 8
JUPITER: Cancer   9.88 | Pushya Pada 2      | House 11
VENUS:   Pisces  22.34 | Revati Pada 3      | House 7
SATURN:  Capricorn 4.12| Uttara Ashadha P 2 | House 5
RAHU:    Aquarius 18.55| Shatabhisha Pada 1 | House 6
KETU:    Leo     18.55 | Purva Phalguni P 1 | House 12
```

---

## Core Concepts

| Term | Meaning |
|------------------------|----------------------------------------------------------------------------|
| **Rasi (D-1)** | The main birth chart — shows planetary positions at the time of birth |
| **Navamsa (D-9)** | A divisional chart — each sign is divided into 9 parts; used for marriage & dharma |
| **Lagna (Ascendant)** | The rising sign at the time of birth — the most important point in the chart |
| **Nakshatra** | One of 27 lunar mansions (each 13°20') — gives deeper insight than just the sign |
| **Pada** | Each nakshatra is divided into 4 padas (quarters) of 3°20' each |
| **Ayanamsa** | The difference between Tropical and Sidereal zodiacs (~24° currently) |
| **Whole Sign Houses** | Traditional Vedic house system — each house = one complete zodiac sign |
| **Retrograde** | A planet appearing to move backward — considered significant in Jyotish |

---

## API Reference

### `generateKundali(date, latitude, longitude, timezone?, options?)`

The **all-in-one** function. Generates both Rasi and Navamsa charts in a single call.

```typescript
import { generateKundali, NodeType } from 'vedic-calc';

const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata',
  { nodeType: NodeType.TRUE_NODE } // optional: TRUE_NODE (default) or MEAN_NODE
);
```

| Parameter | Type | Required | Description |
|---------------------|----------|----------|--------------------------------------------------------------|
| `date` | `Date` | Yes | Birth date and time (use the local time with timezone offset) |
| `latitude` | `number` | Yes | Geographic latitude (-90 to +90) |
| `longitude` | `number` | Yes | Geographic longitude (-180 to +180) |
| `timezone` | `string` | No | IANA timezone string (default: `'UTC'`) |
| `options.nodeType` | `NodeType` | No | `TRUE_NODE` or `MEAN_NODE` for Rahu/Ketu (default: `TRUE_NODE`) |

**Returns:** `{ rasi: RasiChart, navamsa: NavamsaChart }`

---

### `generateRasiChart(date, latitude, longitude, timezone?, nodeType?)`

Generates only the Rasi (D-1) birth chart.

```typescript
import { generateRasiChart } from 'vedic-calc';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata'
);
```

**Returns:** `RasiChart` — see [TypeScript Types](#typescript-types) for full structure.

---

### `generateNavamsaChart(rasiChart)`

Generates the Navamsa (D-9) chart from an existing Rasi chart.

```typescript
import { generateRasiChart, generateNavamsaChart, Planet } from 'vedic-calc';

const rasi = generateRasiChart(date, lat, lon, tz);
const navamsa = generateNavamsaChart(rasi);

navamsa.planets.forEach(p => {
  console.log(`${Planet[p.planet]}: Navamsa Sign ${p.navamsaSignName}, House ${p.navamsaHouse}`);
});
```

---

### `getVimshottariDasha(rasi)`

Generates a complete 120-year timeline for a person natively calculating the Nakshatra Moon fractional balance at birth.

```typescript
import { getVimshottariDasha } from 'vedic-calc';

const timeline = getVimshottariDasha(rasi);

timeline.forEach(mahadasha => {
  console.log(`Mahadasha: ${mahadasha.planet} | Ends: ${mahadasha.end.toDateString()}`);
  
  mahadasha.antardashas.forEach(ad => {
     console.log(`  └─ Antardasha: ${ad.planet} | Ends: ${ad.end.toDateString()}`);
  });
});
```

**Returns:** `Mahadasha[]` — an array of `10` main planetary periods containing nested `antardasha` sub-periods.

---

### `generateNorthIndianChartSVG(chart, options?)`

Generates a **North Indian diamond-grid** style SVG chart.

```typescript
import { generateNorthIndianChartSVG } from 'vedic-calc';

const svg = generateNorthIndianChartSVG(rasi, {
  showTable: true,   // Show planet details table alongside the chart
  layout: 'row',     // 'row' (table beside chart) | 'column' (table below chart)
  width: 400,        // Chart width in px (default: 400)
  height: 300,       // Chart height in px (default: 300)
  tableWidth: 520,   // Width of the planet table (default: 520)
});
```

| Option | Type | Default | Description |
|--------------|---------------------|---------|-------------------------------|
| `showTable` | `boolean` | `true` | Show planet details table |
| `layout` | `'row' \| 'column'` | `'row'` | Table position relative to chart |
| `width` | `number` | `400` | Chart SVG width in pixels |
| `height` | `number` | `300` | Chart SVG height in pixels |
| `tableWidth` | `number` | `520` | Planet table width in pixels |

**Returns:** `string` — a complete inline SVG string ready to embed in HTML or save as `.svg`.

---

### Constants & Enums

```typescript
import { Planet, Sign, NodeType, AyanamsaSystem } from 'vedic-calc';

// Planet enum
Planet.SUN       // 0
Planet.MOON      // 1
Planet.MARS      // 2
Planet.MERCURY   // 3
Planet.JUPITER   // 4
Planet.VENUS     // 5
Planet.SATURN    // 6
Planet.RAHU      // 7
Planet.KETU      // 8

// Sign enum
Sign.ARIES       // 0
Sign.TAURUS      // 1
Sign.GEMINI      // 2
Sign.CANCER      // 3
Sign.LEO         // 4
Sign.VIRGO       // 5
Sign.LIBRA       // 6
Sign.SCORPIO     // 7
Sign.SAGITTARIUS // 8
Sign.CAPRICORN   // 9
Sign.AQUARIUS    // 10
Sign.PISCES      // 11

// Node type for Rahu/Ketu
NodeType.TRUE_NODE  // Precise astronomical position (default)
NodeType.MEAN_NODE  // Smoothed/traditional position

// Ayanamsa systems
AyanamsaSystem.LAHIRI       // Chitrapaksha — most popular in India (default)
AyanamsaSystem.RAMAN        // Used in South India
AyanamsaSystem.KRISHNAMURTI // KP System
```

---

## SVG Chart Options

The generated SVG uses a clean **North Indian diamond-grid** layout with a white background and deep purple borders — inspired by AstroSage's professional style.

### Default Color Scheme

```typescript
const colors = {
  background: '#FFFFFF',
  border: '#422762',
  innerLines: '#422762',
  signNumber: '#422762',
  text: '#1A1A2E',
  retrograde: '#D63031',   // Red for retrograde planets
};
```

### Chart Layout Modes

**Row layout** (default) — table appears to the right of the chart:
```
+----------+ +-------------------------+
|  Chart   | |     Planet Table        |
+----------+ +-------------------------+
```

**Column layout** — table appears below the chart:
```
+----------+
|  Chart   |
+----------+
+--------------------------------------+
|            Planet Table              |
+--------------------------------------+
```

---

## Usage Examples

### 1. Basic Kundali

```typescript
import { generateKundali, Planet } from 'vedic-calc';

const { rasi, navamsa } = generateKundali(
  new Date('1995-10-15T06:30:00+05:30'),
  28.6139,   // New Delhi
  77.2090,
  'Asia/Kolkata'
);

// Ascendant
console.log('Lagna:', rasi.ascendant.signName);
console.log('Lagna Nakshatra:', rasi.ascendant.nakshatra, 'Pada', rasi.ascendant.nakshatraPada);

// Moon sign (Rashi)
const moon = rasi.planets.find(p => p.planet === Planet.MOON)!;
console.log('Moon Sign (Rashi):', moon.signName);
console.log('Moon Nakshatra:', moon.nakshatra);

// Navamsa Lagna
console.log('Navamsa Lagna:', navamsa.ascendantNavamsa.signName);

// Planets in each house
rasi.houses.forEach(house => {
  if (house.planets.length > 0) {
    const names = house.planets.map(p => Planet[p]).join(', ');
    console.log(`House ${house.number} (${house.signName}): ${names} | Lord: ${house.lord}`);
  }
});
```

---

### 2. Calculate Vimshottari Dasha

Trace an individual's astrological timeline using exactly 120 absolute years generated from their fractional Moon Nakshatra at the precise time of birth.

```typescript
import { generateKundali, getVimshottariDasha } from 'vedic-calc';

const { rasi } = generateKundali(
  new Date('2002-11-11T20:30:00+05:30'),
  28.6139,
  77.2090,
  'Asia/Kolkata'
);

// Ask the SDK to calculate their 120-year timeline 
const timeline = getVimshottariDasha(rasi);

// Find their active period today
const now = new Date();
const currentMahadasha = timeline.find(md => now >= md.start && now <= md.end);
const currentAntardasha = currentMahadasha.antardashas.find(ad => now >= ad.start && now <= ad.end);

console.log(`Current Mahadasha: ${currentMahadasha.planet}`);
console.log(`Current Antardasha: ${currentAntardasha.planet}`);
```

---

### 3. Save SVG to File

```typescript
import fs from 'fs';
import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata'
);

const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  layout: 'column',
  width: 500,
  height: 400,
});

fs.writeFileSync('kundali.svg', svg);
console.log('Chart saved to kundali.svg');
```

---

### 4. Embed in HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Kundali</title>
  <style>
    body {
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      padding: 40px;
      background: #f5f0ff;
    }
    .chart-container {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 32px rgba(66, 39, 98, 0.15);
    }
  </style>
</head>
<body>
  <div class="chart-container" id="chart"></div>

  <script type="module">
    // If using a bundler (Vite, Webpack, etc.)
    import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';

    const chart = generateRasiChart(
      new Date('1990-04-29T21:15:00+05:30'),
      16.5449, 81.5212, 'Asia/Kolkata'
    );

    document.getElementById('chart').innerHTML = generateNorthIndianChartSVG(chart, {
      showTable: true,
      width: 450,
      height: 350,
    });
  </script>
</body>
</html>
```

---

### 5. Express.js API Endpoint

```typescript
import express from 'express';
import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';

const app = express();
app.use(express.json());

// POST /kundali — returns JSON chart data
app.post('/kundali', (req, res) => {
  const { dateOfBirth, latitude, longitude, timezone } = req.body;

  const chart = generateRasiChart(
    new Date(dateOfBirth),
    latitude,
    longitude,
    timezone
  );

  res.json({
    ascendant: chart.ascendant,
    planets: chart.planets,
    houses: chart.houses,
    ayanamsa: chart.ayanamsa,
  });
});

// GET /kundali/svg — returns SVG chart image
app.get('/kundali/svg', (req, res) => {
  const { dob, lat, lon, tz } = req.query as Record<string, string>;

  const chart = generateRasiChart(
    new Date(dob),
    parseFloat(lat),
    parseFloat(lon),
    tz
  );

  const svg = generateNorthIndianChartSVG(chart, { showTable: true });

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

---

### 6. Next.js / React

```tsx
// app/api/chart/route.ts (Next.js App Router)
import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { dateOfBirth, latitude, longitude, timezone } = await request.json();

  const chart = generateRasiChart(
    new Date(dateOfBirth),
    latitude,
    longitude,
    timezone
  );

  const svg = generateNorthIndianChartSVG(chart, { showTable: true });

  return NextResponse.json({ svg, ascendant: chart.ascendant, planets: chart.planets });
}
```

```tsx
// components/KundaliChart.tsx
'use client';

export function KundaliChart({ svg }: { svg: string }) {
  return (
    <div
      className="kundali-chart"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
```

---

## TypeScript Types

```typescript
interface RasiChart {
  birthData: {
    date: Date;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  ascendant: {
    degree: number;        // Sidereal degree (0-360)
    sign: Sign;            // Sign enum value (0-11)
    signName: string;      // e.g. "Virgo"
    nakshatra: string;     // e.g. "Hasta"
    nakshatraPada: number; // 1-4
  };
  planets: PlanetData[];
  houses: {
    number: number;        // 1-12
    sign: Sign;
    signName: string;
    lord: string;          // e.g. "Mercury"
    planets: Planet[];     // Planets in this house
    cuspStart: number;     // Start degree (0-360)
    cuspEnd: number;       // End degree (0-360)
  }[];
  ayanamsa: number;        // Lahiri ayanamsa value used
}

interface PlanetData {
  planet: Planet;
  longitude: number;       // Sidereal longitude (0-360)
  sign: Sign;
  signName: string;
  degreeInSign: number;    // Degree within the sign (0-30)
  nakshatra: string;
  nakshatraPada: number;   // 1-4
  nakshatraLord: string;   // e.g. "Moon"
  house: number;           // 1-12
  isRetrograde: boolean;
}

interface NavamsaChart {
  planets: {
    planet: Planet;
    navamsaSign: Sign;
    navamsaSignName: string;
    navamsaHouse: number;  // 1-12
    longitude: number;
  }[];
  ascendantNavamsa: {
    sign: Sign;
    signName: string;
    longitude: number;
  };
}

interface Mahadasha {
    planet: string;
    start: Date;
    end: Date;
    durationYears: number;
    antardashas: Antardasha[];
}

interface Antardasha {
    planet: string;
    start: Date;
    end: Date;
    durationYears: number;
}
```

---

## Roadmap

We are actively building **vedic-calc** into the most complete Vedic astrology SDK for JavaScript/TypeScript. Here is what is coming:

### v1.1 — More Divisional Charts
- [ ] **D-3 (Drekkana)** — siblings, courage
- [ ] **D-4 (Chaturthamsa)** — property, fortune
- [ ] **D-7 (Saptamsa)** — children
- [ ] **D-10 (Dasamsa)** — career & profession
- [ ] **D-12 (Dwadasamsa)** — parents
- [ ] **D-16 (Shodasamsa)** — vehicles & comforts
- [ ] **D-20 (Vimsamsa)** — spiritual progress
- [ ] **D-24 (Chaturvimsamsa)** — education
- [ ] **D-27 (Saptavimsamsa)** — strength & weakness
- [ ] **D-30 (Trimsamsa)** — misfortune & health
- [ ] **D-60 (Shashtiamsa)** — past life karma

### v1.2 — Dasha Systems
- [x] **Vimshottari Dasha** — the most widely used 120-year dasha system
- [x] **Antardasha (Bhukti)** — sub-periods within each Mahadasha
- [ ] **Pratyantardasha** — sub-sub-periods
- [ ] **Yogini Dasha** — 36-year cycle dasha system
- [ ] **Ashtottari Dasha** — 108-year dasha system

### v1.3 — Yogas & Planetary Combinations
- [ ] **Raj Yogas** — combinations for power and success
- [ ] **Dhana Yogas** — wealth combinations
- [ ] **Pancha Mahapurusha Yogas** — Ruchaka, Bhadra, Hamsa, Malavya, Sasa
- [ ] **Kemadruma Yoga** — Moon without support
- [ ] **Gaja Kesari Yoga** — Jupiter-Moon combination
- [ ] **Neecha Bhanga Raj Yoga** — cancellation of debilitation
- [ ] **100+ classical yoga detection**

### v1.4 — Strength & Shadbala
- [ ] **Shadbala** — six-fold planetary strength calculation
- [ ] **Sthana Bala** — positional strength
- [ ] **Dig Bala** — directional strength
- [ ] **Kala Bala** — temporal strength
- [ ] **Chesta Bala** — motional strength
- [ ] **Naisargika Bala** — natural strength
- [ ] **Drik Bala** — aspectual strength
- [ ] **Bhava Bala** — house strength

### v1.5 — Transits & Predictions
- [ ] **Gochar (Transits)** — current planetary positions over natal chart
- [ ] **Sade Sati** — Saturn's 7.5-year transit over Moon
- [ ] **Ashtama Shani** — Saturn in 8th from Moon
- [ ] **Transit predictions** — planet-over-planet analysis

### v1.6 — Compatibility (Kundali Milan)
- [ ] **Ashtakoot Milan** — 8-factor compatibility scoring (36 points)
- [ ] **Guna Milan** — Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi
- [ ] **Mangal Dosha** — Mars affliction check
- [ ] **Nadi Dosha** — Nadi incompatibility check

### v1.7 — Chart Rendering Enhancements
- [ ] **South Indian chart style** — 3x4 grid layout
- [ ] **East Indian chart style** — square grid layout
- [ ] **Custom color themes** — dark, ocean, forest, golden presets
- [ ] **Aspect lines** — draw planetary aspects on chart
- [ ] **PNG/PDF export** — via canvas or puppeteer integration

### v2.0 — Advanced Features
- [ ] **Muhurta (Electional Astrology)** — find auspicious times
- [ ] **Prashna (Horary Astrology)** — answer questions from current chart
- [ ] **Ashtakavarga** — 8-source strength system
- [ ] **Sarvashtakavarga** — combined strength table
- [ ] **Panchanga** — Tithi, Vara, Nakshatra, Yoga, Karana
- [ ] **Hora Chart** — hourly planetary ruler
- [ ] **Lagna variations** — Chandra Lagna, Surya Lagna, Arudha Lagna
- [ ] **Browser/ESM build** — for direct use in browsers without bundler

---

## Contributing

Contributions are welcome. Whether it is a bug fix, new feature, or documentation improvement:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/vimshottari-dasha`
3. Commit your changes: `git commit -m 'feat: add Vimshottari Dasha calculation'`
4. Push to the branch: `git push origin feature/vimshottari-dasha`
5. Open a Pull Request

Please check the [open issues](https://github.com/jatingodnani/vedic-calc/issues) before starting work on a new feature.

---

## Resources

- [Swiss Ephemeris](https://www.astro.com/swisseph/) — The astronomical engine powering this library
- [Vedic Astrology Basics](https://www.vedicastrology.us.com/) — Learn Jyotish fundamentals
- [AstroSage](https://www.astrosage.com/) — Reference for chart calculations

---

## License

[MIT](LICENSE)

---

<div align="center">

If vedic-calc helped you, please star the repo on GitHub — it helps others discover it.

[![GitHub stars](https://img.shields.io/github/stars/jatingodnani/vedic-calc?style=social)](https://github.com/jatingodnani/vedic-calc)
[![npm](https://img.shields.io/npm/v/vedic-calc?style=social)](https://www.npmjs.com/package/vedic-calc)

</div>
