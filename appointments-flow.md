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
