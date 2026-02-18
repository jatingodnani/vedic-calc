---
title: Chart Rendering - Vedic Calc
description: Learn how to customize SVG charts with themes, colors, layouts, and styling options in Vedic Calc SDK.
keywords:
  - svg chart rendering
  - north indian chart
  - chart customization
  - chart themes
  - kundali visualization
---

# Chart Rendering

Vedic Calc provides a North Indian diamond-grid SVG chart style that can be extensively customized.

## Chart Style

### North Indian Chart

The North Indian chart uses a diamond grid layout, common in North India. It is generated as a complete inline SVG string ready to embed in HTML or save as a `.svg` file.

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
  title: 'My Birth Chart'
});
```

## Customization Options

```typescript
const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,        // Show/hide planet details table (default: true)
  layout: 'row',          // 'row' (table beside chart) | 'column' (table below)
  title: 'My Kundali',    // Chart title
  width: 400,             // Chart width in pixels (default: 400)
  height: 300,            // Chart height in pixels (default: 300)
  tableWidth: 520,        // Planet table width in pixels (default: 520)
});
```

### Chart Layout Modes

**Row layout** (default) — table appears to the right of the chart:

```
+----------+ +-------------------------+
|  Chart   | |     Planet Table        |
+----------+ +-------------------------+
```

**Column layout** — table appears below the chart:

```
+----------+
|  Chart   |
+----------+
+--------------------------------------+
|            Planet Table              |
+--------------------------------------+
```

### Color Customization

```typescript
const svg = generateNorthIndianChartSVG(chart, {
  customConfig: {
    colors: {
      background: '#FFFFFF',    // Chart background
      border: '#422762',        // Outer border
      innerLines: '#422762',    // Grid lines
      signNumber: '#422762',    // Sign numbers
      text: '#1A1A2E',          // Main text
      retrograde: '#D63031',    // Retrograde planets (red)
    }
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
  16.5449,
  81.5212,
  'Asia/Kolkata'
);

// Generate SVG chart
const svg = generateNorthIndianChartSVG(chart, {
  showTable: true,
  layout: 'row',
  width: 500,
  height: 400,
});

// Embed in HTML
const container = document.getElementById('kundali');
container.innerHTML = svg;
```

## HTML Integration

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kundali Chart</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f0ff;
    }
    .chart-container {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(66, 39, 98, 0.15);
    }
  </style>
</head>
<body>
  <div class="chart-container" id="kundali"></div>

  <script type="module">
    import { generateRasiChart, generateNorthIndianChartSVG } from 'vedic-calc';

    const chart = generateRasiChart(
      new Date('1990-04-29T21:15:00+05:30'),
      16.5449,
      81.5212,
      'Asia/Kolkata'
    );

    const svg = generateNorthIndianChartSVG(chart, {
      showTable: true,
      title: 'My Birth Chart',
      width: 450,
      height: 350,
    });

    document.getElementById('kundali').innerHTML = svg;
  </script>
</body>
</html>
```

## Tips

1. **Use appropriate size** - Set `width`/`height` based on where you'll display the chart
2. **Layout choice** - Use `'row'` for wide containers, `'column'` for narrow/mobile layouts
3. **Color customization** - Match the chart colors to your app's design system
4. **Show/hide elements** - Use `showTable` to control whether the planet details table is shown
