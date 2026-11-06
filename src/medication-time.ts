/** Upcoming times ascend first, followed by overdue times in ascending order. */
export function orderPendingMedicationTimes(times: readonly string[], currentTime: string): string[] {
  return [...times].sort((a, b) =>
    Number(a < currentTime) - Number(b < currentTime) || a.localeCompare(b)
  );
}
