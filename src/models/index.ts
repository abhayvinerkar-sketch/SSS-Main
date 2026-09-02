export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type MaterialType = 'Notes' | 'Important Points' | 'Definitions' | 'Formulas' | 'Question Bank' | 'Previous Year';
export type QuestionType = 'MCQ' | 'Very Short' | 'Short Answer' | 'Long Answer' | 'Numerical' | 'Activity';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export interface Student { name:string; standard:string; board:string; school:string; targetPercentage:number; examDate:string; }
export interface Chapter { id:string; number:string; title:string; description:string; }
export interface Subject { id:string; name:string; shortName:string; icon:string; color:string; chapters:Chapter[]; }
export interface StudyMaterial { id:string; subjectId:string; chapterId:string; title:string; type:MaterialType; description:string; available:boolean; }
export interface StudyTask { id:string; subjectId:string; chapter:string; duration:number; status:TaskStatus; }
export interface Question { id:string; subjectId:string; chapterId:string; text:string; options:string[]; answer:number; answerText?:string; explanation:string; type:QuestionType; difficulty:Difficulty; marks:number; tags:string[]; }
export interface Test { id:string; title:string; type:'Daily'|'Weekly'|'Monthly'; subjects:string[]; questions:Question[]; duration:number; marks:number; }
export interface TestAttempt { testId:string; score:number; total:number; completedAt:string; }
export interface Performance { overall:number; testsAttempted:number; average:number; highest:number; studyHours:number; streak:number; subjectScores:Record<string,number>; }
