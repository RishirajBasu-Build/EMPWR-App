EMPWR is a React web prototype that simulates a mobile health app inside an iPhone or Pixel frame. It currently implements Fluid Intake, Medication, Appointments and a shared Reminders hub. Most other Home activities are presentation examples. Data lives in browser memory and resets on refresh; the project has no patient database, authentication service or notification delivery backend.

This guide describes the checked-out code on November 8, 2026. Source line links refer to that snapshot. It explains the implementation; [AGENTS.md](AGENTS.md) remains the authority for product decisions and editing boundaries.

**Start with the two layers.**

The product layer decides what EMPWR displays, stores and validates. The mobile runtime supplies the phone frame, status bar, navigation animations, scrolling, keyboard and sheets. Both run in the browser.

```text
index.html
└── src/main.tsx                 mounts React and imports CSS/fonts
    └── App.tsx
        └── MobileRuntime       device and keyboard infrastructure
            └── Prototype       EMPWR state, navigation and screens
```

You normally change product behavior in `src/Prototype.tsx`, its extracted rule helpers and `src/prototype.css`. Runtime files are protected by project policy; 28 files also have SHA-256 hashes checked automatically. A product change should use the runtime's components rather than recreate them.

**Know what each file is for.**

| File or directory | Responsibility |
| --- | --- |
| [index.html](index.html) | Browser document, page title, `#root` mount and module entry. |
| [src/main.tsx](src/main.tsx) | Calls `ReactDOM.createRoot`, enables Strict Mode, imports global styles and Roboto. |
| [src/App.tsx](src/App.tsx) | Wraps `Prototype` in `MobileRuntime`. |
| [src/Prototype.tsx](src/Prototype.tsx) | Product types, state providers, rules, screens, forms, dialogs and route definitions. |
| [src/prototype.css](src/prototype.css) | Product appearance and app-specific overrides of runtime surfaces. |
| [src/appointments.ts](src/appointments.ts) | Appointment types, defaults, sorting, reminder merging and validation. |
| [src/home-reminders.ts](src/home-reminders.ts) | Chooses the earliest eligible due medication group for Home. |
| [src/medication-time.ts](src/medication-time.ts) | Sorts remaining dose times into upcoming, then overdue groups. |
| [src/reminder-rules.ts](src/reminder-rules.ts) | Recurrence/date eligibility and next displayed clock time. |
| [src/mobile/](src/mobile/) | Reusable device runtime; individual files are explained below. |
| [src/styles.css](src/styles.css) | Protected runtime layout, layers, device chrome and base styles. |
| [src/vite-env.d.ts](src/vite-env.d.ts) | Vite's TypeScript environment declarations. |
| [public/assets/figma/](public/assets/figma/) | Bundled original product illustrations, photos and SVGs. |
| `public/assets/iphone`, `android`, `status` | Device frame, keyboard, navigation and status assets. |
| [tests/](tests/) | Domain unit tests, runtime browser tests and hosting tests. |
| [worker/index.js](worker/index.js) | Static asset serving and HTML fallback for Sites. |
| [scripts/](scripts/) | Runtime integrity, packaging and source-asset utilities. |
| [package.json](package.json) / `package-lock.json` | Dependencies, commands and the resolved dependency tree. |
| [tsconfig.json](tsconfig.json) | Strict TypeScript checking for `src`; no JavaScript emit from TypeScript. |
| [vite.config.ts](vite.config.ts) | React tooling, dev server and `dist/client` build output. |
| [playwright.config.ts](playwright.config.ts) | Runtime browser-test server, fixture, viewport and timeouts. |
| [.openai/hosting.json](.openai/hosting.json) | Existing Sites project identity; D1 and R2 bindings are null. |
| [mobile-runtime.lock.json](mobile-runtime.lock.json) | Expected hashes of 28 protected files. This is different from the dependency lockfile. |
| [qa/](qa/) | Screenshots, comparison images, Figma context and recorded verification evidence. |
| `dist/` | Generated deployable output, ignored by Git. |

The package name and README still emphasize Fluid Intake, reflecting the project's starting point. Medication, Appointments and Reminders were added later. Read the current code and later AGENTS decisions when older prose differs.

**Read the React syntax as a description of behavior.**

`type Medication = ...` describes the shape of a record. A component such as `Home()` is a function returning JSX, React's UI syntax. Component arguments are called props: `Counter` receives a `value` and an `onChange` callback.

`useState` remembers a value and supplies its setter. `useContext` reads shared state made available by a provider. `useEffect` connects React to timers, charts or DOM listeners and often returns cleanup code. `useRef` holds a DOM reference or mutable value between renders without independently triggering a render.

When you see `items.map(...)`, the component is rendering one row per record. `onClick` and `onChange` are event handlers. An update such as `setLogs(old => old.map(...))` makes a new array from the previous state; React then renders consumers of that state again. `structuredClone` creates independent editor drafts so typing does not immediately mutate the saved record.

**Follow startup from the outside inward.**

[main.tsx](src/main.tsx) mounts `App` in the HTML root. [MobileRuntime.tsx](src/mobile/MobileRuntime.tsx) composes these layers:

```text
MobileDeviceProvider
└── PhoneFrame
    └── KeyboardProvider
        ├── KeyboardPreview
        ├── StatusBar
        ├── MobileAppViewport
        │   └── Prototype
        ├── HomeIndicator
        └── KeyboardDock
```

This ordering lets app components read the selected device and keyboard state. Status and navigation chrome remain outside the product's animated screens. A screen portal is a DOM container inside the phone: dialogs and sheets use it so their overlays cover the simulated phone rather than the whole desktop browser.

At the end of [Prototype.tsx](src/Prototype.tsx#L364), `Prototype()` composes `MedicationProvider`, `AppointmentProvider`, `ReminderHubProvider` and `StoreContext.Provider`, then renders `FlowStack` and a toast. These providers sit above the screen stack, so navigating between screens keeps the saved data available.

**Understand the four stores before the screens.**

| Store / hook | Saved data | Draft or UI data |
| --- | --- | --- |
| `StoreContext` / `useStore()` | Fluid `logs` and its single `reminder` | Fluid `draft`, drawer state, toast notification and reset helpers. |
| `MedicationContext` / `useMedications()` | `medications`, dose-keyed `taken` map, prototype `notifications` flag | Medication `editor`, wizard `phase`, editing flag and example loaders. |
| `AppointmentContext` / `useAppointments()` | Appointment `items`, each with reminder occurrences | Appointment `editor`, editing flag and nested `reminderDraft`. |
| `ReminderHubContext` / `useReminderHub()` | Standalone `general` reminder records | Current filter and a type-dependent hub `editor`. |

The hub does not copy Medication, Fluid Intake or Appointment data into a separate reminder database. It builds display rows from those stores. Its own saved records are General reminders. That is why a switch in the hub can affect another category immediately.

Local component state handles short-lived UI such as a search query, open menu, calendar or sheet. That differs from shared state, which several screens consume. For example, `HomeProgressSheet` has an open/closed state but edits the shared fluid log.

**Navigate with a stack of screen objects.**

[FlowStack.tsx](src/mobile/FlowStack.tsx) implements in-memory navigation. A `FlowScreen` contains an `id`, optional header/footer render functions and heights, and a content `render` function. There is no React Router or URL route configuration for individual product screens.

`flow.push(screen)` adds a screen, `flow.pop()` removes the top screen and `flow.replace(screen)` swaps the top screen. Home cards push category screens. Category tabs replace the current category, avoiding a long Back history of category switches. Navigation automatically hides the simulated keyboard.

Previous entries remain mounted while on the stack; visibility and pointer events determine which is active. The current screen is marked `data-flow-current="true"`, which product helpers use when finding its scroll area. Motion handles slide transitions and the runtime supports a left-edge Back gesture. The current header/footer are sibling layers outside animated screen content.

| Product area | Screen IDs | Main components |
| --- | --- | --- |
| Home | `home` | `HomeHeader`, `Home`, `HomeReminders`, `HomeDrawer`. |
| Fluid | `details`, `setup` | `Details`, `Setup`, `SetupFooter`. |
| Medication | `medication`, `medication-list`, `medication-editor`, `medication-update-schedule` | `MedicationDashboard`, `MedicationList`, wizard and schedule editor. |
| Appointments | `appointments`, `appointment-editor`, `appointment-reminder` | Dashboard, appointment form and nested reminder form. |
| Shared reminders | `reminders`, `reminder-picker`, `reminder-editor`, `reminder-advanced` | Aggregated list, four-type picker and type-specific forms. |

Fixed headers declare only their app-toolbar height; the runtime adds the status-safe-area inset. Fixed footers overlay content, so product CSS adds enough bottom padding for final fields to scroll above Save.

**Trace Fluid Intake through one number.**

The initial log array is `[5, 15, 5, 6, 4, 5, 6]`. Index zero is today, index one is yesterday, and so on. Values are glass counts. `ounces()` multiplies glasses by eight and returns a value rounded to one decimal place. Home formats `40 ounces`, the Today pill formats `40oz`, and reading rows format `40 oz` for five glasses.

`Counter` supports decimal text and plus/minus buttons. `clamp()` bounds values to 0–1000 and one decimal place. The detail counter and Home quick-log sheet update `logs[0]` immediately. The recent-reading editor instead holds `editValue` locally and commits on Save Reading. Six readings are listed, the newest three can be edited, and all seven values feed the chart.

```text
Tap + in Home's Fluid Intake sheet
→ Counter calls onChange(6)
→ HomeProgressSheet updates logs[0]
→ shared context changes
→ Home shows 48 ounces
→ Details shows 48oz
→ recent readings and chart use the same updated value
```

`IntakeChart` reverses the newest-first log array into chronological order. Its effect creates a Chart.js line chart and destroys it on cleanup. It computes headroom above the peak and adds canvas padding so endpoint circles fit.

Fluid reminder setup clones the saved reminder or `freshReminder()` into `draft`. The default has seven times, daily repeat, start/end stored as today and `never: true`. Changing start also resets the stored end. Ends Never disables the end field. Duplicate times, an empty note or missing selected weekdays block saving. `SetupFooter` commits the draft. The hub's fluid form edits the same saved reminder through its separate hub draft.

**Separate a medication from each occurrence of taking it.**

The Medication model includes identity, optional strength, type, free-text amount, frequency, time list, conditions, notes, uploaded image, schedule and reminder settings. Most medication code begins at [Prototype.tsx](src/Prototype.tsx#L193).

The wizard uses five numeric phases within one screen: identity → dosage/times → conditions/notes → schedule → review. Phase one requires a name and type; strength is optional text. Phase two requires nonblank dose text, a positive integer frequency and exactly that many distinct times. The UI limits time creation to the available unique minutes. Conditions and notes are optional. Schedule validation checks the date range and selected weekdays. The last Save commits a new or edited medication to `medications`.

`MedicationArt` prefers an uploaded image over the type artwork. Upload reads the chosen file with `FileReader` and stores its data URL in memory. Camera only displays a prototype message. `medStrength` and `medAmount` preserve mixed-character text while retaining unit/type formatting for purely numeric example values.

`scheduledDoses(medications, date)` expands each active medication into one dose per scheduled time. Every dose receives a stable key:

```text
medication ID | date | time
example-id|2026-11-08|09:00
```

`taken[key] = true` records completion of that occurrence. One medication scheduled three times contributes three doses to the day's denominator. `medicationProgress()` counts completed occurrences and computes the percentage from every dose scheduled that day, including doses whose reminder is paused.

`MedicationDashboard` groups doses by time. Pending time order puts times at or after now first in ascending order, then earlier unlogged times in ascending order. At 2 PM, 08:00 / 09:00 / 15:00 / 21:00 becomes 15:00 / 21:00 / 08:00 / 09:00. `medication-time.ts` owns that ordering. Taken groups can show partially completed time groups.

`MedicationDoseSheet` updates the same `taken` map, so Home and Medication progress agree. When opened from a Home alert, it captures exact dose keys; completion can advance the Home alert without changing which doses the already-open sheet displays.

Deleting a medication removes the record and its taken keys. Deleting its schedule changes the editor's `hasSchedule` and reminder flags but retains the medication; the outer medication Save commits the edited record. These are separate confirmation dialogs. List search matches medication name, type and conditions.

**Treat appointment reminders as individual dated records.**

[appointments.ts](src/appointments.ts) defines `Appointment` and `AppointmentReminder`. An appointment has an ID, provider, optional location, date, time and reminders. Each reminder has its own ID, date, time and enabled flag.

New appointment drafts already contain two enabled defaults: two hours before and the appointment time. Per the approved prototype rule, both stay on the appointment date. For a 01:15 appointment, the earlier default is 23:15 on that same date.

`updateAppointmentSchedule()` moves reminders that still match the old default values when date/time changes. It preserves custom reminders and enabled flags. Default recognition is based on matching date/time values, not a stored default/custom tag. `mergeAppointmentReminders()` preserves IDs and switch values while replacing an individual occurrence or saving an edited set. `uniqueAppointmentReminders()` rejects duplicate date/time pairs while allowing the same clock time on different dates.

The appointment form edits `editor`; Save Appointment Details commits to `items`. A nested reminder form edits `reminderDraft`. Save Reminders merges into the parent editor; when opened from an existing list/hub record, it also commits directly to the saved record via `fromList`. Back leaves uncommitted reminder changes out of the parent.

`AppointmentTimeInput` edits hour/minute segments and AM/PM; minute 60 normalizes into the next hour. `Calendar` is shared across flows through `AppointmentDateField`. The dashboard sorts appointments by full date/time and finds the next enabled future reminder. Home's appointment count reads the shared appointment list, including records whose reminders are off.

**Understand how Home chooses alerts.**

`HomeReminders` builds slides from shared state and uses the runtime `Carousel`. Medication comes first, Fluid second and due General reminders follow. No Appointment Home alert is created.

For medication, [selectHomeMedicationReminder](src/home-reminders.ts) skips completed doses, paused medications, future times and globally disabled notifications. It selects the earliest remaining due time and includes eligible doses at that time. Completing that group exposes the next due group. Dismissal is separate from completion and scoped to the daily time group.

Fluid's Home card currently appears whenever a saved fluid reminder is enabled and has not been dismissed for its current identity. Its visibility is not checked against the recurrence rule in this component. The fluid details upcoming label separately searches its schedule. General alerts use `ruleRunsOn()` plus a scheduled time at or before now, and display the saved title.

All slides share a measured height: at least 110px, increased to fit the tallest copy. Arrows/dots and dragging move the actual rail. Product code adds slide alignment and settling to the generic carousel's momentum; it does not replace the runtime gesture implementation.

**Read the Reminders hub as a view over the stores.**

`RemindersDashboard` builds one fluid row, one row per configured medication, one row per appointment reminder occurrence, and one row per General reminder. Filtering only changes displayed rows. Toggling a row updates its owning store. Paused configured medication reminders remain visible through `reminderConfigured`.

The picker opens Medication, Fluid, Appointment or General forms. Changing Reminder Type switches the editor's kind. Medication selection supports multiple records and Select All across saved records, including search-hidden records. Set As Per Schedule enables their saved schedules; an unscheduled medication opens its schedule workflow. Appointment selection picks one appointment and opens that record's existing reminder editor.

General reminders are standalone recurring rules with a title, one clock time, finite dates and daily/selected-weekday recurrence. A blank title saves as `General Reminder`. Fluid Advanced Settings shares the hub draft and can save directly back to the list. `returnSteps` tells the save footer how many stack entries to pop for the entry path.

In [reminder-rules.ts](src/reminder-rules.ts), `ruleRunsOn()` checks enabled state, inclusive date bounds and recurrence. Monday is day index zero. `nextRuleTime()` scans up to 370 days and returns a clock string; if it finds no eligible occurrence it falls back to the first configured time, so its output alone is not proof that a reminder is active.

**Learn the runtime by responsibility.**

| Runtime file | What it supplies |
| --- | --- |
| [MobileRuntime.tsx](src/mobile/MobileRuntime.tsx) | Combines providers, viewport, status, keyboard and navigation chrome. `?keyboard=1` opens the keyboard preview. |
| [Device.tsx](src/mobile/Device.tsx) | Device presets, selected-device context and Radix device picker. |
| [geometry.ts](src/mobile/geometry.ts) | Calibrated device/screen sizes, safe areas and keyboard heights. Screen sizes are iPhone 393×852 and Pixel 427×952. |
| [PhoneFrame.tsx](src/mobile/PhoneFrame.tsx) | Scales the device to the window, draws bezel/camera, supplies screen portal and suppresses native image dragging. |
| [MobileCursor.tsx](src/mobile/MobileCursor.tsx) | Phone-local custom cursor and optional `cursorDebug` hotspot. |
| [components.tsx](src/mobile/components.tsx) | Live status clock/icons, iOS home indicator, Android navigation asset and `MobileTextField`. |
| [FlowStack.tsx](src/mobile/FlowStack.tsx) | Screen history, navigation, motion, Back gesture and fixed header/footer positioning. |
| [MobileScroll.tsx](src/mobile/MobileScroll.tsx) | Vertical drag scrolling, inertia, edge bounce, keyboard-sized viewport and click suppression after drags. |
| [Carousel.tsx](src/mobile/Carousel.tsx) | Horizontal scrolling with momentum/bounce; vertical intent yields to the parent scroll area. |
| [Keyboard.tsx](src/mobile/Keyboard.tsx) | Focus/session state, input wrappers, insets, dismissal gestures and clickable simulated keyboard. |
| [keyboard-keys.css](src/mobile/keyboard-keys.css) | Keyboard key targets and painted numeric/symbol overlays. |
| [BottomSheet.tsx](src/mobile/BottomSheet.tsx) | Phone-scoped Radix dialog, overlay, spring animation, drag dismissal and keyboard-aware placement. |
| [assets.ts](src/mobile/assets.ts) | Static device asset paths. |
| [index.ts](src/mobile/index.ts) | Public component/hook exports used by product code. |
| [COMPONENTS.md](src/mobile/COMPONENTS.md) | Component and nested-gesture contracts. |

The keyboard image is combined with clickable key targets. Typing writes to the focused input using the native value setter and dispatches an input event so React processes it. `KeyboardInput` and `KeyboardTextarea` connect focus/blur to this session. Outside taps dismiss it; switching directly between text fields preserves the session. FlowStack hides it during navigation; BottomSheet hides it on opening. The product's `useKeyboardSheet` prevents keyboard-key taps from accidentally dismissing an editing sheet through the separate portal.

`useKeyboardInsets().bottomInset` accounts for both keyboard and platform geometry. Android already reserves its bottom navigation region with the keyboard closed, so that inset is zero in the app viewport; when its keyboard opens, the keyboard asset includes navigation and the separate navigation asset disappears. iOS preserves the home-indicator safe area. These differences explain why ordinary bottom-zero positioning and manual keyboard padding can break layouts.

**Follow styling from runtime to product overrides.**

`styles.css` provides the underlying runtime geometry. `prototype.css` styles EMPWR and contains later feedback-driven overrides. It is organized as successive CSS blocks rather than isolated per-component stylesheets. Later rules with equal specificity override earlier declarations, so the first matching selector may not explain the current rendered result.

The product uses Work Sans, IBM Plex Mono for time/date fields and Inter Bold for appointment times. The Android status bar uses Roboto. `--page-gutter: 16px` is the shared horizontal spacing token; apply it once at an outer surface. `--base-color-teal-90: #097259` supplies medication ring/text color. Sheets receive product variables separately because their portal DOM sits outside `.empwr-app`.

`useScrollChrome` observes the current scroll area and exposes whether it has scrolled and whether more content remains. Data attributes drive CSS header and home-indicator shadows. App overrides hide visible scrollbars without disabling scroll physics. Original Figma asset geometry takes priority over substitute drawings; the liquid medication bottle uses `c4624.svg`, and the appointment on-switch has an isolated `appointment-reminder/33b4d.svg` export to preserve other flows.

**Understand the build and deployment boundary.**

The main dependencies are React/React DOM, Chart.js, Radix dialogs/dropdowns/icons, Motion, use-gesture and bundled fonts. Vite serves development modules and builds production assets. TypeScript checks types before the production build.

```text
npm run build
→ prebuild runs check:runtime
→ tsc checks src
→ vite builds dist/client
→ prepare-sites-build.mjs copies worker and hosting metadata
```

The resulting Sites package contains `dist/client/index.html`, `dist/server/index.js` and `dist/.openai/hosting.json`. The source `.openai/hosting.json` identifies the existing Site. Build prepares output; it does not publish it.

The worker asks `env.ASSETS` for the requested file. If that returns 404 for an HTML GET/HEAD request, it serves `index.html`. Missing non-HTML assets and write requests keep their original response. This worker is a static hosting adapter; product records stay in React memory.

`check-mobile-runtime.mjs` compares current bytes with the hashes in `mobile-runtime.lock.json`. `update-mobile-runtime-lock.mjs` regenerates those hashes after an explicitly authorized runtime change has been verified. Updating hashes is not the repair for accidental runtime modifications. `prepare-sites-build.mjs` validates/copies hosting inputs. `download-figma-assets.py` and `home-assets.json` are source-asset utilities, not part of ordinary build or app execution; the download script contains historical export URLs.

**Use each check for the question it answers.**

| Check | What it verifies |
| --- | --- |
| `npm run check:runtime` | Protected file integrity, not product correctness. Also runs before dev/build. |
| `node --test tests/appointments.test.mjs tests/home-reminders.test.mjs tests/medication-time.test.mjs tests/reminder-rules.test.mjs` | 22 isolated domain-rule tests, using Node's TypeScript loading in this environment. |
| `npm run build` | TypeScript compilation checks and complete production packaging. |
| `npm run test:sites` | Four static-worker and generated-file checks; build first. |
| `npm run test:runtime` | Playwright runtime behavior against a dedicated fixture, not full product-flow coverage. |

The runtime browser tests cover nested drag direction, momentum, tap-versus-drag suppression, sheet exit animation, keyboard/footer coordination, Pixel geometry and stack navigation. `tests/runtime-fixture.tsx` is a small demonstration app for these tests; it is separate from the product's production entry point. Its HTML and CSS support the fixture.

`design-qa.md` records previous visual/interaction verification and links into `qa/`. It is evidence and history, not executable code or a substitute for checking a new change. `final-scope.md`, `medication-flow.md`, `appointments-flow.md`, `home-reminder-flow.md` and `reminders-flow.md` map design requirements to implemented flows. Later AGENTS decisions supersede older statements, such as the former numeric-only medication strength/dose requirements.

During this walkthrough, runtime integrity passed for 28 files, all 22 domain tests passed, production build passed and all four Sites checks passed. Vite reported a non-blocking bundle-size advisory: the main JavaScript chunk was approximately 762 kB before gzip. Runtime browser tests and new visual QA were not run for this documentation-only task.

**Keep these current implementation details in mind.**

Dates are stored as `YYYY-MM-DD`, and times as zero-padded 24-hour `HH:mm`, making string comparisons useful for normalized values. The intended client timezone is Asia/Kolkata. `homeReminderClock()` and `localTime()` explicitly use it, while several other helpers use the browser's local Date methods. The module-level `today` and chart dates are calculated once when the module loads; they do not roll over automatically in a long-lived tab, even though Home's reminder clock refreshes.

The prototype notification flag lives in Medication state and also gates the Appointments upcoming banner. Fluid and General Home alerts do not consult it in `HomeReminders`. These are current code paths, distinct from actual OS notification permissions.

The product implementation is concentrated in a roughly 120 kB TSX file and a roughly 76 kB CSS file, with many functions/rules on long lines. There are no feature directories, reducer/action architecture or API client layer. Extracted pure helper modules already provide separation for a few rules; the remaining business logic is alongside the UI. Several Home activities and drawer entries are static presentation elements. Reset returns fluid readings to the seeded sample values and empties the added domain stores.

**Find the right change by following its owner.**

| Desired change | First place to inspect |
| --- | --- |
| Home totals, activity order or navigation | `Home`, then the owning store. |
| Fluid entry, limits or volume formatting | `Counter`, `clamp`, `ounces`, `Details`, `HomeProgressSheet`. |
| Fluid reminder setup | `freshReminder`, `Setup`, `SetupFooter`, `HubFluidFields`. |
| Medication form or validation | `MedicationWizard`, the `validMedication*` functions and wizard footer. |
| Medication daily totals/check-in | `scheduledDoses`, `medicationProgress`, `MedicationDoseSheet`. |
| Home due-medication selection | `src/home-reminders.ts`, then `HomeReminders`. |
| Pending dose order | `src/medication-time.ts`. |
| Appointment scheduling/defaults | `src/appointments.ts`, then appointment editor/footer. |
| Shared list, switches or type selection | `RemindersDashboard`, `ReminderTypeField`, `ReminderSaveFooter`. |
| Recurrence/date matching | `src/reminder-rules.ts`; medication also has its own `isScheduled`. |
| Product spacing/colors/typography | Later relevant blocks in `src/prototype.css`. |
| Keyboard/scroll/navigation problem | First verify product use of runtime components/insets; runtime itself is protected. |
| Hosting fallback or missing package files | Worker, packaging script and Sites tests; these runtime files are protected. |

**Build confidence by reading in this order.**

1. Read `App.tsx` and `MobileRuntime.tsx` to identify the product/runtime boundary.
2. Read `Prototype()` at the bottom of `Prototype.tsx`, then the four store types/providers.
3. Read `Home`, then trace one fluid plus-button event through `Counter` and `HomeProgressSheet`.
4. Read medication's dose key generation and progress calculation before its larger wizard markup.
5. Read `appointments.ts` and its tests before the appointment forms.
6. Read `RemindersDashboard` to see how the shared stores are projected into a single list.
7. Read FlowStack, Keyboard, MobileScroll and Carousel when you need to understand the simulated phone behavior.
8. Use `design-qa.md` and the flow documents to connect code to design decisions, then consult AGENTS for the latest requirement.

For any control, trace five things: the component rendering it, its event handler, the state setter it calls, any rule/helper involved, and the other components consuming that state. That trace explains most behavior in this codebase.
