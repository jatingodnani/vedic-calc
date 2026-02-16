"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJulianDay = exports.calculatePlanetPosition = exports.NodeType = void 0;
exports.getPlanetaryPositions = getPlanetaryPositions;
const swisseph_1 = __importDefault(require("swisseph"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("../astrology/constants");
/**
 * Node Calculation Type
 */
var NodeType;
(function (NodeType) {
    NodeType["TRUE_NODE"] = "TRUE";
    NodeType["MEAN_NODE"] = "MEAN";
})(NodeType || (exports.NodeType = NodeType = {}));
/**
 * Swiss Ephemeris Configuration - Production Grade
 *
 * Using external Swiss Ephemeris data files (.se1) for maximum precision.
 * These files contain NASA JPL DE406 ephemeris data for accurate calculations.
 *
 * Falls back to built-in Moshier if files are not available.
 */
const ephemerisPath = path_1.default.join(__dirname, '..', '..', 'ephe');
// Set ephemeris path if directory exists
if (fs_1.default.existsSync(ephemerisPath)) {
    swisseph_1.default.swe_set_ephe_path(ephemerisPath);
    console.log(`✓ Using high-precision ephemeris data from: ${ephemerisPath}`);
}
else {
    console.log('⚠ Ephemeris files not found. Using built-in Moshier (still accurate).');
}
/**
 * Calculates the geocentric position of a planet.
 * @param julianDay The Julian Day number.
 * @param planetId The Swiss Ephemeris planet ID (e.g., swisseph.SE_SUN).
 * @returns Promise<PlanetPosition>
 */
const calculatePlanetPosition = (julianDay, planetId) => {
    return new Promise((resolve, reject) => {
        // Flag: SEFLG_SWIEPH (use Swiss Ephemeris), SEFLG_SPEED (calc speed)
        const flag = swisseph_1.default.SEFLG_SWIEPH | swisseph_1.default.SEFLG_SPEED;
        swisseph_1.default.swe_calc_ut(julianDay, planetId, flag, (data) => {
            if (data.error) {
                reject(new Error(data.error));
            }
            else {
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
exports.calculatePlanetPosition = calculatePlanetPosition;
/**
 * Helper to convert standard Date to Julian Day (UT)
 */
const getJulianDay = (date) => {
    const julday = swisseph_1.default.swe_julday(date.getUTCFullYear(), date.getUTCMonth() + 1, // Month is 0-indexed in JS
    date.getUTCDate(), date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0, swisseph_1.default.SE_GREG_CAL);
    return julday;
};
exports.getJulianDay = getJulianDay;
/**
 * Planet IDs for Vedic astrology (9 planets)
 */
const VEDIC_PLANETS = [
    { id: 0, planet: constants_1.Planet.SUN }, // swisseph.SE_SUN
    { id: 1, planet: constants_1.Planet.MOON }, // swisseph.SE_MOON
    { id: 4, planet: constants_1.Planet.MARS }, // swisseph.SE_MARS
    { id: 2, planet: constants_1.Planet.MERCURY }, // swisseph.SE_MERCURY
    { id: 5, planet: constants_1.Planet.JUPITER }, // swisseph.SE_JUPITER
    { id: 3, planet: constants_1.Planet.VENUS }, // swisseph.SE_VENUS
    { id: 6, planet: constants_1.Planet.SATURN }, // swisseph.SE_SATURN
    { id: 11, planet: constants_1.Planet.RAHU }, // Default to True Node (will be overridden if Mean selected)
];
/**
 * Calculates positions for all 9 Vedic planets (including Ketu as opposite of Rahu)
 *
 * @param julianDay The Julian Day number
 * @returns Array of planet positions
 */
function getPlanetaryPositions(julianDay, nodeType = NodeType.TRUE_NODE) {
    const flag = swisseph_1.default.SEFLG_SWIEPH | swisseph_1.default.SEFLG_SPEED;
    const planets = [];
    for (const planet of VEDIC_PLANETS) {
        let planetId = planet.id;
        // Handle Node Type Selection
        if (planet.planet === constants_1.Planet.RAHU) {
            planetId = nodeType === NodeType.MEAN_NODE ? 10 : 11; // 10=Mean, 11=True
        }
        const result = swisseph_1.default.swe_calc_ut(julianDay, planetId, flag);
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
    const rahu = planets.find(p => p.planet === constants_1.Planet.RAHU);
    if (rahu) {
        let ketuLongitude = rahu.longitude + 180;
        if (ketuLongitude >= 360)
            ketuLongitude -= 360;
        planets.push({
            planet: constants_1.Planet.KETU,
            longitude: ketuLongitude,
            latitude: -rahu.latitude,
            distance: rahu.distance,
            speed: rahu.speed,
            isRetrograde: rahu.isRetrograde,
        });
    }
    return planets;
}
