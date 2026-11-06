export type RecurringRule={times:string[];start:string;end:string;never:boolean;repeat:'daily'|'selected';days:number[];enabled?:boolean};
export function ruleRunsOn(rule:RecurringRule,date:string){
 return rule.enabled!==false&&date>=rule.start&&(rule.never||date<=rule.end)&&(rule.repeat==='daily'||rule.days.includes((new Date(date+'T12:00:00').getDay()+6)%7));
}
export function nextRuleTime(rule:RecurringRule,date:string,time:string){
 for(let offset=0;offset<370;offset++){
  const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+offset);
  const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  if(!ruleRunsOn(rule,key))continue;
  const next=[...rule.times].sort().find(t=>offset>0||t>=time);if(next)return next;
 }return [...rule.times].sort()[0]??'00:00';
}
