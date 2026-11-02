import React, { useState } from 'react';
import { Send, BookOpen, Brain, LayoutDashboard, Sparkles, GraduationCap } from 'lucide-react';
import AITutorView from './components/tutor/AITutorView';

type Page = 'home' | 'dashboard' | 'tutor' | 'lessons';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [q, setQ] = useState('');

  return (
    <div style={{minHeight:'100vh', background:'#050507', color:'white', fontFamily:'system-ui'}}>
      {/* NAV */}
      <nav style={{display:'flex', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid #222', position:'sticky', top:0, background:'#050507', zIndex:10}}>
        <div style={{display:'flex', alignItems:'center', gap:10, fontWeight:800, letterSpacing:1}}>
          <div style={{width:32, height:32, background:'linear-gradient(135deg,#00ffff,#8a2be2)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center'}}>N</div>
          NEXOVIA
        </div>
        <div style={{display:'flex', gap:16}}>
          <button onClick={()=>setPage('home')} style={{background:'none', border:'none', color: page==='home'?'#00ffff':'#888', cursor:'pointer'}}>Home</button>
          <button onClick={()=>setPage('dashboard')} style={{background:'none', border:'none', color: page==='dashboard'?'#00ffff':'#888', cursor:'pointer'}}>Dashboard</button>
          <button onClick={()=>setPage('tutor')} style={{background:'none', border:'none', color: page==='tutor'?'#00ffff':'#888', cursor:'pointer'}}>Tutor</button>
        </div>
      </nav>

      {page==='home' && (
        <div style={{padding:'60px 24px', textAlign:'center', maxWidth:900, margin:'0 auto'}}>
          <div style={{display:'inline-flex', gap:8, background:'#111', padding:'6px 14px', borderRadius:20, fontSize:12, border:'1px solid #222', marginBottom:20}}>
            <Sparkles size={14} color="#00ffff"/> AI-Powered Learning Platform
          </div>
          <h1 style={{fontSize:52, fontWeight:900, lineHeight:1.1, marginBottom:16}}>
            Learn Faster with <span style={{color:'#00ffff'}}>NEXOVIAN</span>
          </h1>
          <p style={{color:'#888', fontSize:18, marginBottom:28}}>Your personal AI tutor for Maths, Science, Languages — in English, isiZulu, isiXhosa & Afrikaans.</p>
          
          <div style={{display:'flex', gap:12, justifyContent:'center', marginBottom:50}}>
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter' && setPage('tutor')} placeholder="Ask: Solve x² + 5x + 6 = 0" style={{width:320, padding:'14px 16px', borderRadius:12, background:'#111', border:'1px solid #333', color:'white'}}/>
            <button onClick={()=>setPage('tutor')} style={{background:'#00ffff', color:'#000', border:'none', padding:'0 24px', borderRadius:12, fontWeight:700, cursor:'pointer'}}>Ask NEXOVIAN</button>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16, textAlign:'left'}}>
            <div style={{background:'#0f0f12', border:'1px solid #222', borderRadius:16, padding:20}}>
              <Brain color="#00ffff"/><h3 style={{margin:'12px 0 6px'}}>AI Tutor</h3><p style={{color:'#666', fontSize:14}}>Step-by-step solutions, like a real teacher.</p>
            </div>
            <div style={{background:'#0f0f12', border:'1px solid #222', borderRadius:16, padding:20}}>
              <BookOpen color="#8a2be2"/><h3 style={{margin:'12px 0 6px'}}>All Subjects</h3><p style={{color:'#666', fontSize:14}}>Maths, Physics, Life Sciences, languages.</p>
            </div>
            <div style={{background:'#0f0f12', border:'1px solid #222', borderRadius:16, padding:20}}>
              <LayoutDashboard color="#00ff88"/><h3 style={{margin:'12px 0 6px'}}>Track Progress</h3><p style={{color:'#666', fontSize:14}}>Dashboard with lessons, quizzes, streaks.</p>
            </div>
          </div>
        </div>
      )}

      {page==='dashboard' && (
        <div style={{padding:24, maxWidth:1100, margin:'0 auto'}}>
          <h2 style={{fontSize:28, marginBottom:20}}>Dashboard</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16}}>
            <div style={{background:'#111', padding:20, borderRadius:16, border:'1px solid #222'}}><p style={{color:'#888'}}>Streak</p><h3 style={{fontSize:24}}>🔥 7 days</h3></div>
            <div style={{background:'#111', padding:20, borderRadius:16, border:'1px solid #222'}}><p style={{color:'#888'}}>Lessons</p><h3 style={{fontSize:24}}>24 Completed</h3></div>
            <div style={{background:'#111', padding:20, borderRadius:16, border:'1px solid #222'}}><p style={{color:'#888'}}>Level</p><h3 style={{fontSize:24}}>Scholar</h3></div>
          </div>
          <button onClick={()=>setPage('tutor')} style={{marginTop:20, background:'#00ffff', color:'#000', padding:'12px 20px', borderRadius:10, border:'none', fontWeight:700}}>Go to Tutor →</button>
        </div>
      )}

      {page==='tutor' && <AITutorView />}

      {page==='lessons' && (
        <div style={{padding:24}}>Lessons Coming...</div>
      )}

      <footer style={{textAlign:'center', padding:40, color:'#444', fontSize:12, borderTop:'1px solid #111', marginTop:60}}>
        NEXOVIA — Built for South Africa • nexovia-nu.vercel.app • GREEN BUILD ✅
      </footer>
    </div>
  );
                       }
