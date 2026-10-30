/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN MISSION HERO BANNER
 * 
 * Main message for Bushbuckridge and South Africa:
 * "No child is a slow learner.
 * Every child is fast in their own language.
 * NEXOVIAN teaches in 11 official languages."
 * 
 * Design specifications:
 * - Full width banner
 * - Background: dark gradient from #0f172a to #1e40af (blue-black)
 * - Centered text, white color
 * - Rounded corners 15px, padding 25px top/bottom, margin 20px
 * - Mobile responsive
 * - Yellow #facc15 bold 26px headline
 * - Light gray 14px 11 languages footer
 */

import React from 'react';

export const MissionHeroBanner: React.FC = () => {
  return (
    <aside
      aria-label="NEXOVIAN Mother Tongue Education Mission"
      className="relative overflow-hidden text-center text-white shadow-2xl transition-all"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #172554 50%, #1e40af 100%)',
        borderRadius: '15px',
        paddingTop: '25px',
        paddingBottom: '25px',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: '20px',
        boxShadow: '0 20px 40px -15px rgba(30, 64, 175, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
      }}
    >
      {/* Subtle decorative radiant glow for emotional impact */}
      <div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{ background: '#3b82f6' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{ background: '#facc15' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Line 1: No child is a slow learner. */}
        <p className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white leading-snug">
          No child is a slow learner.
        </p>

        {/* Line 2: Every child is fast in their own language. */}
        <p className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-white leading-snug mt-1">
          Every child is fast in their own language.
        </p>

        {/* Line 3 (bigger, bold, yellow #facc15, 26px): NEXOVIAN teaches in 11 official languages. */}
        <h1
          className="font-display font-extrabold tracking-tight mt-3 mb-3 leading-tight"
          style={{
            color: '#facc15',
            fontSize: 'clamp(20px, 4vw, 26px)',
            fontWeight: 800,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          NEXOVIAN teaches in 11 official languages.
        </h1>

        {/* Below that, smaller text (14px, light gray) */}
        <p
          className="font-normal tracking-wide leading-relaxed max-w-3xl px-2"
          style={{
            fontSize: '14px',
            color: '#cbd5e1'
          }}
        >
          Xitsonga • Sepedi • Sesotho • isiZulu • isiXhosa • Setswana • Siswati • Tshivenda • isiNdebele • English • Afrikaans
        </p>
      </div>
    </aside>
  );
};

export default MissionHeroBanner;
