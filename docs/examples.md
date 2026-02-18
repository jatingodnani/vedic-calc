---
title: Examples - Vedic Calc
description: Real-world code examples for generating Vedic Astrology charts, handling planetary positions, and building astrology applications.
keywords:
  - kundali examples
  - vedic astrology code
  - birth chart example
  - horoscope code
  - astrology app tutorial
---

# Examples

Here are practical examples for building astrology applications with Vedic Calc.

## Basic Examples

### Generate a Kundali

```typescript
import { generateKundali, Planet } from 'vedic-calc';

const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata'
);

console.log('Ascendant:', rasi.ascendant.signName);
console.log('Moon Sign:', rasi.planets[1].signName);
console.log('Navamsa Lagna:', navamsa.ascendantNavamsa.signName);
```

### Display Chart in HTML

```typescript
import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata'
);

const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  title: 'My Kundali'
});

document.getElementById('chart')!.innerHTML = svg;
```

### List All Planets

```typescript
import { generateRasiChart, Planet } from 'vedic-calc';

const chart = generateRasiChart(date, lat, lon, tz);

chart.planets.forEach(p => {
  const retro = p.isRetrograde ? ' (R)' : '';
  console.log(
    `${Planet[p.planet]}: ${p.signName} ${p.degreeInSign.toFixed(2)}° | ` +
    `${p.nakshatra} Pada ${p.nakshatraPada} | House ${p.house}${retro}`
  );
});
```

## Intermediate Examples

### Get Planets by House

```typescript
import { generateRasiChart, Planet } from 'vedic-calc';

const chart = generateRasiChart(date, lat, lon, tz);

// Using the houses array directly
chart.houses.forEach(house => {
  if (house.planets.length > 0) {
    const names = house.planets.map(p => Planet[p]).join(', ');
    console.log(`House ${house.number} (${house.signName}): ${names} | Lord: ${house.lord}`);
  }
});
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

### Build a Birth Report

```typescript
import { generateKundali, Planet } from 'vedic-calc';

function generateBirthReport(date: Date, lat: number, lon: number, tz: string) {
  const { rasi, navamsa } = generateKundali(date, lat, lon, tz);

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
      pada: p.nakshatraPada,
      house: p.house,
      retrograde: p.isRetrograde
    })),
    navamsa: {
      ascendant: navamsa.ascendantNavamsa.signName,
      moonSign: navamsa.planets[1].navamsaSignName
    }
  };
}

const report = generateBirthReport(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata'
);

console.log(JSON.stringify(report, null, 2));
```

## Node.js Examples

### Save Chart as SVG File

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

### Express.js API Endpoint

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

## Next.js / React Examples

### Next.js API Route

```typescript
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

  return NextResponse.json({
    svg,
    ascendant: chart.ascendant,
    planets: chart.planets
  });
}
```

### React Component

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

## Compatibility Example (Kundli Milan)

```typescript
import { generateKundali, Planet } from 'vedic-calc';

function calculateCompatibility(
  maleBirth: { date: Date; lat: number; lon: number; tz: string },
  femaleBirth: { date: Date; lat: number; lon: number; tz: string }
) {
  const { rasi: maleRasi } = generateKundali(maleBirth.date, maleBirth.lat, maleBirth.lon, maleBirth.tz);
  const { rasi: femaleRasi } = generateKundali(femaleBirth.date, femaleBirth.lat, femaleBirth.lon, femaleBirth.tz);

  let score = 0;
  const maxScore = 36;

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
  { date: new Date('1990-04-29T21:15:00+05:30'), lat: 16.5449, lon: 81.5212, tz: 'Asia/Kolkata' },
  { date: new Date('1992-08-15T10:00:00+05:30'), lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata' }
);

console.log(`Compatibility: ${compatibility.percentage}%`);
console.log(`Male Moon: ${compatibility.maleMoon}`);
console.log(`Female Moon: ${compatibility.femaleMoon}`);
```
