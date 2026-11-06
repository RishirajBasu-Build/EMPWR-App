# Medication handoff implementation

Source: EMPWR / Medication Final Scope / Medication handoff (326:13585), 31 frame states and all attached annotations read on November 6, 2026.

## Routes and shared state

- Home medication card and health category navigation open Medication. Fluid Intake retains its complete existing flow and data.
- Medication begins empty; Add Medication opens details 1 → dosage/times 2 → conditions/notes 3 → schedule → review → Save Medication → populated dashboard.
- Name, strength and one of Capsule/Tablet/Liquid/Injection are required. Strength accepts numbers and punctuation. Image upload uses the computer file chooser and is optional; camera is presentation-only per annotation.
- Dose and daily frequency are numeric. Exactly the requested number of distinct times is required. Add Time disables at the limit. Existing times remain editable/removable.
- Conditions are removable chips with an inline add/confirm/cancel control; notes are a textarea.
- Start and finite end default to the client date, with Ends Never initially unchecked as shown in the medication design. Every start change resets end to start. Ends Never disables end. Daily/selected weekday repeat and notification/reminder states are honored.
- Review uses uploaded image first, otherwise original Figma type illustration. Edit opens Update Schedule. Schedule deletion requires its own confirmation and removes future scheduled occurrences, retaining medication details.
- Dashboard progress counts all scheduled dose occurrences for the current day. Pending groups prioritize the next time. Taken groups show per-dose completion and View opens the complete group, including any untaken medicine.
- Dose sheets support Taken check-in and Set Reminder As Per Schedule. Reminder state and check-ins update dashboard and Home immediately.
- First three medication summaries lead to Your Medications. Search matches name, type and conditions. Cards/menu edit medication, set up schedule/reminders or confirm deletion.
- Notification permission is a prototype setting, with a disabled scheduled-reminder switch and source warning when off. No system permission request, external notification, backend or health advice is introduced.

## Verification gate

Exercise creation/validation, date and weekday changes, review/edit, saved data, pending/taken check-in, search, menu and both delete confirmations; compare rendered source states and preserve Fluid Intake regression checks on iPhone and Pixel. Run runtime integrity, TypeScript/build and Sites checks, then publish to the existing public Site under standing authorization.

## Free-text strength and dosage — November 6, 2026

The latest user request supersedes the earlier required/numeric strength and positive numeric dose constraints. Strength is optional, has no required marker or mg helper, and uses a text keyboard. Strength and usual amount per dose accept letters, numbers and special characters without filtering. Dosage remains required nonblank text; frequency and distinct-time rules are unchanged. Values survive review/save/edit; blank strength renders no bare unit, and mixed-character entries are displayed without duplicate unit/type suffixes. Legacy numeric examples retain their current formatting.
