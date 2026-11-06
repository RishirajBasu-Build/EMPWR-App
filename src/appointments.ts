export type AppointmentReminder = { id: string; date: string; time: string; enabled: boolean };
export type Appointment = { id: string; provider: string; location: string; date: string; time: string; reminders: AppointmentReminder[] };

export function appointmentReminderDefaults(time: string) {
  const [h,m] = time.split(':').map(Number);
  const before = (h*60+m-120+1440)%1440;
  return [`${String(Math.floor(before/60)).padStart(2,'0')}:${String(before%60).padStart(2,'0')}`,time];
}
export function createAppointmentReminders(date: string, time: string, createId: ()=>string): AppointmentReminder[] {
  return appointmentReminderDefaults(time).map(time=>({id:createId(),date,time,enabled:true}));
}
// Keep untouched defaults tied to the appointment; custom reminder dates/times stay independent.
export function updateAppointmentSchedule(a: Appointment, patch: Partial<Appointment>): Appointment {
  if ((!patch.time || patch.time===a.time) && (!patch.date || patch.date===a.date)) return {...a,...patch};
  const oldTimes=appointmentReminderDefaults(a.time),newTimes=appointmentReminderDefaults(patch.time??a.time);
  return {...a,...patch,reminders:a.reminders.map(r=>{
    const index=r.date===a.date ? oldTimes.indexOf(r.time) : -1;
    return index<0 ? r : {...r,date:patch.date??a.date,time:newTimes[index]};
  })};
}
export function appointmentReminderLabel(a: Appointment, r: AppointmentReminder) {
  if(r.date!==a.date)return null;
  const index=appointmentReminderDefaults(a.time).indexOf(r.time);
  return index===0?'Remind me 2 hours before':index===1?'Remind me at scheduled time':null;
}
export const appointmentStamp = (a: Pick<Appointment,'date'|'time'>) => `${a.date}T${a.time}`;
export const sortAppointments = (items: Appointment[]) => [...items].sort((a,b)=>appointmentStamp(a).localeCompare(appointmentStamp(b))||a.provider.localeCompare(b.provider));
export function upcomingAppointmentReminder(items: Appointment[], date: string, time: string) {
  return items.flatMap(appointment=>appointment.reminders.filter(r=>r.enabled&&appointmentStamp(r)>=`${date}T${time}`).map(reminder=>({appointment,reminder})))
    .sort((a,b)=>appointmentStamp(a.reminder).localeCompare(appointmentStamp(b.reminder)))[0] ?? null;
}
export const validAppointment = (a: Appointment) => !!a.provider.trim() && /^\d{4}-\d{2}-\d{2}$/.test(a.date) && /^([01]\d|2[0-3]):[0-5]\d$/.test(a.time);

export function mergeAppointmentReminders(previous: AppointmentReminder[], times: string[], date: string, editingId: string|null, createId: ()=>string) {
  const originalDate = (editingId ? previous.find(r=>r.id===editingId) : previous[0])?.date;
  const rows = times.map((time,i)=>{
    const old = editingId ? (i===0 ? previous.find(r=>r.id===editingId) : undefined) : previous[i];
    return {id:old?.id??createId(),date:date===originalDate ? old?.date??date : date,time,enabled:old?.enabled??true};
  });
  return editingId ? [...previous.filter(r=>r.id!==editingId),...rows] : rows;
}
export const uniqueAppointmentReminders = (rows: AppointmentReminder[]) => new Set(rows.map(appointmentStamp)).size===rows.length;
