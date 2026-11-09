import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const AboutPage: React.FC = () => {
  const { setCurrentTab } = useLearning();

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222] font-sans text-center relative pb-16">
      {/* Return Navigation */}
      <div className="bg-black/90 px-4 py-2.5 flex items-center justify-between text-xs text-white border-b border-gray-800">
        <button
          onClick={() => setCurrentTab('home')}
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAPS Official Curriculum</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-black text-white px-5 py-14 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-3">
          NEXOVIAN
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-200 mb-1">
          Grade 4 to University
        </p>
        <p className="text-lg sm:text-xl font-medium text-amber-400">
          11 South African Languages
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white max-w-[560px] mx-auto -mt-[30px] mb-8 p-6 sm:p-8 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center border border-gray-100/80">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          About Nexovian
        </h2>
        <div className="text-gray-700 text-sm leading-relaxed space-y-4 text-center">
          <p className="font-semibold text-gray-900">
            NEXOVIAN (PTY) LTD • Reg: 2026/845572/07 • Level 1 B-BBEE.
          </p>
          <p className="text-amber-600 font-medium font-mono text-xs uppercase tracking-wider">
            The Learning Brain That Grows With You.
          </p>
          <p>
            We help Grade 4 to University learners in South Africa study and pass with CAPS-aligned past papers, study materials, and a calculator that shows full working for full marks.
          </p>
          <p>
            Aligned with CAPS Grades 4-12, TVET DHET NATED programmes, and University frameworks across all 11 official languages.
          </p>
          <p className="font-medium text-gray-900">
            Price: R60 / 30 Days after 2-day free trial.
          </p>
          <div className="pt-2 border-t border-gray-100 text-xs text-gray-600 space-y-1">
            <p>Based in Mbombela, Mpumalanga, South Africa.</p>
            <p>
              Contact:{' '}
              <a
                href="mailto:samukelomasuku725@gmail.com"
                className="text-[#0077b6] hover:underline font-medium"
              >
                samukelomasuku725@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Features Footer */}
      <div className="max-w-md mx-auto px-4 text-xs text-gray-500 space-y-2">
        <p>No card deductions without confirmation • Cancel anytime</p>
        <p>Supports all 11 official South African languages, CAPS curriculum, TVET NATED, and University modules.</p>
        <p className="font-semibold text-gray-600">NEXOVIAN (PTY) LTD • Reg: 2026/845572/07 • Level 1 B-BBEE</p>
      </div>
    </div>
  );
};

export default AboutPage;
