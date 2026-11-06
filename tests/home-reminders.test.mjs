import test from 'node:test';
import assert from 'node:assert/strict';
import { selectHomeMedicationReminder } from '../src/home-reminders.ts';

const dose = (id, time, reminders = true) => ({
  key: `${id}|2026-11-06|${time}`,
  time,
  medication: { id, name: id, reminders },
});

test('Home groups only eligible medicines at the earliest due time', () => {
  const first = dose('Amoxicillin', '08:00');
  const second = dose('Amitriptyline', '08:00');
  const disabled = dose('Salbutamol', '08:00', false);
  const result = selectHomeMedicationReminder(
    [dose('Later', '13:00'), first, disabled, second, dose('Future', '21:00')],
    {}, true, '14:00',
  );
  assert.deepEqual(result, { time: '08:00', doses: [first, second] });
});

test('partial check-in removes the completed medicine and preserves the remaining due dose', () => {
  const first = dose('Amoxicillin', '08:00');
  const second = dose('Amitriptyline', '08:00');
  assert.deepEqual(selectHomeMedicationReminder([first, second], { [first.key]: true }, true, '14:00'),
    { time: '08:00', doses: [second] });
});

test('completing a group advances to the next due time, then clears the reminder', () => {
  const morning = dose('Amoxicillin', '08:00');
  const afternoon = dose('Amoxicillin', '13:00');
  const doses = [afternoon, morning];
  assert.deepEqual(selectHomeMedicationReminder(doses, { [morning.key]: true }, true, '14:00'),
    { time: '13:00', doses: [afternoon] });
  assert.equal(selectHomeMedicationReminder(doses,
    { [morning.key]: true, [afternoon.key]: true }, true, '14:00'), null);
});

test('global permission and per-medication reminder settings govern Home eligibility', () => {
  assert.equal(selectHomeMedicationReminder([dose('Enabled', '08:00')], {}, false, '14:00'), null);
  assert.equal(selectHomeMedicationReminder([dose('Disabled', '08:00', false)], {}, true, '14:00'), null);
  assert.equal(selectHomeMedicationReminder([], {}, true, '14:00'), null);
});

test('future doses are never described as due and a dose becomes due at its scheduled minute', () => {
  const evening = dose('Evening', '20:00');
  assert.equal(selectHomeMedicationReminder([evening], {}, true, '19:59'), null);
  assert.deepEqual(selectHomeMedicationReminder([evening], {}, true, '20:00'),
    { time: '20:00', doses: [evening] });
});

test('selection does not mutate or reorder its inputs and retains exact dose identities', () => {
  const late = Object.freeze({ ...dose('Late', '13:00'), medication: Object.freeze({ reminders: true }) });
  const early = Object.freeze({ ...dose('Early', '08:00'), medication: Object.freeze({ reminders: true }) });
  const doses = Object.freeze([late, early]);
  const taken = Object.freeze({ [late.key]: false });
  const result = selectHomeMedicationReminder(doses, taken, true, '14:00');
  assert.deepEqual(doses, [late, early]);
  assert.deepEqual(taken, { [late.key]: false });
  assert.notEqual(result.doses, doses);
  assert.equal(result.doses[0], early);
});
