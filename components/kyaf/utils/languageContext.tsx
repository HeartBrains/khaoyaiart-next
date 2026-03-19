'use client';
// Re-exports shared language state and adds site-specific translation helper
import { useLanguageState, LanguageProvider, type Language } from '@/utils/languageContext';
import { getTranslation } from './translations';

export type { Language };
export { LanguageProvider };

export function useLanguage() {
  const { language, setLanguage } = useLanguageState();
  const t = (key: string) => getTranslation(language, key);
  return { language, setLanguage, t };
}
