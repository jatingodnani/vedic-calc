import { RasiChart } from './charts';
import { Planet, Sign } from './constants';

/**
 * SVG Renderer for North Indian Chart (AstroSage-Inspired Clean Style)
 *
 * White background, deep purple (#422762) borders, clean professional look.
 */

const CONFIG = {
    WIDTH: 400,
    HEIGHT: 300,
    COLORS: {
        background: '#FFFFFF',
        border: '#422762',
        innerLines: '#422762',
        signNumber: '#422762',
        text: '#1A1A2E',
        retrograde: '#D63031',
        tableHeaderBg: '#422762',
        tableHeaderText: '#FFFFFF',
        tableRowEven: '#F8F5FC',
        tableRowOdd: '#FFFFFF',
        tableBorder: '#422762',
        tableText: '#2D2D3F',
        tableTextSecondary: '#5A5A7A',
    },
    FONTS: {
        family: "'Segoe UI', 'Arial', 'Helvetica', sans-serif",
        planetSize: 12,
        degreeSize: 8,
        signSize: 11,
    }
};



const PLANET_ABBR: Record<Planet, string> = {
    [Planet.SUN]: 'Su',
    [Planet.MOON]: 'Mo',
    [Planet.MARS]: 'Ma',
    [Planet.MERCURY]: 'Me',
    [Planet.JUPITER]: 'Ju',
    [Planet.VENUS]: 'Ve',
    [Planet.SATURN]: 'Sa',
    [Planet.RAHU]: 'Ra',
    [Planet.KETU]: 'Ke',
};

function getPlanetColor(planet: Planet, isRetrograde: boolean): string {
    if (isRetrograde) return CONFIG.COLORS.retrograde;
    // Return a standard dark text color for all planets
    return '#333333';
}

function getSignNumberColor(_sign: Sign): string {
    return '#422762';
}

interface HouseCenter {
    x: number;
    y: number;
    signPos: { x: number, y: number };
}

function getHouseCenters(w: number, h: number): Record<number, HouseCenter> {
    const cx = w / 2;
    const cy = h / 2;
    const scaleX = w / 700;
    const scaleY = h / 700;

    const base = {
        1: { x: 0, y: -175, signPos: { x: 0, y: -235 } },
        2: { x: -175, y: -225, signPos: { x: -230, y: -260 } },
        3: { x: -225, y: -175, signPos: { x: -260, y: -230 } },
        4: { x: -175, y: 0, signPos: { x: -235, y: 0 } },
        5: { x: -225, y: 175, signPos: { x: -260, y: 230 } },
        6: { x: -175, y: 225, signPos: { x: -230, y: 260 } },
        7: { x: 0, y: 175, signPos: { x: 0, y: 235 } },
        8: { x: 175, y: 225, signPos: { x: 230, y: 260 } },
        9: { x: 225, y: 175, signPos: { x: 260, y: 230 } },
        10: { x: 175, y: 0, signPos: { x: 235, y: 0 } },
        11: { x: 225, y: -175, signPos: { x: 260, y: -230 } },
        12: { x: 175, y: -225, signPos: { x: 230, y: -260 } },
    };

    const centers: Record<number, HouseCenter> = {};
    Object.entries(base).forEach(([key, value]) => {
        const num = Number(key);
        centers[num] = {
            x: cx + value.x * scaleX,
            y: cy + value.y * scaleY,
            signPos: {
                x: cx + value.signPos.x * scaleX,
                y: cy + value.signPos.y * scaleY,
            },
        };
    });

    return centers;
}

function generatePlanetTable(
    chart: RasiChart,
    startX: number,
    startY: number,
    width: number,
    tableHeight: number
): string {
    const rowHeight = 24;
    const headers = ['Planet', 'Sign No', 'Sign', 'Degree', 'Nakshatra', 'House'];
    const colWidths = [80, 60, 110, 60, 140, 50];
    const left = startX + 10;
    const tableWidth = width - 20;

    // Table container with rounded corners and purple border
    let content = `
        <rect x="${left}" y="${startY}" width="${tableWidth}" height="${tableHeight}" 
              fill="${CONFIG.COLORS.background}" stroke="${CONFIG.COLORS.tableBorder}" stroke-width="2" rx="6" />
        <rect x="${left}" y="${startY}" width="${tableWidth}" height="${rowHeight}" 
              fill="${CONFIG.COLORS.tableHeaderBg}" rx="6" />
        <rect x="${left}" y="${startY + 6}" width="${tableWidth}" height="${rowHeight - 6}" 
              fill="${CONFIG.COLORS.tableHeaderBg}" />
    `;

    // Header text
    let currentX = left + 12;
    headers.forEach((h, i) => {
        content += `<text x="${currentX}" y="${startY + 17}" 
                       font-family="${CONFIG.FONTS.family}" font-size="11" font-weight="700" 
                       fill="${CONFIG.COLORS.tableHeaderText}">
                       ${h.toUpperCase()}
                    </text>`;
        currentX += colWidths[i];
    });

    // Rows
    chart.planets.forEach((p, idx) => {
        const y = startY + rowHeight + (idx * rowHeight);
        const bg = idx % 2 === 0 ? CONFIG.COLORS.tableRowOdd : CONFIG.COLORS.tableRowEven;
        content += `<rect x="${left}" y="${y}" width="${tableWidth}" height="${rowHeight}" fill="${bg}" />`;

        // Bottom border for each row (subtle separator)
        content += `<line x1="${left}" y1="${y + rowHeight}" x2="${left + tableWidth}" y2="${y + rowHeight}" 
                          stroke="#E8E0F0" stroke-width="0.5" />`;

        const abbr = PLANET_ABBR[p.planet];
        const planetName = p.isRetrograde ? `${abbr} ℞` : abbr;
        const planetColor = getPlanetColor(p.planet, p.isRetrograde);
        const degree = Math.round(p.degreeInSign) + '°';
        const signNumber = p.sign + 1;
        const signStr = p.signName;

        let cx = left + 12;
        content += `<text x="${cx}" y="${y + 16}" font-family="${CONFIG.FONTS.family}" 
                         font-size="12" font-weight="700" fill="${planetColor}">${planetName}</text>`;
        cx += colWidths[0];

        content += `<text x="${cx}" y="${y + 16}" font-family="${CONFIG.FONTS.family}" 
                         font-size="11" font-weight="700" fill="${CONFIG.COLORS.signNumber}">${signNumber}</text>`;
        cx += colWidths[1];

        content += `<text x="${cx}" y="${y + 16}" font-family="${CONFIG.FONTS.family}" 
                         font-size="11" fill="${CONFIG.COLORS.tableText}">${signStr}</text>`;
        cx += colWidths[2];

        content += `<text x="${cx}" y="${y + 16}" font-family="${CONFIG.FONTS.family}" 
                         font-size="11" fill="${CONFIG.COLORS.tableTextSecondary}">${degree}</text>`;
        cx += colWidths[3];

        content += `<text x="${cx}" y="${y + 16}" font-family="${CONFIG.FONTS.family}" 
                         font-size="10" fill="${CONFIG.COLORS.tableTextSecondary}">${p.nakshatra} (${p.nakshatraPada})</text>`;
        cx += colWidths[4];

        content += `<text x="${cx}" y="${y + 16}" font-family="${CONFIG.FONTS.family}" 
                         font-size="11" font-weight="700" fill="${CONFIG.COLORS.signNumber}">${p.house}</text>`;
    });

    return content;
}

export function generateNorthIndianChartSVG(
    chart: RasiChart,
    options?: { showTable?: boolean; width?: number; height?: number; layout?: 'row' | 'column'; tableWidth?: number }
): string {
    const chartW = options?.width || CONFIG.WIDTH;
    const chartH = options?.height || CONFIG.HEIGHT;
    const showTable = options?.showTable ?? true;
    const layout = options?.layout || 'row';

    const rowHeight = 24;
    const tableHeight = showTable ? (rowHeight * (chart.planets.length + 1) + 12) : 0;
    const tableWidth = options?.tableWidth || 520;
    const gap = 12;

    let totalW = chartW;
    let totalH = chartH;
    let tableX = 0;
    let tableY = 0;

    if (showTable) {
        if (layout === 'row') {
            totalW = chartW + gap + tableWidth;
            totalH = Math.max(chartH, tableHeight);
            tableX = chartW + gap;
            tableY = 0;
        } else {
            totalW = Math.max(chartW, tableWidth);
            totalH = chartH + gap + tableHeight;
            tableX = 0;
            tableY = chartH + gap;
        }
    }

    const centers = getHouseCenters(chartW, chartH);
    const ascendantSign = chart.ascendant.sign;
    const margin = 6;

    // White background with purple border — clean outer rect
    const base = `
        <rect x="0" y="0" width="${totalW}" height="${totalH}" fill="${CONFIG.COLORS.background}" />
        <rect x="${margin}" y="${margin}" width="${chartW - margin * 2}" height="${chartH - margin * 2}"
              fill="${CONFIG.COLORS.background}" stroke="${CONFIG.COLORS.border}" stroke-width="2.5" />
    `;

    // Solid lines for a clean, traditional look (no dashes)
    const lines = `
        <g stroke="${CONFIG.COLORS.innerLines}" stroke-width="1.5" opacity="1">
            <line x1="${margin}" y1="${margin}" x2="${chartW - margin}" y2="${chartH - margin}" />
            <line x1="${chartW - margin}" y1="${margin}" x2="${margin}" y2="${chartH - margin}" />
            <line x1="${margin}" y1="${chartH / 2}" x2="${chartW / 2}" y2="${margin}" />
            <line x1="${chartW / 2}" y1="${margin}" x2="${chartW - margin}" y2="${chartH / 2}" />
            <line x1="${chartW - margin}" y1="${chartH / 2}" x2="${chartW / 2}" y2="${chartH - margin}" />
            <line x1="${chartW / 2}" y1="${chartH - margin}" x2="${margin}" y2="${chartH / 2}" />
        </g>
    `;

    let content = '';

    for (let i = 1; i <= 12; i++) {
        const center = centers[i];
        const houseSignIndex = (ascendantSign + i - 1) % 12;
        const signNumber = houseSignIndex + 1;
        const signColor = getSignNumberColor(houseSignIndex as Sign);

        content += `<text x="${center.signPos.x}" y="${center.signPos.y}" 
                       font-family="${CONFIG.FONTS.family}" 
                       font-size="${CONFIG.FONTS.signSize}" 
                       fill="${signColor}" 
                       font-weight="700"
                       text-anchor="middle" dominant-baseline="middle">${signNumber}</text>`;

        const planets = chart.planets.filter(p => p.house === i);
        if (planets.length > 0) {
            const lineHeight = 14;
            const startY = center.y - ((planets.length - 1) * lineHeight) / 2;

            planets.forEach((p, idx) => {
                const abbr = PLANET_ABBR[p.planet];
                const text = p.isRetrograde ? `${abbr}℞` : abbr;
                const color = getPlanetColor(p.planet, p.isRetrograde);
                const deg = Math.round(p.degreeInSign);

                content += `<text x="${center.x}" y="${startY + (idx * lineHeight)}"
                           font-family="${CONFIG.FONTS.family}"
                           font-size="${CONFIG.FONTS.planetSize}"
                           fill="${color}"
                           font-weight="700"
                           text-anchor="middle" dominant-baseline="middle">${text}<tspan dx="1" dy="-5" font-size="${CONFIG.FONTS.degreeSize}">${deg}</tspan></text>`;
            });
        }
    }

    const table = showTable ? generatePlanetTable(chart, tableX, tableY + 6, tableWidth, tableHeight) : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}">
        ${base}
        ${lines}
        ${content}
        ${table}
    </svg>`;
}
