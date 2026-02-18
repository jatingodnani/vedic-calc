---
title: API Reference - Vedic Calc
description: Complete API documentation for Vedic Calc SDK - generateKundali, generateRasiChart, generateNavamsaChart, SVG chart generation functions.
keywords:
  - kundali charts api
  - generateKundali
  - generateRasiChart
  - generateNavamsaChart
  - svg renderer
  - vedic astrology api
  - typescript astrology
---

# API Reference

## Chart Generation

### generateKundali

The **all-in-one** function. Generates both Rasi (D-1) and Navamsa (D-9) charts in a single call.

```typescript
function generateKundali(
  date: Date,
  latitude: number,
  longitude: number,
  timezone?: string,
  options?: { nodeType?: NodeType }
): { rasi: RasiChart; navamsa: NavamsaChart }
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `Date` | Yes | Birth date and time (use local time with timezone offset) |
| `latitude` | `number` | Yes | Geographic latitude (-90 to +90) |
| `longitude` | `number` | Yes | Geographic longitude (-180 to +180) |
| `timezone` | `string` | No | IANA timezone string (default: `'UTC'`) |
| `options.nodeType` | `NodeType` | No | `TRUE_NODE` or `MEAN_NODE` for Rahu/Ketu (default: `TRUE_NODE`) |

**Returns:** `{ rasi: RasiChart, navamsa: NavamsaChart }`

**Example:**

```typescript
import { generateKundali, NodeType } from 'vedic-calc';

const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,
  81.5212,
  'Asia/Kolkata',
  { nodeType: NodeType.TRUE_NODE } // optional
);
```

---

### generateRasiChart

Generates only the Rasi (D-1) birth chart with planetary positions.

```typescript
function generateRasiChart(
  date: Date,
  latitude: number,
  longitude: number,
  timezone?: string,
  nodeType?: NodeType
): RasiChart
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `Date` | Yes | Date and time of birth |
| `latitude` | `number` | Yes | Birth place latitude (-90 to +90) |
| `longitude` | `number` | Yes | Birth place longitude (-180 to +180) |
| `timezone` | `string` | No | IANA timezone (default: `'UTC'`) |
| `nodeType` | `NodeType` | No | Rahu/Ketu node type (default: `TRUE_NODE`) |

**Returns:** `RasiChart`

**Example:**

```typescript
import { generateRasiChart } from 'vedic-calc';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.5449,  // Latitude
  81.5212,  // Longitude
  'Asia/Kolkata'
);
```

---

### generateNavamsaChart

Generates the Navamsa (D-9) divisional chart from an existing Rasi chart.

```typescript
function generateNavamsaChart(rasiChart: RasiChart): NavamsaChart
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `rasiChart` | `RasiChart` | Yes | Rasi chart from `generateRasiChart` or `generateKundali` |

**Returns:** `NavamsaChart`

**Example:**

```typescript
import { generateRasiChart, generateNavamsaChart, Planet } from 'vedic-calc';

const rasi = generateRasiChart(date, lat, lon, tz);
const navamsa = generateNavamsaChart(rasi);

navamsa.planets.forEach(p => {
  console.log(`${Planet[p.planet]}: Navamsa Sign ${p.navamsaSignName}, House ${p.navamsaHouse}`);
});
```

---

### calculateNavamsaSign

Calculates the Navamsa sign for a given longitude.

```typescript
function calculateNavamsaSign(longitude: number): Sign
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `longitude` | `number` | Yes | Planetary longitude (0-360) |

**Returns:** `Sign` (0-11)

**Example:**

```typescript
const navamsaSign = calculateNavamsaSign(125.5); // Returns Sign
```

---

## SVG Chart Rendering

### generateNorthIndianChartSVG

Generates a **North Indian diamond-grid** style SVG chart.

```typescript
function generateNorthIndianChartSVG(
  chart: RasiChart,
  options?: NorthIndianOptions
): string
```

**Options:**

```typescript
interface NorthIndianOptions {
  showTable?: boolean;       // Show planet details table (default: true)
  layout?: 'row' | 'column'; // Table position: beside or below chart (default: 'row')
  title?: string;            // Chart title
  width?: number;            // Chart width in pixels (default: 400)
  height?: number;           // Chart height in pixels (default: 300)
  tableWidth?: number;       // Planet table width in pixels (default: 520)
  customConfig?: ChartConfig; // Custom styling
}
```

**Options table:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showTable` | `boolean` | `true` | Show planet details table |
| `layout` | `'row' \| 'column'` | `'row'` | Table position relative to chart |
| `width` | `number` | `400` | Chart SVG width in pixels |
| `height` | `number` | `300` | Chart SVG height in pixels |
| `tableWidth` | `number` | `520` | Planet table width in pixels |

**Returns:** `string` — a complete inline SVG string ready to embed in HTML or save as `.svg`.

**Example:**

```typescript
import { generateNorthIndianChartSVG } from 'vedic-calc';

const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  layout: 'row',
  width: 400,
  height: 300,
  tableWidth: 520,
});
```

---

## Core Functions

### getAyanamsa

Calculates the ayanamsa (sidereal correction) value.

```typescript
function getAyanamsa(jd: number, system?: AyanamsaSystem): number
```

### tropicalToSidereal

Converts tropical longitude to sidereal longitude.

```typescript
function tropicalToSidereal(tropicalLongitude: number, ayanamsa: number): number
```

### calculateHouseCusps

Calculates house cusps for a given time and location.

```typescript
function calculateHouseCusps(
  jd: number,
  latitude: number,
  longitude: number,
  system?: HouseSystem
): number[]
```

---

## Types & Enums

### Planet

```typescript
enum Planet {
  SUN     = 0,
  MOON    = 1,
  MARS    = 2,
  MERCURY = 3,
  JUPITER = 4,
  VENUS   = 5,
  SATURN  = 6,
  RAHU    = 7,
  KETU    = 8
}
```

### Sign

```typescript
enum Sign {
  ARIES       = 0,
  TAURUS      = 1,
  GEMINI      = 2,
  CANCER      = 3,
  LEO         = 4,
  VIRGO       = 5,
  LIBRA       = 6,
  SCORPIO     = 7,
  SAGITTARIUS = 8,
  CAPRICORN   = 9,
  AQUARIUS    = 10,
  PISCES      = 11
}
```

### NodeType

```typescript
enum NodeType {
  TRUE_NODE, // Precise astronomical position (default)
  MEAN_NODE  // Smoothed/traditional position
}
```

### AyanamsaSystem

```typescript
enum AyanamsaSystem {
  LAHIRI,       // Chitrapaksha — most popular in India (default)
  RAMAN,        // Used in South India
  KRISHNAMURTI  // KP System
}
```

### Nakshatras

```typescript
const Nakshatras: string[] = [
  "Ashwini", "Bharani", "Kritika", "Rohini", "Mrigashira",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
  "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
  "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
]
```

---

## Return Types

### RasiChart

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
```

### NavamsaChart

```typescript
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
```

### PlanetData

```typescript
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
```
