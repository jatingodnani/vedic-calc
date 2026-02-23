import { describe, it, expect } from 'vitest';
import { getSign, getDegreeInSign, getNakshatra, getNakshatraPada, calculatePlanetaryPosition } from '../../../src/astrology/planetaryPosition';
import { Sign } from '../../../src/astrology/constants';

describe('Planetary Position', () => {
    describe('getSign', () => {
        it('should return correct sign for degree 0-30', () => {
            expect(getSign(0)).toBe(Sign.ARIES);
            expect(getSign(15)).toBe(Sign.ARIES);
            expect(getSign(29.99)).toBe(Sign.ARIES);
        });

        it('should return correct sign for each sign boundary', () => {
            expect(getSign(30)).toBe(Sign.TAURUS);
            expect(getSign(60)).toBe(Sign.GEMINI);
            expect(getSign(90)).toBe(Sign.CANCER);
            expect(getSign(120)).toBe(Sign.LEO);
            expect(getSign(150)).toBe(Sign.VIRGO);
            expect(getSign(180)).toBe(Sign.LIBRA);
            expect(getSign(210)).toBe(Sign.SCORPIO);
            expect(getSign(240)).toBe(Sign.SAGITTARIUS);
            expect(getSign(270)).toBe(Sign.CAPRICORN);
            expect(getSign(300)).toBe(Sign.AQUARIUS);
            expect(getSign(330)).toBe(Sign.PISCES);
        });

        it('should handle wrap around at 360', () => {
            expect(getSign(359.99)).toBe(Sign.PISCES);
            expect(getSign(360)).toBe(Sign.ARIES);
        });

        it('should handle negative angles', () => {
            expect(getSign(-30)).toBe(Sign.PISCES);
            expect(getSign(-90)).toBe(Sign.CAPRICORN);
        });
    });

    describe('getDegreeInSign', () => {
        it('should return correct degree within sign', () => {
            expect(getDegreeInSign(0)).toBe(0);
            expect(getDegreeInSign(15)).toBe(15);
            expect(getDegreeInSign(30)).toBe(0); // Start of next sign
            expect(getDegreeInSign(45)).toBe(15);
            expect(getDegreeInSign(359)).toBe(29);
        });
    });

    describe('getNakshatra', () => {
        it('should return correct nakshatra', () => {
            expect(getNakshatra(0)).toBe('Ashwini');
            expect(getNakshatra(13.33)).toBe('Ashwini');
            expect(getNakshatra(13.34)).toBe('Bharani');
            expect(getNakshatra(360)).toBe('Ashwini');
        });

        it('should return all 27 nakshatras', () => {
            const nakshatras = new Set();
            for (let i = 0; i < 360; i += 13.34) {
                nakshatras.add(getNakshatra(i));
            }
            expect(nakshatras.size).toBe(27);
        });
    });

    describe('getNakshatraPada', () => {
        it('should return correct pada (1-4)', () => {
            expect(getNakshatraPada(0)).toBe(1);
            expect(getNakshatraPada(3.33)).toBe(1);
            expect(getNakshatraPada(3.34)).toBe(2);
            expect(getNakshatraPada(6.66)).toBe(2);
            expect(getNakshatraPada(6.67)).toBe(3);
            expect(getNakshatraPada(10)).toBe(4);
            expect(getNakshatraPada(13.34)).toBe(1); // Next nakshatra
        });
    });

    describe('calculatePlanetaryPosition', () => {
        it('should return complete planetary position', () => {
            const pos = calculatePlanetaryPosition(45.5, 0, 1);

            expect(pos.longitude).toBe(45.5);
            expect(pos.sign).toBe(Sign.TAURUS);
            expect(pos.degreeInSign).toBe(15.5);
            expect(pos.isRetrograde).toBe(false);
        });

        it('should detect retrograde planets', () => {
            const posDirect = calculatePlanetaryPosition(100, 0, 1);
            const posRetrograde = calculatePlanetaryPosition(100, 0, -1);

            expect(posDirect.isRetrograde).toBe(false);
            expect(posRetrograde.isRetrograde).toBe(true);
        });
    });
});
