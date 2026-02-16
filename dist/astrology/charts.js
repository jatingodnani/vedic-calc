"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNavamsaSign = calculateNavamsaSign;
exports.generateRasiChart = generateRasiChart;
exports.generateNavamsaChart = generateNavamsaChart;
exports.generateKundali = generateKundali;
const planetaryPosition_1 = require("./planetaryPosition");
const houses_1 = require("../core/houses");
const swisseph_1 = require("../core/swisseph");
const ayanamsa_1 = require("../core/ayanamsa");
const math_1 = require("../utils/math");
/**
 * Sign names for display
 */
const SIGN_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];
/**
 * Nakshatra lords for Vimshottari Dasha
 */
const NAKSHATRA_LORDS = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
];
/**
 * Calculates the Navamsa sign for a given longitude
 * Navamsa divides each sign into 9 parts (3°20' each)
 *
 * @param longitude Sidereal longitude (0-360)
 * @returns Navamsa sign (0-11)
 */
function calculateNavamsaSign(longitude) {
    const normalized = (0, math_1.normalizeAngle)(longitude);
    // Each sign has 9 navamsas of 3.333... degrees each
    const navamsaSize = 30 / 9; // 3.333...
    const sign = Math.floor(normalized / 30);
    const degreeInSign = normalized % 30;
    const navamsaInSign = Math.floor(degreeInSign / navamsaSize);
    // Calculate starting navamsa based on sign element
    // Fire signs (0,4,8) start from Aries (0)
    // Earth signs (1,5,9) start from Capricorn (9)
    // Air signs (2,6,10) start from Libra (6)
    // Water signs (3,7,11) start from Cancer (3)
    const element = sign % 4;
    const startingNavamsa = [0, 9, 6, 3][element];
    const navamsaSign = (startingNavamsa + navamsaInSign) % 12;
    return navamsaSign;
}
/**
 * Generates a complete Rasi (D-1) Chart
 *
 * @param date Birth date and time
 * @param latitude Birth latitude
 * @param longitude Birth longitude
 * @param timezone Timezone string (e.g., 'Asia/Kolkata')
 * @returns Complete Rasi Chart
 */
function generateRasiChart(date, latitude, longitude, timezone = 'UTC', nodeType = swisseph_1.NodeType.TRUE_NODE) {
    // Step 1: Calculate Julian Day
    const jd = (0, swisseph_1.getJulianDay)(date);
    // Step 2: Get Ayanamsa for this date
    const ayanamsa = (0, ayanamsa_1.getAyanamsa)(jd, ayanamsa_1.AyanamsaSystem.LAHIRI);
    // Step 3: Get planetary positions (tropical)
    const tropicalPositions = (0, swisseph_1.getPlanetaryPositions)(jd, nodeType);
    // Step 4: Calculate house cusps (tropical) - only for Ascendant
    const tropicalHouseCusps = (0, houses_1.calculateHouseCusps)(jd, latitude, longitude, houses_1.HouseSystem.WHOLE_SIGN);
    // Step 5: Convert Ascendant to Sidereal
    const siderealAscendant = (0, ayanamsa_1.tropicalToSidereal)(tropicalHouseCusps.ascendant, ayanamsa);
    const ascendantSign = (0, planetaryPosition_1.getSign)(siderealAscendant);
    const ascendantNakshatra = (0, planetaryPosition_1.getNakshatra)(siderealAscendant);
    // Step 5b: Calculate SIDEREAL Whole Sign house cusps
    // Astrosage and most Vedic software use Whole Sign houses
    // Each house = one complete zodiac sign
    const siderealHouseCusps = (0, houses_1.calculateWholeSignHouses)(siderealAscendant);
    // Step 6: Convert each planet to Sidereal and build planet data
    const planets = tropicalPositions.map((pos) => {
        const siderealLongitude = (0, ayanamsa_1.tropicalToSidereal)(pos.longitude, ayanamsa);
        const sign = (0, planetaryPosition_1.getSign)(siderealLongitude);
        const nakshatra = (0, planetaryPosition_1.getNakshatra)(siderealLongitude);
        const nakshatraIndex = Math.floor(siderealLongitude / (360 / 27));
        return {
            planet: pos.planet,
            longitude: siderealLongitude,
            sign: sign,
            signName: SIGN_NAMES[sign],
            degreeInSign: (0, planetaryPosition_1.getDegreeInSign)(siderealLongitude),
            nakshatra: nakshatra,
            nakshatraPada: (0, planetaryPosition_1.getNakshatraPada)(siderealLongitude),
            nakshatraLord: NAKSHATRA_LORDS[nakshatraIndex],
            house: (0, houses_1.getPlanetHouseWholeSign)(siderealLongitude, siderealAscendant),
            isRetrograde: pos.isRetrograde,
        };
    });
    // Step 7: Build houses data
    const houses = Array.from({ length: 12 }, (_, i) => {
        const houseNumber = i + 1;
        const signIndex = (ascendantSign + i) % 12;
        const planetsInHouse = planets.filter(p => p.house === houseNumber).map(p => p.planet);
        return {
            number: houseNumber,
            sign: signIndex,
            signName: SIGN_NAMES[signIndex],
            lord: (0, houses_1.getHouseLord)(signIndex * 30),
            planets: planetsInHouse,
            cuspStart: siderealHouseCusps[i],
            cuspEnd: siderealHouseCusps[(i + 1) % 12],
        };
    });
    return {
        birthData: {
            date,
            latitude,
            longitude,
            timezone,
        },
        ascendant: {
            degree: siderealAscendant,
            sign: ascendantSign,
            signName: SIGN_NAMES[ascendantSign],
            nakshatra: ascendantNakshatra,
            nakshatraPada: (0, planetaryPosition_1.getNakshatraPada)(siderealAscendant),
        },
        planets,
        houses,
        ayanamsa,
    };
}
/**
 * Generates Navamsa (D-9) Chart from a Rasi Chart
 *
 * @param rasiChart The Rasi chart to derive Navamsa from
 * @returns Navamsa Chart
 */
function generateNavamsaChart(rasiChart) {
    const ascendantNavamsaSign = calculateNavamsaSign(rasiChart.ascendant.degree);
    const planets = rasiChart.planets.map(p => {
        const navamsaSign = calculateNavamsaSign(p.longitude);
        // Calculate house in navamsa (1-12) from navamsa ascendant
        const navamsaHouse = ((navamsaSign - ascendantNavamsaSign + 12) % 12) + 1;
        return {
            planet: p.planet,
            navamsaSign,
            navamsaSignName: SIGN_NAMES[navamsaSign],
            navamsaHouse,
            longitude: p.longitude,
        };
    });
    return {
        planets,
        ascendantNavamsa: {
            sign: ascendantNavamsaSign,
            signName: SIGN_NAMES[ascendantNavamsaSign],
            longitude: rasiChart.ascendant.degree,
        },
    };
}
/**
 * Generates both Rasi and Navamsa charts
 *
 * @param date Birth date and time
 * @param latitude Birth latitude
 * @param longitude Birth longitude
 * @param timezone Timezone string
 * @returns Object containing both charts
 */
function generateKundali(date, latitude, longitude, timezone = 'UTC', options) {
    const rasi = generateRasiChart(date, latitude, longitude, timezone, options?.nodeType);
    const navamsa = generateNavamsaChart(rasi);
    return { rasi, navamsa };
}
