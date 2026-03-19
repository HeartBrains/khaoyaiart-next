'use client';
// Re-exports shared language state for the landing page
import { useLanguageState, LanguageProvider, type Language } from '@/utils/languageContext';

export type { Language };
export { LanguageProvider };

export function useLanguage() {
  const { language, setLanguage } = useLanguageState();
  const t = (key: string) => key;
  return { language, setLanguage, t };
}
