'use client';

import React from 'react';
import { motion } from 'motion/react';
import { studyTopics } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';

export default function StudyingSection() {
  const { language } = useLanguage();
  return (
    <section id="studying" className="py-16">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          {/* Animated pulse dot */}
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B35] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FFA62B]" />
          </span>
          <h2 className="text-2xl font-bold md:text-3xl">
            {language === 'pt' ? 'Atualmente Estudando' : 'Currently Studying'}
          </h2>
        </motion.div>

        {/* Study Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studyTopics.map((topic, index) => (
            <motion.div
              key={topic.title.pt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass flex flex-col gap-4 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${topic.color}15` }}
                >
                  {React.createElement(topic.icon as React.ElementType, {
                    className: 'w-6 h-6',
                    style: { color: topic.color },
                  })}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{topic.title[language]}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {topic.description[language]}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {language === 'pt' ? 'Progresso' : 'Progress'}
                  </span>
                  <span className="text-xs font-semibold text-[#FF6B35]">
                    {topic.progress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${topic.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA62B]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
