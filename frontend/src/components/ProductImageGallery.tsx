'use client';

import { useState } from 'react';
import Image from 'next/image';

type ProductImageGalleryProps = {
  images: string[];
};

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    images = ['/placeholder.svg']; // Default placeholder
  }

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  // Basic swipe logic would be added here using onTouchStart, onTouchMove, onTouchEnd
  // For simplicity in this step, we'll focus on the thumbnail click functionality.

  return (
    <div className="relative w-full">
      {/* Main Image Display */}
      <div className="relative w-full h-96 mb-4">
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

      {/* Thumbnails */}
      <div className="flex justify-center space-x-2 p-2">
        {images.map((src, index) => (
          <button
            key={`thumb-${src}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-16 h-16 relative rounded-md overflow-hidden border-2 transition-colors ${activeIndex === index ? 'border-black' : 'border-transparent'}`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
