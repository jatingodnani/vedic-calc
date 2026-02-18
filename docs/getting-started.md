---
title: Getting Started - Vedic Calc
description: Learn how to install and use Vedic Calc SDK to generate Vedic Astrology charts with SVG rendering.
keywords:
  - vedic astrology sdk
  - jyotish library
  - vedic calc tutorial
  - birth chart generation
  - swisseph tutorial
---

# Getting Started

This guide will help you install and use Vedic Calc SDK to generate Vedic Astrology charts.

## Installation

### Using npm

```bash
npm install vedic-calc
```

### Using yarn

```bash
yarn add vedic-calc
```

### Using pnpm

```bash
pnpm add vedic-calc
```

> **Requirements:** Node.js >= 16.0.0

## Basic Usage

### Step 1: Generate a Kundali

The easiest way to get started is with `generateKundali` — it returns both the Rasi and Navamsa charts in one call:

```typescript
import { generateKundali, Planet } from 'vedic-calc';

// Your birth details
const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'), // Date & time of birth
  16.5449,                                // Latitude (e.g. Vijayawada, India)
  81.5212,                                // Longitude
  'Asia/Kolkata'                          // IANA timezone
);
```

### Step 2: Access Planetary Positions

```typescript
// Get ascendant (Lagna)
console.log('Ascendant:', rasi.ascendant.signName);           // e.g. "Virgo"
console.log('Ascendant Nakshatra:', rasi.ascendant.nakshatra); // e.g. "Hasta"
console.log('Pada:', rasi.ascendant.nakshatraPada);            // 1-4

// Get Moon sign (planet index 1 = Moon)
console.log('Moon Sign:', rasi.planets[1].signName);

// List all planets with their signs and degrees
rasi.planets.forEach(planet => {
  const retro = planet.isRetrograde ? ' (R)' : '';
  console.log(
    `${Planet[planet.planet]}: ${planet.signName} ${planet.degreeInSign.toFixed(2)}° | ` +
    `${planet.nakshatra} Pada ${planet.nakshatraPada} | House ${planet.house}${retro}`
  );
});
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

### Step 3: Generate SVG Chart

```typescript
import { generateNorthIndianChartSVG } from 'vedic-calc';

// Generate North Indian style chart
const svg = generateNorthIndianChartSVG(rasi, {
  showTable: true,
  layout: 'row',
  width: 400,
  height: 300
});

// Display in HTML
document.getElementById('chart-container')!.innerHTML = svg;
```

## Core Concepts

| Term | Meaning |
|------|---------|
| **Rasi (D-1)** | The main birth chart — shows planetary positions at the time of birth |
| **Navamsa (D-9)** | A divisional chart — each sign is divided into 9 parts; used for marriage & dharma |
| **Lagna (Ascendant)** | The rising sign at the time of birth — the most important point in the chart |
| **Nakshatra** | One of 27 lunar mansions (each 13°20') — gives deeper insight than just the sign |
| **Pada** | Each nakshatra is divided into 4 padas (quarters) of 3°20' each |
| **Ayanamsa** | The difference between Tropical and Sidereal zodiacs (~24° currently) |
| **Whole Sign Houses** | Traditional Vedic house system — each house = one complete zodiac sign |
| **Retrograde** | A planet appearing to move backward — considered significant in Jyotish |

## Understanding the Chart Data

The generated Rasi chart contains:

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

  planets: PlanetData[];   // 9 planets

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
```

## Generating Navamsa Chart

Navamsa (D-9) is a divisional chart crucial for marriage analysis. You can generate it directly via `generateKundali`, or separately:

```typescript
import { generateRasiChart, generateNavamsaChart } from 'vedic-calc';

const rasi = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata'
);

// Generate Navamsa from Rasi
const navamsa = generateNavamsaChart(rasi);

console.log('Navamsa Lagna:', navamsa.ascendantNavamsa.signName);
navamsa.planets.forEach(p => {
  console.log(`${Planet[p.planet]}: Navamsa Sign ${p.navamsaSignName}, House ${p.navamsaHouse}`);
});
```

## Complete Example

Here's a complete example that generates both Rasi and Navamsa charts and renders them as SVG:

```typescript
import {
  generateKundali,
  generateNorthIndianChartSVG,
  Planet
} from 'vedic-calc';

// Birth details
const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata'
);

// Display chart info
console.log('=== Rasi Chart ===');
console.log('Ascendant:', rasi.ascendant.signName);
console.log('Moon:', rasi.planets[1].signName);
console.log('Sun:', rasi.planets[0].signName);

console.log('\n=== Navamsa Chart ===');
console.log('Ascendant:', navamsa.ascendantNavamsa.signName);
console.log('Moon Navamsa Sign:', navamsa.planets[1].navamsaSignName);

// Planets in each house
rasi.houses.forEach(house => {
  if (house.planets.length > 0) {
    const names = house.planets.map(p => Planet[p]).join(', ');
    console.log(`House ${house.number} (${house.signName}): ${names} | Lord: ${house.lord}`);
  }
});

// Generate SVG
const svg = generateNorthIndianChartSVG(rasi, {
  showTable: true,
  layout: 'row',
  width: 400,
  height: 300
});

// Use in HTML
document.getElementById('chart')!.innerHTML = svg;
```

## Finding Birth Coordinates

You need latitude and longitude for the birth place. Use:

- [Google Maps](https://www.google.com/maps) - Right-click location → coordinates
- [TimeAndDate](https://www.timeanddate.com) - Timezone lookup
- [Geodatasource](https://www.geodatasource.com) - Location lookup

## Next Steps

- [API Reference](/docs/api-reference) - Complete function documentation
- [Chart Rendering](/docs/charts) - Themes, colors, layouts
- [Code Examples](/docs/examples) - More usage examples
