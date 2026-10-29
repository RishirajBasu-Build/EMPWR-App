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
