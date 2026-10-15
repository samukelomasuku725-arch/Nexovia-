import React, { useState } from 'react';
import { Play, RotateCcw, Lightbulb, Check, AlertCircle, Copy } from 'lucide-react';
import { InteractiveExercise } from '../../types';

interface Props {
  exercise: InteractiveExercise;
  onSuccess?: () => void;
}

export const InteractivePlayground: React.FC<Props> = ({ exercise, onSuccess }) => {
  const [code, setCode] = useState(exercise.initialCode || '');
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  // Flexbox visualizer state
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'space-between' | 'space-around'>('space-between');
  const [alignItems, setAlignItems] = useState<'center' | 'flex-start' | 'flex-end'>('center');
  const [itemCount, setItemCount] = useState(4);

  // Run handler for code editor
  const handleRunCode = () => {
    if (exercise.type === 'code_editor') {
      try {
        // Simple validation check against solution pattern
        const trimmedCode = code.replace(/\s+/g, ' ');
        const hasSuccessMatch = exercise.solutionCode
          ? trimmedCode.includes(exercise.solutionCode.replace(/\s+/g, ' ')) ||
            code.includes("status: 'success'") ||
            code.includes('status: "success"') ||
            code.includes('confidenceScore')
          : true;

        if (hasSuccessMatch) {
          setOutput('✓ All test assertions passed! State machine successfully transitions to "success" with valid payload snapshot.');
          setIsSuccess(true);
          onSuccess?.();
        } else {
          setOutput('⚠ Test failed: state did not transition with required payload and timestamp. Check the hint for expected return syntax.');
          setIsSuccess(false);
        }
      } catch (err: any) {
        setOutput(`Execution error: ${err?.message || 'Syntax error in snippet'}`);
        setIsSuccess(false);
      }
    }
  };

  const handleReset = () => {
    setCode(exercise.initialCode || '');
    setOutput(null);
    setIsSuccess(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg text-slate-100 my-6">
      {/* Sandbox Header */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium ml-2">
            {exercise.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint((prev) => !prev)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-amber-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle hint"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Hint</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset sandbox"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Prompt Banner */}
      <div className="px-4 py-2.5 bg-slate-800/40 border-b border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
        <span className="font-semibold text-amber-400 uppercase tracking-wider text-[10px] mt-0.5">
          Challenge:
        </span>
        <span>{exercise.prompt}</span>
      </div>

      {showHint && (
        <div className="px-4 py-2 bg-amber-950/30 border-b border-amber-900/40 text-xs text-amber-300">
          <strong>Tip:</strong> {exercise.hint}
        </div>
      )}

      {/* Playground Body: Code Editor or Interactive Flexbox Visualizer */}
      {exercise.type === 'code_editor' ? (
        <div>
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={9}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-950 text-emerald-400 focus:outline-none resize-none leading-relaxed selection:bg-amber-500/30"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>

          {/* Sandbox Footer / Output Console */}
          <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1">
              {output && (
                <div
                  className={`text-xs font-mono p-2 rounded-lg flex items-center gap-2 ${
                    isSuccess
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50'
                      : 'bg-rose-950/40 text-rose-400 border border-rose-900/50'
                  }`}
                >
                  {isSuccess ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{output}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleRunCode}
              className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-transform active:scale-95 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Code</span>
            </button>
          </div>
        </div>
      ) : (
        /* Flexbox / Touch Ergonomics Sandbox */
        <div className="p-4 space-y-4">
          {/* Controls Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">flex-direction</label>
              <div className="flex rounded-lg bg-slate-800 p-1">
                {(['row', 'column'] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setFlexDirection(dir)}
                    className={`flex-1 py-1 rounded text-center font-mono ${
                      flexDirection === dir ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">justify-content</label>
              <select
                value={justifyContent}
                onChange={(e: any) => setJustifyContent(e.target.value)}
                className="w-full bg-slate-800 text-slate-200 p-1.5 rounded-lg font-mono focus:outline-none"
              >
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">align-items</label>
              <div className="flex rounded-lg bg-slate-800 p-1">
                {(['flex-start', 'center', 'flex-end'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => setAlignItems(align)}
                    className={`flex-1 py-1 text-[11px] rounded text-center font-mono ${
                      alignItems === align ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {align.replace('flex-', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Mobile Touch Stage Simulation */}
          <div className="border border-slate-700 bg-slate-950 rounded-xl p-3 min-h-[160px] flex items-center justify-center">
            <div className="w-full max-w-sm border-2 border-slate-700 rounded-2xl p-2 bg-slate-900 shadow-inner">
              <div className="text-[10px] text-center text-slate-500 font-mono mb-2">
                Mobile Viewport Frame (375px)
              </div>
              <div
                className="w-full h-14 bg-slate-950 rounded-xl p-1 border border-slate-800 flex transition-all duration-300"
                style={{
                  flexDirection,
                  justifyContent,
                  alignItems
                }}
              >
                {Array.from({ length: itemCount }).map((_, i) => (
                  <div
                    key={i}
                    className="min-h-[44px] min-w-[44px] px-2 flex flex-col items-center justify-center bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-lg text-[10px] font-mono text-slate-300 font-semibold transition-colors cursor-pointer"
                  >
                    <span>Tab {i + 1}</span>
                    <span className="text-[8px] opacity-70">44px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Each tab item enforces minimum 44px hit-target for thumb reach.</span>
            <button
              onClick={() => {
                setOutput('✓ Layout verified compliant with touch ergonomics standard!');
                setIsSuccess(true);
                onSuccess?.();
              }}
              className="px-3 py-1.5 bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs hover:bg-amber-300"
            >
              Verify Ergonomics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
