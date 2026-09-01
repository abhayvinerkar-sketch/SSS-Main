export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export interface Student { name:string; standard:string; board:string; school:string; targetPercentage:number; examDate:string; }
export interface Subject { id:string; name:string; shortName:string; icon:string; color:string; chapters:string[]; }
export interface StudyMaterial { id:string; subjectId:string; title:string; type:'Notes'|'Important Points'|'Definitions'|'Formulas'|'Question Bank'|'Previous Year'; description:string; }
export interface StudyTask { id:string; subjectId:string; chapter:string; duration:number; status:TaskStatus; }
export interface Question { id:string; text:string; options:string[]; answer:number; explanation:string; }
export interface Test { id:string; title:string; type:'Daily'|'Weekly'|'Monthly'; subjects:string[]; questions:Question[]; duration:number; marks:number; }
export interface TestAttempt { testId:string; score:number; total:number; completedAt:string; }
export interface Performance { overall:number; testsAttempted:number; average:number; highest:number; studyHours:number; streak:number; subjectScores:Record<string,number>; }
