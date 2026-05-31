'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { aboutText, stats } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';
import VariableProximity from '@/components/ui/VariableProximity';

/* ── Counter hook — animate from 0 → target when visible ── */
function useCounter(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = target / (duration / 16);
    let raf: number;

    const step = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return count;
}

/* ── Stat Card ── */
function StatCard({
  label,
  value,
  suffix,
  index,
}: {
  label: string;
  value: number;
  suffix: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCounter(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ scale: 1.04 }}
      className="glass rounded-2xl p-6 text-center transition-shadow duration-300 hover:sunset-glow"
    >
      <span className="sunset-gradient-text text-3xl font-bold md:text-4xl">
        {count}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

/* ── About Section ── */
export default function AboutSection() {
  const { language } = useLanguage();

  // Coordinate origin for all VP instances in this section
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            {language === 'pt' ? 'Sobre Mim' : 'About Me'}
          </h2>
          <div className="sunset-gradient mx-auto mt-4 h-1 w-20 rounded-full" />
        </motion.div>

        {/* Grid */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — paragraphs with word-level Variable Proximity */}
          <div className="space-y-6">
            {aboutText[language].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: 'easeOut' }}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                <VariableProximity
                  label={paragraph}
                  containerRef={sectionRef as React.MutableRefObject<HTMLElement | null>}
                  fromFontVariationSettings="'wght' 300"
                  toFontVariationSettings="'wght' 650"
                  radius={180}
                  falloff="gaussian"
                  splitBy="word"
                />
              </motion.p>
            ))}
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                label={stat.label[language]}
                value={stat.value}
                suffix={stat.suffix}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
