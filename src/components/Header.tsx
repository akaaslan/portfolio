import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import '../styles/HeaderMinimal.css';
import '../styles/Header.css';

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageChange = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setLanguage(language === 'tr' ? 'en' : 'tr');
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header minimal" role="banner">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <h1>kaan</h1>
        </div>

        {/* BB-8 Toggle & Language Switch */}
        <div className="header-right">
          {/* Hamburger Menu - Mobile Only */}
          <button 
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {/* BB-8 Dark Mode Toggle */}
            <label className="bb8-toggle">
              <input 
                className="bb8-toggle__checkbox" 
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              />
              <div className="bb8-toggle__container">
                <div className="bb8-toggle__scenery">
                  <div className="bb8-toggle__star"></div>
                  <div className="bb8-toggle__star"></div>
                  <div className="bb8-toggle__star"></div>
                  <div className="bb8-toggle__star"></div>
                  <div className="bb8-toggle__star"></div>
                  <div className="bb8-toggle__star"></div>
                  <div className="bb8-toggle__star"></div>
                  <div className="tatto-1"></div>
                  <div className="tatto-2"></div>
                  <div className="gomrassen"></div>
                  <div className="hermes"></div>
                  <div className="chenini"></div>
                  <div className="bb8-toggle__cloud"></div>
                  <div className="bb8-toggle__cloud"></div>
                  <div className="bb8-toggle__cloud"></div>
                </div>
                <div className="bb8">
                  <div className="bb8__head-container">
                    <div className="bb8__antenna"></div>
                    <div className="bb8__antenna"></div>
                    <div className="bb8__head"></div>
                  </div>
                  <div className="bb8__body"></div>
                </div>
                <div className="artificial__hidden">
                  <div className="bb8__shadow"></div>
                </div>
              </div>
            </label>

            <button
              className="self-service-btn"
              onClick={handleLanguageChange}
              aria-label={language === 'tr' ? 'Switch to English' : 'Switch to Turkish'}
            >
              <span className={`service-lang ${isAnimating ? 'lang-exit' : 'lang-enter'}`}>
                {language === 'tr' ? 'TÜRKÇE' : 'ENG'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a 
            href="#hero" 
            className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            hero
          </a>
          <a 
            href="#about" 
            className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            about me
          </a>
          <a 
            href="#skills" 
            className={`mobile-nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            skills
          </a>
          <a 
            href="#projects" 
            className={`mobile-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            projects
          </a>
          <a 
            href="#contact" 
            className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;