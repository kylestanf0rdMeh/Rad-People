import React, { useState, useEffect } from 'react';
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
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

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

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const shouldFillScreen = () => {
    if (!isMobile) return false;
    // Fill screen if image height is greater than or equal to its width
    return imageDimensions.height >= imageDimensions.width;
  };

  return (
    <GalleryPageContainer 
      onClick={handleClick} 
      onMouseMove={handleMouseMove}
      style={{ cursor: isMobile ? 'default' : cursor }}
    >
      <GalleryContainer>
        {images.length > 0 && (
          <GalleryImage
            src={`https:${images[currentIndex].fields.image.fields.file.url}`}
            alt={images[currentIndex].fields.descriptions || 'Gallery image'}
            onLoad={handleImageLoad}
            fillScreen={shouldFillScreen()}
          />
        )}
      </GalleryContainer>
    </GalleryPageContainer>
  );
};

export default Gallery;