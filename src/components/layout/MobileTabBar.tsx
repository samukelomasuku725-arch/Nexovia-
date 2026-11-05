import React, { useState } from 'react';
import { Home, BookOpen, Sparkles, Mic, TrendingUp, Layers } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { MoreToolsModal } from './MoreToolsModal';

export const MobileTabBar: React.FC = () => {
  const { currentTab, setCurrentTab } = useLearning();
  const { t } = useTranslation();
  const [isMoreToolsOpen, setIsMoreToolsOpen] = useState(false);

  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home,
      isActive: currentTab === 'home' || currentTab === 'dashboard',
      action: () => setCurrentTab('home')
    },
    {
      id: 'learn' as const,
      label: 'Learn',
      icon: BookOpen,
      isActive: currentTab === 'learn' || currentTab === 'school' || currentTab === 'tvet' || currentTab === 'higherEd',
      action: () => setCurrentTab('learn')
    },
    {
      id: 'tutor' as const,
      label: 'AI Tutor',
      icon: Sparkles,
      isActive: currentTab === 'tutor',
      action: () => setCurrentTab('tutor')
    },
    {
      id: 'academicVoice' as const,
      label: 'Voice Docs',
      icon: Mic,
      isActive: currentTab === 'academicVoice',
      action: () => setCurrentTab('academicVoice')
    },
    {
      id: 'progress' as const,
      label: 'Progress',
      icon: TrendingUp,
      isActive: currentTab === 'progress',
      action: () => setCurrentTab('progress')
    },
    {
      id: 'more' as const,
      label: 'More',
      icon: Layers,
      isActive: isMoreToolsOpen,
      action: () => setIsMoreToolsOpen(true)
    }
  ];

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F0F]/95 backdrop-blur-lg border-t border-[#262626] pb-safe transition-colors shadow-2xl w-full max-w-full overflow-hidden"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="grid grid-cols-6 h-16 items-center px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.isActive;

            return (
              <button
                key={tab.id}
                onClick={tab.action}
                className="flex flex-col items-center justify-center min-h-[48px] min-w-[44px] py-1 text-center select-none active:scale-95 transition-transform cursor-pointer"
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? 'text-[#FACC15] stroke-[2.25] drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
                        : 'text-slate-500'
                    }`}
                  />
                </div>
                <span
                  className={`text-[9.5px] font-medium tracking-tight mt-1 truncate max-w-[50px] transition-colors ${
                    isActive
                      ? 'text-[#FACC15] font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full mt-0.5 shadow-[0_0_8px_#FACC15]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* More Tools Modal */}
      <MoreToolsModal
        isOpen={isMoreToolsOpen}
        onClose={() => setIsMoreToolsOpen(false)}
        onOpenProfile={() => setCurrentTab('profile')}
      />
    </>
  );
};
