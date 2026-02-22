import { describe, it, expect } from 'vitest';
import { generateRasiChart } from '../../../src/astrology/charts';
import { getVimshottariDasha } from '../../../src/astrology/dasha';

describe('Vimshottari Dasha Calculations', () => {
    // 29-Apr-1990 at 21:15 IST (15:45 Z)
    const testDate = new Date('1990-04-29T15:45:00Z');
    const testLatitude = 16.5449;
    const testLongitude = 81.5212;

    const chart = generateRasiChart(testDate, testLatitude, testLongitude);
    const dashaTimeline = getVimshottariDasha(chart);

    it('should calculate the correct starting Mahadasha planet', () => {
        // Moon is at ~77.65 degrees on 1990-04-29T15:45Z
        // This is Ardra Nakshatra, which is ruled by Rahu.
        expect(dashaTimeline[0].planet).toBe('Rahu');
    });

    it('should generate exactly 10 Mahadashas (wrapping the remainder of the first planet\'s period)', () => {
        // Because a person is born in the middle of a Mahadasha, the remainder
        // is appended at the very end to exactly equal 120 years of life.
        expect(dashaTimeline.length).toBe(10);
    });

    it('should calculate the correct sequence of Mahadashas', () => {
        const expectedSequence = [
            'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu'
        ];

        const actualSequence = dashaTimeline.map(m => m.planet);
        expect(actualSequence).toEqual(expectedSequence);
    });

    it('should ensure chronological continuity between Mahadashas', () => {
        for (let i = 0; i < dashaTimeline.length - 1; i++) {
            const currentPeriod = dashaTimeline[i];
            const nextPeriod = dashaTimeline[i + 1];

            // The end of one period must perfectly match the start of the next period
            expect(currentPeriod.end.getTime()).toBeCloseTo(nextPeriod.start.getTime(), -2); // -2 allows ~100ms tolerance for JS floating point
        }
    });

    it('should span approximately 120 years', () => {
        const firstDate = dashaTimeline[0].start;
        const lastDate = dashaTimeline[dashaTimeline.length - 1].end;

        // Duration in milliseconds
        const totalDurationMs = lastDate.getTime() - firstDate.getTime();

        // Expected ~120 solar years (365.2425 days/year)
        const expectedMs = 120 * 365.2425 * 24 * 60 * 60 * 1000;

        // Use a wide tolerance to account for the exact fractional start dates and leap seconds
        expect(totalDurationMs).toBeCloseTo(expectedMs, -9);
    });

    describe('Antardashas', () => {
        it('should generate up to 9 Antardashas per Mahadasha', () => {
            dashaTimeline.forEach((mahadasha, index) => {
                const isFirstOrLast = (index === 0 || index === dashaTimeline.length - 1);

                if (isFirstOrLast && mahadasha.antardashas.length < 9) {
                    // First and last periods are truncated portions, so they may have fewer than 9 antardashas 
                    // depending on how late into the Mahadasha the person was born.
                    expect(mahadasha.antardashas.length).toBeGreaterThan(0);
                    expect(mahadasha.antardashas.length).toBeLessThan(10);
                } else {
                    // Middle full periods must have exactly 9
                    expect(mahadasha.antardashas.length).toBe(9);
                }
            });
        });

        it('should start the first Antardasha with the Mahadasha lord', () => {
            dashaTimeline.forEach(mahadasha => {
                if (mahadasha.antardashas.length === 9) { // First mahadasha might be truncated
                    expect(mahadasha.antardashas[0].planet).toBe(mahadasha.planet);
                }
            });
        });

        it('should sum Antardasha durations to equal parent Mahadasha duration', () => {
            dashaTimeline.forEach(mahadasha => {
                let sumDurations = 0;
                mahadasha.antardashas.forEach(ad => {
                    sumDurations += ad.durationYears;
                });

                // Allow very slight floating point tolerance
                expect(sumDurations).toBeCloseTo(mahadasha.durationYears, 4);
            });
        });

        it('should maintain chronological continuity within Antardashas', () => {
            dashaTimeline.forEach(mahadasha => {
                for (let i = 0; i < mahadasha.antardashas.length - 1; i++) {
                    const currentAd = mahadasha.antardashas[i];
                    const nextAd = mahadasha.antardashas[i + 1];

                    expect(currentAd.end.getTime()).toBeCloseTo(nextAd.start.getTime(), -2);
                }
            });
        });
    });
});
