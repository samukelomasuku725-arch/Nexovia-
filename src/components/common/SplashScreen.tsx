import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
  minDisplayTime?: number;
}

/**
 * NEXOVIAN Official App Splash Screen
 * 
 * Specifications:
 * - Dark background #0A0F1F
 * - Glowing N centered with neon cyan #00ffff stroke & circuit lines/brain
 * - Smooth fade transition into the app
 */
export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  minDisplayTime = 1200
}) => {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 500); // 500ms fade transition
      return () => clearTimeout(exitTimer);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0F1F] transition-opacity duration-500 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="NEXOVIAN Initializing"
    >
      {/* Background Neural Synapse Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse" />
        <div className="w-[380px] h-[380px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Centered Glowing N Container */}
      <div className="relative flex flex-col items-center justify-center z-10 px-6 text-center">
        {/* Glowing N Badge */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#0A0F1F] border border-cyan-400/60 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,255,0.45)] animate-pulse">
          <svg
            viewBox="0 0 40 40"
            className="w-20 h-20 sm:w-24 sm:h-24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="splashReactNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00ffff" floodOpacity="0.95" />
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00ffff" floodOpacity="0.5" />
              </filter>
              <linearGradient id="splashCircuitGradReact" x1="10" y1="9" x2="30" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="splashInnerNDarkReact" x1="10" y1="9" x2="30" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#090d16" stopOpacity="0.98" />
              </linearGradient>
            </defs>

            {/* Inner N Geometry */}
            <path
              d="M 10 31 L 10 9 L 15 9 L 25 24 L 25 9 L 30 9 L 30 31 L 25 31 L 15 16 L 15 31 Z"
              fill="url(#splashInnerNDarkReact)"
              stroke="#00ffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
              filter="url(#splashReactNeonGlow)"
            />

            {/* Mini Brain Icon at Top Left of N */}
            <g id="miniBrainSplash" opacity="0.95">
              <path
                d="M 12.5 10.5 C 11.2 10.5 10.8 11.4 10.8 12.2 C 10.8 13.0 11.4 13.5 12.3 13.6 C 11.4 13.9 11.0 14.5 11.2 15.2 C 11.4 15.8 12.0 16.2 12.8 16.0"
                fill="none"
                stroke="#00ffff"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M 12.7 10.5 C 13.8 10.5 14.3 11.4 14.2 12.2 C 14.2 13.0 13.6 13.5 12.7 13.6 C 13.6 13.9 14.0 14.5 13.8 15.2 C 13.6 15.8 13.0 16.2 12.4 16.0"
                fill="none"
                stroke="#00ffff"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <circle cx="12.5" cy="11.8" r="0.75" fill="#00ffff" />
              <circle cx="11.6" cy="14.2" r="0.6" fill="#38bdf8" />
              <circle cx="13.4" cy="14.2" r="0.6" fill="#a855f7" />
              <line x1="12.5" y1="11.8" x2="11.6" y2="14.2" stroke="#00ffff" strokeWidth="0.5" strokeOpacity="0.8" />
              <line x1="12.5" y1="11.8" x2="13.4" y2="14.2" stroke="#00ffff" strokeWidth="0.5" strokeOpacity="0.8" />
            </g>

            {/* Circuit Board Traces */}
            <g opacity="0.85">
              <path
                d="M 12.6 16.5 V 22 L 11.2 23.5 V 27 L 12.5 28.5 V 30"
                fill="none"
                stroke="url(#splashCircuitGradReact)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M 12.6 20 H 14.2" fill="none" stroke="#00ffff" strokeWidth="0.75" strokeLinecap="round" />
              <path d="M 16 13.5 L 20 19.5 L 23.5 24.5" fill="none" stroke="#00ffff" strokeWidth="0.85" strokeDasharray="2.5 1" strokeLinecap="round" />
              <path d="M 18.2 16.8 L 19.8 15.5 H 22" fill="none" stroke="#38bdf8" strokeWidth="0.7" strokeLinecap="round" />
              <path d="M 27.5 10.5 V 15.5 L 28.8 17 V 23.5 L 27.5 25 V 29.5" fill="none" stroke="url(#splashCircuitGradReact)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 27.5 13.5 H 25.8" fill="none" stroke="#00ffff" strokeWidth="0.75" strokeLinecap="round" />
              <path d="M 27.5 21 H 29" fill="none" stroke="#a855f7" strokeWidth="0.75" strokeLinecap="round" />
            </g>

            {/* Circuit Terminal Dots */}
            <circle cx="14.2" cy="20" r="0.8" fill="#00ffff" />
            <circle cx="12.5" cy="30" r="0.8" fill="#00ffff" />
            <circle cx="11.2" cy="27" r="0.65" fill="#38bdf8" />
            <circle cx="22" cy="15.5" r="0.75" fill="#00ffff" />
            <circle cx="20" cy="19.5" r="0.8" fill="#38bdf8" />
            <circle cx="23.5" cy="24.5" r="0.8" fill="#a855f7" />
            <circle cx="25.8" cy="13.5" r="0.8" fill="#00ffff" />
            <circle cx="28.8" cy="17" r="0.65" fill="#38bdf8" />
            <circle cx="29" cy="21" r="0.75" fill="#a855f7" />
            <circle cx="27.5" cy="29.5" r="0.8" fill="#00ffff" />
          </svg>
        </div>

        {/* Wordmark and Tagline */}
        <div className="mt-6 flex flex-col items-center">
          <h1 className="font-display text-2xl sm:text-3xl font-black tracking-widest bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-400 bg-clip-text text-transparent">
            NEXOVIAN
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-mono tracking-tight text-cyan-400/90 font-medium">
            The Learning Brain That Grows With You
          </p>

          {/* Futuristic Loading Synapse Indicator */}
          <div className="mt-6 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse delay-75" />
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-150" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
