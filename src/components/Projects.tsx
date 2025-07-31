import { useLanguage } from '../hooks/useLanguage';
import '../styles/Projects.css';

const Projects = () => {
  const { data } = useLanguage();

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="projects-container">
        <h2 id="projects-title" className="section-title">
          {data.navigation.projects}
        </h2>
        
        <div className="projects-grid">
          {data.projects.map((project) => (
            <article key={project.title} className="project-card">
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
                
                <div className="project-links">
                  <a
                    href={project.viewSiteLink}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live site`}
                  >
                    View Site
                  </a>
                  <a
                    href={project.githubLink}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    Github
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;