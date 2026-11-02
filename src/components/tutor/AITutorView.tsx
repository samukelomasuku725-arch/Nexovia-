import React, { useState, useRef } from 'react';
import { Send, Calculator, Sparkles, Languages } from 'lucide-react';

type Lang = 'en' | 'zu' | 'xh' | 'af' | 'nso' | 'tn' | 'st' | 'ts' | 'ss' | 've' | 'nr';
const LANG_NAMES: any = { en: 'English', zu: 'isiZulu', xh: 'isiXhosa', af: 'Afrikaans', nso: 'Sepedi', tn: 'Setswana', st: 'Sesotho', ts: 'Xitsonga', ss: 'siSwati', ve: 'Tshivenda', nr: 'isiNdebele' };

function solveHandwritten(n: number, r: number, lang: Lang) {
  const topNums = Array.from({length: r}, (_, i) => n - i);
  const bottomNums = Array.from({length: r}, (_, i) => i + 1);
  let num = 1; topNums.forEach(v => num *= v);
  let den = 1; bottomNums.forEach(v => den *= v);
  const result = num / den;
  const isSwati = lang === 'ss';
  const isTsonga = lang === 'ts';
  const steps = [
    { title: isSwati ? 'Ifomula' : isTsonga ? 'Fomula' : 'Formula', content: `nCr = n! / (r! × (n-r)!)\n= ${n}! / (${r}! × ${n-r}!)` },
    { title: isSwati ? 'Faka emananisi' : isTsonga ? 'Nghenisa mimpimo' : 'Substitute', content: `= ${topNums.join(' × ')} / ${bottomNums.join(' × ')}\n(Susa i-factorial lenkhulu njengasesithombeni)` },
    { title: isSwati ? 'Yenza lula' : isTsonga ? 'Olova' : 'Simplify & Cancel', content: `Bala ngezansi: ${bottomNums.join('×')} = ${den}\nBala ngetulu: ${topNums.join('×')} = ${num}\nHlukanisa: ${num} ÷ ${den}` },
    { title: isSwati ? 'Imphendvulo' : isTsonga ? 'Nhlamulo' : 'Final Answer', content: `${n}C${r} = ${result} ✅\n\nTip: Hlukanisa izinombolo letincane kucala (5×4=20)!` }
  ];
  return { steps, result };
}

export const AITutorView: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', text: 'Sawubona! Ngingu NEXOVIAN Tutor. Bhala umbuzo wakho we-Maths (njenge 25C5) - ngitakuchazela ngesinyathelo ngesinyathelo njengasesithombeni!' }
  ]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState<Lang>('ss');
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const match = input.match(/(\d+)\s*C\s*(\d+)/i);
    if (match) {
      const n = parseInt(match[1]); const r = parseInt(match[2]);
      const solved = solveHandwritten(n, r, lang);
      const botMsg = { role: 'assistant', type: 'math-steps', text: `Solved ${n}C${r} in ${LANG_NAMES[lang]}:`, steps: solved.steps, final: solved.result };
      setTimeout(() => setMessages(prev => [...prev, botMsg]), 500);
    } else {
      const botMsg = { role: 'assistant', text: `[${LANG_NAMES[lang]}] Ngisacubungula: "${input}"\n\nNgitakunika:\n1. Ifomula\n2. Kufaka emananisi\n3. Kuchaza kancane kancane (njengasesithombeni)\n4. Imphendvulo yokugcina` };
      setTimeout(() => setMessages(prev => [...prev, botMsg]), 600);
    }
    setInput('');
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b p-3 flex items-center gap-2 overflow-x-auto">
        <Languages className="w-4 h-4 text-cyan-600" />
        <span className="text-xs font-bold">Solve in:</span>
        {Object.keys(LANG_NAMES).map((l) => (
          <button key={l} onClick={() => setLang(l as Lang)} className={`px-3 py-1 rounded-full text-xs font-bold ${lang === l ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600'}`}>{LANG_NAMES[l]}</button>
        ))}
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
        {messages.map((m, i) => (
          <div key={i} className={`${m.role === 'user' ? 'ml-auto bg-cyan-500 text-white' : 'mr-auto bg-white border'} max-w-[90%] rounded-2xl p-4 shadow-sm`}>
            {m.type === 'math-steps' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-cyan-700"><Calculator className="w-4 h-4" />{m.text}</div>
                {m.steps.map((s: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-3 border">
                    <div className="text-xs font-bold text-amber-600 uppercase">Step {idx + 1}: {s.title}</div>
                    <pre className="text-sm mt-1 whitespace-pre-wrap font-mono text-slate-800">{s.content}</pre>
                  </div>
                ))}
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center font-bold text-green-800 text-lg">= {m.final}</div>
              </div>
            ) : (<p className="text-sm whitespace-pre-wrap">{m.text}</p>)}
          </div>
        ))}
      </div>
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Bhala njenge: 25C5 noma 10C3" className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400" />
        <button onClick={handleSend} className="bg-cyan-500 hover:bg-cyan-600 text-white p-2.5 rounded-xl"><Send className="w-5 h-5" /></button>
      </div>
    </div>
  );
};