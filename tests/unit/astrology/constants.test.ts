import { describe, it, expect } from 'vitest';
import { Sign, SignNames, Nakshatras, Planet, PlanetNames } from '../../../src/astrology/constants';

describe('Constants', () => {
    describe('Sign', () => {
        it('should have 12 signs from 0-11', () => {
            expect(Sign.ARIES).toBe(0);
            expect(Sign.TAURUS).toBe(1);
            expect(Sign.GEMINI).toBe(2);
            expect(Sign.CANCER).toBe(3);
            expect(Sign.LEO).toBe(4);
            expect(Sign.VIRGO).toBe(5);
            expect(Sign.LIBRA).toBe(6);
            expect(Sign.SCORPIO).toBe(7);
            expect(Sign.SAGITTARIUS).toBe(8);
            expect(Sign.CAPRICORN).toBe(9);
            expect(Sign.AQUARIUS).toBe(10);
            expect(Sign.PISCES).toBe(11);
        });

        it('should have correct sign names', () => {
            expect(SignNames[Sign.ARIES].en).toBe('Aries');
            expect(SignNames[Sign.ARIES].sa).toBe('Mesha');
            expect(SignNames[Sign.TAURUS].en).toBe('Taurus');
            expect(SignNames[Sign.VIRGO].en).toBe('Virgo');
        });
    });

    describe('Nakshatras', () => {
        it('should have 27 nakshatras', () => {
            expect(Nakshatras.length).toBe(27);
        });

        it('should start with Ashwini and end with Revati', () => {
            expect(Nakshatras[0]).toBe('Ashwini');
            expect(Nakshatras[26]).toBe('Revati');
        });

        it('should contain common nakshatras', () => {
            expect(Nakshatras).toContain('Rohini');
            expect(Nakshatras).toContain('Pushya');
            expect(Nakshatras).toContain('Hasta');
            expect(Nakshatras).toContain('Mula');
        });
    });

    describe('Planet', () => {
        it('should have 9 planets from 0-8', () => {
            expect(Planet.SUN).toBe(0);
            expect(Planet.MOON).toBe(1);
            expect(Planet.MARS).toBe(2);
            expect(Planet.MERCURY).toBe(3);
            expect(Planet.JUPITER).toBe(4);
            expect(Planet.VENUS).toBe(5);
            expect(Planet.SATURN).toBe(6);
            expect(Planet.RAHU).toBe(7);
            expect(Planet.KETU).toBe(8);
        });

        it('should have correct planet names', () => {
            expect(PlanetNames[Planet.SUN].en).toBe('Sun');
            expect(PlanetNames[Planet.SUN].sa).toBe('Surya');
            expect(PlanetNames[Planet.MOON].en).toBe('Moon');
            expect(PlanetNames[Planet.MOON].sa).toBe('Chandra');
            expect(PlanetNames[Planet.KETU].en).toBe('Ketu');
        });
    });
});
