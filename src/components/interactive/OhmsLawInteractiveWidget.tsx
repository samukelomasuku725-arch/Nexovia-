import React, { useState } from 'react';
import { Zap, HelpCircle, ChevronDown, ChevronUp, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

interface OhmsLawInteractiveWidgetProps {
  initialVoltage?: number;
  initialResistance?: number;
  className?: string;
}

export const OhmsLawInteractiveWidget: React.FC<OhmsLawInteractiveWidgetProps> = ({
  initialVoltage = 6,
  initialResistance = 2,
  className = ''
}) => {
  const [voltage, setVoltage] = useState<number>(initialVoltage);
  const [resistance, setResistance] = useState<number>(initialResistance);
  const [switchClosed, setSwitchClosed] = useState<boolean>(true);
  const [showSocraticAnswer, setShowSocraticAnswer] = useState<boolean>(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'zu'>('en');

  // Calculate live current: I = V / R (when switch is closed)
  const current = switchClosed ? voltage / (resistance || 1) : 0;

  // Animation speed for electrons proportional to current
  const electronSpeed = switchClosed && current > 0 ? Math.max(0.6, 3 / current) : 0;

  return (
    <div className={`mt-4 w-full max-w-full rounded-2xl bg-slate-900 border border-cyan-500/30 overflow-hidden shadow-lg ${className}`}>
      {/* Header Badge */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                CAPS Grade 11 & 12 Physics Aligned
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">·</span>
              <span className="text-xs text-purple-300 font-mono hidden sm:inline">Electric Circuits</span>
            </div>
            <h4 className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
              Interactive Ohm's Law Circuit Simulation (V = I × R)
            </h4>
          </div>
        </div>

        {/* Language Toggle for Dual Explanation */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/90 rounded-xl border border-slate-700/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveLangTab('en')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLangTab === 'en'
                ? 'bg-cyan-500 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('zu')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLangTab === 'zu'
                ? 'bg-purple-500 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            isiZulu
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* 1. INTERACTIVE CIRCUIT DIAGRAM (SVG) */}
        <div className="relative rounded-2xl bg-slate-950 border border-slate-800/90 p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono text-cyan-400 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${switchClosed ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
              Circuit Status: <strong>{switchClosed ? 'CLOSED (Current Active)' : 'OPEN (Zero Current)'}</strong>
            </span>
            <button
              type="button"
              onClick={() => setSwitchClosed(!switchClosed)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                switchClosed
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
              }`}
            >
              Toggle Switch ({switchClosed ? 'Open' : 'Close'})
            </button>
          </div>

          {/* Circuit SVG Graphic */}
          <div className="w-full max-w-lg aspect-[16/9] relative">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00ffff" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Connecting Wires (Main Loop) */}
              <rect
                x="50"
                y="30"
                width="300"
                height="160"
                rx="16"
                stroke={switchClosed && current > 0 ? '#00ffff' : '#334155'}
                strokeWidth="3.5"
                filter={switchClosed && current > 0 ? 'url(#circuitGlow)' : undefined}
                className="transition-colors duration-300"
              />

              {/* TOP: Resistor Component */}
              <g transform="translate(160, 16)">
                {/* Clear wire break behind resistor */}
                <rect x="0" y="5" width="80" height="20" fill="#020617" />
                {/* Resistor IEC Zigzag Symbol */}
                <path
                  d="M 0 14 L 15 14 L 22 2 L 32 26 L 42 2 L 52 26 L 62 2 L 68 14 L 80 14"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="40" y="-2" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  Resistor (R = {resistance} Ω)
                </text>
              </g>

              {/* BOTTOM: DC Battery / Voltage Source */}
              <g transform="translate(160, 175)">
                {/* Clear wire break behind battery */}
                <rect x="0" y="5" width="80" height="24" fill="#020617" />
                {/* Long bar (Positive +) */}
                <line x1="28" y1="2" x2="28" y2="28" stroke="#00ffff" strokeWidth="3.5" strokeLinecap="round" />
                <text x="20" y="8" fill="#00ffff" fontSize="13" fontWeight="bold">+</text>
                {/* Short thick bar (Negative -) */}
                <line x1="52" y1="8" x2="52" y2="22" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
                <text x="60" y="8" fill="#a855f7" fontSize="13" fontWeight="bold">-</text>
                {/* Leads */}
                <line x1="0" y1="15" x2="28" y2="15" stroke="#00ffff" strokeWidth="3" />
                <line x1="52" y1="15" x2="80" y2="15" stroke="#a855f7" strokeWidth="3" />
                <text x="40" y="44" fill="#00ffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  Battery (V = {voltage} V)
                </text>
              </g>

              {/* LEFT: Switch Component */}
              <g transform="translate(36, 80)">
                <rect x="6" y="0" width="16" height="60" fill="#020617" />
                {/* Contact terminals */}
                <circle cx="14" cy="10" r="3.5" fill="#00ffff" />
                <circle cx="14" cy="50" r="3.5" fill="#00ffff" />
                {/* Switch lever */}
                {switchClosed ? (
                  <line x1="14" y1="10" x2="14" y2="50" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
                ) : (
                  <line x1="14" y1="50" x2="28" y2="18" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
                )}
                <text x="-12" y="34" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                  Switch {switchClosed ? 'Closed' : 'Open'}
                </text>
              </g>

              {/* RIGHT: Ammeter Gauge / Current Monitor */}
              <g transform="translate(325, 80)">
                <rect x="15" y="0" width="20" height="60" fill="#020617" />
                <circle cx="25" cy="30" r="18" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
                <text x="25" y="35" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">A</text>
                <text x="25" y="60" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {current.toFixed(2)} A
                </text>
              </g>
            </svg>
          </div>

          {/* Live Meter Readout Strip */}
          <div className="w-full mt-3 grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block font-mono">VOLTAGE (V)</span>
              <span className="text-sm sm:text-base font-bold text-cyan-300 font-mono">{voltage.toFixed(1)} V</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30">
              <span className="text-[10px] text-slate-400 block font-mono">RESISTANCE (R)</span>
              <span className="text-sm sm:text-base font-bold text-purple-300 font-mono">{resistance.toFixed(1)} Ω</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 block font-mono">CURRENT (I = V / R)</span>
              <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">{current.toFixed(2)} A</span>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE VOLTAGE SLIDER (0 - 12V) */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <label htmlFor="voltage-slider" className="font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Adjust Voltage (0 to 12 Volts):</span>
              </label>
              <span className="font-mono text-cyan-300 font-bold text-sm bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                {voltage.toFixed(1)} V
              </span>
            </div>
            <input
              id="voltage-slider"
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0V (Off)</span>
              <span>3V</span>
              <span>6V (Example)</span>
              <span>9V</span>
              <span>12V (Max)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <label htmlFor="resistance-slider" className="font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>Adjust Resistor (1 to 10 Ohms):</span>
              </label>
              <span className="font-mono text-purple-300 font-bold text-sm bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                {resistance.toFixed(1)} Ω
              </span>
            </div>
            <input
              id="resistance-slider"
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={resistance}
              onChange={(e) => setResistance(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>1Ω</span>
              <span>2Ω (Default)</span>
              <span>4Ω (Doubled)</span>
              <span>6Ω</span>
              <span>10Ω</span>
            </div>
          </div>
        </div>

        {/* 3. CAPS EXAM VERIFIED EXAMPLE CARD */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 to-slate-900 border border-cyan-500/30 flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm">
            <strong className="text-white block font-bold mb-0.5">
              CAPS Worked Example (Electric Circuits):
            </strong>
            <p className="text-slate-300 leading-relaxed">
              If resistance <span className="font-mono text-purple-300 font-bold">R = 2 Ω</span> and voltage{' '}
              <span className="font-mono text-cyan-300 font-bold">V = 6 V</span>:
            </p>
            <div className="mt-1.5 p-2 rounded-lg bg-slate-950/80 font-mono text-xs text-emerald-300 inline-block border border-emerald-500/30">
              I = V / R = 6V / 2Ω = <strong>3.00 A</strong>
            </div>
            <span className="block mt-1 text-[11px] text-slate-400">
              Drag the voltage slider above to 6.0 V and resistor slider to 2.0 Ω to see this exact state simulated!
            </span>
          </div>
        </div>

        {/* 4. DUAL LANGUAGE EXPLANATION (English + isiZulu) */}
        {activeLangTab === 'en' ? (
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-300">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400">
              Simple English Explanation
            </h5>
            <p>
              Ohm's Law expresses the fundamental link between electricity's three core measurements:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-cyan-300">Voltage (V, Volts):</strong> The electrical pressure pushing electrons through the circuit (like water pressure from a pump).
              </li>
              <li>
                <strong className="text-emerald-400">Current (I, Amperes):</strong> The rate at which electric charge actually flows past a point (like the volume of water moving per second).
              </li>
              <li>
                <strong className="text-purple-300">Resistance (R, Ohms / Ω):</strong> The conductor's opposition to current flow (like friction or narrowing in the hose).
              </li>
            </ul>
            <p className="text-[11px] text-slate-400 italic">
              <strong>Core Law:</strong> At constant temperature, current is directly proportional to voltage (<span className="font-mono">I ∝ V</span>) and inversely proportional to resistance (<span className="font-mono">I ∝ 1/R</span>).
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-300">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-purple-400">
              Incazelo Nge-isiZulu (isiZulu Translation)
            </h5>
            <p>
              <strong>Umthetho ka-Ohm (Ohm's Law)</strong> uchaza ubudlelwano phakathi kwe-Voltage, Current kanye ne-Resistance:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-center text-sm font-bold text-cyan-300 border border-cyan-500/20">
              V = I × R &nbsp;|&nbsp; I = V / R
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <strong className="text-cyan-300">Voltage (V):</strong> Amandla acindezela ugesi ukuba uhambe phakathi kwentambo (alinganiswa ngama-Volts).
              </li>
              <li>
                <strong className="text-emerald-400">Current (I):</strong> Isivinini sokugeleza kwezigesi ngomzuzwana (kulinganiswa ngama-Amperes).
              </li>
              <li>
                <strong className="text-purple-300">Resistance (R):</strong> Ukuphikiswa kokuhamba kukagesi (kulinganiswa ngama-Ohms, Ω).
              </li>
            </ul>
            <p className="text-xs text-slate-400">
              <strong>Isibonelo Esilula:</strong> Uma i-Resistance ingu-2Ω kanti i-Voltage ingu-6V, i-Current iba ngu-3A. Uma ukhuphula i-Voltage, i-Current iyakhula. Uma ukhuphula i-Resistance, i-Current iyancipha.
            </p>
          </div>
        )}

        {/* 5. SOCRATIC QUESTION AT END */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 to-slate-900 border border-purple-500/40 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Socratic Thinking Challenge:</span>
          </div>

          <h5 className="font-display text-sm sm:text-base font-bold text-white leading-snug">
            &ldquo;If resistance doubles, what happens to current?&rdquo;
          </h5>

          <p className="text-xs text-slate-300 leading-relaxed">
            Consider a circuit with constant voltage <span className="font-mono text-cyan-300">V</span>. If the resistor is swapped from <span className="font-mono text-purple-300">2 Ω</span> to <span className="font-mono text-purple-300">4 Ω</span>, how does the current respond?
          </p>

          <button
            type="button"
            onClick={() => setShowSocraticAnswer(!showSocraticAnswer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-500/40 transition-colors"
          >
            <span>{showSocraticAnswer ? 'Hide Socratic Explanation' : 'Reveal Socratic Explanation & Proof'}</span>
            {showSocraticAnswer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSocraticAnswer && (
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-purple-500/30 text-xs sm:text-sm text-slate-200 space-y-2 animate-fadeIn">
              <p className="font-semibold text-emerald-400">
                ✓ Answer: The current is halved (divided by 2).
              </p>
              <p className="text-slate-300 leading-relaxed">
                <strong>Mathematical Proof:</strong> From Ohm's Law, <span className="font-mono text-cyan-300">I = V / R</span>. Current <span className="font-mono">I</span> is inversely proportional to resistance <span className="font-mono">R</span>.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-xs text-purple-300">
                I_new = V / (2R) = 0.5 × (V / R) = I_initial / 2
              </div>
              <p className="text-[11px] text-slate-400">
                <em>Try it on the sliders above:</em> Keep voltage at 6V. Set R = 2Ω (I = 3A). Now slide R to 4Ω (double) — notice current immediately drops to <strong>1.50 A</strong>!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OhmsLawInteractiveWidget;
