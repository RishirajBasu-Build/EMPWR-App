import test from 'node:test';
import assert from 'node:assert/strict';
import { ruleRunsOn, nextRuleTime } from '../src/reminder-rules.ts';
const rule={times:['20:00','08:00'],start:'2026-11-06',end:'2026-11-09',never:false,repeat:'daily',days:[0,2,4]};
test('date ranges are inclusive and disabled reminders do not run',()=>{
 assert.equal(ruleRunsOn(rule,'2026-11-05'),false);
 assert.equal(ruleRunsOn(rule,'2026-11-06'),true);
 assert.equal(ruleRunsOn(rule,'2026-11-09'),true);
 assert.equal(ruleRunsOn(rule,'2026-11-10'),false);
 assert.equal(ruleRunsOn({...rule,enabled:false},'2026-11-06'),false);
});
test('selected weekdays use Monday as zero',()=>{
 assert.equal(ruleRunsOn({...rule,repeat:'selected'},'2026-11-06'),true);
 assert.equal(ruleRunsOn({...rule,repeat:'selected'},'2026-11-07'),false);
 assert.equal(ruleRunsOn({...rule,repeat:'selected',days:[]},'2026-11-06'),false);
});
test('next time sorts without changing the saved schedule',()=>{
 assert.equal(nextRuleTime(rule,'2026-11-06','08:00'),'08:00');
 assert.equal(nextRuleTime(rule,'2026-11-06','14:00'),'20:00');
 assert.deepEqual(rule.times,['20:00','08:00']);
});
test('next occurrence moves across midnight and unselected days',()=>{
 assert.equal(nextRuleTime({...rule,repeat:'selected',never:true},'2026-11-06','21:00'),'08:00');
 assert.equal(ruleRunsOn({...rule,never:true},'2027-01-04'),true);
});
