import React, { useState } from 'react';

type Subject = { id:string, name:string, icon:string, color:string, lessons: Lesson[] };
type Lesson = { id:string, title:string, content:string, quiz: {q:string, options:string[], answer:number}[] };

const SUBJECTS: Subject[] = [
  {
    id:'math', name:'Mathematics', icon:'📐', color:'#00ffff',
    lessons:[
      { id:'m1', title:'Algebra Basics - 9x×4', content:'When you see 9x×4, it means 9 multiplied by x multiplied by 4. So 9×4=36, answer is 36x. Example: If x=2, then 36x=72.', quiz:[{q:'What is 9x × 4?', options:['36x','13x','9x4','36'], answer:0}, {q:'If x=2, 36x = ?', options:['38','72','36','18'], answer:1}]},
      { id:'m2', title:'Quadratic Equations', content:'Solve x²+5x+6=0. Factor: (x+2)(x+3)=0, so x=-2 or x=-3.', quiz:[{q:'Solve x²+5x+6=0', options:['x=2,3','x=-2,-3','x=1,6','x=0,5'], answer:1}]},
    ]
  },
  {
    id:'science', name:'Physical Science', icon:'🔬', color:'#8a2be2',
    lessons:[
      { id:'s1', title:'Newton Laws', content:'1st Law: Object stays unless force acts. 2nd: F=ma. 3rd: Every action has equal opposite reaction.', quiz:[{q:'F=ma is which law?', options:['1st','2nd','3rd','4th'], answer:1}]},
    ]
  },
  {
    id:'english', name:'English', icon:'📚', color:'#00ff88',
    lessons:[
      { id:'e1', title:'Essay Writing', content:'Structure: Introduction, Body (3 paragraphs), Conclusion. Use PEEL method.', quiz:[{q:'PEEL stands for?', options:['Point Evidence Explain Link','People Eat Easy Lunch','Point End','Prepare'], answer:0}]},
    ]
  },
];

export default function App(){
  const [subject, setSubject] = useState<Subject>(SUBJECTS[0]);
  const [lesson, setLesson] = useState<Lesson>(SUBJECTS[0].lessons[0]);
  const [tab, setTab] = useState<'learn'|'quiz'|'tutor'>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [tutorQ, setTutorQ] = useState('');
  const [tutorAns, setTutorAns] = useState<string[]>(['Sawubona! I am NEXOVIAN. Ask me about '+lesson.title]);

  const askTutor = () => {
    if(!tutorQ.trim()) return;
    const q = tutorQ;
    setTutorAns(a=>[...a, 'You: '+q]);
    setTimeout(()=>{
      let ans = `Great! About "${lesson.title}": ${lesson.content} \n\nFor "${q}" — remember: Break it into small steps, write formula, then solve.`;
      if(q.includes('9x')) ans = '9x×4 = 36x. Why? 9×4=36, keep the x. So if x=3, answer is 108.';
      setTutorAns(a=>[...a, 'NEXOVIAN: '+ans]);
    },600);
    setTutorQ('');
  };

  return (
    <div style={{minHeight:'100vh', background:'#08080a', color:'white', display:'flex', flexDirection:'column'}}>
      {/* TOP */}
      <div style={{padding:'12px 16px', borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'#08080a', zIndex:10}}>
        <b style={{letterSpacing:1}}>NEXOVIA LEARN</b>
        <div style={{fontSize:12, background:'#111', padding:'6px 10px', borderRadius:20, border:'1px solid #222'}}>🔥 Streak 7 days</div>
      </div>

      <div style={{display:'flex', flex:1}}>
        {/* SIDEBAR */}
        <div style={{width:200, borderRight:'1px solid #1a1a1a', padding:12, display:'flex', flexDirection:'column', gap:8}}>
          <p style={{fontSize:11, color:'#666', margin:'8px 0'}}>SUBJECTS</p>
          {SUBJECTS.map(s=>(
            <button key={s.id} onClick={()=>{setSubject(s); setLesson(s.lessons[0]); setTab('learn'); setShowResult(false);}} 
              style={{textAlign:'left', padding:'10px 12px', borderRadius:10, border: subject.id===s.id?'1px solid '+s.color:'1px solid #1a1a1a', background: subject.id===s.id?'#111':'transparent', color: subject.id===s.id?'white':'#888', cursor:'pointer'}}>
              {s.icon} {s.name}
            </button>
          ))}
          <p style={{fontSize:11, color:'#666', margin:'16px 0 8px'}}>LESSONS</p>
          {subject.lessons.map(l=>(
            <button key={l.id} onClick={()=>{setLesson(l); setTab('learn'); setShowResult(false); setTutorAns(['Sawubona! Ask me about '+l.title]);}} 
              style={{textAlign:'left', padding:'8px 10px', borderRadius:8, border:'none', background: lesson.id===l.id?'#1a1a1a':'transparent', color: lesson.id===l.id?'#00ffff':'#666', fontSize:13, cursor:'pointer'}}>
              • {l.title}
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div style={{flex:1, padding:20, maxWidth:700}}>
          <div style={{display:'flex', gap:8, marginBottom:16}}>
            <button onClick={()=>setTab('learn')} style={{padding:'8px 14px', borderRadius:8, border:'none', background:tab==='learn'?'#00ffff':'#1a1a1a', color:tab==='learn'?'#000':'#888', fontWeight:700}}>Learn</button>
            <button onClick={()=>setTab('quiz')} style={{padding:'8px 14px', borderRadius:8, border:'none', background:tab==='quiz'?'#00ffff':'#1a1a1a', color:tab==='quiz'?'#000':'#888', fontWeight:700}}>Quiz</button>
            <button onClick={()=>setTab('tutor')} style={{padding:'8px 14px', borderRadius:8, border:'none', background:tab==='tutor'?'#8a2be2':'#1a1a1a', color:'white', fontWeight:700}}>Ask NEXOVIAN</button>
          </div>

          {tab==='learn' && (
            <div>
              <h2 style={{fontSize:26, marginBottom:8}}>{lesson.title}</h2>
              <div style={{background:'#111', border:'1px solid #222', borderRadius:16, padding:20, lineHeight:1.6, color:'#ccc'}}>
                {lesson.content}
                <div style={{marginTop:16, padding:12, background:'#0a0a0a', borderRadius:10, borderLeft:'3px solid '+subject.color}}>
                  <b style={{color:subject.color}}>Example:</b> For 9x×4 — multiply numbers first, keep variable.
                </div>
              </div>
              <button onClick={()=>setTab('quiz')} style={{marginTop:16, background:'#00ffff', color:'#000', border:'none', padding:'12px 20px', borderRadius:10, fontWeight:800, width:'100%'}}>Take Quiz →</button>
            </div>
          )}

          {tab==='quiz' && (
            <div>
              {!showResult ? (
                <div style={{background:'#111', border:'1px solid #222', borderRadius:16, padding:20}}>
                  <p style={{color:'#888', fontSize:13}}>Question {quizIndex+1} / {lesson.quiz.length}</p>
                  <h3 style={{margin:'12px 0 16px'}}>{lesson.quiz[quizIndex].q}</h3>
                  {lesson.quiz[quizIndex].options.map((opt,i)=>(
                    <button key={i} onClick={()=>{
                      if(i===lesson.quiz[quizIndex].answer) setScore(s=>s+1);
                      if(quizIndex+1 < lesson.quiz.length) setQuizIndex(k=>k+1);
                      else setShowResult(true);
                    }} style={{display:'block', width:'100%', textAlign:'left', padding:'12px', margin:'8px 0', borderRadius:10, border:'1px solid #333', background:'#0a0a0a', color:'white'}}>
                      {String.fromCharCode(65+i)}. {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{background:'#111', borderRadius:16, padding:30, textAlign:'center', border:'1px solid #222'}}>
                  <h2 style={{fontSize:40}}>🎉</h2>
                  <h3>Score: {score}/{lesson.quiz.length}</h3>
                  <p style={{color:'#888'}}>{score===lesson.quiz.length?'Perfect! You mastered '+lesson.title:'Good try! Review lesson again.'}</p>
                  <button onClick={()=>{setQuizIndex(0); setScore(0); setShowResult(false); setTab('learn');}} style={{marginTop:16, background:'#00ffff', color:'#000', border:'none', padding:'12px 20px', borderRadius:10, fontWeight:800}}>Next Lesson</button>
                </div>
              )}
            </div>
          )}

          {tab==='tutor' && (
            <div>
              <div style={{background:'#0f0f12', border:'1px solid #222', borderRadius:16, padding:16, minHeight:300, marginBottom:12}}>
                {tutorAns.map((m,i)=><div key={i} style={{margin:'8px 0', padding:'8px 12px', borderRadius:10, background: m.startsWith('You:')?'#00ffff22':'#1a1a1a', textAlign: m.startsWith('You:')?'right':'left', fontSize:14}}>{m}</div>)}
              </div>
              <div style={{display:'flex', gap:8}}>
                <input value={tutorQ} onChange={e=>setTutorQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&askTutor()} placeholder={`Ask about ${lesson.title}...`} style={{flex:1, padding:12, borderRadius:10, background:'#111', border:'1px solid #333', color:'white'}}/>
                <button onClick={askTutor} style={{background:'#8a2be2', color:'white', border:'none', padding:'0 18px', borderRadius:10}}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
                   }
