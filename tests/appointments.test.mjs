import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppointmentReminders, updateAppointmentSchedule, appointmentReminderLabel, appointmentReminderDefaults, sortAppointments, upcomingAppointmentReminder, validAppointment, mergeAppointmentReminders, uniqueAppointmentReminders } from '../src/appointments.ts';
const a=(id,date,time,reminders=[])=>({id,provider:'Dr. Angela Cruz',location:'West Medical Plaza',date,time,reminders});
test('appointment reminder defaults handle noon and midnight',()=>{
 assert.deepEqual(appointmentReminderDefaults('19:45'),['17:45','19:45']);
 assert.deepEqual(appointmentReminderDefaults('01:15'),['23:15','01:15']);
 assert.deepEqual(appointmentReminderDefaults('12:00'),['10:00','12:00']);
});
test('appointment defaults follow schedule edits while custom reminders and pause states survive',()=>{
 let n=0;
 const defaults=createAppointmentReminders('2026-11-06','19:45',()=>`default-${++n}`);
 defaults[0].enabled=false;
 const custom={id:'custom',date:'2026-11-04',time:'10:00',enabled:true};
 const original=a('one','2026-11-06','19:45',[...defaults,custom]);
 const edited=updateAppointmentSchedule(original,{date:'2026-11-07',time:'01:15'});
 assert.deepEqual(edited.reminders.map(r=>[r.id,r.date,r.time,r.enabled]),[
  ['default-1','2026-11-07','23:15',false],['default-2','2026-11-07','01:15',true],['custom','2026-11-04','10:00',true]
 ]);
 assert.equal(appointmentReminderLabel(edited,edited.reminders[0]),'Remind me 2 hours before');
 assert.equal(appointmentReminderLabel(edited,edited.reminders[1]),'Remind me at scheduled time');
 assert.equal(appointmentReminderLabel(edited,custom),null);
 assert.equal(original.reminders[0].time,'17:45');
});
test('adding a reminder then editing its date preserves the default identities and switches',()=>{
 const old=[{id:'before',date:'2026-11-06',time:'17:45',enabled:false},{id:'at',date:'2026-11-06',time:'19:45',enabled:true}];
 const added=mergeAppointmentReminders(old,['17:45','19:45','10:00'],'2026-11-06',null,()=> 'extra');
 const rows=mergeAppointmentReminders(added,['10:00'],'2026-11-05','extra',()=> 'unused');
 assert.deepEqual(rows.slice(0,2),old);
 assert.deepEqual(rows[2],{id:'extra',date:'2026-11-05',time:'10:00',enabled:true});
 assert.equal(uniqueAppointmentReminders(rows),true);
 assert.equal(uniqueAppointmentReminders(mergeAppointmentReminders(rows,['19:45'],'2026-11-06','extra',()=> 'unused')),false);
});
test('appointments sort by full date and time, without mutating source',()=>{
 const items=[a('late','2026-12-01','09:00'),a('pm','2026-11-06','14:00'),a('am','2026-11-06','08:00')];
 assert.deepEqual(sortAppointments(items).map(a=>a.id),['am','pm','late']);
 assert.equal(items[0].id,'late');
});
test('next reminder ignores past and disabled reminders and retains exact appointment',()=>{
 const first=a('one','2026-11-07','14:00',[{id:'past',date:'2026-11-06',time:'08:00',enabled:true},{id:'off',date:'2026-11-06',time:'18:00',enabled:false}]);
 const second=a('two','2026-11-07','18:00',[{id:'future',date:'2026-11-07',time:'16:00',enabled:true}]);
 assert.equal(upcomingAppointmentReminder([first,second],'2026-11-06','10:00').appointment.id,'two');
 assert.equal(upcomingAppointmentReminder([first],'2026-11-06','10:00'),null);
 assert.equal(upcomingAppointmentReminder([second],'2026-11-07','16:00').reminder.id,'future');
});
test('provider, date and valid clock time are required; location is optional',()=>{
 assert.equal(validAppointment(a('one','2026-11-06','00:00')),true);
 assert.equal(validAppointment({...a('one','2026-11-06','23:59'),provider:' '}),false);
 assert.equal(validAppointment(a('one','2026-11-06','24:60')),false);
});
test('individual edits and new reminders retain distinct identities, dates and toggle settings',()=>{
 const old=[{id:'a',date:'2026-11-06',time:'08:00',enabled:false},{id:'b',date:'2026-11-07',time:'08:00',enabled:true}];
 const all=mergeAppointmentReminders(old,['08:00','08:00'],'2026-11-06',null,()=> 'new');
 assert.deepEqual(all,old);
 assert.equal(uniqueAppointmentReminders(all),true);
 let n=0;
 const edit=mergeAppointmentReminders(old,['09:00','10:00'],'2026-11-06','a',()=>`new-${++n}`);
 assert.equal(edit[0].id,'b');
 assert.equal(edit[1].enabled,false);
 assert.equal(edit[2].id,'new-1');
 assert.equal(edit[2].enabled,true);
 assert.equal(uniqueAppointmentReminders(mergeAppointmentReminders(old,['08:00'],'2026-11-07','a',()=> 'new')),false);
});
