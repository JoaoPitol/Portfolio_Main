'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function HeroSection() {
  const { language } = useLanguage();
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >


      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Greeting */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-4 text-lg tracking-wide text-muted-foreground"
        >
          {language === 'pt' ? 'Olá, eu sou' : 'Hello, I am'}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
        >
          <span className="sunset-gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Headline */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mb-6 text-xl text-muted-foreground md:text-2xl"
        >
          {personalInfo.headline[language]}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground/80"
        >
          {personalInfo.description[language]}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="sunset-gradient inline-block rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]"
          >
            {language === 'pt' ? 'Ver Projetos' : 'View Projects'}
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="glass inline-block rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:border-[var(--sunset-1)]"
          >
            {language === 'pt' ? 'Entrar em Contato' : 'Get in Touch'}
          </a>
        </motion.div>
      </div>

      {/* ── Scroll-down indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label={language === 'pt' ? 'Rolar para baixo' : 'Scroll down'}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground/60" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
