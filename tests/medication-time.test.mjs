import test from 'node:test';
import assert from 'node:assert/strict';
import { orderPendingMedicationTimes } from '../src/medication-time.ts';

test('at 2 PM, all future doses precede the unlogged morning doses', () => {
  assert.deepEqual(orderPendingMedicationTimes(['08:00', '09:00', '15:00', '21:00'], '14:00'),
    ['15:00', '21:00', '08:00', '09:00']);
});

test('each group ascends even when the supplied times are unsorted', () => {
  assert.deepEqual(orderPendingMedicationTimes(['21:00', '09:00', '15:00', '08:00'], '14:00'),
    ['15:00', '21:00', '08:00', '09:00']);
});

test('a dose at the current minute remains upcoming', () => {
  assert.deepEqual(orderPendingMedicationTimes(['08:00', '15:00', '21:00'], '15:00'),
    ['15:00', '21:00', '08:00']);
});

test('all-overdue and all-upcoming schedules remain chronological', () => {
  assert.deepEqual(orderPendingMedicationTimes(['09:00', '08:00'], '22:00'), ['08:00', '09:00']);
  assert.deepEqual(orderPendingMedicationTimes(['21:00', '15:00'], '00:00'), ['15:00', '21:00']);
  assert.deepEqual(orderPendingMedicationTimes([], '14:00'), []);
});

test('ordering leaves the stored schedule unchanged', () => {
  const times = Object.freeze(['08:00', '09:00', '15:00', '21:00']);
  orderPendingMedicationTimes(times, '14:00');
  assert.deepEqual(times, ['08:00', '09:00', '15:00', '21:00']);
});
