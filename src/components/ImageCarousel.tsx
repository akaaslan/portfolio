import { useState } from 'react';
import '../styles/ImageCarousel.css';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

const ImageCarousel = ({ images, alt }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const list = images.filter(Boolean);
  const multiple = list.length > 1;

  const goToPrevious = () => setCurrentIndex(i => (i === 0 ? list.length - 1 : i - 1));
  const goToNext     = () => setCurrentIndex(i => (i === list.length - 1 ? 0 : i + 1));

  if (list.length === 0) return null;

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {multiple && (
          <button className="carousel-button carousel-button-prev" onClick={goToPrevious} aria-label="Previous image" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        )}

        <div className="carousel-content">
          <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {list.map((image, index) => (
              <div key={index} className="carousel-slide">
                <div className={`carousel-skeleton ${loaded[index] ? 'is-loaded' : ''}`} />
                <img
                  src={image}
                  alt={`${alt} — ${index + 1}`}
                  className={`carousel-image ${loaded[index] ? 'is-loaded' : ''}`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setLoaded(p => ({ ...p, [index]: true }))}
                />
              </div>
            ))}
          </div>
        </div>

        {multiple && (
          <button className="carousel-button carousel-button-next" onClick={goToNext} aria-label="Next image" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        )}
      </div>

      {multiple && (
        <div className="carousel-indicators">
          {list.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {multiple && <div className="carousel-counter">{currentIndex + 1} / {list.length}</div>}
    </div>
  );
};

export default ImageCarousel;
