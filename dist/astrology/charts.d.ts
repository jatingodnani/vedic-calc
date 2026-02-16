import { Planet, Sign } from './constants';
import { NodeType } from '../core/swisseph';
/**
 * Complete data for a single planet in a chart
 */
export interface PlanetData {
    planet: Planet;
    longitude: number;
    sign: Sign;
    signName: string;
    degreeInSign: number;
    nakshatra: string;
    nakshatraPada: number;
    nakshatraLord: string;
    house: number;
    isRetrograde: boolean;
}
/**
 * Complete Rasi (D-1) Chart
 */
export interface RasiChart {
    birthData: {
        date: Date;
        latitude: number;
        longitude: number;
        timezone: string;
    };
    ascendant: {
        degree: number;
        sign: Sign;
        signName: string;
        nakshatra: string;
        nakshatraPada: number;
    };
    planets: PlanetData[];
    houses: {
        number: number;
        sign: Sign;
        signName: string;
        lord: string;
        planets: Planet[];
        cuspStart: number;
        cuspEnd: number;
    }[];
    ayanamsa: number;
}
/**
 * Navamsa (D-9) Chart Data
 */
export interface NavamsaChart {
    planets: {
        planet: Planet;
        navamsaSign: Sign;
        navamsaSignName: string;
        navamsaHouse: number;
        longitude: number;
    }[];
    ascendantNavamsa: {
        sign: Sign;
        signName: string;
        longitude: number;
    };
}
/**
 * Calculates the Navamsa sign for a given longitude
 * Navamsa divides each sign into 9 parts (3°20' each)
 *
 * @param longitude Sidereal longitude (0-360)
 * @returns Navamsa sign (0-11)
 */
export declare function calculateNavamsaSign(longitude: number): Sign;
/**
 * Generates a complete Rasi (D-1) Chart
 *
 * @param date Birth date and time
 * @param latitude Birth latitude
 * @param longitude Birth longitude
 * @param timezone Timezone string (e.g., 'Asia/Kolkata')
 * @returns Complete Rasi Chart
 */
export declare function generateRasiChart(date: Date, latitude: number, longitude: number, timezone?: string, nodeType?: NodeType): RasiChart;
/**
 * Generates Navamsa (D-9) Chart from a Rasi Chart
 *
 * @param rasiChart The Rasi chart to derive Navamsa from
 * @returns Navamsa Chart
 */
export declare function generateNavamsaChart(rasiChart: RasiChart): NavamsaChart;
/**
 * Generates both Rasi and Navamsa charts
 *
 * @param date Birth date and time
 * @param latitude Birth latitude
 * @param longitude Birth longitude
 * @param timezone Timezone string
 * @returns Object containing both charts
 */
export declare function generateKundali(date: Date, latitude: number, longitude: number, timezone?: string, options?: {
    nodeType?: NodeType;
}): {
    rasi: RasiChart;
    navamsa: NavamsaChart;
};
//# sourceMappingURL=charts.d.ts.map