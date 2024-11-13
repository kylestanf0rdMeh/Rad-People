import styled from 'styled-components';


export const theme = {
    imageMargin: 5,
    imageHeight: 120,
};


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
  right: 5px;
  background-color: #0000FF;
  color: white;
  padding: 15px;
  border: 1px solid #000000; // Changed to solid black border
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
    right: 8px;
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

export const OverlayButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background-color: white;
  border: 1px solid #000000;
  border-radius: 0; // Remove border radius for square shape
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  padding: 0;
  
  svg {
    width: 25px;
    height: 25px;
    stroke: black;
    stroke-width: 2;
    fill: none;
  }

  &:focus {
    outline: none;
  }
`;

export const CloseButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #0000FF;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
  
  svg {
    width: 18px;
    height: 18px;
    stroke: white;
    stroke-width: 2;
    fill: none;
  }

  &:focus {
    outline: none;
  }
`;