import React from 'react';
import { FiX } from 'react-icons/fi';
import { GalleryItem } from '../models/Gallery.model';
import {
  OverlayContainer,
  ImageGrid,
  ImageWrapper,
  Image,
  CloseButton
} from '../styles/GalleryOverlayStyles';

interface GalleryOverlayProps {
  isOpen: boolean;
  images: GalleryItem[];
  onClose: () => void;
  onImageClick: (index: number) => void;
}

const GalleryOverlay: React.FC<GalleryOverlayProps> = ({ isOpen, images, onClose, onImageClick }) => {
  return (
    <OverlayContainer
      isOpen={isOpen}
      initial={{ opacity: 0 }}
      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}  // Increased from 0.13 to 0.3
      onClick={(e) => e.stopPropagation()}
    >
      <ImageGrid>
        {images.map((image, index) => (
          <ImageWrapper 
            key={image.sys.id} 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event from bubbling up
              onImageClick(index);
            }}
          >
            <Image src={`https:${image.fields.image.fields.file.url}`} alt={image.fields.descriptions || ''} />
          </ImageWrapper>
        ))}
      </ImageGrid>
      <CloseButton onClick={(e) => {
        e.stopPropagation();  // Prevent click from reaching gallery container
        onClose();
      }}>
        <FiX />
      </CloseButton>
    </OverlayContainer>
  );
};

export default GalleryOverlay;