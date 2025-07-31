// import React from 'react';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Perde animasyonu için timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 saniye sonra perde açılır (daha smooth)

    return () => clearTimeout(timer);
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

          <Header />
          <main role="main">
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
