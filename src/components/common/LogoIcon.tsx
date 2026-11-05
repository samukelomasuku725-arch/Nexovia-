import React from 'react';

export interface LogoIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * NEXOVIAN Official LogoIcon Component (Authentic Dark #0F0F0F with #FACC15 Yellow Accents)
 * 
 * Specifications:
 * - Rounded square dark background #0F0F0F with 10px rounded corners (rx="10")
 * - Large letter N in center with vibrant glowing #FACC15 golden yellow stroke
 * - Circuit traces and neural brain icon inside the N
 * - Glow filter with #FACC15 and warm amber dropshadow
 */
export const LogoIcon: React.FC<LogoIconProps> = ({ className = '', size = 40, animated = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 cursor-pointer group/logo ${className}`}
      style={{ width: size, height: size }}
      title="NEXOVIAN"
      aria-label="NEXOVIAN Logo"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-all duration-300 transform group-hover/logo:scale-105"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.65))',
        }}
      >
        <defs>
          {/* Vibrant Yellow Glow Filter */}
          <filter id="neonYellowGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#FACC15" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#EAB308" floodOpacity="0.5" />
          </filter>

          {/* Inner N Gradient Fill */}
          <linearGradient id="innerNDark" x1="10" y1="9" x2="30" y2="31" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C1C1F" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0F0F0F" stopOpacity="0.98" />
          </linearGradient>

          {/* Circuit Line Gradient */}
          <linearGradient id="circuitYellowGrad" x1="10" y1="9" x2="30" y2="31" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* 1. Rounded Square Dark Background (#0F0F0F, 40x40, rounded 10px) */}
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          rx="10"
          fill="#0F0F0F"
          stroke="#FACC15"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          className="transition-all duration-300 group-hover/logo:stroke-opacity-100 group-hover/logo:stroke-[#FACC15]"
        />

        {/* 2. Large Letter N in Center with Glowing #FACC15 Yellow Stroke */}
        <path
          d="M 10 31 L 10 9 L 15 9 L 25 24 L 25 9 L 30 9 L 30 31 L 25 31 L 15 16 L 15 31 Z"
          fill="url(#innerNDark)"
          stroke="#FACC15"
          strokeWidth="1.6"
          strokeLinejoin="round"
          filter="url(#neonYellowGlow)"
          className="transition-all duration-300 group-hover/logo:brightness-125"
        />

        {/* 3. Small Brain Icon at Top Left of N */}
        <g id="miniBrainIcon" opacity="0.95">
          <path
            d="M 12.5 10.5 C 11.2 10.5 10.8 11.4 10.8 12.2 C 10.8 13.0 11.4 13.5 12.3 13.6 C 11.4 13.9 11.0 14.5 11.2 15.2 C 11.4 15.8 12.0 16.2 12.8 16.0"
            fill="none"
            stroke="#FACC15"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M 12.7 10.5 C 13.8 10.5 14.3 11.4 14.2 12.2 C 14.2 13.0 13.6 13.5 12.7 13.6 C 13.6 13.9 14.0 14.5 13.8 15.2 C 13.6 15.8 13.0 16.2 12.4 16.0"
            fill="none"
            stroke="#FACC15"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="12.5" cy="11.8" r="0.75" fill="#FACC15" />
          <circle cx="11.6" cy="14.2" r="0.6" fill="#FDE047" />
          <circle cx="13.4" cy="14.2" r="0.6" fill="#EAB308" />
          <line x1="12.5" y1="11.8" x2="11.6" y2="14.2" stroke="#FACC15" strokeWidth="0.5" strokeOpacity="0.8" />
          <line x1="12.5" y1="11.8" x2="13.4" y2="14.2" stroke="#FACC15" strokeWidth="0.5" strokeOpacity="0.8" />
        </g>

        {/* 4. Circuit Lines & Board Traces Inside N */}
        <g id="circuitBoardTraces" opacity="0.85">
          <path
            d="M 12.6 16.5 V 22 L 11.2 23.5 V 27 L 12.5 28.5 V 30"
            fill="none"
            stroke="url(#circuitYellowGrad)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 12.6 20 H 14.2"
            fill="none"
            stroke="#FACC15"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M 16 13.5 L 20 19.5 L 23.5 24.5"
            fill="none"
            stroke="#FACC15"
            strokeWidth="0.85"
            strokeDasharray="2.5 1"
            strokeLinecap="round"
          />
          <path
            d="M 18.2 16.8 L 19.8 15.5 H 22"
            fill="none"
            stroke="#FDE047"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <path
            d="M 27.5 10.5 V 15.5 L 28.8 17 V 23.5 L 27.5 25 V 29.5"
            fill="none"
            stroke="url(#circuitYellowGrad)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 27.5 13.5 H 25.8"
            fill="none"
            stroke="#FACC15"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M 27.5 21 H 29"
            fill="none"
            stroke="#EAB308"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </g>

        {/* 5. Circuit Dots */}
        <g id="circuitDots">
          <circle cx="14.2" cy="20" r="0.8" fill="#FACC15" />
          <circle cx="12.5" cy="30" r="0.8" fill="#FACC15" />
          <circle cx="11.2" cy="27" r="0.65" fill="#FDE047" />
          <circle cx="22" cy="15.5" r="0.75" fill="#FACC15" />
          <circle cx="20" cy="19.5" r="0.8" fill="#FDE047" />
          <circle cx="23.5" cy="24.5" r="0.8" fill="#EAB308" />
          <circle cx="25.8" cy="13.5" r="0.8" fill="#FACC15" />
          <circle cx="28.8" cy="17" r="0.65" fill="#FDE047" />
          <circle cx="29" cy="21" r="0.75" fill="#EAB308" />
          <circle cx="27.5" cy="29.5" r="0.8" fill="#FACC15" />
        </g>

        {/* Outer Corner Accents */}
        <circle cx="3" cy="3" r="0.7" fill="#FACC15" opacity="0.6" />
        <circle cx="37" cy="3" r="0.7" fill="#EAB308" opacity="0.6" />
        <circle cx="3" cy="37" r="0.7" fill="#FACC15" opacity="0.6" />
        <circle cx="37" cy="37" r="0.7" fill="#EAB308" opacity="0.6" />
      </svg>
    </div>
  );
};

export default LogoIcon;
