import { Sign, SignNames, Nakshatras, NakshatraName } from './constants';
import { normalizeAngle } from '../utils/math';

/**
 * Complete planetary position data
 */
export interface PlanetaryPosition {
    longitude: number;          // Sidereal longitude (0-360)
    latitude: number;
    speed: number;
    sign: Sign;                 // Which Rashi (0-11)
    signName: { en: string; sa: string };
    degreeInSign: number;       // Degrees within the sign (0-30)
    nakshatra: NakshatraName;   // Which Nakshatra
    nakshatraPada: number;      // Which quarter (1-4)
    isRetrograde: boolean;
}

/**
 * Calculates which Sign (Rashi) the longitude falls in
 * @param longitude Sidereal longitude (0-360)
 * @returns Sign enum value (0-11)
 */
export function getSign(longitude: number): Sign {
    const normalized = normalizeAngle(longitude);
    return Math.floor(normalized / 30) as Sign;
}

/**
 * Calculates degrees within the current sign
 * @param longitude Sidereal longitude (0-360)
 * @returns Degrees (0-30)
 */
export function getDegreeInSign(longitude: number): number {
    const normalized = normalizeAngle(longitude);
    return normalized % 30;
}

/**
 * Calculates which Nakshatra the longitude falls in
 * Each Nakshatra is 13°20' (13.333...)
 * @param longitude Sidereal longitude (0-360)
 * @returns Nakshatra name
 */
export function getNakshatra(longitude: number): NakshatraName {
    const normalized = normalizeAngle(longitude);
    const nakshatraSize = 360 / 27; // 13.333...
    const index = Math.floor(normalized / nakshatraSize);
    return Nakshatras[index];
}

/**
 * Calculates which Pada (quarter) within the Nakshatra
 * Each Nakshatra has 4 padas of 3°20' each
 * @param longitude Sidereal longitude (0-360)
 * @returns Pada number (1-4)
 */
export function getNakshatraPada(longitude: number): number {
    const normalized = normalizeAngle(longitude);
    const nakshatraSize = 360 / 27;
    const padaSize = nakshatraSize / 4; // 3.333...
    const positionInNakshatra = normalized % nakshatraSize;
    return Math.floor(positionInNakshatra / padaSize) + 1; // 1-indexed
}

/**
 * Main calculator: Converts raw longitude to complete planetary position
 */
export function calculatePlanetaryPosition(
    longitude: number,
    latitude: number,
    speed: number
): PlanetaryPosition {
    const sign = getSign(longitude);

    return {
        longitude,
        latitude,
        speed,
        sign,
        signName: SignNames[sign],
        degreeInSign: getDegreeInSign(longitude),
        nakshatra: getNakshatra(longitude),
        nakshatraPada: getNakshatraPada(longitude),
        isRetrograde: speed < 0,
    };
}
