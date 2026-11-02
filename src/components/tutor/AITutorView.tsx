import React, { useState } from 'react';
import { Send } from 'lucide-react';

type Lang = 'en' | 'zu' | 'xh' | 'af';

export default function AITutorView() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role:'user'|'ai', text:string}[]>([
    {role:'ai', text:'Sawubona! I am NEXOVIAN — your AI tutor. Ask me any school question!'}
  ]);

  const send = () => {
    if(!input.trim()) return;
    const q = input;
    setMessages(m => [...m, {role:'user', text: q}, {role:'ai', text: `Great question! Let's solve: "${q}" — step by step: 1) Understand, 2) Formula, 3) Solve.`}]);
    setInput('');
  };

  return (
    <div style={{padding:20, maxWidth:700, margin:'0 auto'}}>
      <h2 style={{color:'#00ffff', fontSize:24, marginBottom:16}}>NEXOVIAN AI Tutor</h2>
      <div style={{background:'#111', borderRadius:12, padding:16, minHeight:300, marginBottom:12}}>
        {messages.map((m,i)=>(
          <div key={i} style={{textAlign: m.role==='user'?'right':'left', margin:'8px 0'}}>
            <span style={{background: m.role==='user'?'#00ffff':'#222', color: m.role==='user'?'#000':'#fff', padding:'8px 12px', borderRadius:12, display:'inline-block'}}>{m.text}</span>
          </div>
        ))}
      </div>
      <div style={{display:'flex', gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask any question..." style={{flex:1, padding:12, borderRadius:8, background:'#222', color:'#fff', border:'1px solid #333'}} />
        <button onClick={send} style={{background:'#00ffff', color:'#000', padding:'0 16px', borderRadius:8, border:'none'}}><Send size={18}/></button>
      </div>
    </div>
  );
}
