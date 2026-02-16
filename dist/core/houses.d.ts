/**
 * House System Types
 */
export declare enum HouseSystem {
    PLACIDUS = "P",// Most common in Western astrology
    WHOLE_SIGN = "W",// Traditional Vedic system (each house = one sign)
    EQUAL = "E",// Equal 30-degree houses from Ascendant
    KOCH = "K"
}
/**
 * House Cusps Data
 */
export interface HouseCusps {
    ascendant: number;
    midheaven: number;
    cusps: number[];
    system: HouseSystem;
}
/**
 * Calculates house cusps using Swiss Ephemeris
 *
 * @param julianDay Julian Day number
 * @param latitude Geographic latitude
 * @param longitude Geographic longitude
 * @param system House system to use (default: Whole Sign for Vedic)
 * @returns House cusps data
 */
export declare function calculateHouseCusps(julianDay: number, latitude: number, longitude: number, system?: HouseSystem): HouseCusps;
/**
 * Calculates Whole Sign houses (traditional Vedic method)
 * Each house is exactly one sign (30 degrees)
 *
 * @param ascendantDegree The Ascendant degree (0-360)
 * @returns Array of 12 house cusps
 */
export declare function calculateWholeSignHouses(ascendantDegree: number): number[];
/**
 * Calculates Bhava Chalit houses (Equal House from Ascendant degree)
 * Used by modern software like Astrosage
 * Each house is exactly 30 degrees, starting from the exact Ascendant degree
 *
 * @param ascendantDegree The exact Ascendant degree (0-360)
 * @returns Array of 12 house cusps
 */
export declare function calculateBhavaChalitHouses(ascendantDegree: number): number[];
/**
 * Determines which house a planet is in
 *
 * @param planetLongitude Planet's longitude (0-360)
 * @param houseCusps Array of house cusps
 * @returns House number (1-12)
 */
export declare function getPlanetHouse(planetLongitude: number, houseCusps: number[]): number;
/**
 * Determines which house a planet is in using Whole Sign houses (Vedic method)
 * In Whole Sign houses, the house is determined purely by which sign the planet is in
 * relative to the ascendant sign
 *
 * @param planetLongitude Planet's longitude (0-360)
 * @param ascendantLongitude Ascendant's longitude (0-360)
 * @returns House number (1-12)
 */
export declare function getPlanetHouseWholeSign(planetLongitude: number, ascendantLongitude: number): number;
/**
 * Gets the house lord (ruling planet) for a given house
 * Based on which sign the house cusp falls in
 *
 * @param houseCusp The house cusp degree
 * @returns Ruling planet name
 */
export declare function getHouseLord(houseCusp: number): string;
//# sourceMappingURL=houses.d.ts.map