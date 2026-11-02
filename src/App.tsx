import React, { useState } from 'react';

export default function App(){
  const [logged, setLogged] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if(!logged){
    return (
      <div style={{minHeight:'100vh', background:'#f5f3ef', display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 16px'}}>
        <div style={{marginTop:10, color:'#6b7280', fontSize:14}}>English (UK) ▾</div>
        <div style={{marginTop:50, display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{width:110, height:110, borderRadius:'50%', background:'#111a2e', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span style={{color:'#f5c518', fontSize:56, fontWeight:800, fontFamily:'serif'}}>N</span>
          </div>
          <h1 style={{marginTop:16, fontSize:28, fontWeight:900, letterSpacing:2, color:'#111a2e'}}>NEXOVIAN</h1>
          <p style={{color:'#b45309', fontWeight:600}}>R60 / learner / month</p>
        </div>
        <div style={{width:'100%', maxWidth:380, marginTop:32, display:'flex', flexDirection:'column', gap:14}}>
          <input placeholder="Mobile number or email address" style={{width:'100%', padding:'16px', borderRadius:12, border:'1px solid #e5e7eb', background:'white'}}/>
          <div style={{position:'relative'}}>
            <input type={showPass?'text':'password'} placeholder="Password" style={{width:'100%', padding:'16px', borderRadius:12, border:'1px solid #e5e7eb', background:'white'}}/>
            <button onClick={()=>setShowPass(!showPass)} style={{position:'absolute', right:14, top:16, background:'none', border:'none'}}>👁️</button>
          </div>
          <label style={{display:'flex', gap:8, fontSize:14}}><input type="checkbox"/> Remember me</label>
          <button onClick={()=>setLogged(true)} style={{marginTop:10, width:'100%', padding:'16px', borderRadius:24, background:'#ffcc00', border:'none', fontWeight:700, fontSize:16}}>Log in</button>
          <button style={{textAlign:'center', background:'none', border:'none'}}>Forgotten password?</button>
          <button style={{marginTop:60, width:'100%', padding:'16px', borderRadius:24, background:'transparent', border:'1.5px solid #111', fontWeight:700}}>Create Account - Get 1 Day Free</button>
        </div>
        <div style={{marginTop:'auto', paddingTop:30, fontSize:11, color:'#9ca3af'}}>© NEXOVIAN (PTY) LTD • Built in Mpumalanga</div>
      </div>
    );
  }

  // HOME DASHBOARD AFTER LOGIN - EXACT LIKE YOUR SCREENSHOT
  return (
    <div style={{minHeight:'100vh', background:'#0e1220', color:'white', paddingBottom:80}}>
      <div style={{padding:16}}>
        {/* Top */}
        <div style={{background:'#171d31', borderRadius:16, padding:16}}>
          <div style={{display:'flex', gap:8, marginBottom:20}}>
            <span style={{padding:'8px 16px', background:'#232a45', borderRadius:20, fontSize:13}}>Economics</span>
          </div>
          <p style={{textAlign:'center', color:'#8b92b5', fontSize:14, marginBottom:12}}>Selected: <b style={{color:'white'}}>Mathematics</b></p>
          <div style={{display:'flex', gap:10}}>
            <button style={{flex:1, padding:'12px', borderRadius:12, background:'#ffcc00', color:'#111', border:'none', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>✨ Ask AI About Mathematics</button>
            <button style={{flex:1, padding:'12px', borderRadius:12, background:'#232a45', color:'white', border:'none', fontWeight:600, fontSize:13}}>📖 View All Lessons</button>
          </div>
        </div>

        {/* Socratic Tutor */}
        <div style={{background:'#171d31', borderRadius:16, padding:16, marginTop:16}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <div style={{width:44, height:44, borderRadius:'50%', background:'#ffcc00', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20}}>✨</div>
            <div>
              <p style={{color:'#ffcc00', fontSize:11, fontWeight:700, letterSpacing:1}}>CONTEXTUAL AI GUIDANCE</p>
              <h3 style={{fontSize:16, fontWeight:800}}>Ask Nexovian Socratic Tutor</h3>
            </div>
          </div>
          <button style={{marginTop:12, padding:'8px 14px', borderRadius:20, background:'#232a45', border:'none', color:'white', fontSize:13}}>Open Full Tutor →</button>
          <div style={{height:1, background:'#232a45', margin:'16px 0'}}></div>

          {/* Cards */}
          {[
            {icon:'⚠️', title:'"Explain my weak areas"', sub:'Target: Quadratic Equations'},
            {icon:'📈', title:'"Help me improve Mathematics"', sub:'Core algebra & functions'},
            {icon:'📅', title:'"Create a study plan"', sub:'Personalized weekly schedule'},
            {icon:'🎯', title:'"Practice my weakest topic"', sub:''},
          ].map((c,i)=>(
            <div key={i} style={{background:'#232a45', borderRadius:16, padding:14, display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
              <div style={{width:40, height:40, borderRadius:10, background:'#1e253e', display:'flex', alignItems:'center', justifyContent:'center'}}>{c.icon}</div>
              <div style={{flex:1}}>
                <p style={{fontWeight:700, fontSize:14}}>{c.title}</p>
                <p style={{color:'#8b92b5', fontSize:12}}>{c.sub}</p>
              </div>
              <div style={{width:32, height:32, borderRadius:'50%', background:'#2a3252', display:'flex', alignItems:'center', justifyContent:'center'}}>›</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#171d31', borderTop:'1px solid #232a45', display:'flex', justifyContent:'space-around', padding:'8px 0'}}>
        {[
          {n:'Home', a:true, i:'🏠'},
          {n:'Learn', a:false, i:'📖'},
          {n:'AI Tutor', a:false, i:'✨'},
          {n:'Voice Docs', a:false, i:'🎙️'},
          {n:'Progress', a:false, i:'📈'},
          {n:'More', a:false, i:'📚'},
        ].map(b=>(
          <div key={b.n} style={{display:'flex', flexDirection:'column', alignItems:'center', color: b.a?'#00d9ff':'#8b92b5', fontSize:11}}>
            <span style={{fontSize:18}}>{b.i}</span>{b.n}{b.a&&<div style={{width:4, height:4, background:'#00d9ff', borderRadius:'50%', marginTop:2}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}