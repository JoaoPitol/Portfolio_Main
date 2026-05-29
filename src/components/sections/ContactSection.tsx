'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';
import { useLanguage } from '@/providers/LanguageProvider';

const socialLinks = [
  {
    icon: Mail,
    label: { pt: 'Email', en: 'Email' },
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: SiGithub,
    label: { pt: 'GitHub', en: 'GitHub' },
    value: 'joaopitol',
    href: personalInfo.github,
  },
  {
    icon: FaLinkedinIn,
    label: { pt: 'LinkedIn', en: 'LinkedIn' },
    value: 'joaogabrielpitol',
    href: personalInfo.linkedin,
  },
  {
    icon: Phone,
    label: { pt: 'Telefone', en: 'Phone' },
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: MapPin,
    label: { pt: 'Localização', en: 'Location' },
    value: personalInfo.location,
    href: undefined,
  },
];

export default function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  const checkRateLimit = (): boolean => {
    try {
      const now = Date.now();
      const rawHistory = localStorage.getItem('contact_submissions');
      const history: number[] = rawHistory ? JSON.parse(rawHistory) : [];
      
      // Filter submissions older than 1 hour (3600000 ms)
      const oneHourAgo = now - 3600000;
      const recentSubmissions = history.filter((timestamp) => timestamp > oneHourAgo);
      
      if (recentSubmissions.length >= 3) {
        return false;
      }
      
      recentSubmissions.push(now);
      localStorage.setItem('contact_submissions', JSON.stringify(recentSubmissions));
      return true;
    } catch {
      return true; // Fallback if localStorage is disabled
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setToastMessage(
        language === 'pt'
          ? 'Por favor, preencha todos os campos obrigatórios.'
          : 'Please fill in all required fields.'
      );
      setStatus('error');
      setTimeout(() => {
        setStatus((curr) => curr === 'error' ? 'idle' : curr);
      }, 4000);
      return;
    }

    // Anti-Spam Step 1: Honeypot Protection (for bot spam prevention)
    if (honeypot !== '') {
      setStatus('loading');
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate sending to trick the bot
      setToastMessage(
        language === 'pt'
          ? 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
          : 'Message sent successfully! I will get back to you shortly.'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setHoneypot('');
      setTimeout(() => {
        setStatus((curr) => curr === 'success' ? 'idle' : curr);
      }, 5000);
      return;
    }

    // Anti-Spam Step 2: Rate Limiting (for human flood prevention)
    if (!checkRateLimit()) {
      setToastMessage(
        language === 'pt'
          ? 'Limite de envio excedido. Por favor, aguarde uma hora antes de tentar novamente.'
          : 'Submission limit exceeded. Please wait an hour before trying again.'
      );
      setStatus('error');
      setTimeout(() => {
        setStatus((curr) => curr === 'error' ? 'idle' : curr);
      }, 5000);
      return;
    }

    setStatus('loading');

    try {
      // Send the request using FormSubmit API
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Novo contato do Portfólio - ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setToastMessage(
        language === 'pt'
          ? 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
          : 'Message sent successfully! I will get back to you shortly.'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setStatus((curr) => curr === 'success' ? 'idle' : curr);
      }, 5000);
    } catch {
      setToastMessage(
        language === 'pt'
          ? 'Ocorreu um erro ao enviar a mensagem. Tente novamente.'
          : 'An error occurred while sending the message. Please try again.'
      );
      setStatus('error');
      setTimeout(() => {
        setStatus((curr) => curr === 'error' ? 'idle' : curr);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {language === 'pt' ? 'Vamos Conversar?' : "Let's Talk?"}
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA62B]" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column — Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-3xl font-bold">
              {language === 'pt' ? 'Entre em contato' : 'Get in Touch'}
            </h3>
            <p className="mb-8 text-muted-foreground">
              {language === 'pt'
                ? 'Estou sempre aberto a novas oportunidades, colaborações e desafios. Sinta-se à vontade para entrar em contato!'
                : "I am always open to new opportunities, collaborations, and challenges. Feel free to reach out!"}
            </p>

            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => {
                const content = (
                  <div className="glass flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.15),0_0_60px_rgba(255,140,66,0.08)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFA62B]">
                      <link.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        {link.label[language]}
                      </p>
                      <p className="truncate text-sm font-semibold">
                        {link.value}
                      </p>
                    </div>
                  </div>
                );

                return link.href ? (
                  <a
                    key={link.label.pt}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={link.label.pt}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8"
            >
              {/* Honeypot Spam Protection (Hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  {language === 'pt' ? 'Nome' : 'Name'}
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder={language === 'pt' ? 'Seu nome' : 'Your name'}
                  className="w-full rounded-xl border border-border bg-black/5 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder={language === 'pt' ? 'seu@email.com' : 'your@email.com'}
                  className="w-full rounded-xl border border-border bg-black/5 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  {language === 'pt' ? 'Mensagem' : 'Message'}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder={language === 'pt' ? 'Sua mensagem...' : 'Your message...'}
                  className="w-full resize-none rounded-xl border border-border bg-black/5 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA62B] py-3 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{language === 'pt' ? 'Enviando...' : 'Sending...'}</span>
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{language === 'pt' ? 'Enviar Mensagem' : 'Send Message'}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification Premium */}
      <AnimatePresence>
        {status !== 'idle' && status !== 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-[999] flex max-w-md items-center gap-3 rounded-2xl glass-strong p-4 shadow-[0_0_30px_rgba(0,0,0,0.1)] border border-border"
          >
            {status === 'success' ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <AlertCircle className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {status === 'success' 
                  ? (language === 'pt' ? 'Sucesso!' : 'Success!') 
                  : (language === 'pt' ? 'Ops! Algo deu errado' : 'Oops! Something went wrong')}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {toastMessage}
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Fechar notificação"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
