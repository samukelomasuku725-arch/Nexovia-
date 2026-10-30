/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SALanguageCode, LanguageInfo, TranslationDictionary } from './types';
import { SA_LANGUAGES, TRANSLATIONS } from './translations';

interface I18nContextType {
  language: SALanguageCode;
  setLanguage: (lang: SALanguageCode) => void;
  languages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
  t: (key: keyof TranslationDictionary, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'nexovia_language';

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SALanguageCode>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang') as SALanguageCode;
        if (urlLang && (TRANSLATIONS[urlLang] || SA_LANGUAGES.some(l => l.code === urlLang))) {
          return urlLang;
        }
      }
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SALanguageCode;
      if (stored && TRANSLATIONS[stored]) {
        return stored;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  const setLanguage = (newLang: SALanguageCode) => {
    if (TRANSLATIONS[newLang] || SA_LANGUAGES.some(l => l.code === newLang)) {
      setLanguageState(newLang);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
        window.dispatchEvent(new CustomEvent('nexovia_language_changed', { detail: newLang }));
      } catch {
        // Ignore storage errors
      }
    }
  };

  // Sync when language is changed from LearningContext or other components
  useEffect(() => {
    const handleGlobalLang = (e: any) => {
      const lang = (e?.detail || localStorage.getItem(LANGUAGE_STORAGE_KEY)) as SALanguageCode;
      if (lang && lang !== language && (TRANSLATIONS[lang] || SA_LANGUAGES.some(l => l.code === lang))) {
        setLanguageState(lang);
      }
    };
    window.addEventListener('nexovia_language_changed', handleGlobalLang);
    window.addEventListener('storage', handleGlobalLang);
    return () => {
      window.removeEventListener('nexovia_language_changed', handleGlobalLang);
      window.removeEventListener('storage', handleGlobalLang);
    };
  }, [language]);

  const currentLanguageInfo = useMemo(() => {
    return SA_LANGUAGES.find(l => l.code === language) || SA_LANGUAGES[0];
  }, [language]);

  const t = useMemo(() => {
    return (key: keyof TranslationDictionary, params?: Record<string, string | number>): string => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
      let text = dict[key] || TRANSLATIONS.en[key] || String(key);
      if (params) {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          text = text.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramVal));
        });
      }
      return text;
    };
  }, [language]);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        languages: SA_LANGUAGES,
        currentLanguageInfo,
        t
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
