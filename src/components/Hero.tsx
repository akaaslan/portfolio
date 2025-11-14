import { useState, useEffect } from 'react';
import '../styles/Hero.css';

const roles = [
  'frontend',
  'backend',
  'react-native',
  'full-stack'
];

interface HeroProps {
  activeSection: string;
}

const Hero = ({ activeSection }: HeroProps) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.substring(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentRole.substring(0, currentText.length - 1));
          setTypingSpeed(100);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section className="hero-section" id="hero">
      {/* Vertical Navigation Labels */}
      <div className="vertical-nav-left">
        <a href="#hero" className={`vertical-text ${activeSection === 'hero' ? 'active' : ''}`}>
          hero
        </a>
        <a href="#about" className={`vertical-text ${activeSection === 'about' ? 'active' : ''}`}>
          about me
        </a>
        <a href="#skills" className={`vertical-text ${activeSection === 'skills' ? 'active' : ''}`}>
          skills
        </a>
        <a href="#projects" className={`vertical-text ${activeSection === 'projects' ? 'active' : ''}`}>
          projects
        </a>
        <a href="#contact" className={`vertical-text ${activeSection === 'contact' ? 'active' : ''}`}>
          contact
        </a>
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="role-text">{currentText}</span>
          <span className="role-dot">. </span>
          {/* <span className="role-web">web </span> */}
          <span className="role-paren">(</span>
          <span className="role-dev">developer</span>
          <span className="role-paren">)</span>
          <span className="cursor">_</span>
        </h1>
      </div>

      {/* Download CV Link */}
      <div className="vertical-nav-right">
        <a 
          href="/Ahmet_Kaan_Aslan_CV_Eng.pdf" 
          className="vertical-text download-cv"
          download="Ahmet_Kaan_Aslan_CV.pdf"
          aria-label="Download CV"
        >
          download cv
        </a>
      </div>
    </section>
  );
};

export default Hero;
