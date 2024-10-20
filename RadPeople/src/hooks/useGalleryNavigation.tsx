import { useState, useCallback } from 'react';

const useGalleryNavigation = (totalImages: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  }, [totalImages]);

  return { currentIndex, goToNext, goToPrevious };
};

export default useGalleryNavigation;