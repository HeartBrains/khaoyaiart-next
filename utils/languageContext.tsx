'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from './translations';

export type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageState() {
  return useContext(LanguageContext);
}

export function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = (key: string): string =>
    (translations[language] as Record<string, string>)?.[key] ?? key;
  return { language, setLanguage, t };
}
