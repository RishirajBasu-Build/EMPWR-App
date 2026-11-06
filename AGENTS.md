# Mobile Prototype Agent Guide

## Prototype Instructions

In ChatGPT Work Mode, run `sites-preview start "$PWD"`, open `http://terminal.local:4173/` in the cloud browser, and verify the rendered app and its primary interactions. Keep that preview open and tell the user to inspect it in the cloud browser; do not present the local URL as a user-facing chat link. In Codex Desktop, run the local server yourself, open the preview in the in-app browser, and provide the clickable local URL. For this EMPWR Fluid Intake Site, the user explicitly authorized publishing these and future Site fixes on November 6, 2026. Publish verified fixes to this same Site without asking again, preserving its current audience. This standing authorization supersedes the template default requiring a new publish request for each release. Do not give the user server-start instructions when you can run it.

Before planning or implementing any mobile-app change, read this `AGENTS.md` in full. It is the source of truth for the template's runtime and component guidance.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Editing Boundary

- Build app-specific UI in `src/Prototype.tsx` and `src/prototype.css`.
- Treat `src/App.tsx`, `src/main.tsx`, `src/styles.css`, `src/mobile/`, `public/assets/iphone/`, `public/assets/android/`, `public/assets/status/`, `vite.config.ts`, `worker/index.js`, and `scripts/prepare-sites-build.mjs` as protected runtime files. Do not edit, replace, remove, or recreate them unless the user explicitly asks to change the mobile runtime itself. For an explicit runtime change, update the affected lock hashes only after verifying the new runtime behavior.
- Run `npm run check:runtime` before preview or handoff. If it fails, restore the protected runtime instead of weakening or bypassing the check.
- `npm run build` preserves the mobile runtime and prepares the static Cloudflare Worker output required by Sites. Before a Sites handoff, confirm `dist/client/index.html`, `dist/server/index.js`, `dist/.openai/hosting.json`, and source `.openai/hosting.json` exist, then run `npm run test:sites`. Do not replace this project with a Vinext starter.

## Runtime Contract

- Preserve the mobile device runtime unless the user's task explicitly asks otherwise. Do not replace it with a standalone page. Visual fidelity applies to app-owned content inside the device screen, not to template-owned device chrome.
- Keep `App` composed around `PhoneFrame` -> `KeyboardProvider`, with `StatusBar`, app content, `HomeIndicator`, and `KeyboardDock` mounted inside the phone frame. `StatusBar` and the iOS home indicator are overlaid device chrome. When the Android keyboard is closed, the app viewport reserves the protected navigation-bar region instead of painting behind it. When the Android keyboard is open, preserve the current full-screen keyboard layout: its asset includes the IME navigation strip and the separate black navigation bar is hidden. iOS screens continue to paint behind the home-indicator area and own their safe-area content padding.
- Preserve the `iPhone` / `Pixel 10` device picker and both calibrated device presets. The Pixel screen is `427 x 952`; its `32 x 32` camera circle and `public/assets/android/navigation-bar.svg` bottom navigation bar are protected device chrome, not app content.
- Preserve the device picker's intentionally lightweight Codex styling in the top-right corner: its trigger wrapper is borderless and transparent, its trigger sizes to content, and its right-aligned menu uses the compact 3px inset plus the specified hairline and elevation shadow layers. Keep the prototype root and default app screen white.
- Preserve `StatusBar` as live device chrome, including its platform-specific typography, source status-icon assets, and spacing. Pixel 10 uses Roboto, Android indicators, and 32px top, left, and right padding. iPhone uses its iOS indicators, system typography, and calibrated spacing. Do not hardcode screenshot times like `9:41` into the status bar, replace its real-time clock, or move status bar content into app markup unless the user explicitly asks for a fixed/mock device time.
- `PhoneFrame` owns the calibrated device frame, screen portal, device picker, camera cutout, and custom cursor. Keep device assets in `public/assets/iphone/` and `public/assets/android/`; if an asset fails to load, repair the asset path or restore the asset instead of removing the frame, keyboard, or image render.
- Use `MobileScroll` directly for simple single-screen prototypes. Use `FlowStack` for conventional multi-screen flows whose routes can own their fixed header and footer; when using it, define each route as a `FlowScreen`: `{ id, header?, headerHeight?, footer?, footerHeight?, render }`, and use `flow.push(screen)`, `flow.pop()`, and `flow.replace(screen)` from `FlowStack` render callbacks or `useFlow()` instead of introducing another router.
- Use `Carousel` for a carousel, horizontal rail, swipeable cards, image or media strip, horizontally scrollable cards, chip rail, or other horizontal collection.
- For a layered app shell—such as a persistent composer, independently presented sheet, pushed/peek sidebar, or app-wide transition—compose directly in `Prototype.tsx` rather than forcing it through `FlowStack`. Keep app-owned fixed chrome as sibling layers outside `MobileScroll`.
- When using `FlowScreen`, put route-owned fixed headers or footers in `FlowScreen.header` or `FlowScreen.footer`. Set `headerHeight` to the visible app-toolbar height; `FlowStack` adds the device's top safe-area/status-bar inset automatically. Do not include `StatusBar` or its height in the header. Set `footerHeight` to the full app-footer height. `FlowScreen.footer` is an overlay, not reserved layout space; screens using it must add their own bottom content padding such as `padding-bottom: calc(var(--flow-footer-height) + var(--mobile-safe-area-height) + 24px)` so final content can scroll above the footer while still painting behind it.
- Render only scrollable content inside `MobileScroll`; it is for content that should move with scroll and rubber-band overscroll. Keep app-owned headers, nav bars, tabs, composers, and overlays outside it. This keeps scroll physics, safe areas, keyboard insets, scrollbars, and drag click suppression active without letting content paint under fixed chrome.
- Buttons, links, cards, and images inside `MobileScroll` should still allow drag scrolling when the pointer moves beyond tap slop. Use `data-scroll-drag="ignore"` only for rare controls that must own the drag gesture themselves.
- Do not add `var(--keyboard-height)` to ordinary screen/content padding inside `MobileScroll`; the scroll viewport already shrinks above the simulated keyboard. For custom fixed composers, search bars, or toast chrome, use `useKeyboardInsets().bottomInset`. It is relative to the app viewport: Android returns `0` while the closed-keyboard viewport already reserves navigation, then returns the keyboard height while open; iOS continues to clear the home indicator while closed and ride directly above the keyboard while open. Do not pin custom bottom chrome to `bottom: 0` or only `keyboardHeight`.
- Use `KeyboardInput`, `KeyboardTextarea`, or `MobileTextField` for every text-entry control. A raw `input` or `textarea` disconnects focus, keyboard animation, safe-area insets, and attached surfaces.
- Use `BottomSheet` for phone-scoped sheets. Its props are `open`, `onOpenChange`, `title`, optional `description`, optional `snap`, and `children`; it renders through the phone screen portal and dismisses the keyboard before opening.

## Horizontal Carousels

- Use `Carousel` for horizontally draggable cards, images, media, chips, or other horizontal collections. Do not recreate these with `overflow-x`, custom pointer handlers, or a generic div.
- `Carousel` can be nested directly inside `MobileScroll`. It owns horizontal gestures and automatically yields vertical gestures to the parent.
- Never put `data-scroll-drag="ignore"` on or around a `Carousel`; doing so prevents vertical parent scrolling when a gesture begins inside it.
- Do not add CSS scroll snapping to `Carousel`; its runtime owns momentum and release motion.
- Use `data-scroll-drag="ignore"` only when a control must prevent parent scrolling in every drag direction.

See `src/mobile/COMPONENTS.md` for the full component and gesture contract.

## Keyboard Rule

The simulated keyboard is a separate top-layer component. Before presenting anything that behaves like iOS navigation or modal UI, dismiss it first.

Call `keyboard.hide()` before:

- pushing, popping, or replacing FlowStack routes
- opening bottom sheets, action sheets, dialogs, menus, or navigation sheets
- starting transitions where the destination should not inherit text-input focus

`FlowStack` already hides the keyboard for `push`, `pop`, and `replace`. `BottomSheet` already hides it before opening. If you add new modal/sheet/navigation primitives, follow the same rule.

When a composer, search surface, or other keyboard-attached component closes, call `keyboard.hide()` in the same event before changing that component's open state. Position attached surfaces from `useKeyboardInsets()` rather than a separate timer or visibility flag so both dismiss together.

When any text-entry control loses focus, dismiss the simulated keyboard. If the control is custom or does not use the runtime's keyboard-aware fields, handle its blur event and call `keyboard.hide()` explicitly. Keep the keyboard open only when focus is moving directly to another text-entry control that should share the same keyboard session.

## Interaction Rules

- Do not trigger buttons or inputs after a pointer has become a drag. Preserve the drag suppression behavior in `MobileScroll`.
- Do not allow native browser image/file dragging inside the phone frame. Preserve the phone-level `dragstart` suppression and non-draggable image styles so scroll drags that begin on images still scroll the prototype.
- Use `KeyboardInput`, `KeyboardTextarea`, or `MobileTextField` for text entry so the simulated keyboard and safe-area insets stay connected.
- Fixed phone chrome should not animate with pushed screens. Screen content can animate; the status bar, camera cutout, and preview chrome should stay put.
- Keep the keyboard below the home indicator/safe area layer in z-index, and above ordinary app UI while visible.
- Keep the home indicator as the topmost safe-area layer in the z-index above everything else in the prototype.

## Approved prototype updates — October 30, 2026

- Use 8 US fluid ounces per glass across Home, Today totals, all recent readings and helper copy. Home activity order stays Exercise, Fluid Intake, Sleep, Mood Journal after reminder creation.
- Match the supplied reminder card, with 36 px glass icon, 12 px label, 18 px semibold title, 24 px close target, white circular 24 px previous/next controls and three 6 px dots.
- The user explicitly requested changes to keyboard runtime behavior: clickable letter/number keys, number/letter switching, and dismissal when tapping outside a text field. Changes to src/mobile/Keyboard.tsx and its new stylesheet are authorized for those behaviors; preserve the rest of the runtime. Maintain the lock after verifying those changes.

## Home reminder quick logging — October 30, 2026

- Figma Home reminder 238:2874 now includes the underlined Log Progress action. Keep the reminder title's existing navigation to details, dismiss control, arrows and dots.
- Log Progress opens the phone-scoped Fluid Intake bottom sheet from 278:7910 over dimmed Home. Include the Today glass/ounce total, shared counter, 8 US fluid ounce helper, and close control. Changes apply immediately to today's shared reading; there is no extra Save step in this design.
- Keep the existing 0–1000 limits and decimal entry. Closing or reopening retains progress during the session; Home, details, recent readings and chart must agree.
- Keyboard keys are outside the sheet portal. Keep the sheet open during keyboard interactions, dismiss the keyboard on outside-input taps, and close it with the sheet. Preserve runtime files.

## New Final Scope — November 6, 2026 (supersedes earlier display rules)

- Use the New Final Scope annotations in Figma BMI80ChX15L7QaJ38rReU2 / Fluid Intake Final Scope / Fluid Intake as the current source of truth.
- Glass counts remain the editable data (0–1000, decimal entry). Display ounces only: Home `40 ounces`, details and quick-log Today `40oz`, recent readings `40 oz`, and chart values in ounces. Convert every value by multiplying glasses by 8.
- Use the current Home activity arrangement from the final Figma frames and the helper `Each glass counts as 8 fluid ounces.`
- Reminder summary adapts to repeat days, start and finite end dates. Always retain `To change it, go to advanced settings.` as its second sentence.
- New reminders start today and initially end on that same day. Every change to start date resets end date to the new start date, even if the old end date was later. Ends Never disables end-date entry.
- Resolve today in the client's Asia/Kolkata timezone, with recent readings and chart dates following it. Keep the existing in-memory prototype behavior and protected mobile runtime.

## Browser feedback — November 6, 2026

- Hide every visible app scrollbar while preserving native scrolling and gestures; apply app CSS overrides without editing the protected runtime.
- Upcoming intake banner shows only the scheduled time, even for future-day reminders. Use Figma 238:1789's blue ringing-bell SVG 9cf3a.svg at its intrinsic 19.6667 × 18.8333 size inside the original 20 px slot, with source padding/gap/colors.
- New reminders default to daily, starting today, with no end date. End's stored value remains equal to start, ready for a finite range when Ends Never is unchecked. Seven selected weekdays are described as daily; a subset still lists its days. Keep changed Advanced Settings when editing an existing reminder.
- Reading editor groups label, counter and helper with 8 px internal gaps, then separates Save Reading by exactly 12 px.
- Today total must always use one line. For large values, expand its space by reducing the hero gap, scale Today and its clock to 80%, and retain the volume's readable size. Never switch the pill to a two-row layout.
- Graph circles must be fully visible at the maximum, zero and both horizontal endpoints. Retain headroom, canvas padding and unclipped point drawing.

## Fixed chrome review — November 6, 2026

- Home navigation (menu, date, map/profile) belongs in FlowScreen.header, with 52 px app header height; the runtime supplies the status inset. Keep greeting/cards inside MobileScroll.
- Keep status/header surfaces opaque so scrolling content passes behind them. A subtle downward header shadow appears only after scrolling above the starting position.
- The iOS home-indicator area has an opaque full-width background and a subtle upward shadow while more content remains below. Clear the shadow at the end of the content. Preserve the original indicator SVG and all device geometry.
- Sheets use their own white safe-area surface without the scroll shadow; the keyboard retains its existing transparent safe-area layering. Preserve the Pixel navigation asset.

## Standing publication authorization — November 6, 2026

- User response to the publication preference question: "Publish these and future Site fixes".
- This applies to the existing EMPWR Fluid Intake Site, project appgprj_6ae34645e4f481918589d309de53eb6f. Publish completed, verified fixes to this Site without repeated conversational confirmation unless the user changes this preference.
- Preserve the current audience and access settings. This does not authorize unrelated Sites or sharing/access changes. Native tool approvals still apply.

## Medication Handoff — November 6, 2026

- Integrate Medication with the existing Fluid Intake prototype through the Home cards, menu and category navigation. Preserve all Fluid Intake final-scope behavior and fixed chrome.
- Source is Figma BMI80ChX15L7QaJ38rReU2 / Medication Final Scope / Medication handoff (326:13585). Its annotations are authoritative; medication-flow.md maps the 31 supplied states to working interactions.
- Medication progress counts all scheduled dose occurrences across the entire day. A check-in is keyed to medication, date and time. Do not use the number of distinct medication records as the denominator.
- Require medication name, numeric/punctuation strength, one medication type, positive dose amount, positive integer frequency and exactly that many distinct times. Upload is optional and opens the computer file chooser. Camera is presentation-only per the design annotation.
- Conditions are removable chips; Add Condition has inline confirm/cancel. Notes use a keyboard-aware textarea. Start-date changes reset end to start; Ends Never disables end. Honor daily/selected weekdays, date ranges and reminder permission.
- Preserve separate confirmation dialogs for deleting a medication and deleting its schedule. Schedule deletion retains the medication. Lists search name, type and conditions; every edit/reminder control must target its own record.
- Begin with an empty medication list. The existing prototype menu offers Load medication example for a seven-dose, partially completed example, and Notification Settings to demonstrate permission-on/off states. These are in-memory prototype controls; no system notification permission or external reminder is requested.
- Original Figma artwork and source SVG geometry take priority. User-uploaded imagery takes priority over type illustrations. Keep phone/device/status/keyboard runtime files protected.
