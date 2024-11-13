import { FiGrid } from 'react-icons/fi';
import useIsMobile from '../hooks/useIsMobile';
import PageWrapper from '../components/PageWrapper';
import { GalleryItem } from '../models/Gallery.model';
import GalleryOverlay from '../components/GalleryOverlay';
import { fetchGalleryImages } from '../middleware/Gallery';
import React, { useState, useEffect, useCallback } from 'react';
import useGalleryNavigation from '../hooks/useGalleryNavigation';
import { GalleryPageContainer, GalleryContainer, GalleryImage, ContactRectangle, OverlayButton } from '../styles/GalleryStyles';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const { currentIndex, setCurrentIndex, goToNext, goToPrevious } = useGalleryNavigation(images.length);
  const isMobile = useIsMobile();
  const [cursor, setCursor] = useState<'w-resize' | 'e-resize'>('e-resize');
  const [currentImage, setCurrentImage] = useState<{ src: string; fillScreen: boolean; isWide: boolean } | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        let shouldFillScreen;
        let isWide = false;
        
        if (isMobile) {
          shouldFillScreen = img.naturalHeight >= img.naturalWidth;
        } else {
          isWide = aspectRatio > 1.5; // Adjust this threshold as needed
          shouldFillScreen = isWide;
        }
        setCurrentImage({ src: imageSrc, fillScreen: shouldFillScreen, isWide });
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
    // Ignore clicks when the overlay is open
    if (isOverlayOpen) return;

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
    // Ignore mouse moves when the overlay is open
    if (isOverlayOpen) return;

    if (!isMobile) {
      const { clientX, currentTarget } = event;
      const { left, width } = currentTarget.getBoundingClientRect();
      const mousePosition = clientX - left;
      setCursor(mousePosition < width / 2 ? 'w-resize' : 'e-resize');
    }
  };

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleOverlayImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsOverlayOpen(false);
  };

  return (
    <PageWrapper>
      <GalleryPageContainer 
      onClick={handleClick} 
      onMouseMove={handleMouseMove}
      style={{ cursor: isOverlayOpen ? 'default' : (isMobile ? 'default' : cursor) }}
      >
        <GalleryContainer>
          {currentImage && (
            <GalleryImage
              key={currentImage.src}
              src={currentImage.src}
              alt={images[currentIndex].fields.descriptions || 'Gallery image'}
              fillScreen={currentImage.fillScreen}
              isWide={currentImage.isWide}
            />
          )}
        </GalleryContainer>

        <ContactRectangle>
          <h3>Contact Us</h3>
          <p>contact@radpeople.us</p>
        </ContactRectangle>

        <OverlayButton onClick={toggleOverlay}>
          <FiGrid />
        </OverlayButton>
        
        <GalleryOverlay
          isOpen={isOverlayOpen}
          images={images}
          onClose={toggleOverlay}
          onImageClick={handleOverlayImageClick}
        />
      </GalleryPageContainer>
    </PageWrapper>
  );
};

export default Gallery;