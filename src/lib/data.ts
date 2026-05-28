import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiPython,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiNodedotjs,
  SiWireshark,
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";
import {
  Shield,
  Brain,
  Database,
  Terminal,
  Server,
  Lock,
} from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

export type TranslatedText = {
  pt: string;
  en: string;
};

// ============================================================
// PERSONAL INFO
// ============================================================
export const personalInfo = {
  name: "João Gabriel",
  fullName: "João Gabriel Pitol",
  headline: {
    pt: "Desenvolvedor Full-Stack & Entusiasta em Segurança Cibernética",
    en: "Full-Stack Developer & Cybersecurity Enthusiast",
  },
  description: {
    pt: "Graduado em Ciência da Computação pela PUCPR com experiência em desenvolvimento web full-stack. Apaixonado por construir soluções práticas e explorar tecnologias emergentes, incluindo IA/ML. Atualmente cursando Pós-Graduação em Cybersecurity.",
    en: "Computer Science graduate from PUCPR with practical experience in full-stack web development. Passionate about building practical solutions and exploring emerging technologies, including AI/ML. Currently pursuing a Post-Graduate degree in Cybersecurity.",
  },
  location: "Francisco Beltrão, PR",
  email: "pitoljoaogabriel@gmail.com",
  phone: "(46) 99925-4094",
  github: "https://github.com/joaopitol",
  linkedin: "https://linkedin.com/in/joaogabrielpitol",
};

// ============================================================
// STATS
// ============================================================
export const stats = [
  {
    label: { pt: "Anos Estudando", en: "Years Studying" },
    value: 5,
    suffix: "+",
  },
  {
    label: { pt: "Tecnologias", en: "Technologies" },
    value: 15,
    suffix: "+",
  },
  {
    label: { pt: "Projetos", en: "Projects" },
    value: 10,
    suffix: "+",
  },
  {
    label: { pt: "Horas de Estudo", en: "Study Hours" },
    value: 850,
    suffix: "+",
  },
];

// ============================================================
// ABOUT
// ============================================================
export const aboutText = {
  pt: [
    "Sou um desenvolvedor apaixonado por tecnologia e inovação. Minha jornada na computação começou com a curiosidade de entender como as coisas funcionam — e desde então, nunca parei de aprender.",
    "Graduado em Ciência da Computação pela PUCPR com GPA de 8.7/10, tenho experiência prática em desenvolvimento web full-stack, trabalhando com React, Laravel e diversas tecnologias modernas.",
    "Atualmente, estou aprofundando meus conhecimentos em Cybersecurity através de uma pós-graduação, combinando minha base sólida em desenvolvimento com a segurança da informação.",
  ],
  en: [
    "I am a developer passionate about technology and innovation. My computer science journey began with the curiosity of understanding how things work — and since then, I've never stopped learning.",
    "Computer Science graduate from PUCPR with a GPA of 8.7/10, I have practical experience in full-stack web development, working with React, Laravel, and various modern technologies.",
    "Currently, I am deepening my knowledge in Cybersecurity through a post-graduate specialization, combining my solid software engineering foundation with information security.",
  ],
};

// ============================================================
// TIMELINE
// ============================================================
export type TimelineItem = {
  year: string;
  title: TranslatedText;
  institution: string;
  description: TranslatedText;
  type: "work" | "education" | "certification";
  location?: TranslatedText;
};

export const timeline: TimelineItem[] = [
  {
    year: "2027",
    title: {
      pt: "Pós-Graduação em Cybersecurity",
      en: "Post-Graduate in Cybersecurity",
    },
    institution: "PUCPR – Pontifícia Universidade Católica do Paraná",
    description: {
      pt: "Especialização em segurança cibernética com foco em proteção de sistemas, análise de vulnerabilidades e resposta a incidentes. Previsão de conclusão: Outubro/2027.",
      en: "Specialization in cybersecurity focusing on systems protection, vulnerability analysis, and incident response. Expected completion: October/2027.",
    },
    type: "education",
    location: {
      pt: "Curitiba, PR",
      en: "Curitiba, Brazil",
    },
  },
  {
    year: "2025",
    title: {
      pt: "Bacharelado em Ciência da Computação",
      en: "Bachelor of Computer Science",
    },
    institution: "PUCPR – Pontifícia Universidade Católica do Paraná",
    description: {
      pt: "Graduação concluída com GPA 8.7/10. Formação sólida em algoritmos, estruturas de dados, engenharia de software e inteligência artificial.",
      en: "Graduation completed with GPA of 8.7/10. Solid foundation in algorithms, data structures, software engineering, and artificial intelligence.",
    },
    type: "education",
    location: {
      pt: "Curitiba, PR",
      en: "Curitiba, Brazil",
    },
  },
  {
    year: "2024",
    title: {
      pt: "Google Cybersecurity Professional Certificate",
      en: "Google Cybersecurity Professional Certificate",
    },
    institution: "Google / Coursera",
    description: {
      pt: "Certificação profissional em cybersecurity com ~7 horas/semana durante 6 meses, cobrindo redes, segurança de sistemas e resposta a incidentes.",
      en: "Professional certification in cybersecurity with ~7 hours/week for 6 months, covering networks, systems security, and incident response.",
    },
    type: "certification",
  },
  {
    year: "2023–2024",
    title: {
      pt: "Desenvolvedor Web — Simplifica",
      en: "Web Developer — Simplifica",
    },
    institution: "Simplifica",
    description: {
      pt: "Liderança no desenvolvimento front-end de aplicações web modernas usando React integrado com ecossistemas Laravel. Responsável por codificação, manutenção e otimização de componentes UI. Colaboração ativa em discussões de design UI/UX.",
      en: "Lead role in frontend development of modern web applications using React integrated with Laravel ecosystems. Responsible for coding, maintaining, and optimizing UI components. Active collaboration in UI/UX design discussions.",
    },
    type: "work",
    location: {
      pt: "Curitiba, PR",
      en: "Curitiba, Brazil",
    },
  },
  {
    year: "2023",
    title: {
      pt: "Certificados Alura — 43 Cursos",
      en: "Alura Certificates — 43 Courses",
    },
    institution: "Alura",
    description: {
      pt: "Mais de 450 horas de estudo em programação, desenvolvimento web, bancos de dados, DevOps e boas práticas de código.",
      en: "Over 450 hours of study in programming, web development, databases, DevOps, and code best practices.",
    },
    type: "certification",
  },
];

// ============================================================
// PROJECTS
// ============================================================
export type Project = {
  title: TranslatedText;
  description: TranslatedText;
  image: string;
  technologies: string[];
  category: TranslatedText;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: {
      pt: "Clinic Manager — Sistema Odontológico",
      en: "Clinic Manager — Dental Practice Software",
    },
    description: {
      pt: "Software desktop completo para gestão de consultórios odontológicos. Inclui cadastro de pacientes, agenda interativa, controle financeiro detalhado e sincronização na nuvem. Desenvolvido com Electron + React e backend Node.js com PostgreSQL.",
      en: "Full-featured desktop software for dental clinic management. Includes patient records, interactive scheduling, detailed financial control, and cloud synchronization. Built with Electron + React and a Node.js backend with PostgreSQL.",
    },
    image: "/images/project-clinic-manager.png",
    technologies: ["Electron", "React", "Node.js", "PostgreSQL", "Vite"],
    category: {
      pt: "Desktop",
      en: "Desktop",
    },
    github: "https://github.com/joaopitol/clinic-manager-desktop",
  },
  {
    title: {
      pt: "Healthiest — Receitas Saudáveis com IA",
      en: "Healthiest — AI Healthy Recipes",
    },
    description: {
      pt: "Plataforma web para geração e gestão de receitas saudáveis personalizadas através de Inteligência Artificial. Permite que os utilizadores criem receitas com base nos ingredientes que têm em casa, definam preferências dietéticas e organizem a sua alimentação diária. Frontend em React e backend em Laravel.",
      en: "Web platform for generating and managing personalized healthy recipes using Artificial Intelligence. Allows users to create recipes based on ingredients they have at home, define dietary preferences, and organize their daily meals. Frontend in React and backend in Laravel.",
    },
    image: "/images/project-healthiest.png",
    technologies: ["React", "Laravel", "OpenAI API", "MySQL", "TailwindCSS"],
    category: {
      pt: "Full-Stack",
      en: "Full-Stack",
    },
    github: "https://github.com/JoaoPitol/Healthiest-ReactApp-Laravel",
    demo: "https://healthiest-react-app-laravel.vercel.app",
  }
];

export const projectCategories = {
  pt: ["Todos", "Full-Stack", "Desktop", "Frontend", "Backend", "Cybersecurity"],
  en: ["All", "Full-Stack", "Desktop", "Frontend", "Backend", "Cybersecurity"],
};

// ============================================================
// SKILLS
// ============================================================
export type Skill = {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
};

export type SkillCategory = {
  title: TranslatedText;
  emoji: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: { pt: "Frontend", en: "Frontend" },
    emoji: "🎨",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: { pt: "Backend", en: "Backend" },
    emoji: "⚙️",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    ],
  },
  {
    title: { pt: "Cybersecurity", en: "Cybersecurity" },
    emoji: "🔒",
    skills: [
      {
        name: "Network Security",
        icon: Shield as unknown as IconType,
        color: "#FF6B35",
      },
      { name: "Wireshark", icon: SiWireshark, color: "#1679A7" },
      { name: "Linux Security", icon: SiLinux, color: "#FCC624" },
      {
        name: "Encryption",
        icon: Lock as unknown as IconType,
        color: "#FF8C42",
      },
    ],
  },
  {
    title: { pt: "Ferramentas", en: "Tools" },
    emoji: "🛠️",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      {
        name: "Terminal",
        icon: Terminal as unknown as IconType,
        color: "#4EAA25",
      },
    ],
  },
  {
    title: { pt: "Banco de Dados", en: "Databases" },
    emoji: "🗄️",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      {
        name: "SQL Server",
        icon: Database as unknown as IconType,
        color: "#CC2927",
      },
    ],
  },
  {
    title: { pt: "IA & Machine Learning", en: "AI & Machine Learning" },
    emoji: "🧠",
    skills: [
      {
        name: "Machine Learning",
        icon: Brain as unknown as IconType,
        color: "#FF6B35",
      },
      {
        name: "Data Analysis",
        icon: Server as unknown as IconType,
        color: "#FFA62B",
      },
    ],
  },
];

// ============================================================
// CURRENTLY STUDYING
// ============================================================
export type StudyTopic = {
  title: TranslatedText;
  description: TranslatedText;
  progress: number;
  icon: IconType | LucideIcon;
  color: string;
};

export const studyTopics: StudyTopic[] = [
  {
    title: {
      pt: "Cybersecurity Avançada",
      en: "Advanced Cybersecurity",
    },
    description: {
      pt: "Pós-graduação em segurança cibernética",
      en: "Post-graduate in cybersecurity",
    },
    progress: 5,
    icon: Shield as unknown as IconType,
    color: "#FF6B35",
  },
  {
    title: {
      pt: "Cloud Security",
      en: "Cloud Security",
    },
    description: {
      pt: "Segurança em ambientes cloud (AWS/Azure)",
      en: "Security in cloud environments (AWS/Azure)",
    },
    progress: 20,
    icon: Lock as unknown as IconType,
    color: "#FF8C42",
  },
  {
    title: {
      pt: "Inteligência Artificial",
      en: "Artificial Intelligence",
    },
    description: {
      pt: "Deep Learning e redes neurais",
      en: "Deep Learning and neural networks",
    },
    progress: 50,
    icon: Brain as unknown as IconType,
    color: "#FFA62B",
  },
];

// ============================================================
// NAVIGATION
// ============================================================
export const navLinks = [
  { label: { pt: "Início", en: "Home" }, href: "#hero" },
  { label: { pt: "Sobre", en: "About" }, href: "#about" },
  { label: { pt: "Trajetória", en: "Journey" }, href: "#timeline" },
  { label: { pt: "Projetos", en: "Projects" }, href: "#projects" },
  { label: { pt: "Skills", en: "Skills" }, href: "#skills" },
  { label: { pt: "Contato", en: "Contact" }, href: "#contact" },
];
