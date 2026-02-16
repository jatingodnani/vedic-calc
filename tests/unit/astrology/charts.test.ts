import { describe, it, expect } from 'vitest';
import { generateRasiChart, generateNavamsaChart, generateKundali, calculateNavamsaSign } from '../../../src/astrology/charts';
import { NodeType } from '../../../src/core/swisseph';

describe('Chart Generation', () => {
    const testDate = new Date('2000-01-01T12:00:00Z');
    const testLatitude = 22.7196; // Mumbai
    const testLongitude = 75.8577; // Mumbai

    describe('calculateNavamsaSign', () => {
        it('should calculate correct navamsa sign', () => {
            // Aries 0° -> Aries navamsa (0)
            expect(calculateNavamsaSign(0)).toBe(0);
            expect(calculateNavamsaSign(15)).toBe(4); // Aries 15° -> 5th navamsa of Aries = Leo (4)
        });

        it('should return all 12 signs in navamsa', () => {
            const navamsaSigns = new Set<number>();
            for (let i = 0; i < 360; i += 1) {
                navamsaSigns.add(calculateNavamsaSign(i));
            }
            expect(navamsaSigns.size).toBe(12);
        });
    });

    describe('generateRasiChart', () => {
        it('should generate complete Rasi chart', () => {
            const chart = generateRasiChart(testDate, testLatitude, testLongitude);

            expect(chart).toBeDefined();
            expect(chart.ascendant).toBeDefined();
            expect(chart.planets).toBeDefined();
            expect(chart.houses).toBeDefined();
            expect(chart.ayanamsa).toBeDefined();
        });

        it('should have 9 planets', () => {
            const chart = generateRasiChart(testDate, testLatitude, testLongitude);
            expect(chart.planets.length).toBe(9);
        });

        it('should have 12 houses', () => {
            const chart = generateRasiChart(testDate, testLatitude, testLongitude);
            expect(chart.houses.length).toBe(12);
        });

        it('should have valid birth data', () => {
            const chart = generateRasiChart(testDate, testLatitude, testLongitude, 'Asia/Kolkata');
            
            expect(chart.birthData.date).toBe(testDate);
            expect(chart.birthData.latitude).toBe(testLatitude);
            expect(chart.birthData.longitude).toBe(testLongitude);
            expect(chart.birthData.timezone).toBe('Asia/Kolkata');
        });

        it('should calculate ascendant correctly', () => {
            const chart = generateRasiChart(testDate, testLatitude, testLongitude);
            
            expect(chart.ascendant.degree).toBeGreaterThanOrEqual(0);
            expect(chart.ascendant.degree).toBeLessThan(360);
            expect(chart.ascendant.sign).toBeGreaterThanOrEqual(0);
            expect(chart.ascendant.sign).toBeLessThan(12);
        });

        it('should handle different node types', () => {
            const chartTrueNode = generateRasiChart(testDate, testLatitude, testLongitude, 'UTC', NodeType.TRUE_NODE);
            const chartMeanNode = generateRasiChart(testDate, testLatitude, testLongitude, 'UTC', NodeType.MEAN_NODE);

            expect(chartTrueNode).toBeDefined();
            expect(chartMeanNode).toBeDefined();
            // Both should have valid data
            expect(chartTrueNode.planets.length).toBe(9);
            expect(chartMeanNode.planets.length).toBe(9);
        });

        it('should place planets in correct houses', () => {
            const chart = generateRasiChart(testDate, testLatitude, testLongitude);
            
            chart.planets.forEach(planet => {
                expect(planet.house).toBeGreaterThanOrEqual(1);
                expect(planet.house).toBeLessThanOrEqual(12);
            });
        });

        it('should have valid nakshatra for all planets', () => {
            const chart = generateRasiChart(testDate, testLatitude, testLongitude);
            
            chart.planets.forEach(planet => {
                expect(planet.nakshatra).toBeDefined();
                expect(planet.nakshatra).toBeTruthy();
                expect(planet.nakshatraPada).toBeGreaterThanOrEqual(1);
                expect(planet.nakshatraPada).toBeLessThanOrEqual(4);
            });
        });
    });

    describe('generateNavamsaChart', () => {
        it('should generate navamsa chart from rasi chart', () => {
            const rasiChart = generateRasiChart(testDate, testLatitude, testLongitude);
            const navamsaChart = generateNavamsaChart(rasiChart);

            expect(navamsaChart).toBeDefined();
            expect(navamsaChart.planets).toBeDefined();
            expect(navamsaChart.ascendantNavamsa).toBeDefined();
        });

        it('should have 9 planets in navamsa', () => {
            const rasiChart = generateRasiChart(testDate, testLatitude, testLongitude);
            const navamsaChart = generateNavamsaChart(rasiChart);

            expect(navamsaChart.planets.length).toBe(9);
        });

        it('should have valid navamsa signs for all planets', () => {
            const rasiChart = generateRasiChart(testDate, testLatitude, testLongitude);
            const navamsaChart = generateNavamsaChart(rasiChart);

            navamsaChart.planets.forEach(planet => {
                expect(planet.navamsaSign).toBeGreaterThanOrEqual(0);
                expect(planet.navamsaSign).toBeLessThan(12);
                expect(planet.navamsaHouse).toBeGreaterThanOrEqual(1);
                expect(planet.navamsaHouse).toBeLessThanOrEqual(12);
            });
        });
    });

    describe('generateKundali', () => {
        it('should generate both rasi and navamsa charts', () => {
            const { rasi, navamsa } = generateKundali(testDate, testLatitude, testLongitude);

            expect(rasi).toBeDefined();
            expect(navamsa).toBeDefined();
            expect(rasi.planets.length).toBe(9);
            expect(navamsa.planets.length).toBe(9);
        });

        it('should accept options parameter', () => {
            const { rasi } = generateKundali(testDate, testLatitude, testLongitude, 'Asia/Kolkata', {
                nodeType: NodeType.MEAN_NODE
            });

            expect(rasi).toBeDefined();
        });
    });
});
