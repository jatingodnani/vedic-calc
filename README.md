# Vedic Calc - Vedic Astrology Chart SDK

<p align="center">
  <a href="https://www.npmjs.com/package/vedic-calc"><img src="https://img.shields.io/npm/v/vedic-calc.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/vedic-calc"><img src="https://img.shields.io/npm/dm/vedic-calc.svg" alt="npm downloads"></a>
  <a href="https://github.com/jatingodnani/vedic-calc/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vedic-calc.svg" alt="MIT License"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript"></a>
</p>

> High-precision Vedic Astrology (Jyotish) chart generation library using Swiss Ephemeris. Generate Rasi (D-1), Navamsa (D-9) charts with planetary positions (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu), houses, nakshatras, ascendant, retrograde planets, and beautiful SVG visualizations.

## Features

- **Rasi Chart (D-1)** - Complete birth chart with planetary positions in 12 signs
- **Navamsa Chart (D-9)** - Divisional chart for marriage & spiritual analysis
- **9 Planets** - Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu
- **12 Houses** - House cusps with lords and planets in each house
- **27 Nakshatras** - Full nakshatra calculation with pada and lord
- **Ascendant** - Lagna calculation with sign and nakshatra
- **Retrograde Planets** - Detects and marks retrograde planets
- **SVG Chart Rendering** - Beautiful North Indian & South Indian styles
- **Swiss Ephemeris** - NASA-grade astronomical calculations
- **Vedic Astrology** - Whole Sign houses, Lahiri Ayanamsa
- **Customizable** - Colors, symbols, themes, layouts
- **TypeScript** - Full type definitions included

## Installation

```bash
npm install vedic-calc
```

## Quick Start

```typescript
import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';

// Generate birth chart
const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),  // Date of birth
  16.544893,   // Latitude
  81.521240,   // Longitude
  'Asia/Kolkata'  // Timezone
);

// Get Kundali Details
console.log('=== Birth Chart Details ===');
console.log('Ascendant:', chart.ascendant.signName, chart.ascendant.nakshatra);
console.log('Moon Sign:', chart.planets[1].signName);

// All Planets
chart.planets.forEach(p => {
  console.log(`${p.planet}: ${p.signName} ${p.degreeInSign.toFixed(2)}° (${p.nakshatra} ${p.nakshatraPada})`);
});

// Houses
chart.houses.forEach(h => {
  console.log(`House ${h.number} (${h.signName}): Lord ${h.lord}, Planets: ${h.planets.join(', ') || 'None'}`);
});

// Generate SVG chart
const svg = generateNorthIndianChartSVG(chart, { showTable: true });

// Save to file or display
console.log(svg);
```

**Sample Output:**
```
=== Birth Chart Details ===
Ascendant: Virgo Hasta
Moon Sign: Taurus

Sun: Taurus 14.22° (Rohini 2)
Moon: Taurus 3.56° (Krittika 3)
Mars: Cancer 28.41° (Ashlesha 4)
...
House 1 (Virgo): Lord Mercury, Planets: Moon
House 2 (Libra): Lord Venus, Planets: 
...
```

## API Reference

### Chart Generation

#### `generateRasiChart(date, latitude, longitude, timezone?, nodeType?)`

Generates a complete Rasi (D-1) birth chart.

```typescript
const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),  // Date
  16.544893,   // Latitude
  81.521240,   // Longitude
  'Asia/Kolkata'  // Timezone (optional, default: 'UTC')
);
```

**Returns:**
```typescript
{
  birthData: { date, latitude, longitude, timezone },
  ascendant: { degree, sign, signName, nakshatra, nakshatraPada },
  planets: [
    {
      planet: Planet,  // 0=Sun, 1=Moon, 2=Mars, etc.
      longitude: number,
      sign: Sign,      // 0-11
      signName: string,
      degreeInSign: number,
      nakshatra: string,
      nakshatraPada: number,
      nakshatraLord: string,
      house: number,   // 1-12
      isRetrograde: boolean
    }
  ],
  houses: [
    {
      number: number,
      sign: Sign,
      signName: string,
      lord: string,
      planets: Planet[],
      cuspStart: number,
      cuspEnd: number
    }
  ],
  ayanamsa: number
}
```

#### `generateNavamsaChart(rasiChart)`

Generates Navamsa (D-9) chart from Rasi chart.

```typescript
const navamsa = generateNavamsaChart(rasiChart);
```

### SVG Chart Rendering

#### `generateNorthIndianChartSVG(chart, options?)`

Generates North Indian style chart (diamond grid layout).

```typescript
const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,        // Show planet details table
  layout: 'row',         // 'row' or 'column'
  title: 'My Kundali',    // Chart title
  width: 400,            // Chart width
  height: 300,           // Chart height
  showSignGlyphs: true,  // Show zodiac symbols (♈♉♊) or numbers (1,2,3)
  showSignNumbers: true,  // Show sign numbers
  showDegrees: true,      // Show planet degrees
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

#### `generateSouthIndianChartSVG(chart, options?)`

Generates South Indian style chart (3x4 grid layout).

```typescript
const svg = generateSouthIndianChartSVG(chart, {
  showTable: true,
  showSignGlyphs: true,
  cellWidth: 150,
  cellHeight: 100,
  // ... other options
});
```

### Available Themes

```typescript
import { PREBUILT_THEMES } from 'vedic-calc';

// Use predefined themes
const svg = generateNorthIndianChartSVG(chart, {
  customConfig: {
    colors: PREBUILT_THEMES.dark.colors,
    // or
    colors: PREBUILT_THEMES.ocean.colors,
    // or
    colors: PREBUILT_THEMES.forest.colors,
    // or
    colors: PREBUILT_THEMES.golden.colors,
  }
});
```

### Constants

```typescript
import { Planet, Sign, Nakshatras } from 'vedic-calc';

// Planets
Planet.SUN   // 0
Planet.MOON  // 1
Planet.MARS  // 2
Planet.MERCURY // 3
Planet.JUPITER // 4
Planet.VENUS // 5
Planet.SATURN // 6
Planet.RAHU  // 7
Planet.KETU  // 8

// Signs (0-11)
Sign.ARIES     // 0
Sign.TAURUS    // 1
Sign.GEMINI    // 2
// ... etc
```

## Example: Complete Kundali with Chart

```typescript
import { generateRasiChart, generateNavamsaChart, generateNorthIndianChartSVG } from 'vedic-calc';

// Birth details
const date = new Date('1990-04-29T21:15:00+05:30');
const latitude = 16.544893;
const longitude = 81.521240;
const timezone = 'Asia/Kolkata';

// Generate charts
const rasi = generateRasiChart(date, latitude, longitude, timezone);
const navamsa = generateNavamsaChart(rasi);

// Get ascendant
console.log('Ascendant:', rasi.ascendant.signName);

// Get planets in each house
rasi.houses.forEach(house => {
  console.log(`House ${house.number} (${house.signName}):`, house.planets);
});

// Generate SVG
const chartSVG = generateNorthIndianChartSVG(rasi, {
  showTable: true,
  title: 'My Birth Chart',
  showSignGlyphs: false  // Show numbers instead of symbols
});

// Use the SVG in your HTML
document.getElementById('chart')!.innerHTML = chartSVG;
```

## HTML Output Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Kundali Chart</title>
  <style>
    body { display: flex; justify-content: center; padding: 20px; }
    .chart { background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
  </style>
</head>
<body>
  <div class="chart">
    <!-- SVG will be inserted here -->
    <div id="chart"></div>
  </div>
  <script>
    // Generate and insert chart
  </script>
</body>
</html>
```

## API Summary

| Function | Description |
|----------|-------------|
| `generateRasiChart(date, lat, lon, tz)` | Generate Rasi (D-1) birth chart |
| `generateNavamsaChart(rasiChart)` | Generate Navamsa (D-9) chart |
| `generateNorthIndianChartSVG(chart, options)` | North Indian style SVG |
| `generateSouthIndianChartSVG(chart, options)` | South Indian style SVG |
| `calculateNavamsaSign(longitude)` | Calculate Navamsa sign for longitude |
| `getAyanamsa(jd, system)` | Get ayanamsa value |
| `calculateHouseCusps(jd, lat, lon, system)` | Calculate house cusps |

## Requirements

- Node.js >= 16.0.0
- npm or yarn

## Swiss Ephemeris

This library uses [Swiss Ephemeris](https://www.astro.com/swisseph/) for high-precision planetary calculations. The `ephe/` folder contains necessary ephemeris data files.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Keywords

vedic astrology, jyotish, kundali, horoscope, rasi chart, navamsa, birth chart, swisseph, hindu astrology, indian astrology, planetary positions, houses, nakshatra, rashis

## Related

- [Swiss Ephemeris](https://www.astro.com/swisseph/) - Astronomical calculations
- [AstroSage](https://www.astro.com/) - Online astrology calculations reference
- [Vedic Rishi](https://www.vedicrishi.com/) - Vedic astrology reference
