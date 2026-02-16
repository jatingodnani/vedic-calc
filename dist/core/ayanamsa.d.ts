/**
 * Ayanamsa Systems
 * Different schools use different reference points for the Sidereal zodiac
 */
export declare enum AyanamsaSystem {
    LAHIRI = 1,// Most popular in India (Chitrapaksha)
    RAMAN = 3,// Used in South India
    KRISHNAMURTI = 5
}
/**
 * Calculates the Ayanamsa value for a given Julian Day
 * Ayanamsa is the difference between Tropical and Sidereal zodiacs
 *
 * @param julianDay The Julian Day number
 * @param system The Ayanamsa system to use (default: Lahiri)
 * @returns Ayanamsa value in degrees
 */
export declare function getAyanamsa(julianDay: number, system?: AyanamsaSystem): number;
/**
 * Converts Tropical longitude to Sidereal longitude
 *
 * @param tropicalLongitude Tropical longitude (0-360)
 * @param ayanamsa Ayanamsa value in degrees
 * @returns Sidereal longitude (0-360)
 */
export declare function tropicalToSidereal(tropicalLongitude: number, ayanamsa: number): number;
/**
 * Converts Sidereal longitude to Tropical longitude
 * (Rarely needed, but included for completeness)
 *
 * @param siderealLongitude Sidereal longitude (0-360)
 * @param ayanamsa Ayanamsa value in degrees
 * @returns Tropical longitude (0-360)
 */
export declare function siderealToTropical(siderealLongitude: number, ayanamsa: number): number;
//# sourceMappingURL=ayanamsa.d.ts.map