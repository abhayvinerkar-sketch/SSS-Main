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
 return topics.map(t=>({title:t.title,concept:`${t.title} is a core study area of this chapter.`,keyPoints:[`Understand the meaning of ${t.title}.`,`Identify the facts, features or skill connected with ${t.title}.`,`Practise explaining ${t.title} in your own words.`],example:`Revise ${t.title} by explaining its meaning and three key points.`,remember:'Revise the concept, practise retrieval and write answers in your own words.'}));
}

export function getExpandedConcepts(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):TopicConcept[]{return getChapterContent(subjectId,chapterId,topics);}

export function getExpandedMaterial(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):MaterialSection[]{
 const c=getChapterContent(subjectId,chapterId,topics);
 if(subjectId==='marathi'){
  return [{heading:'महत्त्वाचे मुद्दे',body:c.flatMap(x=>x.keyPoints)},{heading:'व्याख्या व संकल्पना',body:c.map(x=>`${x.title} : ${x.concept}`)},{heading:'परीक्षा तयारी',body:c.map(x=>x.remember||'संकल्पना समजून घ्या, उजळणी करा आणि स्वतःच्या शब्दांत उत्तर लिहा.')}];
 }
 if(subjectId==='hindi'){
  return [{heading:'महत्वपूर्ण बिंदु',body:c.flatMap(x=>x.keyPoints)},{heading:'परिभाषाएँ एवं संकल्पनाएँ',body:c.map(x=>`${x.title} : ${x.concept}`)},{heading:'परीक्षा तैयारी',body:c.map(x=>x.remember||'संकल्पना समझें, पुनरावृत्ति करें और अपने शब्दों में उत्तर लिखें।')}];
 }
 return [{heading:'Key Points',body:c.flatMap(x=>x.keyPoints)},{heading:'Definitions',body:c.map(x=>`${x.title}: ${x.concept}`)},{heading:'Exam Strategy',body:c.map(x=>x.remember||'Revise the concept and write answers in your own words.')}];
}

function makeQuestions(subjectId:string,chapterId:string,chapterTitle:string,c:TopicConcept):Question[]{
 const p1=c.keyPoints[0]||c.concept;
 const p2=c.keyPoints[1]||'';
 const p3=c.keyPoints[2]||'';

 if(subjectId==='marathi'){
  return [
   {id:`content-${chapterId}-${c.title}-mcq`,subjectId,chapterId,text:`'${c.title}' या संकल्पनेचे योग्य स्पष्टीकरण कोणते?`,options:[c.concept,p2,p3,'या धड्याशी संबंधित नाही.'],answer:0,answerText:`अ. ${c.concept}`,explanation:`योग्य उत्तर: ${c.concept} ${p1}`,type:'MCQ',difficulty:'Easy',marks:1,tags:[c.title,'संकल्पना','उजळणी']},
   {id:`content-${chapterId}-${c.title}-definition`,subjectId,chapterId,text:`'${c.title}' या संकल्पनेची व्याख्या किंवा अर्थ स्पष्ट करा.`,options:[],answer:0,answerText:c.concept,explanation:`उत्तरात '${c.title}' चा मुख्य अर्थ स्पष्ट आणि नेमक्या शब्दांत मांडावा.`,type:'Very Short',difficulty:'Easy',marks:1,tags:[c.title,'व्याख्या']},
   {id:`content-${chapterId}-${c.title}-short`,subjectId,chapterId,text:`'${c.title}' स्पष्ट करून त्याचे दोन महत्त्वाचे मुद्दे लिहा.`,options:[],answer:0,answerText:`${c.concept} ${p1} ${p2}`,explanation:`प्रथम संकल्पनेचा अर्थ लिहा आणि त्यानंतर दोन अचूक, धड्याशी संबंधित मुद्दे मांडावेत.`,type:'Short Answer',difficulty:'Medium',marks:2,tags:[c.title,'लेखी सराव','बोर्ड सराव']},
   {id:`content-${chapterId}-${c.title}-long`,subjectId,chapterId,text:`'${c.title}' या विषयाचे सविस्तर स्पष्टीकरण देऊन त्याची महत्त्वाची वैशिष्ट्ये व उपयोग/महत्त्व स्पष्ट करा.`,options:[],answer:0,answerText:`${c.concept} ${c.keyPoints.join(' ')} ${c.remember||''}`,explanation:`उत्तराची सुरुवात संकल्पनेच्या स्पष्ट अर्थाने करा. त्यानंतर संबंधित मुद्दे क्रमाने लिहा आणि शेवटी महत्त्व किंवा उपयोग स्पष्ट करा.`,type:'Long Answer',difficulty:'Hard',marks:4,tags:[c.title,'बोर्ड सराव','दीर्घोत्तरी','उजळणी']}
  ];
 }

 if(subjectId==='hindi'){
  return [
   {id:`content-${chapterId}-${c.title}-mcq`,subjectId,chapterId,text:`'${c.title}' संकल्पना का सही अर्थ कौन-सा है?`,options:[c.concept,p2,p3,'इसका पाठ से कोई संबंध नहीं है.'],answer:0,answerText:`(अ) ${c.concept}`,explanation:`सही उत्तर: ${c.concept} ${p1}`,type:'MCQ',difficulty:'Easy',marks:1,tags:[c.title,'संकल्पना','पुनरावृत्ति']},
   {id:`content-${chapterId}-${c.title}-definition`,subjectId,chapterId,text:`'${c.title}' की परिभाषा अथवा अर्थ स्पष्ट कीजिए.`,options:[],answer:0,answerText:c.concept,explanation:`उत्तर में '${c.title}' का मुख्य अर्थ स्पष्ट और संक्षेप में लिखना चाहिए.`,type:'Very Short',difficulty:'Easy',marks:1,tags:[c.title,'परिभाषा']},
   {id:`content-${chapterId}-${c.title}-short`,subjectId,chapterId,text:`'${c.title}' को स्पष्ट करते हुए उसके दो महत्वपूर्ण बिंदु लिखिए.`,options:[],answer:0,answerText:`${c.concept} ${p1} ${p2}`,explanation:`पहले संकल्पना का अर्थ लिखिए और उसके बाद दो सटीक, पाठ से संबंधित बिंदु दीजिए.`,type:'Short Answer',difficulty:'Medium',marks:2,tags:[c.title,'लिखित अभ्यास','बोर्ड अभ्यास']},
   {id:`content-${chapterId}-${c.title}-long`,subjectId,chapterId,text:`'${c.title}' का विस्तार से वर्णन कीजिए तथा उसकी प्रमुख विशेषताएँ और महत्त्व/उपयोग स्पष्ट कीजिए.`,options:[],answer:0,answerText:`${c.concept} ${c.keyPoints.join(' ')} ${c.remember||''}`,explanation:`उत्तर की शुरुआत संकल्पना के स्पष्ट अर्थ से कीजिए. फिर संबंधित बिंदुओं को क्रम से लिखिए और अंत में उसके महत्त्व या उपयोग को स्पष्ट कीजिए.`,type:'Long Answer',difficulty:'Hard',marks:4,tags:[c.title,'बोर्ड अभ्यास','दीर्घ उत्तरीय','पुनरावृत्ति']}
  ];
 }

 return [
  {id:`content-${chapterId}-${c.title}-mcq`,subjectId,chapterId,text:`Which statement correctly describes ${c.title}?`,options:[c.concept,p2,p3,'It is unrelated to this chapter.'],answer:0,answerText:`A. ${c.concept}`,explanation:`${c.concept} ${p1}`,type:'MCQ',difficulty:'Easy',marks:1,tags:[c.title,'Concept','Revision']},
  {id:`content-${chapterId}-${c.title}-definition`,subjectId,chapterId,text:`Define ${c.title}.`,options:[],answer:0,answerText:c.concept,explanation:`A complete definition states the central meaning of ${c.title} clearly and directly.`,type:'Very Short',difficulty:'Easy',marks:1,tags:[c.title,'Definition']},
  {id:`content-${chapterId}-${c.title}-short`,subjectId,chapterId,text:`Explain ${c.title} with two important points.`,options:[],answer:0,answerText:`${c.concept} ${p1} ${p2}`,explanation:`Start with the concept and support it with two accurate chapter-linked points.`,type:'Short Answer',difficulty:'Medium',marks:2,tags:[c.title,'Board Practice']},
  {id:`content-${chapterId}-${c.title}-long`,subjectId,chapterId,text:`Explain ${c.title} in detail with its important features and significance in ${chapterTitle}.`,options:[],answer:0,answerText:`${c.concept} ${c.keyPoints.join(' ')} ${c.remember||''}`,explanation:`Use the concept first, organise the relevant key points, and conclude with significance or application.`,type:'Long Answer',difficulty:'Hard',marks:4,tags:[c.title,'Board Practice','Revision']}
 ];
}

export function getExpandedQuestions(subjectId:string,chapterId:string,chapterTitle:string,topics:Topic[]):Question[]{return getChapterContent(subjectId,chapterId,topics).flatMap(c=>makeQuestions(subjectId,chapterId,chapterTitle,c));}
export function getAllExpandedQuestions():Question[]{return subjects.filter(s=>['history','political','geography','english','marathi','hindi'].includes(s.id)).flatMap(s=>s.chapters.flatMap(c=>getExpandedQuestions(s.id,c.id,c.title,getTopics(s.id,c.id,c.title))));}
