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

export const GalleryImage = styled.img<{ fillScreen: boolean }>`
  max-width: 100%;
  max-height: 100%;
  object-fit: ${props => props.fillScreen ? 'cover' : 'contain'};
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (min-width: 769px) {
    height: 100%;
    width: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: ${props => props.fillScreen ? '100%' : 'auto'};
  }
`;