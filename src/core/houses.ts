import swisseph from 'swisseph';
import { normalizeAngle } from '../utils/math';

/**
 * House System Types
 */
export enum HouseSystem {
    PLACIDUS = 'P',      // Most common in Western astrology
    WHOLE_SIGN = 'W',    // Traditional Vedic system (each house = one sign)
    EQUAL = 'E',         // Equal 30-degree houses from Ascendant
    KOCH = 'K',          // Koch system
}

/**
 * House Cusps Data
 */
export interface HouseCusps {
    ascendant: number;      // 1st house cusp (Lagna)
    midheaven: number;      // 10th house cusp (MC)
    cusps: number[];        // Array of 12 house cusps (1-12)
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
export function calculateHouseCusps(
    julianDay: number,
    latitude: number,
    longitude: number,
    system: HouseSystem = HouseSystem.WHOLE_SIGN
): HouseCusps {
    // Calculate houses using Swiss Ephemeris
    const houses = swisseph.swe_houses(julianDay, latitude, longitude, system) as any;

    return {
        ascendant: houses.ascendant,
        midheaven: houses.mc,
        cusps: houses.house,
        system,
    };
}

/**
 * Calculates Whole Sign houses (traditional Vedic method)
 * Each house is exactly one sign (30 degrees)
 * 
 * @param ascendantDegree The Ascendant degree (0-360)
 * @returns Array of 12 house cusps
 */
export function calculateWholeSignHouses(ascendantDegree: number): number[] {
    const normalized = normalizeAngle(ascendantDegree);

    // Find which sign the Ascendant is in
    const ascendantSign = Math.floor(normalized / 30);

    // Each house starts at the beginning of a sign
    const cusps: number[] = [];
    for (let i = 0; i < 12; i++) {
        const signNumber = (ascendantSign + i) % 12;
        cusps.push(signNumber * 30);
    }

    return cusps;
}

/**
 * Calculates Bhava Chalit houses (Equal House from Ascendant degree)
 * Used by modern software like Astrosage
 * Each house is exactly 30 degrees, starting from the exact Ascendant degree
 * 
 * @param ascendantDegree The exact Ascendant degree (0-360)
 * @returns Array of 12 house cusps
 */
export function calculateBhavaChalitHouses(ascendantDegree: number): number[] {
    const normalized = normalizeAngle(ascendantDegree);

    // Each house starts exactly 30 degrees after the previous one
    // Starting from the Ascendant degree itself
    const cusps: number[] = [];
    for (let i = 0; i < 12; i++) {
        const cuspDegree = normalizeAngle(normalized + (i * 30));
        cusps.push(cuspDegree);
    }

    return cusps;
}

/**
 * Determines which house a planet is in
 * 
 * @param planetLongitude Planet's longitude (0-360)
 * @param houseCusps Array of house cusps
 * @returns House number (1-12)
 */
export function getPlanetHouse(planetLongitude: number, houseCusps: number[]): number {
    const normalized = normalizeAngle(planetLongitude);

    for (let i = 0; i < 12; i++) {
        const currentCusp = houseCusps[i];
        const nextCusp = houseCusps[(i + 1) % 12];

        // Handle wrap-around at 360/0 degrees
        if (nextCusp > currentCusp) {
            // Normal case: cusp1 < cusp2
            if (normalized >= currentCusp && normalized < nextCusp) {
                return i + 1; // Houses are 1-indexed
            }
        } else {
            // Wrap-around case: cusp1 > cusp2 (crosses 0°)
            if (normalized >= currentCusp || normalized < nextCusp) {
                return i + 1;
            }
        }
    }

    // Fallback (should never reach here)
    return 1;
}

/**
 * Determines which house a planet is in using Whole Sign houses (Vedic method)
 * In Whole Sign houses, the house is determined purely by which sign the planet is in
 * relative to the ascendant sign
 * 
 * @param planetLongitude Planet's longitude (0-360)
 * @param ascendantLongitude Ascendant's longitude (0-360)
 * @returns House number (1-12)
 */
export function getPlanetHouseWholeSign(planetLongitude: number, ascendantLongitude: number): number {
    const planetSign = Math.floor(normalizeAngle(planetLongitude) / 30);
    const ascendantSign = Math.floor(normalizeAngle(ascendantLongitude) / 30);

    // Calculate house number: how many signs from ascendant
    // If planet is in same sign as ascendant, it's house 1
    // If planet is in next sign, it's house 2, etc.
    const house = ((planetSign - ascendantSign + 12) % 12) + 1;

    return house;
}

/**
 * Gets the house lord (ruling planet) for a given house
 * Based on which sign the house cusp falls in
 * 
 * @param houseCusp The house cusp degree
 * @returns Ruling planet name
 */
export function getHouseLord(houseCusp: number): string {
    const sign = Math.floor(normalizeAngle(houseCusp) / 30);

    const lords = [
        'Mars',     // Aries
        'Venus',    // Taurus
        'Mercury',  // Gemini
        'Moon',     // Cancer
        'Sun',      // Leo
        'Mercury',  // Virgo
        'Venus',    // Libra
        'Mars',     // Scorpio
        'Jupiter',  // Sagittarius
        'Saturn',   // Capricorn
        'Saturn',   // Aquarius
        'Jupiter',  // Pisces
    ];

    return lords[sign];
}
