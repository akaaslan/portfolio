import { useLanguage } from '../hooks/useLanguage';
import { useRef, useEffect, useState } from 'react';
import ProjectModal from './ProjectModal';
import { projectsDetailData } from '../data/projectsData';
import '../styles/Projects.css';

const Projects = () => {
  const { data, language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const handleCardClick = (projectId: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    setOriginRect(rect);
    setSelectedProject(projectId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setOriginRect(null);
    }, 600);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      scrollContainer.classList.add('active');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    // Touch events for mobile swipe
    let touchStartX: number;
    let touchScrollLeft: number;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
      touchScrollLeft = scrollContainer.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - scrollContainer.offsetLeft;
      const walk = (x - touchStartX) * 2;
      scrollContainer.scrollLeft = touchScrollLeft - walk;
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mousemove', handleMouseMove);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchmove', handleTouchMove);

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="projects-container">
        <h2 id="projects-title" className="section-title">
          {data.navigation.projects}
        </h2>
        
        <div className="projects-scroll-wrapper" ref={scrollContainerRef}>
          <div className="projects-grid">
            {data.projects.map((project) => {
              const projectId = project.title.toLowerCase().replace(/\s+/g, '');
              return (
            <article 
              key={project.title} 
              className="project-card"
            >
              <div 
                className="project-clickable-area"
                onClick={(e) => handleCardClick(projectId, e)}
              >
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                  />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="tech-stack">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
                
              <div className="project-links">
                <a
                  href={project.viewSiteLink}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live site`}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Site
                </a>
                <a
                  href={project.githubLink}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Github
                </a>
              </div>
            </article>
              );
            })}
          </div>
        </div>

        {selectedProject && projectsDetailData[language]?.[selectedProject] && (
          <ProjectModal
            project={projectsDetailData[language][selectedProject]}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            originRect={originRect}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;