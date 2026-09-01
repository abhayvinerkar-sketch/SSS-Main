export type Topic={id:string;title:string;kind:'Concepts'|'Board Practice'|'Revision'};

const curated:Record<string,string[]>= {
'maths1-01':['Graph of a Linear Equation','Solving Linear Equations','Pair of Equations','Word Problems'],
'maths1-02':['Standard Form','Factorisation','Quadratic Formula','Nature of Roots'],
'maths1-03':['Arithmetic Progression','Common Difference','nth Term','Sum of n Terms'],
'maths1-04':['Financial Planning','Income and Expenditure','Investments','Tax and Interest'],
'maths1-05':['Probability','Sample Space','Events','Basic Probability'],
'maths1-06':['Statistics','Mean','Median and Mode','Data Interpretation'],
'maths2-01':['Similarity Criteria','Basic Proportionality','Areas of Similar Triangles','Applications'],
'maths2-02':['Pythagoras Theorem','Converse','Right Triangles','Applications'],
'maths2-03':['Circle','Tangent','Chord','Theorems'],
'maths2-04':['Geometric Constructions','Bisectors','Tangents','Construction Problems'],
'maths2-05':['Coordinate Geometry','Distance Formula','Section Formula','Area of Triangle'],
'maths2-06':['Trigonometric Ratios','Standard Angles','Identities','Heights and Distances'],
'maths2-07':['Mensuration','Surface Area','Volume','Applications'],
'science1-01':['Universal Law of Gravitation','Acceleration Due to Gravity','Free Fall','Numericals'],
'science1-02':['Periodic Table','Modern Periodic Law','Groups and Periods','Periodic Trends'],
'science1-03':['Chemical Reactions','Types of Reactions','Balancing Equations','Oxidation and Reduction'],
'science1-04':['Electric Current','Potential Difference','Ohm’s Law','Electric Power'],
'science1-05':['Heat','Temperature','Specific Heat','Heat Transfer'],
'science1-06':['Refraction','Laws of Refraction','Refractive Index','Applications'],
'science1-07':['Lenses','Ray Diagrams','Lens Formula','Magnification'],
'science1-08':['Metallurgy','Extraction of Metals','Refining','Corrosion'],
'science1-09':['Carbon Compounds','Covalent Bonding','Functional Groups','Chemical Properties'],
'science1-10':['Space Missions','Artificial Satellites','Launch Vehicles','Indian Space Programme'],
'science2-01':['Heredity','Mendel’s Experiments','Variation','Evolution'],
'science2-02':['Nutrition','Respiration','Transportation','Excretion'],
'science2-03':['Control and Coordination','Reproduction','Life Processes','Human Health'],
'science2-04':['Ecosystems','Natural Resources','Conservation','Sustainable Development'],
'science2-05':['Renewable Energy','Solar Energy','Wind Energy','Energy Conservation'],
'science2-06':['Animal Classification','Classification Criteria','Major Groups','Adaptations'],
'science2-07':['Microorganisms','Useful Microbes','Harmful Microbes','Microbial Applications'],
'science2-08':['Cell Biology','Biotechnology','Cell Organelles','Applications'],
'science2-09':['Social Health','Stress Management','Addiction Awareness','Healthy Relationships'],
'science2-10':['Disaster Management','Preparedness','Response','Recovery'],
'geography-01':['Field Visit','Observation','Data Collection','Report Writing'],
'geography-02':['Location of India','Extent','Latitudes and Longitudes','Standard Meridian'],
'geography-03':['Physiography','Drainage','Major Landforms','River Systems'],
'geography-04':['Climate','Monsoon','Rainfall','Temperature'],
'geography-05':['Natural Vegetation','Wildlife','Forest Types','Conservation'],
'geography-06':['Population','Distribution','Density','Population Change'],
'geography-07':['Human Settlements','Rural Settlements','Urban Settlements','Settlement Patterns'],
'geography-08':['Economy and Occupations','Primary Activities','Secondary Activities','Tertiary Activities'],
'geography-09':['Tourism','Transport','Communication','Tourism Development']
};

export function getTopics(subjectId:string,chapterId:string,chapterTitle:string):Topic[]{
 const names=curated[chapterId]||[chapterTitle+' — Concepts',chapterTitle+' — Key Points',chapterTitle+' — Board Practice',chapterTitle+' — Revision'];
 return names.map((title,i)=>({id:`${chapterId}-topic-${i+1}`,title,kind:i===names.length-1?'Revision':i===names.length-2?'Board Practice':'Concepts'}));
}
