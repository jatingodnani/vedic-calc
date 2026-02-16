import { describe, it, expect } from 'vitest';
import { normalizeAngle, decimalToDms, formatDms } from '../../../src/utils/math';

describe('Math Utils', () => {
    describe('normalizeAngle', () => {
        it('should return angle in 0-360 range', () => {
            expect(normalizeAngle(0)).toBe(0);
            expect(normalizeAngle(360)).toBe(0);
            expect(normalizeAngle(180)).toBe(180);
            expect(normalizeAngle(720)).toBe(0);
        });

        it('should handle negative angles', () => {
            expect(normalizeAngle(-90)).toBe(270);
            expect(normalizeAngle(-180)).toBe(180);
            expect(normalizeAngle(-360)).toBe(0);
        });

        it('should handle decimal angles', () => {
            expect(normalizeAngle(45.5)).toBe(45.5);
            expect(normalizeAngle(400.25)).toBe(40.25);
        });
    });

    describe('decimalToDms', () => {
        it('should convert decimal degrees to DMS', () => {
            expect(decimalToDms(0)).toEqual({ d: 0, m: 0, s: 0 });
            expect(decimalToDms(30)).toEqual({ d: 30, m: 0, s: 0 });
            expect(decimalToDms(30.5)).toEqual({ d: 30, m: 30, s: 0 });
            expect(decimalToDms(30.516)).toEqual({ d: 30, m: 30, s: 58 });
        });

        it('should handle full circle', () => {
            expect(decimalToDms(359.999)).toEqual({ d: 359, m: 59, s: 58 });
        });
    });

    describe('formatDms', () => {
        it('should format DMS string correctly', () => {
            expect(formatDms(0)).toBe("0° 0' 0\"");
            expect(formatDms(30.5)).toBe("30° 30' 0\"");
            expect(formatDms(45.123)).toBe("45° 7' 22\"");
        });
    });
});
