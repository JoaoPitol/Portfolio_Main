'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';
import VariableProximity from '@/components/ui/VariableProximity';

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

  // Shared coordinate origin for all VP instances
  const sectionRef = useRef<HTMLElement>(null);

  // Name has N chars — entry animation finishes at this delay
  const nameChars = personalInfo.name.length;
  const NAME_BASE_DELAY = 0.4;
  const NAME_STAGGER = 0.055;
  const nameEndDelay = NAME_BASE_DELAY + nameChars * NAME_STAGGER + 0.45;

  // Shared VP props for supporting text elements
  const vpProps = {
    containerRef: sectionRef as React.MutableRefObject<HTMLElement | null>,
    fromFontVariationSettings: "'wght' 400",  // 400 = legível em repouso
    toFontVariationSettings: "'wght' 900",    // 900 = efeito dramático no hover
    radius: 220,
    falloff: 'gaussian' as const,
  };

  return (
    <section
      ref={sectionRef}
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
          <VariableProximity
            label={language === 'pt' ? 'Olá, eu sou' : 'Hello, I am'}
            {...vpProps}
            radius={200}
          />
        </motion.p>

        {/*
          Name — combines inscription entry animation with variable proximity hover.
          animateEntry triggers the staggered slide-in; RAF handles the wght effect.
          The two effects target different CSS properties so they never conflict.
        */}
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
          <span className="sunset-gradient-text">
            <VariableProximity
              label={personalInfo.name}
              {...vpProps}
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 900"
              radius={260}
              animateEntry
              entryBaseDelay={NAME_BASE_DELAY}
              entryStagger={NAME_STAGGER}
            />
          </span>
        </h1>

        {/* Headline */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={nameEndDelay}
          className="mb-6 text-xl text-muted-foreground md:text-2xl"
        >
          <VariableProximity
            label={personalInfo.headline[language]}
            {...vpProps}
            radius={200}
          />
        </motion.p>

        {/* Description — word-level VP keeps DOM nodes manageable (~45 words vs ~280 chars) */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={nameEndDelay + 0.15}
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground/80"
        >
          <VariableProximity
            label={personalInfo.description[language]}
            containerRef={sectionRef as React.MutableRefObject<HTMLElement | null>}
            fromFontVariationSettings="'wght' 300"
            toFontVariationSettings="'wght' 650"
            radius={160}
            falloff="gaussian"
            splitBy="word"
          />
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={nameEndDelay + 0.35}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="sunset-gradient inline-block rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]"
          >
            {language === 'pt' ? 'Ver Projetos' : 'View Projects'}
          </a>

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
        transition={{ delay: nameEndDelay + 0.6, duration: 0.8 }}
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
