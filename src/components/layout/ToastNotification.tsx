/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - UNIFIED FEEDBACK & CONFIRMATION NOTIFICATION
 * 
 * Accessible, mobile-friendly confirmation and error banners:
 * - Clear text messages
 * - Visual status icons (success, warning, info, error)
 * - Auto-dismiss and manual dismiss
 * - Positioned cleanly on mobile without blocking navigation
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  durationMs?: number;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType, durationMs?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: ToastType = 'success', durationMs: number = 3500) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastMessage = { id, type, title, message, durationMs };

      setToasts((prev) => [...prev.slice(-2), newToast]);

      if (durationMs > 0) {
        setTimeout(() => {
          hideToast(id);
        }, durationMs);
      }
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Toast Notification Container */}
      <div
        className="fixed top-16 sm:top-20 right-0 left-0 sm:left-auto sm:right-6 z-50 flex flex-col gap-2 p-4 pointer-events-none max-w-md mx-auto sm:mx-0"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const isWarning = toast.type === 'warning';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl shadow-xl border transition-all animate-in slide-in-from-top-2 duration-200 ${
                isSuccess
                  ? 'bg-slate-900 dark:bg-slate-900 text-white border-emerald-500/50 shadow-emerald-500/10'
                  : isError
                  ? 'bg-rose-950 text-white border-rose-500/50 shadow-rose-500/10'
                  : isWarning
                  ? 'bg-amber-950 text-amber-100 border-amber-500/50 shadow-amber-500/10'
                  : 'bg-slate-900 text-white border-blue-500/50 shadow-blue-500/10'
              }`}
              role="alert"
            >
              <div className="shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-blue-400" />}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <span className="block text-xs sm:text-sm font-bold truncate">{toast.title}</span>
                {toast.message && (
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
                )}
              </div>

              <button
                onClick={() => hideToast(toast.id)}
                className="shrink-0 p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
                aria-label="Dismiss message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      showToast: () => {},
      hideToast: () => {}
    };
  }
  return context;
};
