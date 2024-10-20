import styled from 'styled-components';

export const GalleryPageContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 40px); // Adjust this value based on your navbar height
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const GalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GalleryImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  @media (min-width: 769px) {
    height: 100%;
    width: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const NavigationButton = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${({ side }) => side}: 0;
  width: 50%;
  height: 100%;
  background: none;
  border: none;
  cursor: ${({ side }) => (side === 'left' ? 'w-resize' : 'e-resize')};
  z-index: 10;
`;