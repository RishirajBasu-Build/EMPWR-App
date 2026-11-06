export type HomeReminderDose = {
  key: string;
  time: string;
  medication: { reminders: boolean };
};

export type HomeMedicationReminder<T extends HomeReminderDose> = {
  time: string;
  doses: T[];
};

/**
 * Select one due medication group for Home. Supply only doses scheduled for the
 * current client date and canonical 24-hour HH:mm strings. Reminder permission
 * affects this banner only, not the all-day medication progress denominator.
 */
export function selectHomeMedicationReminder<T extends HomeReminderDose>(
  doses: readonly T[],
  taken: Readonly<Record<string, boolean>>,
  notifications: boolean,
  currentTime: string,
): HomeMedicationReminder<T> | null {
  if (!notifications) return null;

  let reminder: HomeMedicationReminder<T> | null = null;
  for (const dose of doses) {
    if (!dose.medication.reminders || taken[dose.key] || dose.time > currentTime) continue;

    if (!reminder || dose.time < reminder.time) {
      reminder = { time: dose.time, doses: [dose] };
    } else if (dose.time === reminder.time) {
      reminder.doses.push(dose);
    }
  }
  return reminder;
}
