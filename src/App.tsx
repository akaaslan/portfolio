import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { useLenis, getLenis } from './motion/useLenis';
import { useMagnetic, useTitleParallax } from './ui/useInteractions';
import { CustomCursor } from './ui/CustomCursor';
import { ScrollProgress } from './ui/ScrollProgress';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { IntroSection } from './sections/IntroSection';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { LabSection } from './sections/LabSection';
import { NowSection } from './sections/NowSection';
import { ContactSection } from './sections/ContactSection';
import Header from './components/Header';
import './App.css';

// Code-split the heavy Three.js scene so it doesn't block first paint.
const Scene = lazy(() => import('./three/Scene').then(m => ({ default: m.Scene })));

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'lab', 'contact'];

function AppInner() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language } = useLanguage();
  const { theme } = useTheme();
  useLenis();
  useMagnetic();
  useTitleParallax();

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  // Active-section tracking — on mount (content is always mounted)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Scroll-reveal — set up once the intro finishes, so the hero (and anything
  // already in view) animates in *after* the boot sequence rather than behind it.
  useEffect(() => {
    if (!introComplete) return;
    const els = Array.from(document.querySelectorAll('.reveal, .mask-line'));
    const reveal = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); reveal.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    // Reveal anything already in view right away (hero), observe the rest for scroll.
    const vh = window.innerHeight;
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('is-in');
      else reveal.observe(el);
    });
    return () => reveal.disconnect();
  }, [introComplete]);

  // Smooth in-page navigation (nav clicks glide via Lenis; free scroll untouched)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 2.0, easing: t => 1 - Math.pow(1 - t, 3) });
      else (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <ErrorBoundary label="Scene" fallback={null}>
        <Suspense fallback={null}>
          <Scene night={theme === 'dark'} />
        </Suspense>
      </ErrorBoundary>

      <div className="vignette-overlay" aria-hidden />
      <div className="grid-lines" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
      </div>
      <div className="grain-overlay" aria-hidden />

      <CustomCursor />
      {introComplete && <ScrollProgress activeSection={activeSection} language={language} />}

      <Header activeSection={activeSection} />
      <main className="app" id="app-scroll">
        <HeroSection     activeSection={activeSection} introComplete={introComplete} />
        <AboutSection    />
        <SkillsSection   />
        <ProjectsSection />
        <ExperienceSection />
        <LabSection      />
        <NowSection      />
        <ContactSection  />
      </main>

      <AnimatePresence>
        {!introComplete && <IntroSection key="intro" onComplete={handleIntroComplete} />}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  );
}
