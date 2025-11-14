import { useLanguage } from '../hooks/useLanguage';
import { useState, useRef, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const { language } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isAnimating) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Get mouse position relative to card center
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      // Normalize to -1 to 1 range
      const rotateX = (mouseY / (rect.height / 2)) * -5; // Max 5 degrees
      const rotateY = (mouseX / (rect.width / 2)) * 5; // Max 5 degrees
      
      setMousePosition({ x: rotateY, y: rotateX });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isAnimating]);

  const aboutContent = {
    tr: {
      aboutTitle: "hakkımda",
      infoTitle: "genel bilgiler",
      paragraphs: [
        "Merhaba, ben Kaan.",
        "Modern web ve mobil deneyimler geliştiren bir Front-End & Back-End developer'ım. React ekosistemiyle arayüzler geliştiriyor, Spring Boot ile ölçeklenebilir backend mimarileri kuruyorum. Amacım her projede temiz kod, iyi bir kullanıcı deneyimi ve sürdürülebilir bir yapı oluşturmak.",
        "Karmaşık problemleri sade bir yapıya dönüştürmeyi, tasarım ve geliştirme arasında dengeli çalışan akışlar kurmayı ve doğru hissettiren ürünler üretmeyi seviyorum. Sürekli öğrenmeye açık, hızlı adapte olan ve takım içinde iletişime önem veren biriyim.",
        "Kod yazmadığım zamanlarda spor yapıyor, müzik üretiyor ve yeni fikirler üzerinde çalışıyorum."
      ],
      info: [
        { label: "Doğum Tarihi", value: "31.07.2002" },
        { label: "Konum", value: "İstanbul, Avcılar" },
        { label: "Eğitim", value: "Bilgisayar Mühendisliği" },
        { label: "Pozisyon", value: "Fullstack Developer" }
      ]
    },
    en: {
      aboutTitle: "about me",
      infoTitle: "general information",
      paragraphs: [
        "Hi, I'm Kaan.",
        "I'm a developer who enjoys building clean, modern and meaningful user experiences. I work across both front-end and back-end: creating smooth interfaces with React and developing scalable backend architectures using Java and Spring Boot.",
        "I love simplifying complex problems, designing intuitive flows, and delivering products that actually feel good to use. I'm a fast learner, detail-oriented, and someone who values communication and collaboration in a team environment.",
        "Outside of coding, I enjoy working out, producing music, and exploring new ideas and personal projects."
      ],
      info: [
        { label: "Date of Birth", value: "31.07.2002" },
        { label: "Location", value: "Istanbul, Avcılar" },
        { label: "Education", value: "Computer Engineering" },
        { label: "Position", value: "Fullstack Developer" }
      ]
    }
  };

  const content = language === 'tr' ? aboutContent.tr : aboutContent.en;

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Title with animation */}
        <div className="title-container">
          <h2 className={`about-title ${!isFlipped ? 'active' : 'hidden'}`}>
            {content.aboutTitle}
          </h2>
          <h2 className={`about-title ${isFlipped ? 'active' : 'hidden'}`}>
            {content.infoTitle}
          </h2>
        </div>
        
        {/* Flip card */}
        <div 
          ref={containerRef}
          className={`card-container ${isFlipped ? 'flipped' : ''} ${isAnimating ? 'animating' : ''}`}
          onClick={handleFlip}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${isFlipped ? 180 + mousePosition.x : mousePosition.x}deg)`
          }}
        >
          {/* Front - About Me */}
          <div className="about-content card-front">
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className={`about-paragraph ${index === 0 ? 'intro' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back - General Information */}
          <div className="about-content card-back">
            {content.info.map((item, index) => (
              <div key={index} className="info-item">
                <span className="info-label">{item.label}:</span>
                <span className="info-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;