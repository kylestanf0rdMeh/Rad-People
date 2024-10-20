import React, { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from '../models/Gallery.model';
import { fetchGalleryImages } from '../middleware/Gallery';
import { GalleryPageContainer, GalleryContainer, GalleryImage } from '../styles/GalleryStyles';
import useGalleryNavigation from '../hooks/useGalleryNavigation';
import useIsMobile from '../hooks/useIsMobile';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const { currentIndex, goToNext, goToPrevious } = useGalleryNavigation(images.length);
  const isMobile = useIsMobile();
  const [cursor, setCursor] = useState<'w-resize' | 'e-resize'>('e-resize');
  const [currentImage, setCurrentImage] = useState<{ src: string; fillScreen: boolean } | null>(null);

  const preloadImage = useCallback((src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }, []);

  const loadCurrentImage = useCallback(async () => {
    if (images.length > 0) {
      const imageSrc = `https:${images[currentIndex].fields.image.fields.file.url}`;
      try {
        const img = await preloadImage(imageSrc);
        const shouldFillScreen = isMobile && img.naturalHeight >= img.naturalWidth;
        setCurrentImage({ src: imageSrc, fillScreen: shouldFillScreen });
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }
  }, [images, currentIndex, isMobile, preloadImage]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchGalleryImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    loadCurrentImage();
  }, [loadCurrentImage]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = event;
    const { left, width } = currentTarget.getBoundingClientRect();
    const clickPosition = clientX - left;

    if (isMobile || clickPosition > width / 2) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      const { clientX, currentTarget } = event;
      const { left, width } = currentTarget.getBoundingClientRect();
      const mousePosition = clientX - left;
      setCursor(mousePosition < width / 2 ? 'w-resize' : 'e-resize');
    }
  };

  return (
    <GalleryPageContainer 
      onClick={handleClick} 
      onMouseMove={handleMouseMove}
      style={{ cursor: isMobile ? 'default' : cursor }}
    >
      <GalleryContainer>
        {currentImage && (
          <GalleryImage
            key={currentImage.src}
            src={currentImage.src}
            alt={images[currentIndex].fields.descriptions || 'Gallery image'}
            fillScreen={currentImage.fillScreen}
          />
        )}
      </GalleryContainer>
    </GalleryPageContainer>
  );
};

export default Gallery;