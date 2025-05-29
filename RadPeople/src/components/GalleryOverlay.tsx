import React from 'react';
import { GalleryItem } from '../models/Gallery.model';
import {
  OverlayContainer,
  ImageGrid,
  ImageWrapper,
  Image,
  CloseButton,
  OverlayControlBar,
  ImageCounter
} from '../styles/GalleryOverlayStyles';
import { ControlsGroup } from '../styles/GalleryStyles';

interface GalleryOverlayProps {
  isOpen: boolean;
  images: GalleryItem[];
  onClose: () => void;
  onImageClick: (index: number) => void;
  currentIndex?: number; // Add this prop
}

const GalleryOverlay: React.FC<GalleryOverlayProps> = ({ 
  isOpen, 
  images, 
  onClose, 
  onImageClick,
}) => {
  return (
    <OverlayContainer
      isOpen={isOpen}
      initial={{ opacity: 0 }}
      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      onClick={(e) => e.stopPropagation()}
    >
      <ImageGrid>
        {images.map((image, index) => (
          <ImageWrapper 
            key={image.sys.id} 
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(index);
            }}
          >
            <Image src={`https:${image.fields.image.fields.file.url}`} alt={image.fields.descriptions || ''} />
          </ImageWrapper>
        ))}
      </ImageGrid>
      
      {/* Add the control bar */}
      <OverlayControlBar>
        <ControlsGroup>
          <CloseButton onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
            CLOSE
          </CloseButton>
        </ControlsGroup>
        
        {/* Right side with image counter */}
        <ControlsGroup>
          <ImageCounter>
            {images.length} IMAGES
          </ImageCounter>
        </ControlsGroup>
      </OverlayControlBar>
    </OverlayContainer>
  );
};

export default GalleryOverlay;