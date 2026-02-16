/**
 * Zodiac Signs (Rashis) in Vedic Astrology
 * Each sign occupies 30 degrees of the 360-degree zodiac
 */
export declare enum Sign {
    ARIES = 0,// Mesha
    TAURUS = 1,// Vrishabha
    GEMINI = 2,// Mithuna
    CANCER = 3,// Karka
    LEO = 4,// Simha
    VIRGO = 5,// Kanya
    LIBRA = 6,// Tula
    SCORPIO = 7,// Vrishchika
    SAGITTARIUS = 8,// Dhanu
    CAPRICORN = 9,// Makara
    AQUARIUS = 10,// Kumbha
    PISCES = 11
}
export declare const SignNames: {
    0: {
        en: string;
        sa: string;
    };
    1: {
        en: string;
        sa: string;
    };
    2: {
        en: string;
        sa: string;
    };
    3: {
        en: string;
        sa: string;
    };
    4: {
        en: string;
        sa: string;
    };
    5: {
        en: string;
        sa: string;
    };
    6: {
        en: string;
        sa: string;
    };
    7: {
        en: string;
        sa: string;
    };
    8: {
        en: string;
        sa: string;
    };
    9: {
        en: string;
        sa: string;
    };
    10: {
        en: string;
        sa: string;
    };
    11: {
        en: string;
        sa: string;
    };
};
/**
 * Nakshatras (Lunar Mansions)
 * 27 divisions of the zodiac, each 13°20' (13.333...)
 */
export declare const Nakshatras: readonly ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
export type NakshatraName = typeof Nakshatras[number];
/**
 * Planets in Vedic Astrology
 * Sun to Ketu (9 grahas)
 */
export declare enum Planet {
    SUN = 0,// Surya
    MOON = 1,// Chandra
    MARS = 2,// Mangal
    MERCURY = 3,// Budh
    JUPITER = 4,// Guru
    VENUS = 5,// Shukra
    SATURN = 6,// Shani
    RAHU = 7,// North Node
    KETU = 8
}
export declare const PlanetNames: {
    0: {
        en: string;
        sa: string;
    };
    1: {
        en: string;
        sa: string;
    };
    2: {
        en: string;
        sa: string;
    };
    3: {
        en: string;
        sa: string;
    };
    4: {
        en: string;
        sa: string;
    };
    5: {
        en: string;
        sa: string;
    };
    6: {
        en: string;
        sa: string;
    };
    7: {
        en: string;
        sa: string;
    };
    8: {
        en: string;
        sa: string;
    };
};
/**
 * Swiss Ephemeris Planet IDs mapping to our Planet enum
 */
export declare const SwissEphPlanetIds: {
    0: number;
    1: number;
    3: number;
    5: number;
    2: number;
    4: number;
    6: number;
    7: number;
    8: number;
};
//# sourceMappingURL=constants.d.ts.map