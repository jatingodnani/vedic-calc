import swisseph from 'swisseph';

/**
 * Ayanamsa Systems
 * Different schools use different reference points for the Sidereal zodiac
 */
export enum AyanamsaSystem {
    LAHIRI = 1,        // Most popular in India (Chitrapaksha)
    RAMAN = 3,         // Used in South India
    KRISHNAMURTI = 5,  // KP System
}

/**
 * Calculates the Ayanamsa value for a given Julian Day
 * Ayanamsa is the difference between Tropical and Sidereal zodiacs
 * 
 * @param julianDay The Julian Day number
 * @param system The Ayanamsa system to use (default: Lahiri)
 * @returns Ayanamsa value in degrees
 */
export function getAyanamsa(julianDay: number, system: AyanamsaSystem = AyanamsaSystem.LAHIRI): number {
    // Set the Ayanamsa system
    swisseph.swe_set_sid_mode(system, 0, 0);

    // Calculate Ayanamsa for the given Julian Day
    const ayanamsa = swisseph.swe_get_ayanamsa_ut(julianDay);

    return ayanamsa;
}

/**
 * Converts Tropical longitude to Sidereal longitude
 * 
 * @param tropicalLongitude Tropical longitude (0-360)
 * @param ayanamsa Ayanamsa value in degrees
 * @returns Sidereal longitude (0-360)
 */
export function tropicalToSidereal(tropicalLongitude: number, ayanamsa: number): number {
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
export function siderealToTropical(siderealLongitude: number, ayanamsa: number): number {
    let tropical = siderealLongitude + ayanamsa;

    // Normalize to 0-360 range
    if (tropical >= 360) {
        tropical -= 360;
    }

    return tropical;
}
