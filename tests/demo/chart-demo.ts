/**
 * Demo script to generate charts and SVG
 */
import { generateKundali, generateRasiChart, generateNorthIndianChartSVG } from '../../src/index';

const birthDate = new Date('1990-01-15T14:30:00Z');
const latitude = 22.7196;  // Mumbai
const longitude = 75.8577; // Mumbai

console.log('=== Kundali Charts SDK Demo ===\n');

const { rasi, navamsa } = generateKundali(birthDate, latitude, longitude, 'Asia/Kolkata');

console.log('--- Ascendant ---');
console.log(`Sign: ${rasi.ascendant.signName}`);
console.log(`Degree: ${rasi.ascendant.degree.toFixed(2)}°`);
console.log(`Nakshatra: ${rasi.ascendant.nakshatra} (Pada ${rasi.ascendant.nakshatraPada})`);
console.log(`Ayanamsa: ${rasi.ayanamsa.toFixed(2)}°`);

console.log('\n--- Planets ---');
rasi.planets.forEach(p => {
    console.log(`${p.planet.toString().padEnd(8)} | ${p.signName.padEnd(10)} | ${p.degreeInSign.toFixed(2)}° | House ${p.house} | ${p.nakshatra} (${p.nakshatraPada})${p.isRetrograde ? ' [R]' : ''}`);
});

console.log('\n--- Houses ---');
rasi.houses.forEach(h => {
    const planets = h.planets.length > 0 ? h.planets.join(', ') : '-';
    console.log(`House ${h.number}: ${h.signName} (Lord: ${h.lord}) | Planets: ${planets}`);
});

console.log('\n--- Navamsa ---');
navamsa.planets.forEach(p => {
    console.log(`${p.planet.toString().padEnd(8)} | ${p.navamsaSignName.padEnd(10)} | House ${p.navamsaHouse}`);
});

console.log('\n--- Generating SVG ---');
const svg = generateNorthIndianChartSVG(rasi, { showTable: true, layout: 'row' });
console.log(`SVG generated! Length: ${svg.length} characters`);
console.log(`First 200 chars: ${svg.substring(0, 200)}...`);

console.log('\n=== Demo Complete ===');
