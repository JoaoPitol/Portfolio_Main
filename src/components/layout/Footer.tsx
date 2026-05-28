'use client';

import { Mail } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';

const socialLinks = [
  {
    label: 'GitHub',
    href: personalInfo.github,
    icon: SiGithub,
  },
  {
    label: 'LinkedIn',
    href: personalInfo.linkedin,
    icon: FaLinkedinIn,
  },
  {
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
  },
];

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="relative glass">
      {/* Sunset gradient top border */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #FF6B35, #FF8C42, #FFA62B, transparent)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            {language === 'pt'
              ? '© 2025 João Gabriel Pitol. Todos os direitos reservados.'
              : '© 2025 João Gabriel Pitol. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
