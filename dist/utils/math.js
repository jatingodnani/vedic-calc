"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAngle = normalizeAngle;
exports.decimalToDms = decimalToDms;
exports.formatDms = formatDms;
/**
 * Normalizes an angle to the 0-360 degree range.
 * @param angle The angle in degrees (can be negative or > 360)
 * @returns Angle in range [0, 360)
 */
function normalizeAngle(angle) {
    let normalized = angle % 360;
    if (normalized < 0) {
        normalized += 360;
    }
    return normalized;
}
/**
 * Converts Decimal Degrees to Degrees, Minutes, Seconds
 * @param decimal The decimal degree value (e.g., 23.55)
 * @returns Object { d, m, s }
 */
function decimalToDms(decimal) {
    const d = Math.floor(decimal);
    const remainderMinutes = (decimal - d) * 60;
    const m = Math.floor(remainderMinutes);
    const s = Math.round((remainderMinutes - m) * 60);
    return { d, m, s };
}
/**
 * Formatting helper
 */
function formatDms(decimal) {
    const { d, m, s } = decimalToDms(decimal);
    return `${d}° ${m}' ${s}"`;
}
