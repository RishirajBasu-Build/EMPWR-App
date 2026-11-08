# Static sage iPhone 17 — November 8, 2026

final result: passed

User requested removal of the 3D feature. The static sage iPhone 17 frame remains, with app content interactive. Removed the WebGL/Three.js viewer, source model file, view switches, rotation hint and related styles/dependencies.

Source: qa/sage-iphone/front.png from the preceding release. Implementation: qa/sage-iphone/static-front.png, both 1400 × 1200 at CSS-pixel density. The same 511 × 968 frame and 400.934 × 874 display geometry are retained. The only intended visible change is removal of preview controls. Mobile evidence: qa/sage-iphone/static-mobile.png (390 × 844).

Reviewed frame alignment, typography, spacing, colors, artwork and app copy; no actionable P0/P1/P2 findings. Existing app fonts, content and assets remain. The frame is the same transparent front render used by the preceding release.

Browser checks passed: image decoded, 3D controls absent, zero requests for model/Three.js assets, no page errors, fluid count updated 5→6, keyboard opened/dismissed, Back returned Home, narrow viewport remained usable. Production build, runtime integrity and four Sites tests passed.

Earlier release evidence below is historical.

---

# Sage iPhone 17 release QA — November 8, 2026

final result: passed

The requested scope is the device preview. EMPWR app content and records are unchanged. Android is absent from the presets, runtime paths and bundled device assets.

Source truth: original Apple iPhone 17 USDZ, retained unchanged at public/assets/iphone/iphone-17.usdz; sage reference qa/sage-iphone/apple-sage-reference.jpg (724 × 540). Provenance is documented in public/assets/iphone/MODEL-SOURCE.md.

Evidence: qa/sage-iphone/front.png and 3d-back.png (1400 × 1200 browser captures), mobile.png (390 × 844), keyboard.png, fallback.png, reminder-form.png. The device display is calibrated from the original model's display mesh: 400.934 × 874 CSS pixels at scale 1; the model canvas is 511 × 968 CSS pixels. Screenshots use CSS-pixel density. The new viewport intentionally follows iPhone 17 geometry instead of the former 393 × 852 preset.

Full device and focused camera/finish review used qa/sage-iphone/comparison.png, which presents the source and rendered model together. The reference is a close frontal crop; the implementation crop is a back three-quarter view enlarged 1.75× for comparable device width. The model uses neutral studio lighting rather than Apple's baked promotional reflections. Original camera, side button and device geometry are retained.

Comparison history:
1. Initial render had an incorrect USD unit scale (P1); multiplied the source scale rather than replacing it. The resulting phone and live display align.
2. First back-view check found remaining lavender texture surfaces and visible app content beneath the rotated phone (P1). Remapped the back and camera surfaces; made the inactive app layer opaque-hidden and inert during 3D exploration.
3. Focused finish comparison found the body too grey (P2). Calibrated the sage material under the renderer's studio lighting and recaptured comparison.png. No actionable P0/P1/P2 findings remain.

Fidelity surfaces:
- Typography: EMPWR Work Sans/IBM Plex Mono/Inter assets, content and weights retained; preview controls use the existing system font.
- Layout: source model geometry and display mesh establish the frame; content has the existing 16px gutter. At 390 × 844, the whole phone and both view controls remain visible without horizontal overflow.
- Color: exterior is sage across the frame, camera surround and back glass. Source lenses and glass are retained. Studio-light reflections differ from the marketing photo, an expected rendering difference.
- Assets: original USDZ meshes/textures, source status indicators and iOS keyboard; transparent fallback is rendered from the same model. No app content is rasterized into the fallback.
- Content: app labels and data behavior are retained; preview names iPhone 17 · Sage with Use app / Explore 3D.

Verified with user-authorized Playwright:
- Drag rotates the actual model; switching to Use app restores the front view.
- Fluid counter changed 5→6 and retained 6 through both view modes; shared total remained 48oz.
- Keyboard opens correctly and app navigation/reminder setup stays usable.
- Model-load failure displays the matching fallback and the app remains interactive.
- Android elements: 0; Android public asset directory removed.
- Clean production build navigation, view switching, fluid logging and reminder form produced no console errors or page errors. Development-only hot-refresh and intentionally aborted model-load diagnostics were excluded from the production check.
- Build, runtime integrity, four Sites tests and 22 domain tests passed.

Follow-up polish: lens highlights differ under the neutral studio environment. These are lighting differences in the original model, not missing geometry or interactions.

---

Historical app QA follows; the device dimensions and Android statements below describe earlier releases.

# EMPWR Medication and Fluid Intake prototype — design QA

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

# New Final Scope — November 6, 2026

final result: passed

## Source, state and evidence
- Source: Figma BMI80ChX15L7QaJ38rReU2, page 221:1109 / section 238:1614. Every annotation inspected; implementation trace is in `final-scope.md`.
- Source visuals: `qa/nov6/figma-details.png` (392 × 848), `figma-home.png` (412 × 844), `figma-sheet.png` (388 × 251) and `figma-setup.png` (392 × 991).
- Rendered iPhone: `qa/nov6/details-final.jpg`, `home-final.jpg`, `sheet-final.jpg`, `setup-final.jpg`, each 393 × 852. Matching default intake is 5 glasses / 40 ounces. Home has a saved default reminder; sheet keyboard is closed. Reminder configuration shows Advanced Settings with both initial dates equal to today.
- Combined source/render comparisons opened and inspected: `qa/nov6/details-final-comparison.png`, `home-final-comparison.png`, `sheet-final-comparison.png`, `setup-final-comparison.png`. Sheet comparison is focused on its 251 px content, excluding the protected 34 px iOS safe area. Full Home/sheet proof: `qa/nov6/final-flow.jpg`.
- Viewport 1527 × 1418 CSS px, reported DPR 1.1. Phone measures 392.997 × 851.989 CSS px. Screenshot coordinates multiplied by DPR yield an unscaled 393 × 852 image. Sources and captures shown at 1:1 CSS density. The 412 px Home and 991 px tall reminder source adapt to the protected runtime without scaling font/control sizes; expanded settings remain scrollable above the footer.
- Additional Pixel evidence: `qa/nov6/pixel-sheet.jpg`, 427 × 952. Protected Android camera and bottom navigation remain visible; all sheet controls fit.
- Dates are live in the client timezone (November 6 during verification), instead of Figma's illustrative September/April dates. Graph uses actual shared readings converted to ounces; the illustrative Figma graph points conflict with its own 5-glass Today value and therefore are not hardcoded. The existing sample readings are retained. Month-crossing dates label Oct 31 / Nov 1 explicitly.
- The finite default end date now appears in the adaptive summary, even though the source screenshot's example summary omits it. This follows the explicit annotation to reflect Advanced Settings. The final helper sentence is unchanged.

## Findings and comparison history
- Initial detail comparison `qa/nov6/details-initial-comparison.png` found P2 Set Reminders border/color drift. Applied source teal styling and exact add SVG, recaptured in the final combined detail evidence.
- P2: graph month-range label overlapped the first day when spanning October/November. Replaced the floating range label with explicit month-boundary tick labels; final detail comparison shows clear labels.
- P2: initial reminder render showed content beneath the footer in the home-indicator safe area. Extended the app footer background through its safe area; final setup comparison shows a clean footer and indicator region.
- P2: Ends Never appeared as a square native checkbox instead of the source circle. Kept the native labeled input, overlaid the exact source unchecked SVG and existing checked icon, and verified checked/disabled behavior after the fix.
- P2: the newly displayed Medications card was 5 px taller than the source. Applied its source 124 px height, then recaptured and compared Home. Other standard cards retain 129 px, Calories 124 px.
- Updated exact clock/edit/add SVG slots, latest white selected-repeat surface, and source helper copy. No actionable P0/P1/P2 findings remain after the final comparisons.

## Required fidelity surfaces
- Fonts: bundled Work Sans remains the app font; source Today 20/24 medium, sheet numeric total/input 24/28 medium, Home metric 18/22 medium and reading value 16/20 regular. IBM Plex Mono time/date fields remain. Protected device typography is preserved.
- Spacing: 20 px detail gutters; source 40 px hero gap; 48 px glass counter; 16 px sheet gutters, 20 px gaps, 47 px total pill and 32 px bottom content padding plus platform safe area. Home uses 16 px card gaps and source card heights. Source reminder fields retain 8 px gaps.
- Colors: source teal controls/action text, gray ounce labels, white sheet, 40% backdrop, blue summary information panel, white selected repeat card and green selected border. Disabled counter and end-date states remain distinct.
- Images/icons: source Home photos and SVGs are local. New originals include Appointments photo, appointment icon, zero-progress arc, exact Today clock, Set Reminders add and unchecked Ends Never circle. Reading edit icon uses its exact 12.667 px source asset in a 16 px slot. Home chevrons retain intrinsic 20 × 18 dimensions. Browser found no unloaded app images. No generated or handcrafted replacements.
- Copy/content: Home uses ounces, Today uses oz without parentheses/glass count, readings use oz, graph uses ounces, helper matches current design. Advanced summary includes days/date range and the permanent second sentence. Current date replaces obsolete demo today.

## Interaction and validation evidence
- Detail plus: 5 → 6 glasses updates Today and reading to 48oz / 48 oz and latest graph point to 48. Manual 8.5 gives 68oz.
- Input 1001 clamps to 1000 / 8000oz, plus disabled, no Today pill overflow. Zero gives 0oz and disables minus.
- Recent-reading keyboard input changes yesterday from 15 to 4 glasses; saved row becomes 32 oz and chart point becomes 32. Only three most recent rows expose edit buttons. Sheet remains open while using the simulated keyboard.
- New reminder dates initially both 11/06/2026. Extended end to 11/20, then changed start to 11/10: both became 11/10. Ends Never disabled end entry and removed the finite end from the summary.
- Selected days update the summary (Monday, Tuesday, Wednesday, Friday tested); the fixed second sentence remains present. Saving a daily never-ending reminder returns to details and exposes Home Log Progress.
- Home on-screen keyboard input 8 gives 64oz in sheet and 64 ounces on Home. Outside-input helper tap dismisses keyboard while preserving sheet. Close dismisses both. Pixel number 6 gives 48oz, stays open while typing and appears as 48 ounces on Home; reminder title opens details with 48oz and matching chart data.
- Browser warning/error log empty. No unloaded app assets. Runtime integrity passes for all 28 protected files, TypeScript and production build pass, four Sites worker tests pass. Expected pre-existing build chunk-size advisory remains.

## Remaining limits
- P3: template-owned bezel, cursor, camera, live status clock and JPEG capture softness differ from the flat Figma export. These do not alter app-owned control sizes. Adjacent non-Fluid activities are visual context.
- Prototype state remains in memory and resets on reload. Reminder scheduling remains a demonstration, as before.

final result: passed

# Browser comments follow-up — November 6, 2026

final result: passed

## Source, comparison and density
- User browser comments 1–8 and their attached marked screenshots define these scoped edits. Figma upcoming banner node 238:1789 is the SVG/style source. Saved source `qa/browser-comments/figma-upcoming.png` (348 × 36); implementation `upcoming-banner.jpg` (353 × 36); combined `upcoming-comparison.png` was opened and inspected.
- Default-summary source is the information panel from `qa/nov6/figma-setup.png`; `qa/browser-comments/summary-comparison.png` combines its 364 × 56 crop with the 369 × 56 rendered summary. Text matches the requested daily/today default and permanent second sentence.
- iPhone evidence: `large-total-1800.jpg`, `large-total-8000.jpg`, `details-fixed.jpg`, `reading-editor-fixed.jpg`, `home-no-scrollbar.jpg`, `default-reminder-screen.jpg` under `qa/browser-comments/`. Captures are 393 × 852, at 1:1 CSS screen geometry (392.997 × 851.989 CSS px). Browser viewport 1527 × 1418 CSS px, reported DPR 1.1; clip multiplied by DPR as in the preceding QA. Pixel evidence `pixel-large-total.jpg` is 427 × 952. The template's chrome and JPEG softness remain expected differences.
- `qa/browser-comments/fixes-overview.jpg` combines the final large-value detail state and grouped editor for review. Future reminder starts November 13; the banner displays only 8:00 AM.

## Findings resolved and visual checks
- [P2, comments 1/6] Custom runtime scrollbar indicators were visible. App-scoped CSS hides them and native bars. Verified indicator display none while Home scrollTop reached 476 px and overflow remained auto. Scrolling and navigation are retained; no protected runtime file changed.
- [P2, comment 2] Future dates made the upcoming message wrap. Formatter now preserves schedule selection but returns only the time. Verified future-start reminder reads Upcoming fluid intake reminder : 8:00 AM.
- [P2, comment 3] Banner used the schedule bell. Replaced only this slot with exact source 9cf3a.svg, blue stroke intact, root 19.6667 × 18.8333, at the source .1667 px slot offsets in a 20 px wrapper. Source 8 px padding/gap, #ecf6fe background, 4 px radius and Work Sans 14/20 medium with zero tracking match the combined banner evidence.
- [P2, comment 4] New reminders were finite by default, and selecting all weekdays produced a long list. Default now repeats daily starting today with no end date. Both fresh entry and a full reload show the exact default sentence. Advanced subset (Monday, Wednesday, Friday) updates the summary; a future start updates its date; all seven selected weekdays read daily. Editing saved settings retains them.
- [P2, comment 5] Save Reading touched the helper. Grouped label, counter and helper at 8 px gaps, then a 12 px group-to-button gap. Rendered measurement 11.989 px (rounding from 12 CSS px); button margin 0. Final editor capture visibly separates the button.
- [P2, comment 7] Large totals previously switched to two rows. Pill now stays flex/nowrap, 44 px high; hero gap reduces to 16 px and Today plus clock scale proportionally to 80%. At 1800oz, label/value centers match and clientWidth equals scrollWidth (225 px). 8000oz fits with no overflow on iPhone and Pixel. Volume remains 20/24.
- [P2, comment 8] A maximum at the axis ceiling clipped its circle. Chart now reserves 5% value headroom (at least 8oz), extra edge padding, and clip:false. Captures at 1800 and 8000oz show complete topmost and endpoint circles; zero/low circles remain fully drawn.
- All fixes were applied before the final comparisons/captures; no remaining actionable P0/P1/P2 finding. Scope changes are recorded in `final-scope.md`.

## Required fidelity surfaces and validation
- Fonts: existing bundled Work Sans retained, including exact upcoming 14/20 medium and proportional Today scaling. No font substitutions.
- Spacing: original banner slot dimensions and gaps restored; reading fields 8 px and Save gap 12 px; totals remain 44 px high and single-line. No primary controls hidden on either device.
- Colors: exact blue source SVG and banner tokens; existing teal/gray field states remain.
- Assets: original local SVG downloaded from the fresh design context and checked nonempty; intrinsic dimensions measured in the browser. Other assets unchanged.
- Copy: time-only upcoming reminder; exact default daily/today sentence; adaptive changed settings and persistent helper sentence retained. No unrelated copy changes.
- Browser warning/error log empty. TypeScript, 28-file runtime integrity, production build and four Sites worker tests pass. Existing chunk-size advisory is unchanged.

final result: passed

# Fixed chrome browser comments — November 6 follow-up

final result: passed

## Evidence and comparison
- Source: the three latest user browser comments and marked screenshots, plus the existing version 5 Site for the unchanged app styling. No Figma assets or device artwork changed.
- Combined source/implementation evidence opened and reviewed: `qa/scroll-chrome/home-scrolled-comparison.png` and `qa/scroll-chrome/details-scrolled-comparison.png`. Before files capture the prior live Site; after files capture the local implementation with the same 5-glass / 40oz data and no saved reminder. The Home scrolled comparison shows the intended change in content viewport after reserving the fixed toolbar.
- Additional implementation evidence: `home-top.jpg`, `home-scrolled.jpg`, `details-top.jpg`, `details-scrolled.jpg`, `details-end.jpg`, `pixel-home-scrolled.jpg`, `pixel-details-scrolled.jpg` in `qa/scroll-chrome/`.
- iPhone screen captures are 393 × 852 at 1:1 CSS density. The local browser reports 392.997 × 851.989 CSS px, DPR 1.1, viewport 1527 × 1418 CSS px. Clip coordinates multiplied by DPR. The baseline browser is 1680 × 1560 at DPR 1, screen 393 × 852; its full detail screenshot was cropped to the observed screen rectangle. Initial scaled/blank baseline captures were discarded and are not used as evidence. Pixel captures are 427 × 952.
- Source and implementation use live status clocks, so capture times differ. Device bezel/camera/cursor and JPEG antialiasing are template infrastructure; they are not app visual findings.

## Findings resolved / comparison history
- P1, comment 1: Home toolbar lived inside the scrolling content, and content showed beneath the transparent status region. Moved the existing toolbar into FlowScreen.header (52 px plus runtime safe-area inset), preserved the original starting layout, and used opaque route-colored top surfaces. Home header's measured top remained 337.074 px before/after scrolling on iPhone and 297.088 px on Pixel. The before/after Home comparison shows the toolbar staying fixed and content being masked below it.
- P2, comment 2: there was no depth cue beneath the fixed header. The app observes the active MobileScroll and adds a 0 3px 8px rgba(0,0,0,.09) shadow only above scrollTop 1. Verified no shadow at the top, visible shadow after scrolling in Home/details, and fixed positions on both devices.
- P2, comment 3: home-indicator SVG was transparent around the pill, allowing content behind it to remain visible. Added an opaque app-colored background to its full width, preserving its SVG and geometry. Measured left offset 0 and width 392.997 px, exactly the screen width. An upward 0 -4px 12px rgba(0,0,0,.1) shadow indicates content below; at the end (scrollTop 201.818 / max 202) moreBelow becomes false and the shadow clears.
- Modal specificity was checked so its white indicator surface clears the scroll shadow. While the keyboard is open the indicator background is transparent and shadow none, preserving keyboard artwork/layers. No actionable P0/P1/P2 finding remains after the final comparisons.

## Required fidelity surfaces
- Typography: all existing bundled fonts, font sizes, line heights, copy and date formatting retained. Only the toolbar's ownership changes; its children keep their existing styling.
- Spacing: Home fixed header is 52 px with original 12 px top / 16 px side / 16 px bottom spacing; runtime supplies platform status height. Content no longer duplicates this top inset. Original card gutters/gaps and all detail/form geometry retained.
- Colors: opaque #f4f5f5 Home chrome, white detail/setup chrome, subtle black shadows at 9–10% opacity. Sheet white and keyboard transparency override the scrolling surface.
- Assets: original status, camera, bezel, navigation and home-indicator assets remain; no duplicate device chrome, substitute icons or generated art. All 28 protected runtime files unchanged.
- Content: all prior intake, reminder, chart and editor text unchanged. Original scrolling and in-memory data behavior retained.

## Browser and production checks
- Home scrolls to later activities while its menu/date remain fixed. Menu still opens and navigates to Fluid Intake. Details/chart scrolls and back navigation remain functional.
- Header/indicator flags update with native scrolling and with content/container resizing. At scroll start the header shadow is absent; while scrolling it appears; the lower shadow clears at the end.
- Full-width indicator background and shadows visible in combined comparisons; Pixel keeps its original black navigation area and fixed camera/status assets.
- Reading editor opens, its indicator surface is white with no extra shadow, and focusing its input preserves the keyboard safe area; close dismisses normally.
- Browser warning/error log empty. TypeScript, runtime integrity, production build and all four Sites worker tests pass. Existing build chunk-size advisory remains.

final result: passed

# Medication Handoff integration — November 6, 2026

final result: passed

## Source, scope and capture normalization

- Visual truth: Figma BMI80ChX15L7QaJ38rReU2 / Medication Final Scope / Medication handoff (326:13585). Read all 31 frame states and their annotations; requirements are mapped in medication-flow.md. The pre-existing Fluid Intake flow remains the shared second category.
- Local implementation verified through the in-app browser at port 4187. Viewport override 1680 × 1560; native browser reports 1527 × 1418 CSS px and DPR 1.1. Measured unscaled iPhone screen 392.997 × 851.989 CSS px; captures 393 × 852. Pixel screen 426.989 × 951.989 CSS px; captures 427 × 952.
- Reference PNGs in qa/medication/med-source-*.png are 392 × 848, except the first two form references at 392 × 882 and the longer dashboard reference at 392 × 973. Full comparisons normalize source width to 393 while retaining its aspect ratio. App content is compared at equal CSS scale; source-only extra blank height is not stretched into the runtime's fixed viewport.
- Source clocks, device borders, notch, home indicator and camera are excluded from app fidelity findings. The protected runtime retains live status clocks and platform-specific device geometry. Native screenshots are JPEG data, with capture softness/color tone; CSS colors and original image files were also checked directly. No color compensation was applied to the source tokens.
- Dynamic medication names, uploaded images, dates, dose times, record counts and repeat summaries differ deliberately with the entered example. The review comparison uses an existing-record edit, so Update / Save Medication Changes replace the add-flow labels. Both add and edit paths were tested.

## Combined visual evidence opened and reviewed

- Empty / required fields: compare-final-empty.jpg and compare-final-details-empty.jpg.
- Conditions, schedule and review: compare-final-conditions.jpg, compare-final-schedule-selected.jpg, compare-final-review.jpg.
- Tracking / list: compare-final-taken-expanded.jpg, compare-final-full-list-menu.jpg, compare-final-taken-sheet-before.jpg and compare-final-pending-sheet.jpg.
- Notification and confirmations: compare-final-empty-permission-warning.jpg, compare-final-delete-schedule-confirmation.jpg and compare-final-delete-medication-confirmation.jpg.
- Focused same-scale anatomy: focused-dose-row.jpg and focused-pending-row.jpg compare the same Amoxicillin row's original 3D pill artwork, type/condition icons, note, reminder and Taken control. focused-list-card.jpg checks the 105 px illustration slot and compact content. Full list card heights measured 128.991 px against the 129 px source.
- Pixel post-fix evidence: final-pixel-injection-review.jpg and final-pixel-menu-above.jpg. The earlier pixel-tablet-review-before-footer-fix.jpg is failure-history evidence, not a passing capture.
- Fluid regression: final-fluid-regression.jpg shows 1800oz on one line and fully visible graph circles at zero, both horizontal edges and the peak.

## Findings and correction history

1. P2: the condition explanation stayed on one line, pulling the chip field and Notes upward; the textarea also showed a native resize handle. Restored the source 342 px explanation width and removed that handle. The final conditions comparison now retains the two-line explanation and source grouping.
2. P2: the full list displayed extra note rows and date-before-time ordering, increasing a 129 px card to about 162 px. Kept notes in review, editing and dose sheets, restored the source list ordering and 129 px card anatomy, and recaptured the full list with its menu open.
3. P2: accordion chevrons initially pointed sideways. Corrected their source orientation for collapsed/expanded states. The final Taken comparison shows the source outlined cards, individual completion marks and View action.
4. P2: enabling permission from the warning's settings sheet initially unmounted that sheet immediately. Kept its dialog mounted until Done. Browser verification confirms the sheet remains open after enabling, Done stays visible, and the warning then disappears.
5. P1: Android's already-reserved 48 px navigation region was being added again by the shared app-footer background extension. That made FlowStack scrollHeight 952 versus clientHeight 904 and allowed its header to shift upward by 48 px during focused-control navigation. Disabled the app-owned footer extension on Android. Post-fix measurements are scrollHeight 904, clientHeight 904, scrollTop 0, and header top equal to screen top. The final Pixel review shows the complete fixed title and original black navigation bar. All 28 protected runtime files remain unchanged.
6. P2: a focused comparison found the compact list's flat capsule graphic had also been used in dose sheets. Restored their original Figma 7d747.png 3D pill artwork at 28 × 28 inside the 24 px circle. Both Pending and Taken focused comparisons were recaptured and reviewed after the correction.
7. Last-card menus were also verified to open above the footer when space below is insufficient. Edit, reminder setup and delete remain reachable on Pixel without shifting fixed chrome.

No actionable P0/P1/P2 findings remain after the post-fix comparisons.

## Required fidelity surfaces

- Fonts: locally bundled Work Sans 400/500/600 and IBM Plex Mono. Source 28/32 step headings, 20/24 navigation/review titles, 14/20 labels and 14/16 supporting copy retained. Verified Work Sans in the rendered header.
- Spacing: source 12 px form gutters, 20/24 px vertical groups, 36 px fields/time chips/buttons, 8 px chip gaps, 105 px medication illustration columns, 129 px full-list cards and phone-scoped bottom sheets. Longer real names/conditions can grow rather than clip. Headers remain fixed with the existing scroll shadows.
- Tokens: teal #097259, body #535b5a, muted #6e7776, blue #329cec, amber warning #fef9e6 / #8e700b, and the original source type-panel background colors. Disabled first-stage CTA uses #c5cac9. Progress is drawn from actual dose counts rather than a fixed mock SVG arc.
- Assets: original Figma SVGs and photographs downloaded locally. Source SVG intrinsic geometry retained in measured slots; photos keep source cropping for the original demo artwork and dynamic uploads take priority. All referenced local assets are nonempty and loaded. The corrected dose image measures 27.997 × 27.997 CSS px. Device, keyboard, status and navigation assets were preserved.
- Copy: annotation-defined field labels, helpers, validation rules, condition controls, repeat settings, review, lists, menus, check-in controls and both delete confirmations implemented. Current client date replaces historical sample dates. The empty Home card shows a dash; counts include every dose scheduled across the entire day.

## Browser interactions verified

- Empty Home → Medication → all three details steps → Schedule → Review → save → populated dashboard. Required first-stage values and complete unique times gate progression; image remains optional.
- Strength rejects alphabetic input. Dose/frequency accept numeric input. Duplicate times are rejected; Add Time disables at the frequency limit. Existing times remain removable/editable.
- Computer file chooser uploads the source sample image, shows success, retains it through review, and removes it when requested. Removal restores the source type illustration. Camera shows the annotated app-only behavior without requesting camera access.
- Conditions select/remove, inline Add Condition confirm/cancel, reopening selection with existing chips, and notes work. Optional conditions/notes can remain blank.
- Start changes reset end, end cannot precede start, Ends Never disables/re-enables end entry, selected weekdays require at least one selection. New medication defaults to a finite same-day range as shown in its source; Fluid Intake retains its separately specified no-end daily default.
- Schedule Edit, cancel/confirm Delete Schedule, recreation after deletion, and saving edits preserve medication details. Medication editing updates the same record, retaining compatible existing dose check-ins.
- All-day denominator verified: three example medications produce seven doses. Partial 2/3 Taken groups include the untaken dose in View; marking it updates both dashboard and Home. Completing all seven yields 100% and an empty Pending list, with no duplicate check-in action.
- Next upcoming pending time sorts first; next reminders skip completed occurrences. Set Reminder As Per Schedule enables that medication's reminders. Notification-off disables reminder toggles; enabling through the warning restores them and stays open until Done.
- First three summaries, View More, case-insensitive search by name/type/condition, no-results state, per-record menu, edit, reminder setup and medication deletion confirmation all work. Cancel retains the record; confirm removes its list entry and scheduled dose occurrences.
- iPhone and Pixel navigation and fields pass. Pixel tablet and Injection types were entered and reviewed; saving a one-dose fourth medication changed 3/7 to 3/8, and deleting it restored 3/7. All four types are supported.
- Fluid Intake regression: counter 7 → 225 gives 1800oz / 1800 oz and graph data; Today stays a 44 px single line and all graph circles remain visible. Default daily/today reminder, time-only upcoming banner, letter/number keyboard switching, outside-tap keyboard dismissal, Home quick logging and shared ounces all passed. Medication navigation and check-ins leave fluid readings unchanged.
- Browser warning/error log checked: empty.

## Follow-up polish / source limits

- P3 source gap: the supplied medication component set has Capsule, Tablet and Syrup/Liquid artwork but no Injection illustration; a targeted read of the final page, earlier Medication page and Work In Progress page found none. Injection uses the existing original generic medication graphic when no image is uploaded. A provided Injection illustration can replace that fallback; uploads already take priority. Camera is intentionally app-only per annotation.
- Prototype records and notification permissions are in-memory demonstration state. No external notifications, account integration or backend were requested or added.
- Existing production chunk-size advisory remains; it does not prevent the build or change behavior.

## Release checks

- Runtime integrity: all 28 protected files pass.
- TypeScript and production build pass; all four Sites worker checks pass.
- .openai/hosting.json and the three required built hosting files exist. The existing public Site identity and audience are retained.

final result: passed

# Four browser-review corrections — November 6, 2026

final result: passed

- Source: the user's four marked browser screenshots and comments. The color was read directly from Figma's base collection: VariableID:69:2715, base/color/teal/90, Mode 1, RGB rounding to #097259.
- Today’s Progress now has margin-top 24px. Browser measurement: computed margin 24px; normalized distance below the fixed header 23.992px.
- Pending groups now show every upcoming time ascending, followed by every overdue unlogged time ascending. A live current-minute value updates ordering while the screen is open. The exact 2 PM example (3 PM, 9 PM, 8 AM, 9 AM), unsorted input, current-minute boundary, all-past/all-future schedules and immutable stored data pass five focused domain tests.
- Browser example at 2:35 PM shows 8 PM, 10 PM, then the unlogged 9 AM dose; the Upcoming badge remains on the earliest future group.
- The chart foreground is read from --base-color-teal-90, shared with the percentage text. Browser computed text color is rgb(9, 114, 89); the CSS token resolves to #097259.
- Both category bars now use the exact same labels, order and shared layout. Browser comparison reports identical geometry: toolbar 40px, category bar 43.991px, gap 26px, padding 4px 24px 0. Only aria-current / active styling differs between Medication and Fluid Intake. Both route header heights are 84px.
- Screenshots opened and reviewed: qa/review-four/medication.jpg and qa/review-four/fluid.jpg, each 393 × 852 at the unscaled iPhone preset. Paired evidence: qa/review-four/paired-views.jpg and qa/review-four/paired-headers.jpg. These show the larger progress gap, darker source teal, corrected ordering and matching category bars.
- Pixel check: progress margin 24px, teal rgb(9, 114, 89), header 83.991px, screen overflow 0. Fluid counter still updates 40oz → 48oz, and switching categories retains medication progress. Browser warning/error log is empty.
- Fonts, source assets, form fields, dose check-in, fixed chrome and Fluid Intake data behavior remain intact. No new asset or device-runtime change was needed. No actionable P0/P1/P2 issue remains in these four corrections.
- Runtime integrity passes for all 28 protected files; TypeScript/production build and all nine focused-domain/Sites-worker checks pass.

final result: passed

# Shared page gutters — November 6, 2026

- Source: the user's marked medication dashboard screenshot and request to match the category tabs' padding throughout the app. The established category track has 24 px horizontal padding.
- Replaced mixed outer 12/16/20 px margins with a shared `--page-gutter: 24px`. Main page containers, navigation/form progress rows, fixed action footers, sheets and confirmation/toast edges share it. Direct dashboard/details sections do not add a second gutter. Internal card/control spacing remains independent.
- Browser measurements: Home, Medication dashboard, medication wizard, full medication list, Fluid Intake details, reminder setup and sheet content compute to 24 px horizontal padding. Main clientWidth equals scrollWidth at iPhone 393 px and Pixel 427 px. Internal medication title/actions and cards fit without horizontal overflow.
- iPhone screenshots reviewed: qa/shared-gutter/iphone-medication-expanded.jpg, iphone-medication-form.jpg, iphone-medication-dose-form.jpg, iphone-medication-schedule.jpg, iphone-medication-review.jpg, iphone-medication-list.jpg, iphone-medication-dose-sheet.jpg, iphone-home-populated.jpg, iphone-fluid-large-total.jpg, iphone-fluid-reminder.jpg, iphone-fluid-calendar.jpg, iphone-fluid-reading-sheet.jpg and iphone-fluid-quick-log.jpg.
- Pixel screenshots reviewed: qa/shared-gutter/pixel-home.jpg, pixel-medication.jpg, pixel-fluid.jpg and pixel-fluid-reminder.jpg. Original status/navigation/device geometry remains intact.
- Responsive chip layout retains complete 14 px monospaced labels and remove controls: two columns on iPhone, three on Pixel for the fluid reminder; medication dose chips wrap naturally. All seven weekday controls fit on iPhone.
- Medication editing through all details/schedule/review stages still saves the same medication. Fluid reminder creation and reading editing still save correctly. Home quick logging opens with aligned title/counter; large 8000oz Today total remains on one line and graph points remain visible. Prior progress margin, dose ordering, source teal and fixed chrome behavior are preserved. Browser error log is empty.
- No actionable P0/P1/P2 layout issue remains in this spacing change. TypeScript/production build pass; all 28 protected runtime files and all nine existing domain/Sites-worker regression checks pass. All four required hosting files exist.

final result: passed

# Liquid medication SVG correction — November 6, 2026

- User feedback supersedes the older Syrup Version 1 3D bottle in the handoff list. The requested illustrated source is Medication / 259:3435, Syrup Version 2, hugeicons:medicine-syrup (I259:3435;2164:9387).
- Read the original card and icon through Figma design context, then downloaded its unmodified c4624.svg. Root width/height/viewBox are 39.3751 × 62.7084. The card source places it within a centered 70 px icon slot, with a 0.5 px horizontal offset on a 105 px amber gradient panel (#faecbd → #e8b816).
- MedicationArt now uses this local SVG for liquid defaults in full lists, review, compact summaries and dose sheets. Large rendering retains the intrinsic SVG dimensions; compact rendering uses a uniform 2/7 transform with the original aspect ratio. User-uploaded images remain the first branch and still override defaults. No SVG paths or root attributes were edited.
- Reviewed browser evidence: qa/liquid-svg/iphone-list.jpg, pixel-list.jpg and pixel-review.jpg. The outlined bottle matches the Figma card screenshot, stays centered, and is fully visible on both phone presets. Review retains a 105 × 105 panel; list retains its existing 105 px illustration column and card height. Shared 24 px page gutters are unchanged.
- Browser verification confirms c4624.svg loads successfully, every visible medication-list image loads, and large CSS image dimensions round to 39.361 × 62.685 px at the preview's browser zoom. The compact SVG also loads with uniform scaling. Browser error log is empty.
- Runtime integrity passes for all 28 protected files. TypeScript/production build and all nine existing domain/Sites-worker checks pass. All required hosting output files are present. No new test was needed for this asset-only correction, and no actionable P0/P1/P2 mismatch remains in scope.

final result: passed

# 16 px app-wide page padding — November 6, 2026

- Latest user instruction explicitly changes the shared left/right page padding to 16 px, superseding the earlier 24 px horizontal request. Updated the single --page-gutter value and brought both health/reminder navigation rows onto that same variable. Existing main pages, category tabs, wizard headings/progress, fixed action footers, sheets, dialogs and toast edges inherit the new value. Nested card/control spacing remains independent.
- Browser computed padding-left and padding-right are exactly 16 px on Home/header, Medication dashboard, full medication list, medication wizard, wizard title/progress, Fluid Intake details, reminder setup/footer and time-picker sheet header/content. Pixel dashboard/list and Fluid Intake also measure 16 px on each side. Measurements are saved in qa/gutter-16/measurements.json.
- Main clientWidth equals scrollWidth at both 393 px iPhone and 427 px Pixel presets. Category rails retain their intended horizontal carousel behavior. Existing 24 px progress top spacing, original liquid SVG, typography and protected device geometry remain intact.
- Reviewed screenshots in qa/gutter-16: iphone-medication-list.jpg, iphone-fluid.jpg, iphone-time-sheet.jpg, pixel-fluid.jpg and pixel-medication-list.jpg. Page edges, tabs, fields and fixed action buttons align consistently. Category navigation, list/form opening and sheet opening/closing still work. Browser error log is empty.
- TypeScript/production build, all 28 protected runtime files and all nine existing domain/Sites-worker regression checks pass. Required hosting files are present. No actionable P0/P1/P2 layout finding remains for this change.

final result: passed

# Combined Medication + Fluid Home reminders — November 6, 2026

## Source, state and comparison evidence

- Figma file BMI80ChX15L7QaJ38rReU2 / Medication Final Scope / Medication handoff / Reminders (Medication+Fluid Intake). Read all four frames and their descendant annotations: 346:18784, 346:18955, 346:19290, 346:19493. Detailed code context was also read for medication sheet 346:19127 and fluid banner 346:19327. Flow mapping is in home-reminder-flow.md.
- Source screenshots: qa/combined-reminders/source-medication.png, source-medication-sheet.png, source-fluid.png and source-fluid-sheet.png. Source is 388 × 844, except fluid banner frame 412 × 844. The source's historical date, status chrome and three illustrative dots are superseded by the runtime's live chrome, current date and two annotated current reminder types.
- Browser viewport: 1680 × 1560 requested for 1:1 mobile QA. Verified device-screen bounds 392.997 × 851.989 CSS px for iPhone and 426.989 × 951.989 for Pixel; screenshot output is 393 × 852 / 427 × 952. Browser density is 1.1; screen clips use the measured rectangle and density. Images were compared at original font-pixel size with canvas padding, without stretching the source or changing device geometry.
- Final implementation: iphone-medication-final.jpg, iphone-fluid-final.jpg, iphone-medication-sheet-final.jpg, iphone-fluid-sheet-final.jpg in qa/combined-reminders. Pixel evidence: pixel-medication.jpg, pixel-fluid.jpg, pixel-medication-sheet.jpg.
- Full comparisons: pair-medication-full.png, pair-fluid-full.png and pair-fluid-sheet-full.png. Focused comparisons: pair-medication-card.png, pair-fluid-card.png, pair-medication-sheet.png and pair-fluid-sheet.png. Each comparison contains source and implementation together. Both parent and independent reviewer opened the paired evidence; no actionable P0/P1/P2 difference remains.

## Findings, fixes and post-fix evidence

1. P2: the fluid banner's taller inactive medication sibling created vertical scrollable overflow. Opening Log Progress could scroll the rail vertically and clip the label/icon. Set the Carousel track to height:100% and overflow:clip. Its natural slide heights remain measurable. Post-fix browser measurements: fluid rail clientHeight=scrollHeight=110, scrollTop=0, including after opening the sheet. iphone-fluid-sheet-fixed.jpg and final fluid-sheet pair show the entire background card.
2. P2: a swipe paused before release could stop between cards. Added an observer for the protected Carousel's data-dragging completion, scheduling the same settle behavior after release. No protected gesture code was changed. Browser horizontal dragging, arrows and dots all resolve to actual category cards; source review confirms paused release also schedules alignment.
3. P2: font shorthands reset the source OpenType settings and the Home sheet inherited slightly different teal action colors. Restored the Figma Work Sans features on reminder text and both Home sheets; matched medication action border #097259 and text #044e3d. Replaced Home close artwork with exact 9bd5e.svg at 20 px and preserved source arrow opacity at boundaries. Computed features now include ss01/ss03/ss04/ss06/zero. Final captures and pairs were regenerated after these corrections.

## Required fidelity surfaces

- Typography: bundled Work Sans 400/500/600, source 12/16 tags, 18/22 semibold titles, 14/20 medication description, 14/16 underlined actions and 20/24 sheet title. Source letter spacing and OpenType settings are explicit. Minor browser/font rasterization differences remain P3; no wrapping or hierarchy issue remains.
- Spacing: shared 16 px page gutters; source medication 32 px icon with 12 px gap, fluid 36 px icon with 8 px gap; both cards use 16 px inner padding and 12 px corners. Actual banner heights are 150 and 110 px. Compact medication sheet rows and dividers follow source spacing, with five rows visible on iPhone and Pixel. Runtime safe areas and fixed header remain intact.
- Colors: original violet #f4ecfe/#440b8e medication label, blue #ecf6fe/#0a5085 fluid label, source body/muted grays and teal controls. Existing progress ring uses the approved teal/90 token.
- Images/icons: downloaded unmodified original 4b777.svg; reused exact source glass, close, arrow, dot, pill, dose and condition artwork. Browser confirms all visible reminder/sheet assets load, with effective 31.989 px capsule, 35.994 px glass, 13.324 px dismiss icon, 20 px sheet close, 27.997 px dose image and 5.994 px dots. No paths were redrawn or replaced by approximations. Uploaded medication imagery and the approved Liquid SVG still take priority in shared medication artwork.
- Copy: source labels/actions retained; dose time and remaining count are dynamic. Appointments/General reminders are not fabricated: the annotation explicitly limits the current flow to Medication and Fluid Intake.

## Interaction and regression evidence

- Empty Home, the existing medication example and the new combined example remain available. Combined demo gives five due 9 AM doses and seven total daily doses, alongside the configured fluid reminder.
- Medication appears first; Next/Previous, both dots and horizontal drag switch actual cards. The card window adapts from 150 px to 110 px. Vertical dragging beginning over a reminder scrolls Home (measured scrollTop 220) while its header stays fixed; normal navigation back to Home restores top position.
- Exact due dose sheet opens with five Taken actions. Check-ins produce 1/7 and 14%, then 3/7 and 43%, with remaining count 5→4→2; Medication details also shows 3 of 7. Completing all five due doses leaves 5/7 and removes that completed group, retaining the fluid card. Open sheets retain their original dose keys while check marks update.
- Medication dismissal leaves fluid available; fluid dismissal removes only its own card. Dismissing the last card removes the empty carousel. Restart and combined-demo reload reset dismissal state. Notification-off hides medication reminders without altering the all-day denominator or existing fluid behavior.
- Fluid Log Progress preserves immediate saving. iPhone 5→6 gives 48oz and Home 48 ounces; Pixel input 7 gives 56oz and Home 56 ounces. Returning to Fluid Intake confirms shared totals. Keyboard dismissal and sheet close remain connected to the existing runtime.
- Six focused reminder-selection tests cover due/future boundaries, earliest grouping, partial/full completion, per-medication/global notification eligibility and immutable exact identities. Existing medication ordering and Sites checks remain included. Browser error log is empty.

## Release checks and follow-up

- All 28 protected runtime files are unchanged. Production/TypeScript and all 15 existing/new domain and Sites-worker checks pass; all four required hosting output files are present.
- P3: dates, progress data, responsive card width and device/status rendering intentionally follow the current prototype/runtime rather than the historical source mock. Long-lived cross-midnight prototype records retain the existing session-date limitation until reload; no persistence or external notifications were added.

final result: passed

# Equal-height Home alerts — November 6, 2026

- Source: latest user browser annotation removes the medication count description and requires equal card heights across alert types. This supersedes the earlier two banner heights in the Figma handoff.
- Removed that sentence, matched the medication title/action spacing to the fluid card and applied one shared height to all slides. The shared height is derived from the tallest content with a 110 px minimum, retaining space for longer reminder titles. Selection no longer changes height and there is no height transition.
- Browser evidence: qa/equal-reminders/iphone-medication.jpg, pixel-fluid.jpg and measurements.json. At the unscaled iPhone and Pixel presets, both cards and the window measure 110 px, with no vertical overflow. The Recommended Activities heading stays at exactly the same top position before and after switching: 659.020 px on iPhone and 619.034 px on Pixel in the QA viewport. No layout shift remains.
- Typography, original icons, 16 px gutters, card padding and actions are preserved. Medication action opens five due entries; fluid action opens the existing 40oz quick-log sheet. Browser error log is empty. No actionable P0/P1/P2 issue remains.
- Production/TypeScript, 28 protected runtime files and all 15 regression checks pass before publishing.

final result: passed

## Appointments integration — November 6, 2026

Source visual truth: `qa/appointments/reference-348-19965.png`, `reference-357-23695.png`, `reference-357-22770.png`, `reference-348-19741.png`, `reference-357-23192.png`, `reference-357-22979.png`. High-fidelity generated context is retained beside them as source text. Source frames are 388×938 CSS px; Figma renders include their border (392×942 px).

Implementation: `qa/appointments/iphone-empty-final.jpg`, `iphone-form-final.jpg`, `iphone-reminder-final.jpg`, `iphone-list-final.jpg`, `list-menu-final.jpg`, `delete-dialog.jpg`, `form-reminders.jpg`; Pixel evidence `pixel-list.jpg`, `pixel-empty-final.jpg`, `pixel-form-final.jpg`, `pixel-reminder-final.jpg`.

Browser viewport 1680×1560; verified device-screen bounding boxes approximately 393×852 CSS px (iPhone) and 427×952 CSS px (Pixel). Captures are 393×852 and 427×952 pixels respectively, normalized by the screenshot API after applying reported device density 1.1. No comparison uses the surrounding desktop stage. The source's taller viewport and older status/home chrome remain intentional differences: protected device runtime and safe areas are preserved. Source sample dates are replaced by current client-date defaults and future demonstration records.

Full-view comparisons opened and reviewed: `iphone-empty-final-comparison.jpg`, `iphone-form-final-comparison.jpg`, `iphone-reminder-final-comparison.jpg`, `list-menu-final-comparison.jpg`. Focused controls comparison opened: `iphone-reminder-final-detail.jpg`. All reside in `qa/appointments/`.

Findings and correction history:
- P2: initial empty-state message used 20px/24px with 20px gaps. Corrected to source 18px/22px and 16px gaps. Post-fix evidence: iphone-empty-final-comparison.jpg.
- P2: reminder form inherited 24px gaps from appointment details. Corrected its heading margin and field gaps to source 16px. Post-fix evidence: iphone-reminder-final-comparison.jpg and detail.jpg.
- P2: appointment time rows inherited Work Sans. Loaded the source Inter Bold font; date badges use source IBM Plex Mono 600. Post-fix evidence: list-menu-final-comparison.jpg. Work Sans remains the semantic UI family.
- Initial reminder screenshot caught an in-progress push transition and is not used for final acceptance. Recaptured settled final screen.
- Final logic review corrected reminder merging so adding times while editing one reminder creates distinct IDs, preserves other dates/toggles, and blocks duplicate occurrences. Five appointment logic tests cover defaults, date/time sorting, upcoming selection, required fields and merge identity/isolation.

Required fidelity surfaces:
- Typography: Work Sans hierarchy (28px/32px headings, 16px/20px labels and values), Inter Bold 14px list times, IBM Plex Mono 24px date badges and 14px dates checked. Shared category typography stays identical to Medication/Fluid Intake per the user's standing feedback.
- Spacing/layout: 16px common gutters supersede original 12/20/24px gutters; 36px form fields, 8px field internals, 24px appointment field gaps and 16px reminder gaps checked. iPhone long reminder lists scroll beneath opaque fixed header/footer; Pixel preserves Android navigation area. No clipped persistent controls.
- Tokens: teal/90 #097259 save actions, source grey borders, blue upcoming banner, green upcoming date, coral required marks and destructive red confirmed.
- Assets: 21 original non-empty SVG files cataloged in asset-manifest.json, including conditional toggle and date assets. Source files are unmodified. Intrinsic root geometry is preserved in slots; rotation is limited to source chevron orientation. rendered-assets.json confirms all 17 populated-list images loaded at intended dimensions. Reminder input/calendar/add assets were separately measured loaded at source geometry. No substituted artwork or temporary asset URLs in application code.
- Copy/content: source headings, fields, empty state and deletion copy retained. Appointment With is the chosen consistent field label (one alternate Figma frame says Provider name). Dynamic counts, dates, times and reminder banner use shared state.

Interaction verification: Home, menu and category entry; empty-state validation; provider and location entry; keyboard dismissal outside fields; AM/PM selection; minute 60 normalized to next hour; calendar selection; defaults two hours before and at appointment time on its date; add reminders; duplicate blocking; edited date persistence; independent toggles; exact row editing preserving other reminders; direct list reminder save; cancel/confirm delete with sibling preservation; Home count updates; Medication and Fluid Intake category navigation; Fluid counter 40→48oz reflected on Home. Pixel form, reminder and list states checked. Existing combined Home reminders remain unchanged.

Intentional source completions: copied Fluid Intake annotation on Set Reminders resolves to Appointment Reminder as shown by adjacent screens; a fixed Save Reminders action follows the existing app save pattern because the source omits a commit control. No external notification scheduling was added. Appointments start empty; menu example loads three future records. Data remains in memory as before.

Checks: TypeScript and production build passed; protected runtime 28/28 files passed; 20 tests passed including Sites output/Worker contract. Browser error log: empty. Existing large-bundle advisory remains non-blocking.

No remaining actionable P0/P1/P2 visual findings. Follow-up polish: none required within this scope. final result: passed

## Empty Medication dashboard spacing — November 6, 2026

Scoped browser annotation: add 24px top margin to `.med-dashboard.med-empty-dashboard`. Added `.med-empty-dashboard { margin-top:24px }` only; populated medication progress retains its existing rule. Preview checked with the empty list: computed margin-top is exactly 24px, with visible separation below the fixed category tabs. Evidence captured at `/private/tmp/empwr-medication-empty-spacing.jpg`; other content and actions unchanged. No actionable visual findings. final result: passed

## Reminders Final Scope integration — November 6, 2026

Source: Figma BMI80ChX15L7QaJ38rReU2 / Reminders Final Scope / Reminders, 18 frames cataloged in reminders-flow.md. Reference PNGs and complete high-fidelity context are in qa/reminders/reference-*.png and source-*.txt. Device artwork in the source is excluded from implementation fidelity; the protected runtime stays intact.

Evidence: qa/reminders/picker-final-comparison.jpg, med-all-corrected-comparison.jpg, appointment-select-final-comparison.jpg, fluid-corrected-comparison.jpg, advanced-final-comparison.jpg, general-passed-comparison.jpg and general-passed-detail.jpg, hub-verified-comparison.jpg and hub-verified-detail.jpg, drawer-verified-comparison.jpg, empty-verified-comparison.jpg. Pixel: pixel-medications.jpg, pixel-fluid.jpg and pixel-hub.jpg.

Geometry and normalization: source phone frames 388×852 (PNG 392×856 including border), with appointment subflow 388×938. Main iPhone screen verified at approximately 393×852 CSS px, Pixel at 427×952. capture-geometry.json records each rectangle, viewport and density. Full browser PNGs were cropped to the device screen and normalized to that screen's CSS dimensions; base display density is 1.1, with some early captures at 120% browser zoom (reported density 1.32), corrected using the recorded 1.2 scale. Blank/incorrectly clipped initial screenshots and the transition capture empty-passed are superseded by settled full captures. A secondary scaled empty capture is superseded by the final 393×852 empty-verified capture. Comparisons were opened together before acceptance. Protected status/safe areas account for the source's slightly different vertical origin and drawer profile placement.

Comparison history / fixed findings:
- P2 selection density: inherited search margins doubled the space around the search and pushed cards below their target position. Scoped search margin reset, source field/list gaps retained. med-all-corrected evidence shows the correction.
- P2 selection artwork: temporary check symbols differed from the source checkbox marks. Replaced with Figma 42ccc and f3689, including indeterminate Select All semantics.
- P2 fluid time grid: shared 116px minimum caused two columns under the current 16px gutter. Hub form now has three columns with scoped compact chip padding/gaps. All seven chips measured clientWidth=scrollWidth=113px, without clipping. fluid-corrected comparison passes.
- P2 drawer: MobileScroll's absolute root overlapped the profile. Corrected only app-owned CSS with a specific relative flex-root rule. Browser measurement: root is relative, scroll top 27px after profile bottom. drawer-verified comparison shows no overlap. Earlier drawer captures are superseded.
- P2 General dates: example record's Ends Never value disabled an end field with no control to re-enable it. General rules normalize to finite dates; both dates are editable. Verified endDateEnabled=true, retained in general-passed capture.
- P2 hub artwork: changed the compact capsule to the exact 7d747 source asset through the existing dose-art variant. Final loaded asset check confirmed it.
- Scoped repeat spacing and schedule line-height corrected to the source. The final General controls are readable and scroll above the fixed Save footer on the shorter protected iPhone viewport.

Required fidelity review:
- Typography: source Work Sans hierarchy, 28px/32px headings, 16px/20px form labels, 18px picker/empty copy, mono time/date fields and source medication fonts checked. Category tabs match the source. Source numeral/font features and the existing medication/liquid artwork corrections remain intact.
- Spacing/layout: 16px shared gutters supersede source 12/24px gutters. Picker 2-column tiles with 68px color panels, 12px gaps; 36px inputs; source 16px form rhythm; 16px reminder-card gaps; 24px medication-selection gaps and 20px appointment gaps. Fixed header/footer, vertical scrolling, safe areas and Android navigation remain usable.
- Colors/tokens: original violet/blue/pink/green type panels and badges, teal Save/toggles, grey borders, blue info surface and semantic required markers checked against generated context. No nearby out-of-scope restyling.
- Assets: 26 non-empty source assets cataloged in asset-manifest.json; source icons stay unmodified at intrinsic dimensions in their slots. rendered-assets.json checks list images and geometry; subsequent final check found 49 loaded images, no failures, including 7d747. Picker assets, form clocks/calendars, selection marks and empty-state glyphs were inspected in their rendered screenshots. Uploaded photos, medication-type artwork and prior liquid SVG rule remain dynamic/reused. No temporary Figma URLs in application code.
- Copy/content: source screen headings, four reminder types, summaries, search fields, create actions, Set As Per Schedule, Save Reminder, no-results copy and empty state retained. Dates, record counts and repeat/time text are actual state rather than fixed screenshot data.

Interaction verification: drawer entry/close; empty list, add and four-type picker; preselected form type; General title, AM/PM, repeat days, save, edit and pause (Home alert removed immediately); Fluid advanced schedule and Ends Never disabled field, shared save and no duplicate reminder, paused Home state; medication select one/all, disabled/enabled Save, name/type/condition search (Asthma matched Salbutamol), original wizard opened by Create Medication, application to selected schedules and paused configured row retained; appointment search by location, no-results/Create Appointment, exact selected-record defaults and existing reminder editor, per-occurrence pause with siblings retained; all/category filters; restart cleared all stores; realistic example restores all four types. Pixel list, fluid form and all-selected medications checked. No browser console errors.

Intentional interpretation: later medication selection annotations override older card-click-to-edit annotations. Appointment selection is one appointment at a time and opens its existing reminder editor. Advanced Save commits the fluid reminder and returns to the hub. General title annotation is fulfilled by a due, recurring Home alert in the existing equal-height carousel. No invented Appointment Home alert, system notifications or backend persistence. Existing prototype controls remain available under the drawer disclosure.

Validation: TypeScript/production build passed; 28 protected runtime files unchanged; 24 unit/hosting checks passed. Existing large-bundle advisory remains non-blocking. No remaining actionable P0/P1/P2 findings. final result: passed

## Appointment reminder revision — November 6, 2026

Target: Figma BMI80ChX15L7QaJ38rReU2 / Appointments Final Scope / Appointments. High-fidelity frames 348:19741, 357:23192 and 357:22979; reference captures in qa/appointment-reminder-update/figma-0.png through figma-2.png. Native app code and existing components were retained; no Code Connect mapping was returned.

Evidence and normalization: source frames render at 392×942 including border, from 388×938 Figma frames. The implementation uses the protected 393×852 iPhone and 427×952 Pixel viewports at scale1 in a 1400×1200 browser. Full screenshots were cropped using measured device-screen geometry. Component crops align source and implementation despite the shorter protected iPhone viewport and 16px user-requested gutter. Default/custom/form comparison images combine both artifacts. Dates are session-derived rather than the source's example dates.

Findings fixed: P1 missing default reminder cards and labels; P1 hidden Set Reminders after creation; P2 older switch artwork and missing 28px calendar; P2 custom date typography/slot. These were corrected before the passing captures. The exact current switch export is stored separately because its filename was reused by Figma across paint changes.

Fidelity surfaces:
- Typography: source Work Sans weights, 16/20 labels, 20/24 time/date, −0.5px tracking; custom date now16px medium. Existing direct time input and date field typography retained.
- Spacing/layout: source12px card padding/gap, rounded8px cards and thin grey borders; time/date on a single row, switch above;16px shared page gutter. No horizontal overflow on either phone. Content scrolls fully above the fixed Save footer.
- Colors/tokens: white surfaces, grey20/10 borders, source grey90 labels, black time/date, source teal action and unmodified on/off switch SVGs. Exact downloaded artwork reused without recoloring.
- Image/asset fidelity: clock28×28, default calendar28×28, custom calendar20×20, on-switch44×25, add20×20. All visible files loaded and rendered at intrinsic dimensions. No substituted drawings.
- Copy/content: “Remind me 2 hours before”, “Remind me at scheduled time”, “Set Reminders”, and the existing source reminder form copy. Two enabled defaults and custom reminder values match the corresponding states.

Intentional differences: protected live device/status/navigation chrome; current session dates; the source form's absent commit control is supplied by the already-approved fixed Save Reminders footer. Set Reminders stays discoverable after custom reminders, as required for adding more. The additional action increases scrollable content height. Pre-existing unrelated screens were not restyled.

Passing evidence: defaults-passed-comparison.png, custom-passed-comparison.png, reminder-form-comparison.png, iphone-defaults-passed.png, iphone-custom-passed.png and pixel-custom-passed.png. Browser interaction and asset geometry checks passed; console errors were empty. Automated validation completed during publication packaging.

final result: passed

## Medication free-text fields — November 6, 2026

Target: current published Medication wizard, with the user's four explicit changes as the source of truth. No new design or Figma change was requested. Scope: strength/dosage entry, strength label/helper, validation and round-trip display.

Evidence: qa/medication-text-inputs contains the prior published form, optional-strength and mixed-character strength/dosage captures, and the Pixel optional-strength form. The reference was captured at214.36×464.73 and normalized to393×852 for a structural before/after comparison; it is not used for pixel-level typography judgments. Updated captures are393×852 iPhone and427×952 Pixel at scale1. strength-comparison.png combines reference and implementation; the visible helper/required-marker removal and resulting natural spacing shift match the request.

Required fidelity surfaces: typography, source fonts, colors, assets, borders, field sizes,16px gutters and fixed chrome are unchanged. Only the requested helper and strength asterisk disappear; later fields shift upward by the removed helper's natural height. Original upload/camera/type icons remain unchanged. Both phone layouts fit without overlaps. Copy is unchanged elsewhere. The dosage supporting text and required marker remain as before. No new imagery or styling was introduced.

Behavior verified through the UI: strength accepts `500 mg/mL + B12 (10%)`, retains it across back/forward and save/reopen; strength may be blank through the full save. Dosage accepts and saves `½ tablet + water (5 mL)` and retains it when editing. Whitespace-only dosage blocks continuation; valid free text enables it once the numeric frequency and time requirements are met. Blank strength shows no standalone mg on review or the medication list. Mixed-character strength/dose display without appended duplicate units. Console errors: none. Protected runtime integrity:28 files unchanged. Build and existing regression checks run during packaging.

No new automated tests were added for this scoped reversible form edit; end-to-end browser round trips verify the requested behavior directly.

final result: passed
