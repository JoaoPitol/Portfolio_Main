'use client';

import { motion } from 'motion/react';
import { MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { timeline } from '@/lib/data';
import type { TimelineItem } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';

/* ── Type badge config ── */
const typeMeta: Record<
  TimelineItem['type'],
  { label: { pt: string; en: string }; icon: typeof Briefcase; color: string; bg: string }
> = {
  work: {
    label: { pt: 'Trabalho', en: 'Work' },
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  education: {
    label: { pt: 'Educação', en: 'Education' },
    icon: GraduationCap,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  certification: {
    label: { pt: 'Certificação', en: 'Certification' },
    icon: Award,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
};

/* ── Single timeline card ── */
function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const { language } = useLanguage();
  const isEven = index % 2 === 0;
  const meta = typeMeta[item.type];
  const TypeIcon = meta.icon;

  return (
    <div
      className={`relative flex w-full items-start gap-6 lg:gap-0 ${
        isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* ── Connection dot ── */}
      <div
        className="absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full lg:left-1/2"
        style={{
          background: 'linear-gradient(135deg, #FF6B35, #FF8C42, #FFA62B)',
        }}
      />

      {/* ── Spacer (desktop only, keeps card to one side) ── */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
        className="glass ml-10 w-full rounded-2xl p-6 transition-shadow duration-300 hover:sunset-glow lg:ml-0 lg:w-1/2 lg:px-8"
      >
        {/* Year & type badges */}
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="sunset-gradient-text text-sm font-semibold">
            {item.year}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium ${meta.bg} ${meta.color}`}
          >
            <TypeIcon className="h-3 w-3" />
            {meta.label[language]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold">{item.title[language]}</h3>

        {/* Institution */}
        <p className="mt-1 text-muted-foreground">{item.institution}</p>

        {/* Location */}
        {item.location && (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground/70">
            <MapPin className="h-3.5 w-3.5" />
            {item.location[language]}
          </p>
        )}

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.description[language]}
        </p>
      </motion.div>
    </div>
  );
}

/* ── Timeline Section ── */
export default function TimelineSection() {
  const { language } = useLanguage();
  return (
    <section id="timeline" className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            {language === 'pt' ? 'Minha Trajetória' : 'My Journey'}
          </h2>
          <div className="sunset-gradient mx-auto mt-4 h-1 w-20 rounded-full" />
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Center / left line */}
          <div
            className="absolute bottom-0 left-4 top-0 w-0.5 lg:left-1/2 lg:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(180deg, #FF6B35, #FF8C42, #FFA62B, transparent)',
            }}
          />

          {/* Items */}
          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
