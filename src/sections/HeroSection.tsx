import { useEffect, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { sfxHover } from '../audio/sfx';
import './HeroSection.css';

const ROLES = ['frontend', 'backend', 'react native', 'full-stack'];

// Stagger index as a CSS custom property
const sx = (i: number) => ({ '--i': i } as CSSProperties);

interface Props {
  activeSection: string;
  introComplete: boolean;
}

export function HeroSection({ introComplete }: Props) {
  const { language } = useLanguage();
  const [roleIdx, setRoleIdx]   = useState(0);
  const [text, setText]         = useState('');
  const [deleting, setDeleting] = useState(false);
  const speedRef = useRef(120);
  const rootRef  = useRef<HTMLElement>(null);

  // Only run the typewriter once the boot intro is gone
  useEffect(() => {
    if (!introComplete) return;
    const role = ROLES[roleIdx];
    const handle = setTimeout(() => {
      if (!deleting) {
        if (text.length < role.length) { setText(role.slice(0, text.length + 1)); speedRef.current = 110; }
        else { setTimeout(() => setDeleting(true), 1700); }
      } else {
        if (text.length > 0) { setText(role.slice(0, text.length - 1)); speedRef.current = 55; }
        else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
      }
    }, speedRef.current);
    return () => clearTimeout(handle);
  }, [text, deleting, roleIdx, introComplete]);

  return (
    <section className="hero" id="hero" ref={rootRef}>
      {/* Top meta row */}
      <div className="hero__top">
        <span className="mono">PORTFOLIO — {new Date().getFullYear()}</span>
        <span className="mono hero__top-mid">◢ İSTANBUL, TR</span>
        <span className="mono">N 41.0082 · E 28.9784</span>
      </div>

      {/* Mega name */}
      <h1 className="hero__name">
        <span className="mask-line" style={sx(0)}>
          <span className="hero__word" data-text="KAAN">KAAN</span>
        </span>
        <span className="mask-line hero__name--out" style={sx(1)}>
          <span className="hero__word" data-text="ASLAN">ASLAN</span>
        </span>
      </h1>

      {/* Bottom row */}
      <div className="hero__bottom">
        <div className="hero__role reveal" style={sx(2)}>
          <span className="hero__role-tag mono">currently</span>
          <span className="hero__role-text">
            {text}<span className="hero__caret">_</span>
          </span>
        </div>

        <p className="hero__intro reveal" style={sx(3)}>
          {language === 'tr'
            ? 'Ölçeklenebilir web ve mobil ürünler tasarlayıp geliştiren bir fullstack developer.'
            : 'A fullstack developer designing & building scalable web and mobile products.'}
        </p>

        <div className="hero__actions reveal" style={sx(4)}>
          <a href="#contact" className="btn btn--solid" data-magnetic onMouseEnter={() => sfxHover()}>
            {language === 'tr' ? 'İletişime geç' : 'Get in touch'} →
          </a>
          <a
            href="/Ahmet_Kaan_Aslan_CV_Eng.pdf"
            download
            className="link"
            onMouseEnter={() => sfxHover()}
          >
            {language === 'tr' ? 'CV indir ↓' : 'Download CV ↓'}
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll mono">
        <span>{language === 'tr' ? 'kaydır' : 'scroll'}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
