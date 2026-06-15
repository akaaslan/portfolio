import { useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { projectsDetailData } from '../data/projectsData';
import ProjectModal from '../components/ProjectModal';
import { sfxHover, sfxClick } from '../audio/sfx';
import './ProjectsSection.css';

export function ProjectsSection() {
  const { data, language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const openModal = (id: string, e: React.MouseEvent<HTMLElement>) => {
    sfxClick();
    setOriginRect(e.currentTarget.getBoundingClientRect());
    setSelectedId(id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => { setSelectedId(null); setOriginRect(null); }, 600);
  };

  const onMove = (e: React.MouseEvent) => {
    if (previewRef.current) previewRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  };

  return (
    <section className="section work" id="projects" ref={ref} onMouseMove={onMove}>
      <div className="sec-head">
        <span className="sec-index">03 / 07</span>
        <div className="sec-titles">
          <span className="sec-label">{language === 'tr' ? 'projeler' : 'selected work'}</span>
          <h2 className="sec-title mask-line"><span>{language === 'tr' ? 'neler yaptım' : 'what i built'}</span></h2>
        </div>
      </div>

      <ul className="work__list">
        {data.projects.map((project, i) => {
          const id = project.title.toLowerCase().replace(/\s+/g, '');
          return (
            <li
              key={project.title}
              className="work__item reveal"
              data-cursor={language === 'tr' ? 'aç' : 'open'}
              onClick={e => openModal(id, e)}
              onMouseEnter={() => { sfxHover(); setPreviewImg(project.image); }}
              onMouseLeave={() => setPreviewImg(null)}
            >
              <span className="work__num mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="work__main">
                <h3 className="work__title">{project.title}</h3>
                <div className="work__tags">
                  {project.techStack.slice(0, 4).map(t => (
                    <span key={t} className="work__tag mono">{t}</span>
                  ))}
                </div>
              </div>
              <span className="work__cta mono">
                {language === 'tr' ? 'görüntüle' : 'view'} <span className="work__arrow">↗</span>
              </span>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following image preview */}
      <div ref={previewRef} className="work-preview" aria-hidden>
        <div className={`work-preview__inner ${previewImg ? 'show' : ''}`}>
          {previewImg && <img src={previewImg} alt="" />}
        </div>
      </div>

      {selectedId && projectsDetailData[language]?.[selectedId] && (
        <ProjectModal
          project={projectsDetailData[language][selectedId]}
          isOpen={modalOpen}
          onClose={closeModal}
          originRect={originRect}
        />
      )}
    </section>
  );
}
