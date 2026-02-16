# Swiss Ephemeris Data Files

This folder contains Swiss Ephemeris data files (.se1) for high-precision astronomical calculations.

## Files Included

- `sepl_18.se1` (472 KB) - Planet data (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn)
- `semo_18.se1` (1.2 MB) - Moon data (high precision)
- `seas_18.se1` (217 KB) - Asteroid data

## Source

Downloaded from: https://github.com/aloistr/swisseph/tree/master/ephe

## Accuracy

These files contain **NASA JPL DE406 ephemeris** data, providing:
- Precision to arc-seconds  
- Coverage from 3000 BC to 3000 AD
- Identical accuracy to Jagannatha Hora and professional software

## Production Notes

- Total size: ~2 MB (essential for production accuracy)
- Must be deployed with your API
- If files are missing, the library falls back to built-in Moshier (still accurate but less precise)
