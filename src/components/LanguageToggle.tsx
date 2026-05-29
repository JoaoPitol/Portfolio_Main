'use client';

import { useLanguage } from '@/providers/LanguageProvider';
import { motion, AnimatePresence } from 'motion/react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent transition-colors cursor-pointer text-sm font-semibold border border-transparent hover:border-border"
      aria-label="Alternar idioma / Switch language"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={language}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="sunset-gradient-text font-bold"
        >
          {language === 'pt' ? 'PT' : 'EN'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
