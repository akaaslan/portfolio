import { useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { sfxHover } from '../audio/sfx';
import './ContactSection.css';

const CONTENT = {
  en: {
    label: 'contact', big1: 'LET’S', big2: 'CONNECT',
    sub: 'Open to fullstack roles, freelance projects and interesting conversations.',
    email: 'kaanaslan839@gmail.com',
    cta: 'Available for work — 2026',
  },
  tr: {
    label: 'iletişim', big1: 'HADİ', big2: 'KONUŞALIM',
    sub: 'Fullstack pozisyonlara, freelance projelere ve ilginç sohbetlere açığım.',
    email: 'kaanaslan839@gmail.com',
    cta: 'Çalışmaya açık — 2026',
  },
};

export function ContactSection() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const ref = useRef<HTMLElement>(null);

  return (
    <section className="section contact section--flush" id="contact" ref={ref}>
      <div className="contact__top">
        <span className="sec-index">06 / 07</span>
        <span className="sec-label">{c.label}</span>
      </div>

      <h2 className="contact__big">
        <span className="mask-line"><span>{c.big1}</span></span>
        <span className="mask-line contact__big--out"><span>{c.big2}</span></span>
      </h2>

      <div className="contact__grid">
        <a href={`mailto:${c.email}`} className="contact__email" onMouseEnter={() => sfxHover()}>
          {c.email}
        </a>
        <p className="body contact__sub">{c.sub}</p>
        <div className="contact__socials">
          <a href="https://github.com/akaaslan" target="_blank" rel="noopener noreferrer" className="link" onMouseEnter={() => sfxHover()}>github ↗</a>
          <a href="https://linkedin.com/in/ahmetkaanaslan" target="_blank" rel="noopener noreferrer" className="link" onMouseEnter={() => sfxHover()}>linkedin ↗</a>
        </div>
      </div>

      <footer className="contact__foot">
        <span className="mono">© {new Date().getFullYear()} Kaan Aslan</span>
        <span className="mono contact__foot-status"><span className="contact__dot" />{c.cta}</span>
        <span className="mono">Built with React · Three.js</span>
      </footer>
    </section>
  );
}
