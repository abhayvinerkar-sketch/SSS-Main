import React,{createContext,useContext,useMemo,useState}from'react';
import{theme}from'./index';

type Mode='light'|'dark';
const palettes={light:{...theme.colors},dark:{primary:'#8B5CF6',secondary:'#22D3EE',background:'#070B1A',surface:'#111827',text:'#F9FAFB',muted:'#A7B0C0',border:'#273244',success:'#4ADE80',warning:'#FBBF24',danger:'#FB7185'}};
const ThemeContext=createContext<any>(null);
export function ThemeProvider({children}:{children:React.ReactNode}){const[mode,setMode]=useState<Mode>('light');const[accent,setAccent]=useState('#7C3AED');const value=useMemo(()=>({mode,setMode,accent,setAccent,colors:{...palettes[mode],primary:accent}}),[mode,accent]);return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>}
export function useTheme(){return useContext(ThemeContext)}
export const accentOptions=['#7C3AED','#2563EB','#059669','#F59E0B','#E11D48','#06B6D4'];
