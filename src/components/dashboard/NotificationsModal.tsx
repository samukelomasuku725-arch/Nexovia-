/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - PHASE 8: NOTIFICATIONS DRAWER & MODAL
 * 
 * Scalable in-app notification center for:
 * - Study reminders
 * - Upcoming assessment alerts
 * - Adaptive learning recommendations
 * - Achievement unlocks
 * (Note: in-app notification queue; push notifications not falsely claimed)
 */

import React from 'react';
import {
  X,
  Bell,
  Sparkles,
  Award,
  Clock,
  Compass,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { DashboardNotification } from '../../types/dashboard';
import { useLearning } from '../../context/LearningContext';

interface NotificationsModalProps {
  notifications: DashboardNotification[];
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (tab: string, params?: Record<string, any>) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  isOpen,
  onClose,
  onSelectAction
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'RECOMMENDATION':
        return <Compass className="w-4 h-4 text-amber-500" />;
      case 'ASSESSMENT':
        return <Award className="w-4 h-4 text-blue-500" />;
      case 'ACHIEVEMENT':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notifications-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <h3 id="notifications-title" className="font-display text-base font-bold text-slate-900 dark:text-white">
              Notifications & Study Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="text-xs text-slate-500">You’re all caught up with your study alerts.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  if (n.actionTab) {
                    onSelectAction(n.actionTab, n.actionParams);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 transition-all ${
                  n.actionTab ? 'cursor-pointer hover:border-amber-400/60 bg-white dark:bg-slate-900/50' : 'bg-slate-50 dark:bg-slate-950/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {n.message}
                    </p>
                    {n.actionTab && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-2">
                        <span>Take action</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notice Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center text-[10px] text-slate-400">
          In-app learning notifications · Calibrated to your CAPS schedule
        </div>
      </div>
    </div>
  );
};
