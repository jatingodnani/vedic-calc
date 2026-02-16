"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwissEphPlanetIds = exports.PlanetNames = exports.Planet = exports.Nakshatras = exports.SignNames = exports.Sign = void 0;
/**
 * Zodiac Signs (Rashis) in Vedic Astrology
 * Each sign occupies 30 degrees of the 360-degree zodiac
 */
var Sign;
(function (Sign) {
    Sign[Sign["ARIES"] = 0] = "ARIES";
    Sign[Sign["TAURUS"] = 1] = "TAURUS";
    Sign[Sign["GEMINI"] = 2] = "GEMINI";
    Sign[Sign["CANCER"] = 3] = "CANCER";
    Sign[Sign["LEO"] = 4] = "LEO";
    Sign[Sign["VIRGO"] = 5] = "VIRGO";
    Sign[Sign["LIBRA"] = 6] = "LIBRA";
    Sign[Sign["SCORPIO"] = 7] = "SCORPIO";
    Sign[Sign["SAGITTARIUS"] = 8] = "SAGITTARIUS";
    Sign[Sign["CAPRICORN"] = 9] = "CAPRICORN";
    Sign[Sign["AQUARIUS"] = 10] = "AQUARIUS";
    Sign[Sign["PISCES"] = 11] = "PISCES";
})(Sign || (exports.Sign = Sign = {}));
exports.SignNames = {
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
exports.Nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];
/**
 * Planets in Vedic Astrology
 * Sun to Ketu (9 grahas)
 */
var Planet;
(function (Planet) {
    Planet[Planet["SUN"] = 0] = "SUN";
    Planet[Planet["MOON"] = 1] = "MOON";
    Planet[Planet["MARS"] = 2] = "MARS";
    Planet[Planet["MERCURY"] = 3] = "MERCURY";
    Planet[Planet["JUPITER"] = 4] = "JUPITER";
    Planet[Planet["VENUS"] = 5] = "VENUS";
    Planet[Planet["SATURN"] = 6] = "SATURN";
    Planet[Planet["RAHU"] = 7] = "RAHU";
    Planet[Planet["KETU"] = 8] = "KETU";
})(Planet || (exports.Planet = Planet = {}));
exports.PlanetNames = {
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
exports.SwissEphPlanetIds = {
    [Planet.SUN]: 0, // SE_SUN
    [Planet.MOON]: 1, // SE_MOON
    [Planet.MERCURY]: 2, // SE_MERCURY
    [Planet.VENUS]: 3, // SE_VENUS
    [Planet.MARS]: 4, // SE_MARS
    [Planet.JUPITER]: 5, // SE_JUPITER
    [Planet.SATURN]: 6, // SE_SATURN
    [Planet.RAHU]: 11, // SE_TRUE_NODE (Mean Node)
    [Planet.KETU]: 11, // Ketu is calculated as Rahu + 180°
};
