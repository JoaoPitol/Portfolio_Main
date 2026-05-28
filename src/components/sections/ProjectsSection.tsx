'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { projects, projectCategories } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';

const gradientVariants = [
  'from-[#FF6B35] to-[#FF8C42]',
  'from-[#FF8C42] to-[#FFA62B]',
  'from-[#E63946] to-[#FF6B35]',
  'from-[#FF006E] to-[#E63946]',
  'from-[#FFA62B] to-[#FF006E]',
  'from-[#FF6B35] to-[#FFA62B]',
];

export default function ProjectsSection() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('Todos');

  const isAll = activeFilter === 'Todos' || activeFilter === 'All';
  const filteredProjects = isAll
    ? projects
    : projects.filter((p) => p.category.pt === activeFilter || p.category.en === activeFilter);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {language === 'pt' ? 'Projetos Pessoais' : 'Personal Projects'}
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA62B]" />
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {projectCategories[language].map((category) => {
            const isChipActive =
              (category === 'Todos' || category === 'All')
                ? (activeFilter === 'Todos' || activeFilter === 'All')
                : activeFilter === category;

            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${isChipActive
                  ? 'bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA62B] text-white shadow-lg'
                  : 'glass hover:border-[#FF6B35]/50 hover:shadow-[0_0_20px_rgba(255,107,53,0.1)]'
                  }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title.pt}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group glass overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.15),0_0_60px_rgba(255,140,66,0.08)]"
              >
                {/* Imagem Mockup Real */}
                <div className="relative h-48 w-full overflow-hidden bg-muted border-b border-white/5">
                  {/* Gradiente sutil por trás para suavizar o carregamento */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientVariants[index % gradientVariants.length]
                      } opacity-15`}
                  />
                  <Image
                    src={project.image}
                    alt={project.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    priority={index < 2}
                  />
                  {/* Overlay gradiente suave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-75" />
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold">{project.title[language]}</h3>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {project.description[language]}
                  </p>

                  {/* Tech Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-medium text-[#FF6B35] dark:bg-[#FF6B35]/15 dark:text-[#FF8C42]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#FF6B35]"
                      >
                        <SiGithub className="h-4 w-4" />
                        {language === 'pt' ? 'Código' : 'Code'}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#FF6B35]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
