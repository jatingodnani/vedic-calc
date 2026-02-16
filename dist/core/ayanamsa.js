"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyanamsaSystem = void 0;
exports.getAyanamsa = getAyanamsa;
exports.tropicalToSidereal = tropicalToSidereal;
exports.siderealToTropical = siderealToTropical;
const swisseph_1 = __importDefault(require("swisseph"));
/**
 * Ayanamsa Systems
 * Different schools use different reference points for the Sidereal zodiac
 */
var AyanamsaSystem;
(function (AyanamsaSystem) {
    AyanamsaSystem[AyanamsaSystem["LAHIRI"] = 1] = "LAHIRI";
    AyanamsaSystem[AyanamsaSystem["RAMAN"] = 3] = "RAMAN";
    AyanamsaSystem[AyanamsaSystem["KRISHNAMURTI"] = 5] = "KRISHNAMURTI";
})(AyanamsaSystem || (exports.AyanamsaSystem = AyanamsaSystem = {}));
/**
 * Calculates the Ayanamsa value for a given Julian Day
 * Ayanamsa is the difference between Tropical and Sidereal zodiacs
 *
 * @param julianDay The Julian Day number
 * @param system The Ayanamsa system to use (default: Lahiri)
 * @returns Ayanamsa value in degrees
 */
function getAyanamsa(julianDay, system = AyanamsaSystem.LAHIRI) {
    // Set the Ayanamsa system
    swisseph_1.default.swe_set_sid_mode(system, 0, 0);
    // Calculate Ayanamsa for the given Julian Day
    const ayanamsa = swisseph_1.default.swe_get_ayanamsa_ut(julianDay);
    return ayanamsa;
}
/**
 * Converts Tropical longitude to Sidereal longitude
 *
 * @param tropicalLongitude Tropical longitude (0-360)
 * @param ayanamsa Ayanamsa value in degrees
 * @returns Sidereal longitude (0-360)
 */
function tropicalToSidereal(tropicalLongitude, ayanamsa) {
    let sidereal = tropicalLongitude - ayanamsa;
    // Normalize to 0-360 range
    if (sidereal < 0) {
        sidereal += 360;
    }
    return sidereal;
}
/**
 * Converts Sidereal longitude to Tropical longitude
 * (Rarely needed, but included for completeness)
 *
 * @param siderealLongitude Sidereal longitude (0-360)
 * @param ayanamsa Ayanamsa value in degrees
 * @returns Tropical longitude (0-360)
 */
function siderealToTropical(siderealLongitude, ayanamsa) {
    let tropical = siderealLongitude + ayanamsa;
    // Normalize to 0-360 range
    if (tropical >= 360) {
        tropical -= 360;
    }
    return tropical;
}
