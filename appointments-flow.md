# Appointments integration

Source: EMPWR Figma BMI80ChX15L7QaJ38rReU2, Appointments Final Scope / Appointments, section 348:19740.

| Source frame | Implemented state |
| --- | --- |
| 348:20126 | Home Appointments card, dynamic count and navigation |
| 357:22770 | Empty list and Add Appointments |
| 348:19965 | Populated list, upcoming reminder, edit and two-action menu |
| 357:23695 | Cancel/Delete Appointment confirmation |
| 348:19741 | Appointment details without reminders |
| 357:23192 | Appointment details with independently editable/toggleable reminders |
| 357:22979 | Reminder type, two default times, additional reminders and date |

Home, shared category tabs and menu open the same appointment store. Forms use the existing FlowStack, MobileScroll, keyboard-aware inputs, calendar and phone portal. Medication and Fluid Intake routes remain intact.

Create: enter required provider, optional location, time and date. Set Reminders opens a nested draft; defaults are appointment time minus two hours and appointment time, both on its date. Save Reminders returns to the form; Save Appointment Details commits the appointment. Back from the reminder screen cancels its draft.

Edit: the row's edit icon opens that exact record. Reminder rows open their own reminder and preserve siblings. Additional times receive distinct IDs. The row menu and upcoming banner also target the exact appointment/reminder. Saving from the list commits reminders directly. A changed common reminder date applies to that edited set; otherwise existing per-reminder dates and enabled values survive.

Delete: the row action opens the design's confirmation. Cancel preserves the record; Delete removes it and its reminders, updating Home's count and next reminder.

Implementation decisions where the source is incomplete: the copied Fluid Intake annotation is resolved to Appointment Reminder; a fixed Save Reminders action follows the app's existing save pattern because the source reminder frame supplies no commit control. Reminder Type contains the specified Appointment Reminder option. Time boundary 60 is normalized rather than stored as an invalid timestamp. No actual system notifications or external integrations are added.

Artwork: original Figma 12e30 (header calendar), 9cf3a (blue ringing bell), b7078 (row clock), 3fea0 (provider), 93d33 (location), 71da2 (edit), 647d4 (options), 0a302 (reminder action), 31029 (delete), 58eaf (empty), 1657c (time input), a0e10/29ea4 (date fields), 19a0b (chevrons), 8cdd8/150a6 (add), 6309d/b10aa (reminder rows), 33b4d/a0851 (toggles). Protected status, bezel and home-indicator assets stay unchanged.

## Appointment reminder revision — November 6, 2026

Source re-read: Appointments Final Scope (315:3972), Appointments (348:19740); high-fidelity design contexts for 348:19741 (defaults), 357:23192 (additional reminder) and 357:22979 (reminder form). All annotations were inspected read-only.

- New appointments show the two enabled default reminders immediately, with the updated titled switch cards and clickable time/date row. The helper keeps untouched defaults synchronized when the appointment changes while preserving custom reminder values and paused states.
- Set Reminders stays available; the existing form starts with the saved/default times, supports additional times and duplicate prevention, and preserves individual identities. Individual row edits support separate reminder dates. Save Reminders commits to the parent draft, then Save Appointment Details commits to the shared store. Hub edits commit directly to the saved record. Back cancels reminder draft edits.
- Exact source clock 6309d.svg (28×28), new calendar c0c56.svg (28×28), custom calendar b10aa.svg (20×20), current on-switch 33b4d.svg (44×25 inside the 44×24 slot), and source add icon 8cdd8.svg (20×20). Existing source icons were hash-checked; the changed switch export is isolated to avoid changing Medication or hub styling.
- The always-available Set Reminders action is retained below additional reminders so adding further reminders stays discoverable. The taller content scrolls above the existing fixed footer; protected phone chrome and the shared 16px gutter remain unchanged.

Validation: 26 automated checks, TypeScript/build, Sites packaging checks, and 28 protected runtime hashes. Browser verification covered default creation, two-time setup, adding a third time, duplicate prevention, per-occurrence dates, pause/cancel/save, schedule changes, shared hub propagation, Medication (3/7,43%) and Fluid Intake (5 glasses,40oz) navigation, and iPhone/Pixel layouts. Console errors: none.
