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

## Basic Usage

### Step 1: Generate a Rasi Chart

The Rasi chart is the main birth chart in Vedic Astrology. Here's how to generate one:

```typescript
import { generateRasiChart } from 'vedic-calc';

// Your birth details
const dateOfBirth = new Date('1990-04-29T21:15:00+05:30');
const latitude = 16.544893;    // Example: Vijayawada, India
const longitude = 81.521240;
const timezone = 'Asia/Kolkata';

// Generate the chart
const chart = generateRasiChart(
  dateOfBirth,
  latitude,
  longitude,
  timezone
);
```

### Step 2: Access Planetary Positions

```typescript
// Get ascendant
console.log('Ascendant:', chart.ascendant.signName); // "Virgo"
console.log('Ascendant Nakshatra:', chart.ascendant.nakshatra); // "Hasta"

// Get Moon sign (planet index 1 = Moon)
console.log('Moon Sign:', chart.planets[1].signName);

// List all planets with their signs
chart.planets.forEach(planet => {
  console.log(`${planet.planet}: ${planet.signName} ${planet.degreeInSign.toFixed(2)}°`);
});
```

### Step 3: Generate SVG Chart

```typescript
import { generateNorthIndianChartSVG } from 'vedic-calc';

// Generate North Indian style chart
const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  title: 'My Birth Chart',
  width: 400,
  height: 300
});

// Display in HTML
document.getElementById('chart-container')!.innerHTML = svg;
```

## Understanding the Chart Data

The generated chart contains:

```typescript
interface BirthChart {
  birthData: {
    date: Date;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  
  ascendant: {
    degree: number;        // Longitude degree (0-360)
    sign: Sign;           // Sign enum (0-11)
    signName: string;     // "Aries", "Taurus", etc.
    nakshatra: string;    // "Ashwini", "Bharani", etc.
    nakshatraPada: number; // 1-4
  };
  
  planets: PlanetPosition[];  // 9 planets
  
  houses: House[];            // 12 houses
  
  ayanamsa: number;          // Ayanamsa value
}
```

## Generating Navamsa Chart

Navamsa (D-9) is a divisional chart crucial for marriage analysis:

```typescript
import { generateRasiChart, generateNavamsaChart, generateSouthIndianChartSVG } from 'vedic-calc';

const rasi = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.544893,
  81.521240,
  'Asia/Kolkata'
);

// Generate Navamsa from Rasi
const navamsa = generateNavamsaChart(rasi);

// Render Navamsa chart
const navamsaSVG = generateSouthIndianChartSVG(navamsa, {
  showTable: true,
  title: 'Navamsa Chart'
});
```

## Complete Example

Here's a complete example that generates both Rasi and Navamsa charts:

```typescript
import { 
  generateRasiChart, 
  generateNavamsaChart, 
  generateNorthIndianChartSVG,
  generateSouthIndianChartSVG 
} from 'vedic-calc';

// Birth details
const birthDate = new Date('1990-04-29T21:15:00+05:30');
const latitude = 16.544893;
const longitude = 81.521240;
const timezone = 'Asia/Kolkata';

// Generate charts
const rasi = generateRasiChart(birthDate, latitude, longitude, timezone);
const navamsa = generateNavamsaChart(rasi);

// Display chart info
console.log('=== Rasi Chart ===');
console.log('Ascendant:', rasi.ascendant.signName);
console.log('Moon:', rasi.planets[1].signName);
console.log('Sun:', rasi.planets[0].signName);

console.log('\n=== Navamsa Chart ===');
console.log('Ascendant:', navamsa.ascendant.signName);
console.log('Moon:', navamsa.planets[1].signName);

// Generate SVG
const rasiSVG = generateNorthIndianChartSVG(rasi, {
  showTable: true,
  title: 'Rasi Chart'
});

const navamsaSVG = generateSouthIndianChartSVG(navamsa, {
  showTable: true,
  title: 'Navamsa Chart'
});

// Use in HTML
document.getElementById('rasi')!.innerHTML = rasiSVG;
document.getElementById('navamsa')!.innerHTML = navamsaSVG;
```

## Finding Birth Coordinates

You need latitude and longitude for birth place. Use:

- [Google Maps](https://www.google.com/maps) - Right-click location → coordinates
- [TimeAndDate](https://www.timeanddate.com) - Timezone lookup
- [Geodatasource](https://www.geodatasource.com) - Location lookup

## Next Steps

- [API Reference](/docs/api-reference) - Complete function documentation
- [Chart Customization](/docs/charts) - Themes, colors, layouts
- [Code Examples](/docs/examples) - More usage examples
