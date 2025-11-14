import { createContext } from 'react';
import { portfolioData } from '../data/dataNew';

type Language = 'tr' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: (typeof portfolioData)[Language];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
