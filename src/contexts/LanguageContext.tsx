import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { portfolioData } from '../data/dataNew';
import { LanguageContext } from './languageContextDefinition';
import type { LanguageContextType } from './languageContextDefinition';

type Language = 'tr' | 'en';

// Re-export for convenience
export { LanguageContext };
export type { LanguageContextType };

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'tr');
  const data = portfolioData[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data }}>
      {children}
    </LanguageContext.Provider>
  );
}