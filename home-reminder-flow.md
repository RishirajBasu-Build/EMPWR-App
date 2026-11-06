# Combined Home reminder handoff

Source: EMPWR (BMI80ChX15L7QaJ38rReU2), Medication Final Scope → Medication handoff → Reminders (Medication+Fluid Intake).

| Source | Implemented behavior |
| --- | --- |
| 346:18822 / 346:18823 / 346:18828 | Medication reminder uses original violet capsule and label; Fluid uses the original blue glass/label. Only the two current types are implemented. |
| 346:18834 | Title is `Your {scheduled time} dose is due`; the description uses the remaining eligible medication count for that time. |
| 346:18836 / 346:19127 | View Medication Details opens the source compact dose sheet. Taken records the exact medication/date/time occurrence, updates Home and details immediately, and retains the all-day denominator. |
| 346:18837 | Medication comes first, Fluid second. Real Carousel dragging, arrows and two actual page indicators navigate the current cards. |
| 346:19340 / 346:19493 | Fluid Log Progress opens the existing immediate-save sheet; glasses × 8 appears as ounces everywhere. |
| 349:20301 / 349:20303 / 349:20305 | Home counts and percentage represent all scheduled daily occurrences, independently of which reminder is open. |

Cadence not explicitly specified in the annotations: medication reminders select the earliest current-day due group with unlogged, reminder-enabled doses and permission on. Future times are excluded. Finishing a group advances to the next due group; dismissal affects only that daily occurrence. Existing fluid reminder availability is retained. Exact dose keys are captured when the sheet opens so check-ins cannot switch the sheet to a different group.

Use the prototype menu's **Load combined reminder example** to demonstrate both cards. It loads five due capsules and seven daily doses, plus the default fluid reminder. The existing medication example and Restart controls remain available. This remains an in-memory prototype with no external notifications.
