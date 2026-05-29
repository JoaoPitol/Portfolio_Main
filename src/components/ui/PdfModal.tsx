'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function PdfModal({ isOpen, onClose, pdfUrl, title }: PdfModalProps) {
  const { language } = useLanguage();
  const [shouldLoad, setShouldLoad] = useState(false);

  // Bloquear scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Atrasar o carregamento do iframe do PDF para permitir uma animação de abertura extremamente fluida (60 FPS)
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 400); // 400ms coincide perfeitamente com a finalização da transição de escala/opacidade
      return () => clearTimeout(timer);
    } else {
      setShouldLoad(false);
    }
  }, [isOpen]);

  // Fechar ao pressionar a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container (Otimizado com 'easeOut' para economizar CPU) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ ease: 'easeOut', duration: 0.25 }}
            className="relative z-10 flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-white/10 bg-zinc-900/90 text-white shadow-2xl shadow-black/50 backdrop-blur-xl md:h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="pr-4">
                <h3 className="line-clamp-1 text-lg font-bold md:text-xl">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {language === 'pt' ? 'Artigo Científico' : 'Scientific Article'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content (PDF Viewer com Lazy Loading para evitar travamentos) */}
            <div className="relative flex-1 bg-zinc-950 overflow-hidden">
              {!shouldLoad ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950/40">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-[#FF6B35]" />
                  <p className="text-xs text-zinc-400 animate-pulse">
                    {language === 'pt' ? 'Carregando artigo científico...' : 'Loading scientific paper...'}
                  </p>
                </div>
              ) : (
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0`}
                  className="h-full w-full border-0"
                  title={title}
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 px-6 py-4 bg-zinc-900/50">
              <p className="text-xs text-zinc-400 text-center sm:text-left">
                {language === 'pt' 
                  ? 'Se o PDF não carregar, use o botão ao lado para visualizar.' 
                  : "If the PDF doesn't load, use the button to view it."}
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  {language === 'pt' ? 'Nova Guia' : 'New Tab'}
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA62B] px-5 py-2 text-sm font-medium text-white shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  {language === 'pt' ? 'Baixar PDF' : 'Download PDF'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
