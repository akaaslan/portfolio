import { useState } from 'react';
import type { Skill } from '../data/skillsData';
import { skillsByCategory, defaultIcons } from '../data/skillsData';
import '../styles/Skills.css';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const closeModal = () => {
    setSelectedSkill(null);
  };

  const getSkillIcon = (skill: Skill) => {
    const iconPath = skill.icon || defaultIcons[skill.category];
    return (
      <img 
        src={iconPath} 
        alt={`${skill.name} icon`}
        className="skill-icon-small"
        onError={(e) => {
          // Fallback to category default icon if skill icon fails to load
          const target = e.target as HTMLImageElement;
          if (target.src !== defaultIcons[skill.category]) {
            target.src = defaultIcons[skill.category];
          }
        }}
      />
    );
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title">SKILLS</h2>

        {/* Frontend Strip */}
        <div className="skill-strip-wrapper">
          <div className="skill-strip">
            {[...skillsByCategory.frontend, ...skillsByCategory.frontend, ...skillsByCategory.frontend, ...skillsByCategory.frontend].map((skill, index) => (
              <div
                key={`frontend-${index}`}
                className="skill-badge frontend"
                onClick={() => handleSkillClick(skill)}
              >
                {getSkillIcon(skill)}
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Backend Strip */}
        <div className="skill-strip-wrapper reverse">
          <div className="skill-strip">
            {[...skillsByCategory.backend, ...skillsByCategory.backend, ...skillsByCategory.backend, ...skillsByCategory.backend].map((skill, index) => (
              <div
                key={`backend-${index}`}
                className="skill-badge backend"
                onClick={() => handleSkillClick(skill)}
              >
                {getSkillIcon(skill)}
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Strip */}
        <div className="skill-strip-wrapper">
          <div className="skill-strip">
            {[...skillsByCategory.additional, ...skillsByCategory.additional, ...skillsByCategory.additional, ...skillsByCategory.additional].map((skill, index) => (
              <div
                key={`additional-${index}`}
                className="skill-badge additional"
                onClick={() => handleSkillClick(skill)}
              >
                {getSkillIcon(skill)}
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {selectedSkill && (
        <div className="skill-modal-overlay" onClick={closeModal}>
          <div className="skill-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h3 className="modal-title">{selectedSkill.name}</h3>
            <p className="modal-category">{selectedSkill.category.toUpperCase()}</p>
            <p className="modal-description">{selectedSkill.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;