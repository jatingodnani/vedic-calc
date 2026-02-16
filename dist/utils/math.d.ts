/**
 * Normalizes an angle to the 0-360 degree range.
 * @param angle The angle in degrees (can be negative or > 360)
 * @returns Angle in range [0, 360)
 */
export declare function normalizeAngle(angle: number): number;
/**
 * Converts Decimal Degrees to Degrees, Minutes, Seconds
 * @param decimal The decimal degree value (e.g., 23.55)
 * @returns Object { d, m, s }
 */
export declare function decimalToDms(decimal: number): {
    d: number;
    m: number;
    s: number;
};
/**
 * Formatting helper
 */
export declare function formatDms(decimal: number): string;
//# sourceMappingURL=math.d.ts.map