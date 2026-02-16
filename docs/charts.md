---
title: Chart Rendering - Vedic Astro
description: Learn how to customize SVG charts with themes, colors, layouts, and styling options in Kundali Charts SDK.
keywords:
  - svg chart rendering
  - north indian chart
  - south indian chart
  - chart customization
  - chart themes
  - kundali visualization
---

# Chart Rendering

Kundali Charts provides two SVG chart styles: North Indian and South Indian. Both can be extensively customized.

## Chart Styles

### North Indian Chart

The North Indian chart uses a diamond grid layout, common in North India.

```typescript
import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';

const chart = generateRasiChart(date, lat, lon, tz);

const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  title: 'My Birth Chart'
});
```

### South Indian Chart

The South Indian chart uses a 3x4 grid layout, common in South India.

```typescript
import { generateSouthIndianChartSVG } from 'vedic-calc';

const svg = generateSouthIndianChartSVG(chart, {
  showTable: true,
  title: 'My Birth Chart'
});
```

## Customization Options

### Basic Options

```typescript
const options = {
  // Display options
  showTable: true,        // Show/hide planet table
  showSignGlyphs: true,   // Show ♈♉♊ symbols
  showSignNumbers: true,  // Show 1-12 numbers
  showDegrees: true,      // Show planet degrees
  
  // Layout
  title: 'My Kundali',    // Chart title
  width: 400,            // Chart width
  height: 300,          // Chart height
  
  // South Indian only
  cellWidth: 150,        // Cell width
  cellHeight: 100       // Cell height
};
```

### Color Customization

```typescript
const customConfig = {
  colors: {
    background: '#FFFFFF',    // Chart background
    border: '#422762',        // Outer border
    innerLines: '#422762',    // Grid lines
    signNumber: '#422762',    // Sign numbers
    text: '#1A1A2E',          // Main text
    retrograde: '#D63031',   // Retrograde planets
  }
};

const svg = generateNorthIndianChartSVG(chart, {
  customConfig
});
```

## Pre-built Themes

### Dark Theme

```typescript
import { PREBUILT_THEMES } from 'vedic-calc';

const svg = generateNorthIndianChartSVG(chart, {
  customConfig: {
    colors: PREBUILT_THEMES.dark.colors
  }
});
```

### Ocean Theme

```typescript
const svg = generateNorthIndianChartSVG(chart, {
  customConfig: {
    colors: PREBUILT_THEMES.ocean.colors
  }
});
```

### Forest Theme

```typescript
const svg = generateNorthIndianChartSVG(chart, {
  customConfig: {
    colors: PREBUILT_THEMES.forest.colors
  }
});
```

### Golden Theme

```typescript
const svg = generateNorthIndianChartSVG(chart, {
  customConfig: {
    colors: PREBUILT_THEMES.golden.colors
  }
});
```

## Complete Example

```typescript
import { 
  generateRasiChart, 
  generateNorthIndianChartSVG
} from 'vedic-calc';

const chart = generateRasiChart(
  new Date('1990-04-29T21:15:00+05:30'),
  16.544893,
  81.521240,
  'Asia/Kolkata'
);

// Generate SVG chart
const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  width: 500,
  height: 400,
});

// Embed in HTML
const container = document.getElementById('kundali');
container.innerHTML = svg;
```
    colors: {
      background: '#1a1a2e',
      border: '#e94560',
      innerLines: '#e94560',
      signNumber: '#e94560',
      text: '#ffffff',
      retrograde: '#ff6b6b',
    }
  }
});

// Embed in HTML
const container = document.getElementById('kundali');
container.innerHTML = svg;
```

## HTML Integration

```html
<!DOCTYPE html>
<html>
<head>
  <title>Kundali Chart</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .chart-container {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
  </style>
</head>
<body>
  <div class="chart-container" id="kundali"></div>
  
  <script type="module">
    import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';
    
    const chart = generateRasiChart(
      new Date('1990-04-29T21:15:00+05:30'),
      16.544893,
      81.521240,
      'Asia/Kolkata'
    );
    
    const svg = generateNorthIndianChartSVG(chart, {
      showTable: true,
      title: 'My Birth Chart'
    });
    
    document.getElementById('kundali').innerHTML = svg;
  </script>
</body>
</html>
```

## Chart Comparison

| Feature | North Indian | South Indian |
|---------|--------------|--------------|
| Layout | Diamond grid | 3x4 grid |
| Best for | Quick overview | Detailed view |
| Table position | Side | Bottom |
| Default orientation | - | Signs 1-12 left to right |

## Tips

1. **Use appropriate size** - Set width/height based on where you'll display
2. **Choose right style** - North Indian for overview, South Indian for details
3. **Theme matching** - Match chart theme to your app's design
4. **Show/hide elements** - Customize what information to display
