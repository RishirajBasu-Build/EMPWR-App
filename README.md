# EMPWR · Fluid Intake

Interactive mobile prototype built from the Fluid Intake Final Scope page in the EMPWR Figma file.

Includes Home, fluid intake logging (0–1000 glasses), seven-day chart, last-three-days reading editing, reminder time/date/note configuration, daily or selected-weekday repetition, schedule bottom sheet, reminder editing, and the Home reminder banner.

## Development

- `npm ci`
- `npm run dev -- --host 0.0.0.0 --port 4173 --strictPort`
- `npm run build`
- `npm run test:sites`

Uses the preserved Product Design mobile runtime, with iPhone / Pixel 10 previews and simulated mobile keyboard. App code is in `src/Prototype.tsx` and `src/prototype.css`. Original Figma images are bundled in `public/assets/figma`.

This is an in-memory prototype. Refresh restarts the demo. No real notifications or external patient data are used.

See `design-qa.md` for visual evidence and interaction checks.
