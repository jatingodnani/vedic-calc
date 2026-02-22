import { Planet } from './constants';
import { RasiChart } from './charts';

export interface DashaPeriod {
    planet: string;
    start: Date;
    end: Date;
    durationYears: number;
}

export interface Antardasha extends DashaPeriod { }

export interface Mahadasha extends DashaPeriod {
    antardashas: Antardasha[];
}

const DASHA_SEQUENCE = [
    { planet: 'Ketu', years: 7 },
    { planet: 'Venus', years: 20 },
    { planet: 'Sun', years: 6 },
    { planet: 'Moon', years: 10 },
    { planet: 'Mars', years: 7 },
    { planet: 'Rahu', years: 18 },
    { planet: 'Jupiter', years: 16 },
    { planet: 'Saturn', years: 19 },
    { planet: 'Mercury', years: 17 }
];

const DAYS_IN_YEAR = 365.2425;
const MS_IN_YEAR = DAYS_IN_YEAR * 24 * 60 * 60 * 1000;

export function getVimshottariDasha(chart: RasiChart): Mahadasha[] {
    const moon = chart.planets.find(p => p.planet === Planet.MOON);
    if (!moon) throw new Error("Moon position not found in chart");

    const moonLongitude = moon.longitude;
    const nakshatraSize = 360 / 27; // 13.333333 degrees

    const exactNakshatraIndex = Math.floor(moonLongitude / nakshatraSize);
    const startingDashaIndex = exactNakshatraIndex % 9;

    const nakshatraStartLong = exactNakshatraIndex * nakshatraSize;
    const degreesTraversed = moonLongitude - nakshatraStartLong;
    // Percentage remaining in the nakshatra dictates percentage of total dasha years remaining
    const fractionRemaining = (nakshatraSize - degreesTraversed) / nakshatraSize;

    const startingPlanetTotalYears = DASHA_SEQUENCE[startingDashaIndex].years;
    const yearsRemainingAtBirth = fractionRemaining * startingPlanetTotalYears;

    const birthDate = new Date(chart.birthData.date);
    const dasas: Mahadasha[] = [];

    let currentDate = new Date(birthDate.getTime());

    for (let i = 0; i < 9; i++) {
        const currentDashaIndex = (startingDashaIndex + i) % 9;
        const planetData = DASHA_SEQUENCE[currentDashaIndex];

        const isFirst = i === 0;
        const dashaDurationYears = isFirst ? yearsRemainingAtBirth : planetData.years;

        const sequenceStartDate = new Date(currentDate.getTime());
        const sequenceEndDate = new Date(currentDate.getTime() + (dashaDurationYears * MS_IN_YEAR));

        const antardashas: Antardasha[] = [];

        for (let j = 0; j < 9; j++) {
            const antardashaIndex = (currentDashaIndex + j) % 9;
            const antardashaPlanetData = DASHA_SEQUENCE[antardashaIndex];

            // Formula: (Mahadasha Years * Antardasha Years) / 120
            const antardashaDurationYears = (planetData.years * antardashaPlanetData.years) / 120;

            // Because the first Mahadasha is truncated, its Antardashas must also be truncated OR skipped 
            // if their theoretical timespan fully occurred before the birth date.

            // To calculate where we *should* be in the 9-part sub-sequence, we calculate the absolute/theoretical start date
            // of the entire Mahadasha as if they were born right at the edge of the Nakshatra.
            const theoreticalMahadashaStartRawMs = sequenceEndDate.getTime() - (planetData.years * MS_IN_YEAR);
            let theoreticalAntardashaStartRawMs = theoreticalMahadashaStartRawMs;

            // Run an inner loop just to sum up the offset for this specific antardasha
            for (let k = 0; k < j; k++) {
                const prevAdIndex = (currentDashaIndex + k) % 9;
                const prevAdDuration = (planetData.years * DASHA_SEQUENCE[prevAdIndex].years) / 120;
                theoreticalAntardashaStartRawMs += (prevAdDuration * MS_IN_YEAR);
            }

            const theoreticalAntardashaEndRawMs = theoreticalAntardashaStartRawMs + (antardashaDurationYears * MS_IN_YEAR);

            // If the theoretical end of this Antardasha is AFTER the birth date, it means the person 
            // lives through at least a part of it.
            if (theoreticalAntardashaEndRawMs > birthDate.getTime()) {
                const actualStart = new Date(Math.max(theoreticalAntardashaStartRawMs, birthDate.getTime()));
                const actualEnd = new Date(Math.min(theoreticalAntardashaEndRawMs, sequenceEndDate.getTime()));

                const actualDurationYears = (actualEnd.getTime() - actualStart.getTime()) / MS_IN_YEAR;

                if (actualDurationYears > 0.0001) { // Ignore rounding dust
                    antardashas.push({
                        planet: antardashaPlanetData.planet,
                        start: actualStart,
                        end: actualEnd,
                        durationYears: actualDurationYears
                    });
                }
            }
        }

        dasas.push({
            planet: planetData.planet,
            start: sequenceStartDate,
            end: sequenceEndDate,
            durationYears: dashaDurationYears,
            antardashas
        });

        currentDate = sequenceEndDate;
    }

    // To make the timeline exactly 120 years from birth, we must append the portion 
    // of the starting planet's Mahadasha that was "missed" before birth to the very end.
    const yearsMissedBeforeBirth = startingPlanetTotalYears - yearsRemainingAtBirth;

    if (yearsMissedBeforeBirth > 0.0001) {
        const planetData = DASHA_SEQUENCE[startingDashaIndex];
        const sequenceStartDate = new Date(currentDate.getTime());
        const sequenceEndDate = new Date(currentDate.getTime() + (yearsMissedBeforeBirth * MS_IN_YEAR));

        const antardashas: Antardasha[] = [];

        // Theoretical mahadasha spans the final yearsMissedBeforeBirth years
        const theoreticalMahadashaStartRawMs = sequenceStartDate.getTime() - (yearsRemainingAtBirth * MS_IN_YEAR);
        let theoreticalAntardashaStartRawMs = theoreticalMahadashaStartRawMs;

        for (let j = 0; j < 9; j++) {
            const antardashaIndex = (startingDashaIndex + j) % 9;
            const antardashaPlanetData = DASHA_SEQUENCE[antardashaIndex];
            const antardashaDurationYears = (planetData.years * antardashaPlanetData.years) / 120;

            const theoreticalAntardashaEndRawMs = theoreticalAntardashaStartRawMs + (antardashaDurationYears * MS_IN_YEAR);

            if (theoreticalAntardashaEndRawMs > sequenceStartDate.getTime()) {
                const actualStart = new Date(Math.max(theoreticalAntardashaStartRawMs, sequenceStartDate.getTime()));
                const actualEnd = new Date(Math.min(theoreticalAntardashaEndRawMs, sequenceEndDate.getTime()));
                const actualDurationYears = (actualEnd.getTime() - actualStart.getTime()) / MS_IN_YEAR;

                if (actualDurationYears > 0.0001) {
                    antardashas.push({
                        planet: antardashaPlanetData.planet,
                        start: actualStart,
                        end: actualEnd,
                        durationYears: actualDurationYears
                    });
                }
            }
            theoreticalAntardashaStartRawMs = theoreticalAntardashaEndRawMs;
        }

        dasas.push({
            planet: planetData.planet,
            start: sequenceStartDate,
            end: sequenceEndDate,
            durationYears: yearsMissedBeforeBirth,
            antardashas
        });
    }

    return dasas;
}
