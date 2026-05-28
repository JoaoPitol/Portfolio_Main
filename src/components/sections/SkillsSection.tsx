'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { skillCategories } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};


export default function SkillsSection() {
  const { language } = useLanguage();
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {language === 'pt' ? 'Tecnologias & Skills' : 'Technologies & Skills'}
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA62B]" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title.pt}
              variants={cardVariants}
              className="glass rounded-2xl p-6"
            >
              {/* Category Header */}
              <div className="mb-5 flex items-center gap-3">
                <span className="text-2xl">{category.emoji}</span>
                <h3 className="text-xl font-bold">{category.title[language]}</h3>
              </div>

              {/* Skills within category */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {category.skills.map((skill) => {
                  const isWhiteIcon = skill.color.toLowerCase() === '#ffffff';
                  return (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-2.5 rounded-xl p-2 transition-all duration-200 hover:bg-[#FF6B35]/5 dark:hover:bg-[#FF6B35]/10"
                    >
                      <div
                        className="shrink-0 transition-all duration-200 group-hover:scale-110"
                        style={{
                          filter: 'drop-shadow(0 0 0px transparent)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.filter = `drop-shadow(0 0 6px ${
                            isWhiteIcon ? '#ffffff' : skill.color
                          }40)`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.filter =
                            'drop-shadow(0 0 0px transparent)';
                        }}
                      >
                        {React.createElement(skill.icon as React.ElementType, {
                          className: `w-5 h-5 ${isWhiteIcon ? 'text-[#171717] dark:text-white' : ''}`,
                          style: isWhiteIcon ? {} : { color: skill.color },
                        })}
                      </div>
                      <span className="text-sm font-medium leading-none truncate">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
