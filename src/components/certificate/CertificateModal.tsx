import React from 'react';
import { X, Printer, ShieldCheck, Download, Award, Check } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const CertificateModal: React.FC = () => {
  const { certificateToView, setCertificateToView } = useLearning();

  if (!certificateToView) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-auto">
        {/* Modal Controls Bar */}
        <div className="px-6 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Digital Credential Verification</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setCertificateToView(null)}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 border-[12px] border-slate-100 relative select-none">
          {/* Outer Border Inset */}
          <div className="border-2 border-amber-600/30 p-8 sm:p-10 relative">
            {/* Corner Filigrees */}
            <div className="absolute top-2 left-2 text-amber-600/50 text-xs">✦</div>
            <div className="absolute top-2 right-2 text-amber-600/50 text-xs">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-600/50 text-xs">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-600/50 text-xs">✦</div>

            {/* Header Brand */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl text-amber-500 font-bold">✦</span>
                <span className="font-display text-2xl font-bold tracking-tight text-slate-900 uppercase">
                  Nexovian
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">
                Learn today. Build tomorrow.
              </p>
            </div>

            {/* Title Statement */}
            <div className="text-center my-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-slate-500 block mb-2">
                This is to officially certify that
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 border-b-2 border-amber-400 pb-2 inline-block max-w-md">
                {certificateToView.studentName}
              </h2>
              <span className="text-xs text-slate-600 block mt-4 max-w-md mx-auto">
                has rigorously fulfilled all curriculum requirements, hands-on architectural labs, and comprehensive knowledge assessments for:
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-700 mt-2">
                {certificateToView.trackTitle}
              </h3>
            </div>

            {/* Metadata Footer: Date, Signature, Seal, Hash */}
            <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 items-end text-center">
              <div>
                <span className="font-mono text-xs block text-slate-800 font-semibold">
                  {certificateToView.issueDate}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                  Issue Date
                </span>
              </div>

              {/* Digital Seal */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-50 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-7 h-7 text-amber-600" />
                </div>
                <span className="text-[9px] text-amber-700 font-mono mt-1 font-bold tracking-wider uppercase">
                  Verified Grade
                </span>
              </div>

              <div>
                <span className="font-serif italic text-sm text-slate-800 block">
                  {certificateToView.instructorName}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                  Lead Engineering Architect
                </span>
              </div>
            </div>

            {/* Verification Hash Bar */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
              <span>CREDENTIAL ID: {certificateToView.id}</span>
              <span className="truncate max-w-[280px]">VERIFICATION HASH: {certificateToView.verificationHash}</span>
              <span>NEXOVIAN.DEV/VERIFY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
