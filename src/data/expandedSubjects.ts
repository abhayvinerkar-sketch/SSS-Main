import {Question} from '../models';
import {subjects} from './index';
import {getTopics,Topic} from './topics';
import {TopicConcept,MaterialSection} from './studyMaterial';

type Profile={focus:string;exam:string;example:string};
const profiles:Record<string,Profile>={
 history:{focus:'historical thinking, evidence, chronology, cause and effect',exam:'Define the idea, connect it with an example, and explain its historical significance.',example:'Build a short timeline and identify one cause, one development and one consequence.'},
 political:{focus:'constitutional ideas, institutions, democracy, rights and civic participation',exam:'Use correct political terms and support answers with a relevant constitutional or democratic example.',example:'Explain the institution or process in simple steps, then connect it to citizens.'},
 geography:{focus:'location, physical features, climate, population, resources and human activities',exam:'Use maps, data, comparisons and reasons wherever the question demands them.',example:'Identify the feature, state its location or pattern, then explain why it occurs.'},
 english:{focus:'reading comprehension, vocabulary, grammar, writing and appreciation',exam:'Answer in complete sentences, use precise vocabulary and support literary answers with the text idea in your own words.',example:'Read a passage, identify its central idea, then write a two-sentence response.'},
 marathi:{focus:'आकलन, आशय, भाषा-अभ्यास, व्याकरण आणि उपयोजित लेखन',exam:'मुद्देसूद उत्तर, योग्य भाषा, आशयाची मांडणी आणि आवश्यक तेथे उदाहरण यांना प्राधान्य द्या.',example:'धड्याचा आशय स्वतःच्या शब्दांत मांडून दोन महत्त्वाचे मुद्दे लिहा.'},
 hindi:{focus:'पठन, आशय, भाषा-अध्ययन, व्याकरण और लेखन कौशल',exam:'उत्तर स्पष्ट, क्रमबद्ध और शुद्ध भाषा में लिखें; पाठ का आशय अपने शब्दों में समझाएँ.',example:'पाठ का मुख्य भाव लिखें और उससे जुड़े दो महत्त्वपूर्ण बिंदु बताइए.'}
};

function profile(subjectId:string):Profile{
 if(subjectId.includes('history'))return profiles.history;
 if(subjectId.includes('political'))return profiles.political;
 if(subjectId.includes('geography'))return profiles.geography;
 if(subjectId==='english')return profiles.english;
 if(subjectId==='marathi')return profiles.marathi;
 return profiles.hindi;
}

export function getExpandedConcepts(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):TopicConcept[]{
 const p=profile(subjectId);
 return topics.map((t,i)=>({
  title:t.title,
  concept:`${t.title} is a focused part of ${chapterTitle}. Study it through ${p.focus}. The goal is to understand the idea, connect it with the chapter and then apply it in an exam-style response.`,
  keyPoints:[`Understand the meaning and role of ${t.title}.`,`Connect ${t.title} with the main theme of ${chapterTitle}.`,`Use keywords, examples and cause-effect or comparison links where relevant.`,`Revise the topic without copying textbook sentences.`],
  example:p.example,
  remember:i===3?p.exam:`${t.title} → understand → connect → practise → revise.`
 }));
}

export function getExpandedMaterial(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):MaterialSection[]{
 const concepts=getExpandedConcepts(subjectId,chapterId,chapterTitle,topics);
 return [
  {heading:'Key Points',body:concepts.flatMap(x=>x.keyPoints)},
  {heading:'Exam Strategy',body:concepts.map(x=>x.remember||'Revise in your own words.')}
 ];
}

export function getExpandedQuestions(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):Question[]{
 const p=profile(subjectId);
 return topics.map((t,i)=>({
  id:`expanded-${chapterId}-${i+1}`,
  subjectId,chapterId,text:`Which approach is most useful while studying “${t.title}” in ${chapterTitle}?`,
  options:[`Understand the idea and connect it with the chapter`,`Memorise random sentences without context`,`Skip examples and practice`,`Study it without knowing the topic meaning`],
  answer:0,
  explanation:`For ${t.title}, first understand the concept, connect it to ${chapterTitle}, then practise an exam-style response. Focus on ${p.focus}.`,
  type:'MCQ',difficulty:'Easy',marks:1,tags:[t.title]
 }));
}

export function getAllExpandedQuestions():Question[]{
 return subjects.filter(s=>['history','political','geography','english','marathi','hindi'].includes(s.id)).flatMap(s=>s.chapters.flatMap(c=>getExpandedQuestions(s.id,c.id,c.title,getTopics(s.id,c.id,c.title))));
}
