import { useState } from 'react';
import '../styles/ImageCarousel.css';

interface ImageCarouselProps {
  images: {
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
  };
  alt: string;
}

const ImageCarousel = ({ images, alt }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageArray = [images.photo1, images.photo2, images.photo3, images.photo4];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button 
          className="carousel-button carousel-button-prev" 
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="carousel-content">
          <div 
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imageArray.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img 
                  src={image} 
                  alt={`${alt} - Image ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-button carousel-button-next" 
          onClick={goToNext}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="carousel-indicators">
        {imageArray.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-counter">
        {currentIndex + 1} / {imageArray.length}
      </div>
    </div>
  );
};

export default ImageCarousel;
