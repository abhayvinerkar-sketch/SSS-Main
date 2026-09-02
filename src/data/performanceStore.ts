import AsyncStorage from '@react-native-async-storage/async-storage';

export type QuestionPerformance={correct:number;total:number};
export type AttemptRecord={id:string;testId:string;score:number;total:number;completedAt:string;subjectScores:Record<string,QuestionPerformance>;topicScores:Record<string,QuestionPerformance>};
export type PerformanceState={attempts:AttemptRecord[]};
const KEY='ssc-master-performance-v1';
const empty:PerformanceState={attempts:[]};
export async function loadPerformance():Promise<PerformanceState>{try{const raw=await AsyncStorage.getItem(KEY);return raw?JSON.parse(raw):empty}catch{return empty}}
export async function saveAttempt(attempt:AttemptRecord){const state=await loadPerformance();const next={attempts:[...state.attempts,attempt]};await AsyncStorage.setItem(KEY,JSON.stringify(next));return next}
export function aggregateSubjectScores(attempts:AttemptRecord[]){const sums:Record<string,QuestionPerformance>={};attempts.forEach(a=>Object.entries(a.subjectScores).forEach(([id,v])=>{sums[id]??={correct:0,total:0};sums[id].correct+=v.correct;sums[id].total+=v.total}));return Object.fromEntries(Object.entries(sums).map(([id,v])=>[id,v.total?Math.round(v.correct/v.total*100):0]));}
export function aggregateTopicScores(attempts:AttemptRecord[]){const sums:Record<string,QuestionPerformance>={};attempts.forEach(a=>Object.entries(a.topicScores).forEach(([key,v])=>{sums[key]??={correct:0,total:0};sums[key].correct+=v.correct;sums[key].total+=v.total}));return Object.fromEntries(Object.entries(sums).map(([key,v])=>[key,v.total?Math.round(v.correct/v.total*100):0]));}
export function buildAttempt(testId:string,questions:any[],answers:(number|null)[],score:number,total:number):AttemptRecord{const subjectScores:Record<string,QuestionPerformance>={};const topicScores:Record<string,QuestionPerformance>={};questions.forEach((q,i)=>{const correct=answers[i]===q.answer?1:0;subjectScores[q.subjectId]??={correct:0,total:0};subjectScores[q.subjectId].correct+=correct;subjectScores[q.subjectId].total++;(q.tags||[]).forEach((tag:string)=>{const key=`${q.subjectId}::${q.chapterId}::${tag}`;topicScores[key]??={correct:0,total:0};topicScores[key].correct+=correct;topicScores[key].total++})});return{id:`${testId}-${Date.now()}`,testId,score,total,completedAt:new Date().toISOString(),subjectScores,topicScores}}
