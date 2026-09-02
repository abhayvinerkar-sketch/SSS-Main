import AsyncStorage from '@react-native-async-storage/async-storage';

export type NotebookState={notes:string;messages:{from:'sanvi'|'tutor';text:string}[]};
const key=(subjectId:string,chapterId:string,topic:string)=>`ssc-master-notebook-v1:${subjectId}:${chapterId}:${topic}`;
export async function loadNotebook(subjectId:string,chapterId:string,topic:string):Promise<NotebookState>{try{const raw=await AsyncStorage.getItem(key(subjectId,chapterId,topic));return raw?JSON.parse(raw):{notes:'',messages:[]}}catch{return{notes:'',messages:[]}}}
export async function saveNotebook(subjectId:string,chapterId:string,topic:string,state:NotebookState){try{await AsyncStorage.setItem(key(subjectId,chapterId,topic),JSON.stringify(state))}catch{}}
