# EMPWR Fluid Intake prototype — design QA

final result: passed

## Source and evidence
- Figma file BMI80ChX15L7QaJ38rReU2, Fluid Intake Final Scope, Fluid Intake section.
- Baseline detail frame 238:1939; reminder frame 238:3471. Other inspected states include Home 238:1615 / 238:2874, selected days 238:3575, active schedule 238:1726 and sheet 238:2101.
- Source screenshots: qa/figma-details.png (392 × 848) and qa/figma-reminder.png (392 × 991).
- Implementation: qa/details-final-screen.png and qa/reminder-final-screen.png (393 × 852).
- Full-view combined comparisons: qa/details-final-comparison.png and qa/reminder-final-comparison.png.
- Focused controls / typography / information panel comparison: qa/reminder-focused-comparison.png.
- Browser viewport: 1400 × 1300 CSS px after native viewport scaling; reported DPR 1.2. Verified phone screen bounding box 392.995 × 851.992 CSS px, equivalent to the unscaled 393 × 852 iPhone preset. Browser capture uses a downsampled JPEG; cropped at the observed capture ratio 1 / 1.2 and normalized back to 393 × 852. Some capture softness is expected.
- The reference reminder frame is 991 px tall; its lower blank area and footer position were adapted to the runtime's 852 px screen. Compared app-owned controls at equal scale; preserved runtime status bar, notch, clock, bezel, keyboard, home indicator, and Android navigation chrome.

## Comparison history
1. Initial rendered inspection found P1 previous-screen bleed-through in pushed screens, and P1 browser focus scrolling the whole phone canvas when opening sheets. Fixed app route backgrounds and app-scoped device overflow clipping; confirmed device screen scrollTop remains 0 after sheet close.
2. Initial combined comparison found P2 inherited template styles affecting Reminder Notes label weight and information-panel text color. Scoped the label and information-panel typography/color to the app. Corrected exercise photo crop using the source image's 135 × 241 placement.
3. Recaptured the same baseline states after fixes; inspected combined full views and the focused form comparison. No actionable P0/P1/P2 issues remain.

## Required fidelity surfaces
- Typography: original Work Sans 400/500/600 and IBM Plex Mono 400 are bundled locally. App headings 20/24 and 18/22, labels 16/20, helper text 14/16, times 14/20. Protected device typography stays native.
- Spacing: 20 px detail gutters; 12 px reminder gutters; 8 px input gaps; 36 px time chips; 51 px counter controls; source 4/8/12 px component radii. Fixed save footer remains reachable with scrollable expanded settings.
- Colors: source teal #097259 / #089b79, grey #535b5a / #6e7776, blue #0a5085 / #9acdf4, and selected-repeat green states reproduced.
- Images/icons: source Figma photographs and SVGs downloaded into public/assets/figma. No stock substitutes or generated illustrations. Nonempty source files and loaded rendered images verified. The graph is deliberately data-driven Chart.js output so edited readings and the plotted values agree.
- Content: core Figma wording retained. Sample dates aligned to October 29, 2026. Fixed source inconsistency between header total and input at zero. Chart axis adapts to actual sample values, including 15.2. Selected-day information and upcoming reminder timing reflect the saved schedule.

## Browser interaction checks
- Home activity card opens intake details; back navigation returns Home.
- Plus updates intake total and current reading; manual entry synchronizes chart and total.
- Zero disables minus; input 1001 clamps to 1000 and disables plus.
- Exactly three latest readings have edit controls; changed second-latest reading from 15.2 to 8 and observed updated row and chart.
- Default seven reminder times; add 9:00 AM, remove it, edit 8:00 AM to 8:30 AM.
- Reminder note edited; simulated keyboard dismissed before navigation.
- Advanced Settings expands; selected days and weekday toggles update.
- Ends Never toggles end-date picker availability; end date 10/31/2026 saved.
- Saved selected weekdays and date interval visible in schedule summary; upcoming reminder correctly resolves to Tomorrow on an excluded weekday.
- More opens full schedule bottom sheet; close returns to same screen; Edit Reminder reopens saved data.
- Edited reminder note saved and reflected in Home banner; banner opens details.
- Saved default daily / never-ending state also verified; creation CTA disappears once reminder exists.
- iPhone and Pixel 10 layouts inspected; no hidden primary controls or horizontal overflow.
- Browser error/warning log checked: none.
- npm run check:runtime passed; npm run build passed; npm run test:sites passed (4 tests).

## Follow-up polish and limits
- P3: runtime phone chrome differs intentionally from flat Figma frame chrome; normalized JPEG capture is softer than the original reference PNG.
- Prototype data lives in memory. Reload restarts the demonstration; it does not schedule operating-system notifications or send real reminders.
- The surrounding health categories are outside the Fluid Intake scope.

# October 30 revision — final result: passed

## Current scope and evidence
- Updated Figma 238:1939 and supplied reminder reference `qa/v2/reminder-reference.png` (760 × 228 at 2×).
- Full-view comparison: `qa/v2/details-comparison.png`, combining current Figma `qa/v2/figma-details.png` (392 × 848) and browser `qa/v2/details-final.jpg` (393 × 852).
- Focused exact banner/control comparison: `qa/v2/banner-comparison.png`, combining the supplied image and browser `qa/v2/reminder-banner-final.jpg` (361 × 114), normalized to the reference's 380 × 114 CSS footprint. Width difference comes from preserving the protected 393 px runtime viewport versus Figma's 412 px Home viewport; typography, control size, and spacing retain their CSS values.
- Full Home capture: `qa/v2/home-final.jpg`.
- Browser layout measured 392.997 × 851.989 CSS px; viewport 1527 × 1418 CSS px, reported DPR 1.1. Screenshot clip coordinates multiplied by DPR yield an unscaled 393 × 852 output. Native clock, notch, home indicator and bezel are intentionally template-owned.

## Comparison history / findings resolved
- P1: keyboard was a static image. Added interactive keys retaining original keyboard assets, native controlled-input updates, cursor-aware editing, letter/number modes, backspace, Shift and Done. Added platform-calibrated Android hit targets and retained Android navigation chrome.
- P1: outside clicks left keyboard open. Added document-level pointer dismissal excluding text fields and keyboard, plus blur handling that permits direct field-to-field focus.
- P2: initial reminder-arrow implementation stretched a 6.143 × 11.143 source SVG to 24 × 24 and reversed direction. Restored its intrinsic dimensions inside the source's 24 px white circle; previous points left, next points right. Final comparison `qa/v2/banner-comparison.png` includes the corrected 13.333 px close icon within a 24 px target.
- P2: 1000 glasses with 8000oz overflowed the Today pill by 44 px. Added a two-line summary layout for three-or-more-digit totals, verified scrollWidth equals clientWidth (353 px) at 1000.
- Re-captured and visually checked the final banner after the last close-icon adjustment. No actionable P0/P1/P2 findings remain.

## Required visual surfaces
- Fonts: bundled Work Sans remains 400/500/600; banner label 12/16 medium, title 18/22 semibold, title tracking -0.5 px. Numeric/notes fields retain source typography.
- Spacing: reminder 16 px padding, 8 px icon gap, 36 px glass slot, 12 px radius, 24 px circular arrows, 6 px dots with 8 px gaps. Counter buttons/field now share the revised 48 px height.
- Colors: source blue glass and #ecf6fe / #0a5085 label, #535b5a title, white arrow buttons, gray inactive dots; original teal input tokens retained.
- Assets: original Figma glass, close icon, intrinsic arrow SVG and dots used locally; photos and other app assets retained. New keyboard key targets overlay original device keyboard artwork; no replacement device art.
- Copy: 8 US fluid ounces per glass applied consistently to all detail states and Home, including 5 Glasses (40oz), 15 Glasses (120oz), and zero. Home activity order remains Exercise, Fluid Intake, Sleep, Mood Journal after reminder creation. Existing demo dates and other flow copy retained.

## Browser checks
- On-screen numeric input: blank count → tap 8 → value 8 and synchronized total 8 / 64oz.
- iPhone on-screen text and digits: empty notes → a, b, 123, 1, 2 → ab12; Backspace, ABC, c → ab1c; Done closes keyboard.
- Outside-click dismissal verified on helper text for both iPhone and Pixel 10; keyboard remains open when typing on it.
- Android: tap 7 enters 7 in numeric field; notes a then 3 enters a3; Done and Save Reminder Changes succeed.
- Limits: 1001 clamps to 1000, plus disabled; zero gives 0oz and minus disabled. Large-value pill no longer overflows.
- Create reminder, reopen and save edits, active schedule, Back to Home, updated Home activities, arrow indicator changes and close-banner action verified.
- Existing one-reminder rule, time/date/weekday settings and last-three-reading edit restriction retained.
- Clean-page-load console: no errors/warnings. A development-only HMR context warning occurred while replacing the keyboard module; it did not recur after a full reload and is absent from the production build.
- TypeScript, runtime integrity, production build, and four Sites worker tests pass.

final result: passed

# Home reminder quick logging — October 30 revision

final result: passed

## Sources, state and comparison evidence
- Source visual truth: Figma Fluid Intake Final Scope / Fluid Intake, Home reminder 238:2874 and Home Log Progress 278:7910. Saved at `qa/v3/figma-home-reminder.png` (412 × 844) and `qa/v3/figma-home-progress.png` (388 × 844).
- Implementation: `qa/v3/home-final.jpg` and `qa/v3/progress-final.jpg`, both 393 × 852. Full-view combined evidence: `qa/v3/home-final-comparison.png` and `qa/v3/progress-final-comparison.png`. Focused header, Today pill, counter and helper: `qa/v3/progress-focused-comparison.png`.
- Matching state: saved default reminder, Home, 5 glasses / 40oz, keyboard closed. Runtime date remains October 29, 2026 as in the existing prototype; source sample date is September 11. The Home reference is 24 px wider than the sheet reference. Both are adapted to the protected 393 px runtime without scaling fonts or controls.
- Browser viewport 1527 × 1418 CSS px, reported DPR 1.1. Device screen measured 392.997 × 851.989 CSS px. Explicit screen clip multiplied by DPR produces the unscaled 393 × 852 capture. Reference and implementation are shown at 1:1 CSS density. Browser JPEG capture is softer than Figma PNG.
- Additional responsive evidence: `qa/v3/pixel-progress.jpg` at the protected 427 × 952 Pixel preset; 8.5 glasses / 68oz. Android navigation remains below the sheet; all controls and helper are visible.

## Findings and comparison history
- P1 interaction finding: the simulated keyboard is a sibling of the sheet portal. Initially tapping a number also triggered modal outside dismissal. Fixed in app code by tracking keyboard pointer interactions and keeping the sheet open for those events. Retested both iPhone and Pixel: keyboard number tap changes the count while the sheet remains open; helper tap hides only the keyboard. Close, Escape and backdrop still dismiss correctly. Protected runtime is unchanged.
- P2 responsive finding: the initial Android safe-area selector targeted a non-ancestor of the sheet portal, which would add the iOS bottom padding above Android navigation. Corrected to the platform-bearing phone ancestor, then captured `qa/v3/pixel-progress.jpg` with the intended 32 px bottom content padding.
- Initial full comparisons: `qa/v3/home-initial-comparison.png`, `qa/v3/progress-initial-comparison.png`. After the fixes, recaptured and inspected the final combined full views and focused sheet above. No actionable P0/P1/P2 visual or interaction issues remain.

## Required fidelity surfaces
- Typography: bundled Work Sans, Home Log Progress 14/16 medium with underline and dense tracking; reminder label 12/16 medium and title 18/22 semibold. Sheet title and Today 20/24 medium, numeric totals/input 24/28 medium, helper 14/16 regular. Wrapping follows the existing phone width.
- Spacing/layout: source 16 px sheet top radii and side gutters, 60 px header including padding/divider, 20 px section gaps, 47 px Today pill, 48 px counter, 8 px counter/helper gaps, 32 px bottom content padding plus iOS safe area. Sheet content height is 251 px plus 34 px iOS safe area, matching the source's 251 px content. Home card gains the source 8 px vertical gaps and Log Progress link.
- Colors/tokens: 40% black scrim; white sheet, #f4f5f5 divider/pill border, #3b403e heading/count, #6e7776 muted text, existing #089b79 counter borders and #097259 action link. Disabled controls retain the shared counter state styling.
- Image quality/assets: original Figma clock `b0767.svg` and filled glass `70a70.svg` are bundled locally, along with the source close icon and existing Home artwork. No visual asset substitutions. Device chrome, clock, cursor and camera stay template-owned.
- Copy/content: Fluid Intake, Today, Log Progress, reminder title, and the exact 8 US fluid ounces helper match the design. Live counts are consistent with actual entered progress. The sheet has no Save button, as in the source; changes apply immediately. The explanatory description is accessible but visually hidden.

## Browser and build checks
- Home reminder Log Progress opens the sheet over Home; the original reminder title still opens details.
- Plus/minus update the sheet total immediately; plus also works with the keyboard open and dismisses only the keyboard. Typed 8 gives 64oz; typed 8.5 gives 68oz. The Home card updates behind the sheet.
- Typed 1001 clamps to 1000 / 8000oz and disables plus; pill scrollWidth equals clientWidth (359 px). Zero gives 0oz and disables minus.
- On-screen numeric entry works on iPhone and Pixel, without closing the sheet. Tapping the helper dismisses the keyboard and keeps the sheet open.
- Close control dismisses sheet and keyboard. Reopening retains the count. Escape and backdrop dismissal verified.
- Reminder title navigation shows the same updated total, latest reading, and accessible seven-day chart values in details.
- Both device layouts preserve protected status bar, camera, keyboard and navigation. No new horizontal overflow or hidden primary controls.
- Browser error/warning log: none. TypeScript, mobile runtime integrity, production build and four Sites worker tests pass.

## Follow-up polish and limits
- P3: protected device chrome differs from the flat Figma frame; browser screenshot compression softens fine strokes. These do not change app control dimensions.
- Existing prototype state remains in memory and resets on reload. Reminder scheduling remains a demonstration.

final result: passed
