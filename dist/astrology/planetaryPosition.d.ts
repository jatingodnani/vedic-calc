import { Sign, NakshatraName } from './constants';
/**
 * Complete planetary position data
 */
export interface PlanetaryPosition {
    longitude: number;
    latitude: number;
    speed: number;
    sign: Sign;
    signName: {
        en: string;
        sa: string;
    };
    degreeInSign: number;
    nakshatra: NakshatraName;
    nakshatraPada: number;
    isRetrograde: boolean;
}
/**
 * Calculates which Sign (Rashi) the longitude falls in
 * @param longitude Sidereal longitude (0-360)
 * @returns Sign enum value (0-11)
 */
export declare function getSign(longitude: number): Sign;
/**
 * Calculates degrees within the current sign
 * @param longitude Sidereal longitude (0-360)
 * @returns Degrees (0-30)
 */
export declare function getDegreeInSign(longitude: number): number;
/**
 * Calculates which Nakshatra the longitude falls in
 * Each Nakshatra is 13°20' (13.333...)
 * @param longitude Sidereal longitude (0-360)
 * @returns Nakshatra name
 */
export declare function getNakshatra(longitude: number): NakshatraName;
/**
 * Calculates which Pada (quarter) within the Nakshatra
 * Each Nakshatra has 4 padas of 3°20' each
 * @param longitude Sidereal longitude (0-360)
 * @returns Pada number (1-4)
 */
export declare function getNakshatraPada(longitude: number): number;
/**
 * Main calculator: Converts raw longitude to complete planetary position
 */
export declare function calculatePlanetaryPosition(longitude: number, latitude: number, speed: number): PlanetaryPosition;
//# sourceMappingURL=planetaryPosition.d.ts.map