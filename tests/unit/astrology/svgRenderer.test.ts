import { describe, it, expect } from 'vitest';
import { generateNorthIndianChartSVG } from '../../../src/astrology/svgRenderer';
import { generateRasiChart } from '../../../src/astrology/charts';

describe('SVG Renderer', () => {
    const testDate = new Date('2000-01-01T12:00:00Z');
    const testLatitude = 22.7196;
    const testLongitude = 75.8577;

    it('should generate SVG string', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart);

        expect(svg).toBeDefined();
        expect(typeof svg).toBe('string');
        expect(svg.startsWith('<svg')).toBe(true);
        expect(svg.endsWith('</svg>')).toBe(true);
    });

    it('should include chart structure elements', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart);

        expect(svg).toContain('viewBox');
        expect(svg).toContain('xmlns');
    });

    it('should render with table by default', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart);

        expect(svg).toContain('Planet');
        expect(svg).toContain('Sign');
        expect(svg).toContain('Degree');
    });

    it('should render without table when disabled', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart, { showTable: false });

        expect(svg).not.toContain('Planet');
    });

    it('should accept custom dimensions', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart, { width: 800, height: 600 });

        expect(svg).toContain('viewBox="0 0 800');
    });

    it('should support column layout', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart, { layout: 'column' });

        expect(svg).toContain('viewBox');
    });

    it('should include all 12 house numbers', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart, { showTable: false });

        for (let i = 1; i <= 12; i++) {
            expect(svg).toContain(`>${i}<`);
        }
    });

    it('should include planet abbreviations', () => {
        const chart = generateRasiChart(testDate, testLatitude, testLongitude);
        const svg = generateNorthIndianChartSVG(chart);

        const planetAbbrs = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
        planetAbbrs.forEach(abbr => {
            expect(svg).toContain(abbr);
        });
    });
});
