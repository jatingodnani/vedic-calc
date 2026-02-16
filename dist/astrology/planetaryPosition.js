"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSign = getSign;
exports.getDegreeInSign = getDegreeInSign;
exports.getNakshatra = getNakshatra;
exports.getNakshatraPada = getNakshatraPada;
exports.calculatePlanetaryPosition = calculatePlanetaryPosition;
const constants_1 = require("./constants");
const math_1 = require("../utils/math");
/**
 * Calculates which Sign (Rashi) the longitude falls in
 * @param longitude Sidereal longitude (0-360)
 * @returns Sign enum value (0-11)
 */
function getSign(longitude) {
    const normalized = (0, math_1.normalizeAngle)(longitude);
    return Math.floor(normalized / 30);
}
/**
 * Calculates degrees within the current sign
 * @param longitude Sidereal longitude (0-360)
 * @returns Degrees (0-30)
 */
function getDegreeInSign(longitude) {
    const normalized = (0, math_1.normalizeAngle)(longitude);
    return normalized % 30;
}
/**
 * Calculates which Nakshatra the longitude falls in
 * Each Nakshatra is 13°20' (13.333...)
 * @param longitude Sidereal longitude (0-360)
 * @returns Nakshatra name
 */
function getNakshatra(longitude) {
    const normalized = (0, math_1.normalizeAngle)(longitude);
    const nakshatraSize = 360 / 27; // 13.333...
    const index = Math.floor(normalized / nakshatraSize);
    return constants_1.Nakshatras[index];
}
/**
 * Calculates which Pada (quarter) within the Nakshatra
 * Each Nakshatra has 4 padas of 3°20' each
 * @param longitude Sidereal longitude (0-360)
 * @returns Pada number (1-4)
 */
function getNakshatraPada(longitude) {
    const normalized = (0, math_1.normalizeAngle)(longitude);
    const nakshatraSize = 360 / 27;
    const padaSize = nakshatraSize / 4; // 3.333...
    const positionInNakshatra = normalized % nakshatraSize;
    return Math.floor(positionInNakshatra / padaSize) + 1; // 1-indexed
}
/**
 * Main calculator: Converts raw longitude to complete planetary position
 */
function calculatePlanetaryPosition(longitude, latitude, speed) {
    const sign = getSign(longitude);
    return {
        longitude,
        latitude,
        speed,
        sign,
        signName: constants_1.SignNames[sign],
        degreeInSign: getDegreeInSign(longitude),
        nakshatra: getNakshatra(longitude),
        nakshatraPada: getNakshatraPada(longitude),
        isRetrograde: speed < 0,
    };
}
