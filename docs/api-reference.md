---
title: API Reference - Vedic Calc
description: Complete API documentation for Kundali Charts SDK - generateRasiChart, generateNavamsaChart, SVG chart generation functions.
keywords:
  - kundali charts api
  - generateRasiChart
  - generateNavamsaChart
  - svg renderer
  - vedic astrology api
  - typescript astrology
---

# API Reference

## Chart Generation

### generateRasiChart

Generates a complete Rasi (D-1) birth chart with planetary positions.

```typescript
function generateRasiChart(
  date: Date,
  latitude: number,
  longitude: number,
  timezone?: string,
  nodeType?: NodeType
): BirthChart
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `Date` | Yes | Date and time of birth |
| `latitude` | `number` | Yes | Birth place latitude (-90 to 90) |
| `longitude` | `number` | Yes | Birth place longitude (-180 to 180) |
| `timezone` | `string` | No | IANA timezone (default: "UTC") |
| `nodeType` | `NodeType` | No | Rahu/Ketu node type (default: Mean) |

**Returns:** `BirthChart`

**Example:**

```typescript
const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.544893,  // Latitude
  81.521240,  // Longitude
  'Asia/Kolkata'
);
```

---

### generateNavamsaChart

Generates Navamsa (D-9) divisional chart from Rasi chart.

```typescript
function generateNavamsaChart(rasiChart: BirthChart): BirthChart
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `rasiChart` | `BirthChart` | Yes | Rasi chart from `generateRasiChart` |

**Returns:** `BirthChart`

**Example:**

```typescript
const rasi = generateRasiChart(date, lat, lon, tz);
const navamsa = generateNavamsaChart(rasi);
```

---

### generateKundali

Generates both Rasi (D-1) and Navamsa (D-9) charts in one call.

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
| `date` | `Date` | Yes | Date and time of birth |
| `latitude` | `number` | Yes | Birth place latitude (-90 to 90) |
| `longitude` | `number` | Yes | Birth place longitude (-180 to 180) |
| `timezone` | `string` | No | IANA timezone (default: "UTC") |
| `options.nodeType` | `NodeType` | No | Rahu/Ketu node type |

**Returns:** `{ rasi: RasiChart; navamsa: NavamsaChart }`

**Example:**

```typescript
const { rasi, navamsa } = generateKundali(
  new Date('1990-04-29T21:15:00+05:30'),
  16.544893,
  81.521240,
  'Asia/Kolkata'
);
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

Generates North Indian style chart (diamond grid layout).

```typescript
function generateNorthIndianChartSVG(
  chart: BirthChart,
  options?: NorthIndianOptions
): string
```

**Options:**

```typescript
interface NorthIndianOptions {
  showTable?: boolean;        // Show planet details table
  layout?: 'row' | 'column';  // Table layout
  title?: string;            // Chart title
  width?: number;            // Chart width in pixels
  height?: number;           // Chart height in pixels
  showSignGlyphs?: boolean;  // Show zodiac symbols (♈♉♊)
  showSignNumbers?: boolean; // Show sign numbers (1-12)
  showDegrees?: boolean;     // Show planet degrees
  customConfig?: ChartConfig; // Custom styling
}
```

**Example:**

```typescript
const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  layout: 'row',
  title: 'My Kundali',
  width: 400,
  height: 300,
  showSignGlyphs: true,
  showSignNumbers: true,
  showDegrees: true,
  customConfig: {
    colors: {
      background: '#FFFFFF',
      border: '#422762',
      innerLines: '#422762',
      signNumber: '#422762',
      text: '#1A1A2E',
      retrograde: '#D63031',
    }
  }
});
```

---

### generateSouthIndianChartSVG

Generates South Indian style chart (3x4 grid layout).

```typescript
function generateSouthIndianChartSVG(
  chart: BirthChart,
  options?: SouthIndianOptions
): string
```

**Options:**

```typescript
interface SouthIndianOptions {
  showTable?: boolean;        // Show planet details table
  showSignGlyphs?: boolean;  // Show zodiac symbols
  showSignNumbers?: boolean; // Show sign numbers
  showDegrees?: boolean;     // Show planet degrees
  cellWidth?: number;        // Cell width
  cellHeight?: number;       // Cell height
  title?: string;            // Chart title
  customConfig?: ChartConfig; // Custom styling
}
```

**Example:**

```typescript
const svg = generateSouthIndianChartSVG(chart, {
  showTable: true,
  showSignGlyphs: true,
  cellWidth: 150,
  cellHeight: 100,
  title: 'My Kundali'
});
```

---

### PREBUILT_THEMES

Pre-defined color themes for charts.

```typescript
const PREBUILT_THEMES: {
  light: ChartTheme;
  dark: ChartTheme;
  ocean: ChartTheme;
  forest: ChartTheme;
  golden: ChartTheme;
}
```

**Example:**

```typescript
import { generateNorthIndianChartSVG, PREBUILT_THEMES } from 'vedic-calc';

const svg = generateNorthIndianChartSVG(chart, {
  customConfig: {
    colors: PREBUILT_THEMES.dark.colors
  }
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
  SUN = 0,
  MOON = 1,
  MARS = 2,
  MERCURY = 3,
  JUPITER = 4,
  VENUS = 5,
  SATURN = 6,
  RAHU = 7,
  KETU = 8
}
```

### Sign

```typescript
enum Sign {
  ARIES = 0,
  TAURUS = 1,
  GEMINI = 2,
  CANCER = 3,
  LEO = 4,
  VIRGO = 5,
  LIBRA = 6,
  SCORPIO = 7,
  SAGITTARIUS = 8,
  CAPRICORN = 9,
  AQUARIUS = 10,
  PISCES = 11
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

### BirthChart

```typescript
interface BirthChart {
  birthData: {
    date: Date;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  
  ascendant: {
    degree: number;
    sign: Sign;
    signName: string;
    nakshatra: string;
    nakshatraPada: number;
  };
  
  planets: PlanetPosition[];
  
  houses: House[];
  
  ayanamsa: number;
}
```

### PlanetPosition

```typescript
interface PlanetPosition {
  planet: Planet;
  longitude: number;
  sign: Sign;
  signName: string;
  degreeInSign: number;
  nakshatra: string;
  nakshatraPada: number;
  nakshatraLord: string;
  house: number;
  isRetrograde: boolean;
}
```

### House

```typescript
interface House {
  number: number;
  sign: Sign;
  signName: string;
  lord: string;
  planets: Planet[];
  cuspStart: number;
  cuspEnd: number;
}
```
