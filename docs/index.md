---
title: Kundali Charts - Vedic Astrology Chart SDK
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
  <a href="https://www.npmjs.com/package/kundali-charts">
    <img src="https://img.shields.io/npm/v/kundali-charts.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/kundali-charts">
    <img src="https://img.shields.io/npm/dm/kundali-charts.svg" alt="npm downloads" />
  </a>
  <a href="https://github.com/jatingodnani/kundali-charts/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/kundali-charts.svg" alt="MIT License" />
  </a>
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript" />
 High</p>

>-precision Vedic Astrology (Jyotish) chart generation library using Swiss Ephemeris. Generate Rasi (D-1), Navamsa (D-9) charts and beautiful SVG visualizations.

## What is Kundali Charts?

Kundali Charts is a powerful TypeScript/JavaScript library for generating Vedic Astrology charts programmatically. It provides:

- **Rasi Chart (D-1)** - Complete birth chart with planetary positions in 12 signs
- **Navamsa Chart (D-9)** - Divisional chart for marriage & spiritual analysis  
- **SVG Chart Rendering** - Beautiful North Indian & South Indian chart styles
- **High Precision** - Swiss Ephemeris for accurate astronomical calculations
- **Vedic Astrology** - Whole Sign houses, Lahiri Ayanamsa

## Why Use Kundali Charts?

| Feature | Benefit |
|---------|---------|
| Swiss Ephemeris | NASA-grade astronomical accuracy |
| SVG Output | Scalable, lightweight, perfect for web |
| TypeScript | Full type safety and IDE autocompletion |
| Zero Dependencies | Lightweight bundle, easy to integrate |
| Customizable | Themes, colors, layouts, symbols |

## Quick Examples

### Generate a Rasi Chart

```typescript
import { generateRasiChart } from 'kundali-charts';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),  // Date of birth
  16.544893,   // Latitude
  81.521240,   // Longitude
  'Asia/Kolkata'  // Timezone
);

console.log('Ascendant:', chart.ascendant.signName);
console.log('Moon Sign:', chart.planets[1].signName);
```

### Render SVG Chart

```typescript
import { generateNorthIndianChartSVG } from 'vedic-calc';

const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  title: 'My Birth Chart',
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
yarn add kundali-charts
```

## Supported Chart Types

| Chart | Division | Purpose |
|-------|----------|---------|
| Rasi (D-1) | 1st | Main birth chart, personality |
| Navamsa (D-9) | 9th | Marriage, spouse, spiritual growth |

## Supported Planets

- Sun (Surya)
- Moon (Chandra)
- Mars ( Mangala)
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
- npm or yarn

## License

MIT License - see [LICENSE](https://github.com/jatingodnani/kundali-charts/blob/main/LICENSE) for details.

## Related Packages

- [Swiss Ephemeris](https://www.astro.com/swisseph/) - Astronomical calculations
- [Astro.com](https://www.astro.com/) - Online astrology reference
