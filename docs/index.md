---
title: Vedic Calc - Vedic Astrology Chart SDK
description: Generate Rasi (D-1), Navamsa (D-9) charts with SVG rendering using Swiss Ephemeris. High-precision Vedic Astrology library for JavaScript/TypeScript.
keywords:
  - vedic astrology
  - jyotish
  - kundali
  - rasi chart
  - navamsa chart
  - birth chart
  - horoscope
  - swisseph
  - svg chart
  - indian astrology
---

# Vedic Calc SDK

<p align="center">
  <a href="https://www.npmjs.com/package/vedic-calc">
    <img src="https://img.shields.io/npm/v/vedic-calc.svg?style=flat-square&color=CB3837" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/vedic-calc">
    <img src="https://img.shields.io/npm/dm/vedic-calc.svg?style=flat-square&color=blue" alt="npm downloads" />
  </a>
  <a href="https://github.com/jatingodnani/vedic-calc/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/vedic-calc.svg?style=flat-square&color=green" alt="MIT License" />
  </a>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D16-339933?style=flat-square&logo=node.js" alt="Node.js" />
</p>

> High-precision Vedic Astrology (Jyotish) chart generation library using Swiss Ephemeris. Generate Rasi (D-1), Navamsa (D-9) charts and beautiful SVG visualizations.

## What is Vedic Calc?

Vedic Calc is a powerful TypeScript/JavaScript library for generating Vedic Astrology charts programmatically. It provides:

- **Rasi Chart (D-1)** - Complete birth chart with planetary positions in 12 signs
- **Navamsa Chart (D-9)** - Divisional chart for marriage & spiritual analysis
- **SVG Chart Rendering** - North Indian diamond-grid style chart
- **High Precision** - Swiss Ephemeris for accurate astronomical calculations
- **Vedic Astrology** - Whole Sign houses, Lahiri Ayanamsa

## Why Use Vedic Calc?

| Feature | Benefit |
|---------|---------|
| Swiss Ephemeris | NASA-grade astronomical accuracy |
| SVG Output | Scalable, lightweight, perfect for web |
| TypeScript | Full type safety and IDE autocompletion |
| Zero Config | Ephemeris data files bundled in the package |
| Customizable | Themes, colors, layouts, symbols |

## Features

| Feature | Details |
|---------|---------|
| **Rasi Chart (D-1)** | Complete birth chart with all 9 planets in 12 signs |
| **Navamsa Chart (D-9)** | Divisional chart for marriage & spiritual analysis |
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

## Quick Start

### Generate a Kundali

```typescript
import { generateKundali, generateNorthIndianChartSVG, Planet } from 'vedic-calc';

// One call to get both Rasi + Navamsa charts
const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'),  // Date & time of birth
  16.5449,                                 // Latitude
  81.5212,                                 // Longitude
  'Asia/Kolkata'                           // Timezone
);

console.log('Ascendant:', rasi.ascendant.signName);
console.log('Moon Sign:', rasi.planets[1].signName);
```

### Render SVG Chart

```typescript
import { generateNorthIndianChartSVG } from 'vedic-calc';

const svg = generateNorthIndianChartSVG(rasi, {
  showTable: true,
  width: 400,
  height: 300
});

document.getElementById('chart')!.innerHTML = svg;
```

## Installation

```bash
npm install vedic-calc
```

Or with yarn:

```bash
yarn add vedic-calc
```

Or with pnpm:

```bash
pnpm add vedic-calc
```

> **Requirements:** Node.js >= 16.0.0

## Supported Chart Types

| Chart | Division | Purpose |
|-------|----------|---------|
| Rasi (D-1) | 1st | Main birth chart, personality |
| Navamsa (D-9) | 9th | Marriage, spouse, spiritual growth |

## Supported Planets

- Sun (Surya)
- Moon (Chandra)
- Mars (Mangala)
- Mercury (Budha)
- Jupiter (Guru)
- Venus (Shukra)
- Saturn (Shani)
- Rahu (North Node)
- Ketu (South Node)

## Next Steps

- [Getting Started Guide](/docs/getting-started) - Detailed setup instructions
- [API Reference](/docs/api-reference) - Complete function documentation
- [Chart Rendering](/docs/charts) - SVG chart customization
- [Code Examples](/docs/examples) - Real-world usage examples

## Requirements

- Node.js >= 16.0.0
- npm, yarn, or pnpm

## License

MIT License - see [LICENSE](https://github.com/jatingodnani/vedic-calc/blob/main/LICENSE) for details.

## Related Resources

- [Swiss Ephemeris](https://www.astro.com/swisseph/) - Astronomical calculations
- [Astro.com](https://www.astro.com/) - Online astrology reference
