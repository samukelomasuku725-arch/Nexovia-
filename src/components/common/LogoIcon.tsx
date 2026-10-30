import React from 'react';

export interface LogoIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * NEXOVIAN Official LogoIcon Component
 * 
 * Specifications:
 * - Rounded square dark background #1e293b
 * - Large letter N in center with neon cyan stroke #00ffff with glow effect filter drop-shadow 0 0 8px #00ffff
 * - Inside the N, circuit lines and small brain icon at top left of N using paths and circles
 * - Small dots and lines to look like circuit board inside N
 * - Size: 40px x 40px, rounded corners 10px (rx="10")
 * - Glow on hover
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
          filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.75))',
        }}
      >
        <defs>
          {/* Neon Glow Filter */}
          <filter id="neonCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00ffff" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00ffff" floodOpacity="0.45" />
          </filter>

          {/* Hover Pulsing Glow */}
          <filter id="neonHoverGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#00ffff" floodOpacity="1" />
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.6" />
          </filter>

          {/* Inner N Gradient Fill */}
          <linearGradient id="innerNDark" x1="10" y1="9" x2="30" y2="31" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.98" />
          </linearGradient>

          {/* Circuit Line Gradient */}
          <linearGradient id="circuitCyanGrad" x1="10" y1="9" x2="30" y2="31" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* 1. Rounded Square Dark Background (#0A0F1F, 40x40, rounded 10px) */}
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          rx="10"
          fill="#0A0F1F"
          stroke="#00ffff"
          strokeWidth="1"
          strokeOpacity="0.4"
          className="transition-all duration-300 group-hover/logo:stroke-opacity-80 group-hover/logo:stroke-[#00ffff]"
        />

        {/* 2. Large Letter N in Center with Neon Cyan Stroke #00ffff and Glow */}
        {/* N Geometry Base with Inner Depth */}
        <path
          d="M 10 31 L 10 9 L 15 9 L 25 24 L 25 9 L 30 9 L 30 31 L 25 31 L 15 16 L 15 31 Z"
          fill="url(#innerNDark)"
          stroke="#00ffff"
          strokeWidth="1.6"
          strokeLinejoin="round"
          filter="url(#neonCyanGlow)"
          className="transition-all duration-300 group-hover/logo:brightness-125"
        />

        {/* 3. Small Brain Icon at Top Left of N using paths & circles */}
        <g id="miniBrainIcon" opacity="0.95">
          {/* Left Brain Hemisphere Convolutions */}
          <path
            d="M 12.5 10.5 C 11.2 10.5 10.8 11.4 10.8 12.2 C 10.8 13.0 11.4 13.5 12.3 13.6 C 11.4 13.9 11.0 14.5 11.2 15.2 C 11.4 15.8 12.0 16.2 12.8 16.0"
            fill="none"
            stroke="#00ffff"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Right Brain Hemisphere Convolutions */}
          <path
            d="M 12.7 10.5 C 13.8 10.5 14.3 11.4 14.2 12.2 C 14.2 13.0 13.6 13.5 12.7 13.6 C 13.6 13.9 14.0 14.5 13.8 15.2 C 13.6 15.8 13.0 16.2 12.4 16.0"
            fill="none"
            stroke="#00ffff"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Neural Synapse Nodes in Brain */}
          <circle cx="12.5" cy="11.8" r="0.75" fill="#00ffff" />
          <circle cx="11.6" cy="14.2" r="0.6" fill="#38bdf8" />
          <circle cx="13.4" cy="14.2" r="0.6" fill="#a855f7" />
          <line x1="12.5" y1="11.8" x2="11.6" y2="14.2" stroke="#00ffff" strokeWidth="0.5" strokeOpacity="0.8" />
          <line x1="12.5" y1="11.8" x2="13.4" y2="14.2" stroke="#00ffff" strokeWidth="0.5" strokeOpacity="0.8" />
        </g>

        {/* 4. Circuit Lines & Board Traces Inside N */}
        <g id="circuitBoardTraces" opacity="0.85">
          {/* Trace down the left stem from brain to bottom */}
          <path
            d="M 12.6 16.5 V 22 L 11.2 23.5 V 27 L 12.5 28.5 V 30"
            fill="none"
            stroke="url(#circuitCyanGrad)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Branch on left stem */}
          <path
            d="M 12.6 20 H 14.2"
            fill="none"
            stroke="#00ffff"
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* Trace along diagonal connector */}
          <path
            d="M 16 13.5 L 20 19.5 L 23.5 24.5"
            fill="none"
            stroke="#00ffff"
            strokeWidth="0.85"
            strokeDasharray="2.5 1"
            strokeLinecap="round"
          />
          {/* Diagonal circuit branch */}
          <path
            d="M 18.2 16.8 L 19.8 15.5 H 22"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.7"
            strokeLinecap="round"
          />

          {/* Trace on right stem */}
          <path
            d="M 27.5 10.5 V 15.5 L 28.8 17 V 23.5 L 27.5 25 V 29.5"
            fill="none"
            stroke="url(#circuitCyanGrad)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Horizontal circuit branches on right stem */}
          <path
            d="M 27.5 13.5 H 25.8"
            fill="none"
            stroke="#00ffff"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M 27.5 21 H 29"
            fill="none"
            stroke="#a855f7"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </g>

        {/* 5. Small Dots (Circuit Board Pads / Synapse Terminals) Inside N */}
        <g id="circuitDots">
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
        </g>

        {/* Outer Corner Micro Neon Accents */}
        <circle cx="3" cy="3" r="0.7" fill="#00ffff" opacity="0.5" />
        <circle cx="37" cy="3" r="0.7" fill="#a855f7" opacity="0.5" />
        <circle cx="3" cy="37" r="0.7" fill="#00ffff" opacity="0.5" />
        <circle cx="37" cy="37" r="0.7" fill="#a855f7" opacity="0.5" />
      </svg>
    </div>
  );
};

export default LogoIcon;
