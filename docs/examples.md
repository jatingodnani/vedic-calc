---
title: Examples - Vedic Astro
description: Real-world code examples for generating Vedic Astrology charts, handling planetary positions, and building astrology applications.
keywords:
  - kundali examples
  - vedic astrology code
  - birth chart example
  - horoscope code
  - astrology app tutorial
---

# Examples

Here are practical examples for building astrology applications with Kundali Charts.

## Basic Examples

### Generate Birth Chart

```typescript
import { generateRasiChart } from 'vedic-calc';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.544893,
  81.521240,
  'Asia/Kolkata'
);

console.log('Ascendant:', chart.ascendant.signName);
console.log('Moon Sign:', chart.planets[1].signName);
```

### Display Chart in HTML

```typescript
import { generateNorthIndianChartSVG } from 'vedic-calc';

const chart = generateRasiChart(date, lat, lon, tz);
const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  title: 'My Kundali'
});

document.getElementById('chart')!.innerHTML = svg;
```

## Intermediate Examples

### Get Planet Positions by House

```typescript
function getPlanetsByHouse(chart) {
  const housePlanets: Record<number, string[]> = {};
  
  for (let i = 1; i <= 12; i++) {
    housePlanets[i] = [];
  }
  
  chart.planets.forEach(planet => {
    housePlanets[planet.house].push(planet.planet);
  });
  
  return housePlanets;
}

const housePlanets = getPlanetsByHouse(chart);
console.log('Planets in 1st house:', housePlanets[1]);
```

### Find Planetary Aspects

```typescript
function hasAspect(planet1Lon: number, planet2Lon: number): boolean {
  const aspects = [0, 60, 90, 120, 180];
  const diff = Math.abs(planet1Lon - planet2Lon);
  const normalizedDiff = Math.min(diff, 360 - diff);
  
  return aspects.some(aspect => Math.abs(normalizedDiff - aspect) < 2);
}

// Check if Sun aspects Mars
const sunLon = chart.planets[0].longitude;
const marsLon = chart.planets[2].longitude;

if (hasAspect(sunLon, marsLon)) {
  console.log('Sun aspects Mars');
}
```

### Calculate Planetary Strength (Shadbala)

```typescript
function calculateShadbala(chart): Record<string, number> {
  const shadbala: Record<string, number> = {};
  
  chart.planets.forEach(planet => {
    let strength = 0;
    
    // Sthanabala (positional strength)
    const sign = planet.sign;
    if (sign >= 0 && sign <= 2) strength += 1; // Moolatrikona
    if (sign >= 3 && sign <= 5) strength += 1.5; // Exalted
    if (sign >= 9 && sign <= 11) strength += 1; // Own sign
    
    shadbala[Planet[planet.planet]] = strength;
  });
  
  return shadbala;
}
```

## Advanced Examples

### Build a Birth Report

```typescript
import { generateRasiChart, generateNavamsaChart } from 'vedic-calc';

function generateBirthReport(date: Date, lat: number, lon: number, tz: string) {
  const rasi = generateRasiChart(date, lat, lon, tz);
  const navamsa = generateNavamsaChart(rasi);
  
  return {
    basicInfo: {
      date: rasi.birthData.date,
      location: {
        latitude: rasi.birthData.latitude,
        longitude: rasi.birthData.longitude
      }
    },
    ascendant: rasi.ascendant,
    moonSign: rasi.planets[1].signName,
    sunSign: rasi.planets[0].signName,
    planets: rasi.planets.map(p => ({
      name: Planet[p.planet],
      sign: p.signName,
      degree: p.degreeInSign.toFixed(2),
      nakshatra: p.nakshatra,
      house: p.house,
      retrograde: p.isRetrograde
    })),
    navamsa: {
      ascendant: navamsa.ascendant.signName,
      moonSign: navamsa.planets[1].signName
    }
  };
}

const report = generateBirthReport(
  new Date('1990-04-29T21:15:00+05:30'),
  16.544893,
  81.521240,
  'Asia/Kolkata'
);

console.log(JSON.stringify(report, null, 2));
```

### Create Multiple Chart Styles

```typescript
import { 
  generateRasiChart, 
  generateNorthIndianChartSVG,
  generateSouthIndianChartSVG 
} from 'vedic-calc';

const chart = generateRasiChart(date, lat, lon, tz);

const northIndian = generateNorthIndianChartSVG(chart, {
  showTable: true,
  title: 'North Indian Style'
});

const southIndian = generateSouthIndianChartSVG(chart, {
  showTable: true,
  title: 'South Indian Style'
});

// Display both
document.getElementById('north-indian')!.innerHTML = northIndian;
document.getElementById('south-indian')!.innerHTML = southIndian;
```

### Match Compatibility (Kundli Milan)

```typescript
import { generateRasiChart, generateNavamsaChart } from 'vedic-calc';

function calculateCompatibility(
  maleBirth: { date: Date; lat: number; lon: number; tz: string },
  femaleBirth: { date: Date; lat: number; lon: number; tz: string }
) {
  const maleRasi = generateRasiChart(maleBirth.date, maleBirth.lat, maleBirth.lon, maleBirth.tz);
  const femaleRasi = generateRasiChart(femaleBirth.date, femaleBirth.lat, femaleBirth.lon, femaleBirth.tz);
  
  let score = 0;
  const maxScore = 36;
  
  // Varna (1 point)
  // Would add more guna comparisons here
  
  // Example: Moon sign compatibility
  const maleMoon = maleRasi.planets[1].sign;
  const femaleMoon = femaleRasi.planets[1].sign;
  
  if (maleMoon === femaleMoon) {
    score += 4; // Same sign
  }
  
  return {
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    maleMoon: maleRasi.planets[1].signName,
    femaleMoon: femaleRasi.planets[1].signName
  };
}

const compatibility = calculateCompatibility(
  { date: new Date('1990-04-29T21:15:00+05:30'), lat: 16.544893, lon: 81.521240, tz: 'Asia/Kolkata' },
  { date: new Date('1992-08-15T10:00:00+05:30'), lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata' }
);

console.log(`Compatibility: ${compatibility.percentage}%`);
```

## Node.js Examples

### Save Chart as SVG File

```typescript
import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';
import { writeFileSync } from 'fs';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.544893,
  81.521240,
  'Asia/Kolkata'
);

const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  title: 'My Kundali'
});

writeFileSync('kundali.svg', svg);
console.log('Chart saved to kundali.svg');
```

### Generate JSON API Response

```typescript
import { generateRasiChart } from 'vedic-calc';
import express from 'express';

const app = express();

app.get('/api/kundali', (req, res) => {
  const { date, lat, lon, tz } = req.query;
  
  const chart = generateRasiChart(
    new Date(date as string),
    parseFloat(lat as string),
    parseFloat(lon as string),
    tz as string
  );
  
  res.json(chart);
});

app.listen(3000);
```
