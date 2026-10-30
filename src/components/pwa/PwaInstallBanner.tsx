import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const PwaInstallBanner: React.FC = () => {
  const { isPwaPromptOpen, setIsPwaPromptOpen, isOffline } = useLearning();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!isPwaPromptOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Show manual fallback prompt
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={() => setIsPwaPromptOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
          aria-label="Close install dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950 dark:bg-amber-500 text-amber-400 dark:text-slate-950 flex items-center justify-center text-xl font-bold shadow-md">
            ✦
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Install Nexovian
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Native Android & Desktop PWA Experience
            </p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-2.5 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Instant launch from your Android home screen with zero browser bars.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Full offline reading and cached interactive sandboxes.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Lightweight footprint (&lt; 2MB) with battery-conscious dark mode.</span>
          </div>
        </div>

        {/* Android Installation Instructions */}
        <div className="my-4 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <span className="font-bold text-slate-900 dark:text-white block mb-1">
            Android Chrome Quick Install:
          </span>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
            <li>Tap the browser menu icon (<strong>⋮</strong>) in the top-right corner.</li>
            <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
            <li>Launch directly from your app drawer anytime!</li>
          </ol>
        </div>

        {/* Connection status */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-5">
          <div className="flex items-center gap-1.5">
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                <span>Currently Offline (Local Cache Active)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span>Online & Synchronized</span>
              </>
            )}
          </div>
          <span>v2.4 PWA Ready</span>
        </div>

        {/* Primary Action Button */}
        {deferredPrompt ? (
          <button
            onClick={handleInstallClick}
            className="w-full flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-transform active:scale-98 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Install Nexovian Now</span>
          </button>
        ) : (
          <button
            onClick={() => setIsPwaPromptOpen(false)}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors"
          >
            Got it, thanks!
          </button>
        )}
      </div>
    </div>
  );
};
