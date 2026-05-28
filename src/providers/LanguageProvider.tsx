'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      const saved = localStorage.getItem('portfolio-language') as Language;
      if (saved === 'pt' || saved === 'en') {
        setLanguageState(saved);
      } else {
        // Tenta detectar o idioma padrão do navegador
        const systemLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
        setLanguageState(systemLang);
      }
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser utilizado dentro de um LanguageProvider');
  }
  return context;
}
