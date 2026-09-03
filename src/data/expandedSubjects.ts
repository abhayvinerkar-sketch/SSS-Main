import {Question} from '../models';
import {subjects} from './index';
import {getTopics,Topic} from './topics';
import {TopicConcept,MaterialSection} from './studyMaterial';
import {historyContent} from './historyContent';
import {politicalContent} from './politicalContent';
import {geographyContent} from './geographyContent';

const content:Record<string,Record<string,TopicConcept[]>>={history:historyContent,political:politicalContent,geography:geographyContent};

const fallbackProfile:Record<string,{focus:string;exam:string}>={
english:{focus:'reading comprehension, literature, grammar, vocabulary and writing',exam:'Answer in complete sentences, use evidence from the lesson in your own words and follow the required writing format.'},
marathi:{focus:'आकलन, आशय, भाषा-अभ्यास, व्याकरण आणि उपयोजित लेखन',exam:'मुद्देसूद, शुद्ध आणि क्रमबद्ध उत्तर लिहा; आशय स्वतःच्या शब्दांत मांडून आवश्यक तेथे उदाहरण द्या.'},
hindi:{focus:'पठन, आशय, भाषा-अध्ययन, व्याकरण और लेखन कौशल',exam:'उत्तर स्पष्ट, क्रमबद्ध और शुद्ध भाषा में लिखें; पाठ का आशय अपने शब्दों में समझाएँ.'}
};

function profile(subjectId:string){return fallbackProfile[subjectId]||{focus:'chapter concepts, evidence, application and revision',exam:'Define the concept, explain its key points and connect the answer directly with the chapter.'};}

function getChapterContent(subjectId:string,chapterId:string,topics:Topic[]):TopicConcept[]{
 const exact=content[subjectId]?.[chapterId];
 if(exact?.length)return exact;
 const p=profile(subjectId);
 return topics.map(t=>({title:t.title,concept:`${t.title} is a core study area of this chapter. Learn its meaning, the lesson-specific ideas connected with it, and the way the concept is used in examination answers. Focus on ${p.focus}.`,keyPoints:[`Understand the meaning of ${t.title}.`,`Identify the lesson-specific facts, features or language skills connected with ${t.title}.`,`Practise explaining the topic in your own words.`,`Connect the topic with the chapter's central idea.`,`Revise the key terms before attempting board-style questions.`],example:`For revision, explain ${t.title} in two or three complete sentences and then write three key points.`,remember:p.exam}));
}

export function getExpandedConcepts(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):TopicConcept[]{return getChapterContent(subjectId,chapterId,topics);}

export function getExpandedMaterial(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):MaterialSection[]{
 const c=getChapterContent(subjectId,chapterId,topics);
 return [
 {heading:'Key Points',body:c.flatMap(x=>x.keyPoints)},
 {heading:'Definitions',body:c.map(x=>`${x.title}: ${x.concept}`)},
 {heading:'Exam Strategy',body:c.map(x=>x.remember||'Revise the concept, practise retrieval and write answers in your own words.')}
 ];
}

function makeQuestions(subjectId:string,chapterId:string,chapterTitle:string,c:TopicConcept):Question[]{
 const clean=(c.keyPoints[0]||c.concept).replace(/[.]+$/,'');
 const second=c.keyPoints[1]||'';
 const third=c.keyPoints[2]||'';
 return [
 {id:`content-${chapterId}-${c.title}-mcq`,subjectId,chapterId,text:`Which statement best describes ${c.title} in ${chapterTitle}?`,options:[c.concept,second,third,`It has no connection with ${chapterTitle}.`],answer:0,answerText:`A. ${c.concept}`,explanation:`The chapter-specific concept is: ${c.concept}`,type:'MCQ',difficulty:'Easy',marks:1,tags:[c.title,'Concept','Revision']},
 {id:`content-${chapterId}-${c.title}-definition`,subjectId,chapterId,text:`Define or explain ${c.title}.`,options:[],answer:0,answerText:c.concept,explanation:`For a definition question, begin with the meaning of the term and include the key idea that distinguishes it.`,type:'Very Short',difficulty:'Easy',marks:1,tags:[c.title,'Definition']},
 {id:`content-${chapterId}-${c.title}-short`,subjectId,chapterId,text:`Explain ${c.title} with any two important points.`,options:[],answer:0,answerText:`${c.concept} Important points: ${clean}. ${second}`,explanation:`A 2-mark answer should state the concept clearly and then support it with two accurate chapter-linked points.`,type:'Short Answer',difficulty:'Medium',marks:2,tags:[c.title,'Board Practice']},
 {id:`content-${chapterId}-${c.title}-long`,subjectId,chapterId,text:`Explain the importance or application of ${c.title} in ${chapterTitle}.`,options:[],answer:0,answerText:`${c.concept} ${c.keyPoints.join(' ')} ${third} ${c.remember||''}`,explanation:`Build the answer from the concept followed by the relevant key points. Keep every point connected to ${chapterTitle} and finish with its significance or application.`,type:'Long Answer',difficulty:'Hard',marks:4,tags:[c.title,'Board Practice','Revision']}
 ];
}

export function getExpandedQuestions(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):Question[]{return getChapterContent(subjectId,chapterId,topics).flatMap(c=>makeQuestions(subjectId,chapterId,chapterTitle,c));}

export function getAllExpandedQuestions():Question[]{
 return subjects.filter(s=>['history','political','geography','english','marathi','hindi'].includes(s.id)).flatMap(s=>s.chapters.flatMap(c=>getExpandedQuestions(s.id,c.id,c.title,getTopics(s.id,c.id,c.title))));
}
