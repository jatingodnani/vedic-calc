import swisseph from 'swisseph';
import path from 'path';
import fs from 'fs';
import { Planet } from '../astrology/constants';

/**
 * Node Calculation Type
 */
export enum NodeType {
    TRUE_NODE = 'TRUE', // swisseph.SE_TRUE_NODE (11) - More precise astronomical position
    MEAN_NODE = 'MEAN', // swisseph.SE_MEAN_NODE (10) - Traditional/Smoothed position (Astrosage default)
}

/**
 * Swiss Ephemeris Configuration - Production Grade
 * 
 * Using external Swiss Ephemeris data files (.se1) for maximum precision.
 * These files contain NASA JPL DE406 ephemeris data for accurate calculations.
 * 
 * Falls back to built-in Moshier if files are not available.
 */
const ephemerisPath = path.join(__dirname, '..', '..', 'ephe');

// Set ephemeris path if directory exists
if (fs.existsSync(ephemerisPath)) {
    swisseph.swe_set_ephe_path(ephemerisPath);
    console.log(`✓ Using high-precision ephemeris data from: ${ephemerisPath}`);
} else {
    console.log('⚠ Ephemeris files not found. Using built-in Moshier (still accurate).');
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
export const calculatePlanetPosition = (julianDay: number, planetId: number): Promise<PlanetPosition> => {
    return new Promise((resolve, reject) => {
        // Flag: SEFLG_SWIEPH (use Swiss Ephemeris), SEFLG_SPEED (calc speed)
        const flag = swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SPEED;

        swisseph.swe_calc_ut(julianDay, planetId, flag, (data: any) => {
            if (data.error) {
                reject(new Error(data.error));
            } else {
                resolve({
                    longitude: data.longitude,
                    latitude: data.latitude,
                    distance: data.distance,
                    speed: data.longitudeSpeed,
                });
            }
        });
    });
};

/**
 * Helper to convert standard Date to Julian Day (UT)
 */
export const getJulianDay = (date: Date): number => {
    const julday = swisseph.swe_julday(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1, // Month is 0-indexed in JS
        date.getUTCDate(),
        date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0,
        swisseph.SE_GREG_CAL
    );
    return julday;
};

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
 * Planet IDs for Vedic astrology (9 planets)
 */
const VEDIC_PLANETS = [
    { id: 0, planet: Planet.SUN },      // swisseph.SE_SUN
    { id: 1, planet: Planet.MOON },     // swisseph.SE_MOON
    { id: 4, planet: Planet.MARS },     // swisseph.SE_MARS
    { id: 2, planet: Planet.MERCURY },  // swisseph.SE_MERCURY
    { id: 5, planet: Planet.JUPITER },  // swisseph.SE_JUPITER
    { id: 3, planet: Planet.VENUS },    // swisseph.SE_VENUS
    { id: 6, planet: Planet.SATURN },   // swisseph.SE_SATURN
    { id: 11, planet: Planet.RAHU },    // Default to True Node (will be overridden if Mean selected)
];

/**
 * Calculates positions for all 9 Vedic planets (including Ketu as opposite of Rahu)
 * 
 * @param julianDay The Julian Day number
 * @returns Array of planet positions
 */
export function getPlanetaryPositions(julianDay: number, nodeType: NodeType = NodeType.TRUE_NODE): PlanetData[] {
    const flag = swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SPEED;
    const planets: PlanetData[] = [];

    for (const planet of VEDIC_PLANETS) {
        let planetId = planet.id;

        // Handle Node Type Selection
        if (planet.planet === Planet.RAHU) {
            planetId = nodeType === NodeType.MEAN_NODE ? 10 : 11; // 10=Mean, 11=True
        }

        const result = swisseph.swe_calc_ut(julianDay, planetId, flag) as {
            longitude: number;
            latitude: number;
            distance: number;
            longitudeSpeed: number;
            latitudeSpeed: number;
            distanceSpeed: number;
            rflag: number;
        };

        planets.push({
            planet: planet.planet,
            longitude: result.longitude,
            latitude: result.latitude,
            distance: result.distance,
            speed: result.longitudeSpeed,
            isRetrograde: result.longitudeSpeed < 0,
        });
    }

    // Add Ketu (always 180° opposite of Rahu)
    const rahu = planets.find(p => p.planet === Planet.RAHU);
    if (rahu) {
        let ketuLongitude = rahu.longitude + 180;
        if (ketuLongitude >= 360) ketuLongitude -= 360;

        planets.push({
            planet: Planet.KETU,
            longitude: ketuLongitude,
            latitude: -rahu.latitude,
            distance: rahu.distance,
            speed: rahu.speed,
            isRetrograde: rahu.isRetrograde,
        });
    }

    return planets;
}
