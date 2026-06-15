import { useState } from 'react';
import { EASE_OUT } from '../motion/easing';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { SoundToggle } from '../ui/SoundToggle';
import { sfxHover, sfxClick, sfxWhoosh } from '../audio/sfx';
import '../styles/Header.css'; // BB-8 styles
import './Header.new.css';

const NAV_ITEMS = [
  { id: 'hero',       en: 'home',       tr: 'ana sayfa' },
  { id: 'about',      en: 'about',      tr: 'hakkımda'  },
  { id: 'skills',     en: 'skills',     tr: 'yetenekler'},
  { id: 'projects',   en: 'work',       tr: 'projeler'  },
  { id: 'experience', en: 'experience', tr: 'deneyim'   },
  { id: 'lab',        en: 'lab',        tr: 'lab'       },
  { id: 'contact',    en: 'contact',    tr: 'iletişim'  },
];

// Compact desktop nav (subset)
const DESK_NAV = ['about', 'projects', 'lab', 'contact'];

interface Props {
  activeSection: string;
}

export default function Header({ activeSection }: Props) {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme }    = useTheme();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [langAnim, setLangAnim]   = useState(false);

  const toggleLang = () => {
    setLangAnim(true);
    sfxClick();
    setTimeout(() => {
      setLanguage(language === 'tr' ? 'en' : 'tr');
      setTimeout(() => setLangAnim(false), 300);
    }, 300);
  };

  const closeMenu = () => { sfxWhoosh(); setMenuOpen(false); };

  return (
    <>
      <header className="hd">
        {/* Wordmark */}
        <a href="#hero" className="hd__brand" onMouseEnter={() => sfxHover()}>
          <span className="hd__brand-mark">KAAN ASLAN</span>
          <span className="hd__brand-reg">©</span>
        </a>

        {/* Availability status */}
        <div className="hd__status">
          <span className="hd__status-dot" />
          {language === 'tr' ? 'çalışmaya açık' : 'available for work'}
        </div>

        {/* Desktop nav */}
        <nav className="hd__nav">
          {DESK_NAV.map(id => {
            const item = NAV_ITEMS.find(n => n.id === id)!;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`hd__nav-link ${activeSection === id ? 'is-active' : ''}`}
                onMouseEnter={() => sfxHover()}
              >
                {language === 'tr' ? item.tr : item.en}
              </a>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="hd__controls">
          <button
            type="button"
            className="hd__lang"
            onClick={toggleLang}
            onMouseEnter={() => sfxHover()}
            aria-label="Toggle language"
          >
            <span className={langAnim ? 'lang-exit' : 'lang-enter'}>
              {language === 'tr' ? 'EN' : 'TR'}
            </span>
          </button>

          <SoundToggle />

          {/* BB-8 toggle — switches the page to a night purple-blue palette */}
          <label className="bb8-toggle" aria-label="Toggle night palette">
            <input
              className="bb8-toggle__checkbox"
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <div className="bb8-toggle__container">
              <div className="bb8-toggle__scenery">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="bb8-toggle__star" />
                ))}
                <div className="tatto-1" />
                <div className="tatto-2" />
                <div className="gomrassen" />
                <div className="hermes" />
                <div className="chenini" />
                <div className="bb8-toggle__cloud" />
                <div className="bb8-toggle__cloud" />
                <div className="bb8-toggle__cloud" />
              </div>
              <div className="bb8">
                <div className="bb8__head-container">
                  <div className="bb8__antenna" />
                  <div className="bb8__antenna" />
                  <div className="bb8__head" />
                </div>
                <div className="bb8__body" />
              </div>
              <div className="artificial__hidden">
                <div className="bb8__shadow" />
              </div>
            </div>
          </label>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="hd__burger"
            onClick={() => { setMenuOpen(true); sfxWhoosh(); }}
            aria-label="Open menu"
          >
            <span /><span />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="hd-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <button
              type="button"
              className="hd-overlay__close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              {language === 'tr' ? 'kapat' : 'close'} ×
            </button>

            <nav className="hd-overlay__nav">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`hd-overlay__link ${activeSection === item.id ? 'is-active' : ''}`}
                  onClick={closeMenu}
                  onMouseEnter={() => sfxHover()}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.5, ease: EASE_OUT }}
                >
                  <span className="hd-overlay__num">0{i + 1}</span>
                  {language === 'tr' ? item.tr : item.en}
                </motion.a>
              ))}
            </nav>

            <div className="hd-overlay__foot">
              <span>kaanaslan839@gmail.com</span>
              <span>İSTANBUL — {new Date().getFullYear()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
