import styled from 'styled-components';

export const GalleryPageContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  background-color: white;
`;

export const GalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GalleryImage = styled.img<{ fillScreen: boolean; isWide: boolean }>`
  max-width: 100%;
  max-height: 100%;
  object-fit: ${props => props.fillScreen ? 'cover' : 'contain'};
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  @media (min-width: 769px) {
    width: ${props => props.isWide ? '100%' : 'auto'};
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: ${props => props.fillScreen ? '100%' : 'auto'};
  }
`;

export const ContactRectangle = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #0000FF;
  color: white;
  padding: 15px;
  font-family: 'Sequel Sans', sans-serif;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.6rem;
  
  @media (min-width: 769px) {
    width: 225px;
    height: 120px;
  }

  @media (max-width: 768px) {
    width: 110px;
    height: 160px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 180px;
    font-size: 0.3rem;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1rem;
  }

  p {
    margin: 5px 0;
  }
`;