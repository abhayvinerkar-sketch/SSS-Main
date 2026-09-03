import {Question} from '../models';
import {subjects} from './index';
import {getTopics,Topic} from './topics';
import {TopicConcept,MaterialSection} from './studyMaterial';
import {historyContent} from './historyContent';
import {politicalContent} from './politicalContent';
import {geographyContent} from './geographyContent';
import {englishContent} from './englishContent';
import {marathiContent} from './marathiContent';
import {hindiContent} from './hindiContent';

const content:Record<string,Record<string,TopicConcept[]>>={history:historyContent,political:politicalContent,geography:geographyContent,english:englishContent,marathi:marathiContent,hindi:hindiContent};

function getChapterContent(subjectId:string,chapterId:string,topics:Topic[]):TopicConcept[]{
 const exact=content[subjectId]?.[chapterId];
 if(exact?.length)return exact;
 return topics.map(t=>({title:t.title,concept:`${t.title} is a core study area of this chapter.`,keyPoints:[`Understand the meaning of ${t.title}.`,`Identify the facts, features or language skill connected with ${t.title}.`,`Practise explaining ${t.title} in your own words.`],example:`Revise ${t.title} by explaining its meaning and three key points.`,remember:'Revise the concept, practise retrieval and write answers in your own words.'}));
}

export function getExpandedConcepts(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):TopicConcept[]{return getChapterContent(subjectId,chapterId,topics);}

export function getExpandedMaterial(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):MaterialSection[]{
 const c=getChapterContent(subjectId,chapterId,topics);
 return [{heading:'Key Points',body:c.flatMap(x=>x.keyPoints)},{heading:'Definitions',body:c.map(x=>`${x.title}: ${x.concept}`)},{heading:'Exam Strategy',body:c.map(x=>x.remember||'Revise the concept and write the answer in your own words.')}];
}

function makeQuestions(subjectId:string,chapterId:string,chapterTitle:string,c:TopicConcept):Question[]{
 const p1=c.keyPoints[0]||c.concept,p2=c.keyPoints[1]||'',p3=c.keyPoints[2]||'';
 return [
 {id:`content-${chapterId}-${c.title}-mcq`,subjectId,chapterId,text:`Which statement correctly describes ${c.title}?`,options:[c.concept,p2,p3,'It is unrelated to the chapter.'],answer:0,answerText:`A. ${c.concept}`,explanation:`${c.concept} ${p1}`,type:'MCQ',difficulty:'Easy',marks:1,tags:[c.title,'Concept','Revision']},
 {id:`content-${chapterId}-${c.title}-definition`,subjectId,chapterId,text:`Define ${c.title}.`,options:[],answer:0,answerText:c.concept,explanation:`The definition should state the central meaning of ${c.title} clearly and directly.`,type:'Very Short',difficulty:'Easy',marks:1,tags:[c.title,'Definition']},
 {id:`content-${chapterId}-${c.title}-short`,subjectId,chapterId,text:`Explain ${c.title} with two important points.`,options:[],answer:0,answerText:`${c.concept} ${p1}. ${p2}`,explanation:`Start with the concept and then give two accurate chapter-linked points.`,type:'Short Answer',difficulty:'Medium',marks:2,tags:[c.title,'Board Practice']},
 {id:`content-${chapterId}-${c.title}-long`,subjectId,chapterId,text:`Explain ${c.title} in detail with its important features and significance in ${chapterTitle}.`,options:[],answer:0,answerText:`${c.concept} ${c.keyPoints.join(' ')} ${c.remember||''}`,explanation:`Use the concept first, then organise the relevant key points and conclude with significance or application.`,type:'Long Answer',difficulty:'Hard',marks:4,tags:[c.title,'Board Practice','Revision']}
 ];
}

export function getExpandedQuestions(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):Question[]{return getChapterContent(subjectId,chapterId,topics).flatMap(c=>makeQuestions(subjectId,chapterId,chapterTitle,c));}
export function getAllExpandedQuestions():Question[]{return subjects.filter(s=>['history','political','geography','english','marathi','hindi'].includes(s.id)).flatMap(s=>s.chapters.flatMap(c=>getExpandedQuestions(s.id,c.id,c.title,getTopics(s.id,c.id,c.title))));}
