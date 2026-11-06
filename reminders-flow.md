# Reminders integration

Source: EMPWR / Reminders Final Scope / Reminders, page 315:3973, section 352:20619.

| Frames | Implemented state |
| --- | --- |
| 352:21677, 354:22239 | Home and side drawer entry |
| 352:20677, 360:24587 | Shared reminder list, category filters, switches and empty state |
| 352:20620 | Four-type picker |
| 352:20827 | General reminder title, time, dates, repeat schedule and Save |
| 352:20925, 354:22503, 360:23987, 360:24256 | Medication selection, none/partial/all selected, disabled/enabled save |
| 352:21190 | Medication no-results and Create Medication |
| 352:21245, 352:21606 | Fluid reminder form and separate Advanced Settings |
| 352:21371, 352:21551 | Appointment selection/search/no-results and Create Appointment |
| 361:24774 | Existing appointment's reminder time/date editor |
| 361:24868, 361:24952 | Existing appointment details without/with reminders |

The hub reads existing stores directly. Fluid has one recurring rule; each configured medication has a schedule rule; appointments expose their individual dated reminder occurrences; General has standalone recurring records. The time heading shows the next scheduled clock time; summaries retain all configured times. Paused entries remain visible. Filters change the visible category without discarding records.

Home → side drawer → Reminders → Add Reminder → type picker → preselected form. Reminder Type is editable in all hub forms. Medication and appointment search expose creation through their existing flows; saving there returns to selection. The later medication selection annotation takes precedence over earlier instructions to open the medication editor on card click. Existing medication editing remains available in the Medication flow and from a hub reminder's edit heading.

Medication Set As Per Schedule enables only selected medications. Select All selects all saved records, even if search hides some, and provides an indeterminate state. An unscheduled medication opens existing schedule setup. Appointment selection chooses a specific record, and Set As Per Schedule opens that record's existing reminder editor. Duplicate appointment date/time prevention and per-occurrence toggles are unchanged.

Fluid form and existing Fluid Intake setup edit the same object, avoiding duplicates. Advanced Settings supports date range, Ends Never and weekday selection. Save from Advanced Settings commits the rule and returns to the hub. Saving an edited form also returns to the hub; back cancels the uncommitted draft.

General title/time/date/repeat fields create an independent rule; dates reset consistently and invalid ranges or empty weekday selections disable Save. General title appears in the equal-height Home carousel when its schedule is due. Global notification delivery is not implemented; the existing prototype notification settings continue to govern medication reminder eligibility.

Original source images/icons are reused, including four picker icons, category badges, empty-state icons, check/minus artwork, calendar/repeat/toggle assets and source medication art. User images and the user's liquid-SVG correction retain priority over older source variants. No device-runtime files changed.
