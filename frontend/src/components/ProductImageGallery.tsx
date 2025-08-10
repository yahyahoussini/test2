'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

type ProductImageGalleryProps = {
  images: string[];
};

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (!images || images.length === 0) {
    images = ['/placeholder.svg'];
  }

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swiped left
      setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }

    if (touchStartX.current - touchEndX.current < -75) {
      // Swiped right
      setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="relative w-full h-96 mb-4 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Product image ${index + 1}`}
            fill
            style={{ objectFit: 'contain', padding: '2rem' }}
            className={`transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="flex justify-center space-x-2 p-2">
        {images.map((src, index) => (
          <button
            key={`thumb-${src}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-16 h-16 relative rounded-md overflow-hidden border-2 transition-colors ${activeIndex === index ? 'border-black' : 'border-transparent'}`}
          >
            <Image src={src} alt={`Thumbnail ${index + 1}`} fill style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
