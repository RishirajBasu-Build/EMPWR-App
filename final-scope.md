# Fluid Intake — New Final Scope implementation

Source: Figma BMI80ChX15L7QaJ38rReU2, page 221:1109, section 238:1614. Reviewed every annotation in the section on November 6, 2026.

| Annotation node | Requirement | Implemented behavior |
| --- | --- | --- |
| 322:12039 | Home intake value is glasses × 8, in ounces | Home displays volume only, e.g. 40 ounces. |
| 322:11933, 321:11659 | Seven-day graph uses fluid volume in ounces | Chart data, axis and tooltip values convert glass counts to ounces. |
| 322:11882, 322:12720 | Recent readings show total ounces | All reading rows show converted ounces; last three remain editable in glasses. |
| 322:11998 | Home progress Today value is total ounces | Sheet displays 40oz for a counter value of 5. |
| 278:8104 | Revised progress field content | Counter is still a glass count; helper reads Each glass counts as 8 fluid ounces. |
| 322:12869 | Adaptive summary with permanent second sentence | Repeat days and date range update the first sentence; the second remains intact. |
| 322:12880 | Start/end default and reset behavior; Ends Never | Both initially equal today; changing start resets end; Ends Never disables end input. |

Visual sources: details 238:1939 / 238:1726, Home 238:1615 / 238:2874, Home sheet 278:8080 and reminder 322:12771. The latest Home card arrangement, local SVGs, button styling, spacing and ounce typography are implemented from those design contexts.

All seven New Final Scope annotation occurrences are covered, including duplicate requirements on repeated screens and the content-only field marker. Also applied the two detailed reminder annotations on the new reminder frame. Existing counter limits, one-reminder rule, keyboard handling, navigation and last-three-reading edit rule remain functional.
