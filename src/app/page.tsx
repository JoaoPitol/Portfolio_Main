import {
  Navbar,
  ScrollProgress,
  Footer,
  CustomCursor,
  ParticlesBackground,
} from '@/components/layout';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import StudyingSection from '@/components/sections/StudyingSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <ParticlesBackground />
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col overflow-hidden">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <ProjectsSection />
        <SkillsSection />
        <StudyingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}


