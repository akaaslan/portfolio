import { useEffect, useState } from 'react';
import './ScrollProgress.css';

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'lab', 'contact'];
const LABELS: Record<string, { tr: string; en: string }> = {
  hero:       { tr: 'ana sayfa', en: 'home' },
  about:      { tr: 'hakkımda',  en: 'about' },
  skills:     { tr: 'yetenekler',en: 'skills' },
  projects:   { tr: 'projeler',  en: 'work' },
  experience: { tr: 'deneyim',   en: 'experience' },
  lab:        { tr: 'lab',       en: 'lab' },
  contact:    { tr: 'iletişim',  en: 'contact' },
};

interface Props { activeSection: string; language: 'tr' | 'en'; }

export function ScrollProgress({ activeSection, language }: Props) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const idx = Math.max(0, SECTIONS.indexOf(activeSection));
  const num = String(idx + 1).padStart(2, '0');
  const total = String(SECTIONS.length).padStart(2, '0');
  const label = LABELS[activeSection]?.[language] ?? '';

  return (
    <>
      <div className="scrollbar-top" aria-hidden>
        <span style={{ transform: `scaleX(${p})` }} />
      </div>
      <div className="scroll-index" aria-hidden>
        <span className="scroll-index__num">{num}</span>
        <span className="scroll-index__sep">/ {total}</span>
        <span className="scroll-index__label">— {label}</span>
      </div>
    </>
  );
}
