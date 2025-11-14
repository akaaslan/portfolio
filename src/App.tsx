// import React from 'react';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Perde animasyonu için timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 saniye sonra perde açılır (daha smooth)

    return () => clearTimeout(timer);
  }, []);

  // Track active section on scroll using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
          // Section is active when its top is in the upper half of viewport
          if (rect.top < window.innerHeight / 2) {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['hero', 'skills', 'projects', 'about', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          {/* Perde Animasyonu */}
          {isLoading && (
            <div className="curtain-overlay">
              <div className="curtain-left"></div>
              <div className="curtain-right"></div>
              <div className="loading-content">
                <div className="loading-logo">
                  <h1>KA</h1>
                </div>
                <div className="loading-text">Loading...</div>
              </div>
            </div>
          )}

          <Header activeSection={activeSection} />
          <main role="main">
            <Hero activeSection={activeSection} />
            <Profile />
            <Skills />
            <Projects />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
