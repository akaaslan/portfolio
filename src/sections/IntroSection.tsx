import { useState, useEffect } from 'react';
import { EASE_OUT } from '../motion/easing';
import { motion, AnimatePresence } from 'framer-motion';
import { sfxBoot } from '../audio/sfx';
import './IntroSection.css';

const BOOT_LINES = [
  '> SYS.INIT — KAAN_ASLAN.PORTFOLIO',
  '> LOADING MODULES      [■■■■■■■■■■] 100%',
  '> COMPILING SHADERS',
  '> SIGNAL ACQUIRED',
  '> MOUNTING INTERFACE',
  '> [READY]',
];

interface Props {
  onComplete: () => void;
}

export function IntroSection({ onComplete }: Props) {
  const [count, setCount]     = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    sfxBoot();
    let idx = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const interval = setInterval(() => {
      idx += 1;
      setCount(idx);
      if (idx >= BOOT_LINES.length) {
        clearInterval(interval);
        timers.push(setTimeout(() => {
          setExiting(true);
          timers.push(setTimeout(onComplete, 950));
        }, 1100));
      }
    }, 520);
    return () => { clearInterval(interval); timers.forEach(clearTimeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lines = BOOT_LINES.slice(0, count);
  const pct = Math.round((count / BOOT_LINES.length) * 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.95, ease: EASE_OUT }}
        >
          <div className="intro-top">
            <span>PORTFOLIO — {new Date().getFullYear()}</span>
            <span>İSTANBUL, TR</span>
          </div>

          <div className="intro-inner">
            <motion.div
              className="intro-logo"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              KAAN<br /><em>ASLAN</em>
            </motion.div>

            <div className="intro-terminal">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  className={`intro-line ${(line ?? '').includes('[READY]') ? 'intro-line--ready' : ''}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                </motion.div>
              ))}
              <span className="intro-cursor">_</span>
            </div>
          </div>

          <div className="intro-bar">
            <span style={{ right: `${100 - pct}%` }} />
          </div>

          <div className="intro-foot">
            <span>FULLSTACK DEVELOPER</span>
            <span>{pct}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
