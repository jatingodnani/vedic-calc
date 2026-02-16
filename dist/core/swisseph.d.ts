import { Planet } from '../astrology/constants';
/**
 * Node Calculation Type
 */
export declare enum NodeType {
    TRUE_NODE = "TRUE",// swisseph.SE_TRUE_NODE (11) - More precise astronomical position
    MEAN_NODE = "MEAN"
}
export interface PlanetPosition {
    longitude: number;
    latitude: number;
    distance: number;
    speed: number;
}
/**
 * Calculates the geocentric position of a planet.
 * @param julianDay The Julian Day number.
 * @param planetId The Swiss Ephemeris planet ID (e.g., swisseph.SE_SUN).
 * @returns Promise<PlanetPosition>
 */
export declare const calculatePlanetPosition: (julianDay: number, planetId: number) => Promise<PlanetPosition>;
/**
 * Helper to convert standard Date to Julian Day (UT)
 */
export declare const getJulianDay: (date: Date) => number;
/**
 * Planet data with name for chart generation
 */
export interface PlanetData {
    planet: Planet;
    longitude: number;
    latitude: number;
    distance: number;
    speed: number;
    isRetrograde: boolean;
}
/**
 * Calculates positions for all 9 Vedic planets (including Ketu as opposite of Rahu)
 *
 * @param julianDay The Julian Day number
 * @returns Array of planet positions
 */
export declare function getPlanetaryPositions(julianDay: number, nodeType?: NodeType): PlanetData[];
//# sourceMappingURL=swisseph.d.ts.map