import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { skillsByCategory, type Skill } from '../data/skillsData';
import { sfxHover, sfxClick } from '../audio/sfx';
import './SkillsSection.css';

function SkillRow({ skills, label, num, onPick }: {
  skills: Skill[]; label: string; num: string; onPick: (s: Skill) => void;
}) {
  const repeated = [...skills, ...skills];
  return (
    <div className="skills__row">
      <div className="skills__row-head">
        <span className="mono">{num}</span>
        <span className="skills__row-label">{label}</span>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {repeated.map((skill, i) => (
            <button
              key={i}
              type="button"
              className="skills__pill"
              onClick={() => { sfxClick(); onPick(skill); }}
              onMouseEnter={() => sfxHover()}
            >
              {skill.icon && <img src={skill.icon} alt="" aria-hidden className="skills__pill-ic" />}
              {skill.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { language } = useLanguage();
  const [active, setActive] = useState<Skill | null>(null);

  const cats = {
    tr: { f: 'önyüz', b: 'arkayüz', a: 'ek' , label: 'yetenekler', title: 'ne biliyorum' },
    en: { f: 'frontend', b: 'backend', a: 'extra', label: 'skills', title: 'what i know' },
  }[language];

  return (
    <section className="section skills" id="skills">
      <div className="sec-head">
        <span className="sec-index">02 / 07</span>
        <div className="sec-titles">
          <span className="sec-label">{cats.label}</span>
          <h2 className="sec-title mask-line"><span>{cats.title}</span></h2>
        </div>
      </div>

      <div className="skills__rows reveal">
        <SkillRow num="F—01" label={cats.f} skills={skillsByCategory.frontend}  onPick={setActive} />
        <SkillRow num="B—02" label={cats.b} skills={skillsByCategory.backend}   onPick={setActive} />
        <SkillRow num="X—03" label={cats.a} skills={skillsByCategory.additional} onPick={setActive} />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="skills__modal-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="skills__modal card"
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button type="button" className="skills__modal-x mono" onClick={() => setActive(null)}>close ×</button>
              <span className="sec-label">{active.category}</span>
              <h3 className="skills__modal-name">{active.name}</h3>
              <p className="body">{active.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
