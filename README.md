# EMPWR · Fluid Intake

Interactive mobile prototype built from the Fluid Intake Final Scope page in the EMPWR Figma file.

Includes Home, fluid intake logging (0–1000 glasses), seven-day chart, last-three-days reading editing, reminder time/date/note configuration, daily or selected-weekday repetition, schedule bottom sheet, reminder editing, and the Home reminder banner.

## October 30 update

Eight US fluid ounces per glass with synchronized ounce totals throughout. Home after reminder setup retains the revised activity order. Reminder banner matches the supplied image. The on-screen keyboard supports typing, text/number switching, backspace and Done, and dismisses on taps outside text fields.

## Development

- `npm ci`
- `npm run dev -- --host 0.0.0.0 --port 4173 --strictPort`
- `npm run build`
- `npm run test:sites`

Uses the preserved Product Design mobile runtime, with a static sage iPhone 17 frame and simulated mobile keyboard. App code is in `src/Prototype.tsx` and `src/prototype.css`. Original Figma images are bundled in `public/assets/figma`.

This is an in-memory prototype. Refresh restarts the demo. No real notifications or external patient data are used.

See `design-qa.md` for visual evidence and interaction checks.

## November 8 device update

The build offers only a static sage iPhone 17 frame around the interactive EMPWR app. Android and the 3D viewer have been removed. There are no view switches, rotation controls, 3D assets or Three.js dependencies. See public/assets/iphone/MODEL-SOURCE.md for frame provenance.
