/**
 * Zodiac Signs (Rashis) in Vedic Astrology
 * Each sign occupies 30 degrees of the 360-degree zodiac
 */
export enum Sign {
    ARIES = 0,      // Mesha
    TAURUS = 1,     // Vrishabha
    GEMINI = 2,     // Mithuna
    CANCER = 3,     // Karka
    LEO = 4,        // Simha
    VIRGO = 5,      // Kanya
    LIBRA = 6,      // Tula
    SCORPIO = 7,    // Vrishchika
    SAGITTARIUS = 8,// Dhanu
    CAPRICORN = 9,  // Makara
    AQUARIUS = 10,  // Kumbha
    PISCES = 11,    // Meena
}

export const SignNames = {
    [Sign.ARIES]: { en: 'Aries', sa: 'Mesha' },
    [Sign.TAURUS]: { en: 'Taurus', sa: 'Vrishabha' },
    [Sign.GEMINI]: { en: 'Gemini', sa: 'Mithuna' },
    [Sign.CANCER]: { en: 'Cancer', sa: 'Karka' },
    [Sign.LEO]: { en: 'Leo', sa: 'Simha' },
    [Sign.VIRGO]: { en: 'Virgo', sa: 'Kanya' },
    [Sign.LIBRA]: { en: 'Libra', sa: 'Tula' },
    [Sign.SCORPIO]: { en: 'Scorpio', sa: 'Vrishchika' },
    [Sign.SAGITTARIUS]: { en: 'Sagittarius', sa: 'Dhanu' },
    [Sign.CAPRICORN]: { en: 'Capricorn', sa: 'Makara' },
    [Sign.AQUARIUS]: { en: 'Aquarius', sa: 'Kumbha' },
    [Sign.PISCES]: { en: 'Pisces', sa: 'Meena' },
};

/**
 * Nakshatras (Lunar Mansions)
 * 27 divisions of the zodiac, each 13°20' (13.333...)
 */
export const Nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
] as const;

export type NakshatraName = typeof Nakshatras[number];

/**
 * Planets in Vedic Astrology
 * Sun to Ketu (9 grahas)
 */
export enum Planet {
    SUN = 0,        // Surya
    MOON = 1,       // Chandra
    MARS = 2,       // Mangal
    MERCURY = 3,    // Budh
    JUPITER = 4,    // Guru
    VENUS = 5,      // Shukra
    SATURN = 6,     // Shani
    RAHU = 7,       // North Node
    KETU = 8,       // South Node
}

export const PlanetNames = {
    [Planet.SUN]: { en: 'Sun', sa: 'Surya' },
    [Planet.MOON]: { en: 'Moon', sa: 'Chandra' },
    [Planet.MARS]: { en: 'Mars', sa: 'Mangal' },
    [Planet.MERCURY]: { en: 'Mercury', sa: 'Budh' },
    [Planet.JUPITER]: { en: 'Jupiter', sa: 'Guru' },
    [Planet.VENUS]: { en: 'Venus', sa: 'Shukra' },
    [Planet.SATURN]: { en: 'Saturn', sa: 'Shani' },
    [Planet.RAHU]: { en: 'Rahu', sa: 'Rahu' },
    [Planet.KETU]: { en: 'Ketu', sa: 'Ketu' },
};

/**
 * Swiss Ephemeris Planet IDs mapping to our Planet enum
 */
export const SwissEphPlanetIds = {
    [Planet.SUN]: 0,        // SE_SUN
    [Planet.MOON]: 1,       // SE_MOON
    [Planet.MERCURY]: 2,    // SE_MERCURY
    [Planet.VENUS]: 3,      // SE_VENUS
    [Planet.MARS]: 4,       // SE_MARS
    [Planet.JUPITER]: 5,    // SE_JUPITER
    [Planet.SATURN]: 6,     // SE_SATURN
    [Planet.RAHU]: 11,      // SE_TRUE_NODE (Mean Node)
    [Planet.KETU]: 11,      // Ketu is calculated as Rahu + 180°
};
