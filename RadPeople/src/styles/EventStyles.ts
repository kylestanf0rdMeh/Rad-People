import { Link } from "react-router-dom";
import { styled } from "styled-components";

// Utility function
const fluidTypography = (minSize: number, maxSize: number, minWidth: number, maxWidth: number) => `
  font-size: ${minSize}rem;
  
  @media screen and (min-width: ${minWidth}px) {
    font-size: calc(${minSize}rem + (${maxSize} - ${minSize}) * ((100vw - ${minWidth}px) / (${maxWidth} - ${minWidth})));
  }
  
  @media screen and (min-width: ${maxWidth}px) {
    font-size: ${maxSize}rem;
  }
`;

const fluidSize = (minSize: number, maxSize: number, minWidth: number, maxWidth: number) => `
  calc(${minSize}px + (${maxSize} - ${minSize}) * ((100vw - ${minWidth}px) / (${maxWidth} - ${minWidth})))
`;

export const EventList = styled.div`
  display: grid;
  gap: 20px;
`;

export const EventCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  color: black;
`;

export const EventsContainer = styled.div<{ screenWidth: number; screenHeight: number }>`
  height: ${props => Math.min(props.screenWidth * 0.55, props.screenHeight * 0.95, 1000)}px;
  position: relative;
  margin-bottom: 2rem;
  
  @media (max-width: 767px) {
    height: ${props => Math.min(props.screenWidth * 1.3, props.screenHeight * 0.65, 1000)}px;
  }
`;

export const EventBackground = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: black;
`;

export const BackgroundImage = styled.div<{ 
  imageUrl: string; 
  isActive: boolean; 
  shouldShow: boolean;
  screenWidth: number 
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.shouldShow && props.isActive) ? 1 : 0};
  visibility: ${props => props.shouldShow ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 1.5)
    );
  }
`;

export const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.7)
    );
    pointer-events: none;
  }
`;

export const VideoWrapper = styled.div<{ screenWidth: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  will-change: opacity;
  z-index: 0;

  &.active {
    opacity: 1;
  }

  &:not(.active) {
    opacity: 0;
  }

  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    wistia-player {
      position: absolute;
      top: 50%;
      left: 50%;
      pointer-events: none;

      @media (min-width: 768px) {
        /* Desktop: Set only width and let height adjust automatically */
        width: 100vw !important;
        height: auto !important;
        transform: translate(-50%, -50%);
        
        /* Ensure the iframe and video maintain aspect ratio */
        iframe,
        video {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
      }

      @media (max-width: 767px) {
        /* Mobile: Keep current behavior */
        width: 200vw !important;
        height: 200vh !important;
        transform: translate(-50%, -50%) scale(1.2);
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.7)
      );
      pointer-events: none;
      z-index: 1;
    }
  }
`;


export const EventNamesContainer = styled.div<{ screenWidth: number; screenHeight: number }>`
  position: absolute;
  top: ${props => {
    const basePosition = Math.min(props.screenHeight * 0.5, props.screenWidth * 0.3);
    const minPosition = 200;
    const maxPosition = 800;
    return Math.min(Math.max(basePosition, minPosition), maxPosition);
  }}px;
  left: 0;
  width: 100%;
  margin: 0;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${props => Math.min(props.screenWidth * 0.01, 16)}px;
    padding: ${props => Math.min(props.screenWidth * 0.02, 70)}px ${props => Math.min(props.screenWidth * 0.03, 48)}px;
  }

  @media (max-width: 767px) {
    display: block;
    padding: 0 1rem;
    width: calc(100% - 2rem);
    top: auto;  // Remove top positioning
    bottom: 2rem;  // Position from bottom
  }
`;


export const EventTitle = styled.div`
  position: absolute;
  top: 2rem;
  left: 1rem;
  color: white;
  margin-left: 20px;

  @media (max-width: 767px) {
    top: 4.5rem;  // Changed from 6rem to 4rem to move it closer to event numbers
    left: 0.5rem;
    margin-left: 10px;
  }
`;

export const EventTitleText = styled.h2`
  font-family: 'Sequel Sans Regular';
  -webkit-text-stroke: 1px black;
  margin: 0;
  text-transform: uppercase;
  
  @media (min-width: 768px) {
    font-size: 10rem;
    line-height: 135px;
  }

  @media (max-width: 767px) {
    font-size: 3rem;
    line-height: 40px;
    -webkit-text-stroke: 1px white;
  }
`;

export const EventContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; // Ensure full width

`;

export const EventItemContainer = styled.div<{ isActive: boolean; screenWidth: number }>`
  opacity: ${props => props.isActive ? 1 : 0.4};
  transition: all 1.2s ease-in-out;
  margin-top: ${props => Math.min(props.screenWidth * 0.06, 24)}px;
  
  @media (min-width: 768px) {
    max-width: ${props => Math.min(props.screenWidth * 0.2, 350)}px;
  }
  
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 0;
    position: relative;  // Changed to relative
    opacity: ${props => props.isActive ? 1 : 0};
    pointer-events: ${props => props.isActive ? 'auto' : 'none'};
    transform: translateX(${props => props.isActive ? '0' : '20px'});
  }

  &:hover {
    opacity: 1;
  }
`;

export const EventLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const EventDate = styled.p`
  font-family: 'Helvetica Neue LT Com';
  color: white;
  margin: 0 0 0.5rem 0.5rem;
  text-transform: uppercase;
  ${fluidTypography(0.7, 1, 320, 1500)}

  @media (max-width: 767px) {
    font-size: 0.9rem;  // Increased font size for mobile
  }
`;

export const EventDetailsWrapper = styled.div`
  border: 1px solid white;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
`

export const EventName = styled.h3`
  font-family: 'Sequel Sans Regular';
  padding-left: 6px;
  color: white;
  cursor: pointer;
  margin: 0;
  text-transform: uppercase;
  line-height: 1.2;
  
  @media (max-width: 767px) {
    font-size: 1.5rem;
    white-space: normal;
    word-wrap: break-word;
    width: 100%;
  }
  
  @media (min-width: 768px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${fluidTypography(1.4, 2.2, 320, 1500)}
  }
`;



export const LocationIcon = styled.div`
  position: absolute;
  left: 0;
  top: 3px;
  height: ${fluidSize(8, 10, 320, 1500)}; // Fluid height from 12px to 16px
  margin-left: 9px;
  width: ${fluidSize(11, 15, 320, 1500)}; // Fluid width from 11px to 15px
  z-index: 1;

  &::before {
    content: '';
    display: block;
    width: ${fluidSize(5, 7, 320, 1500)}; // Fluid dot size from 5px to 7px
    height: ${fluidSize(5, 7, 320, 1500)};
    border-radius: 50%;
    background: #1404FB;
    margin-bottom: auto;
  }

  &::after {
    content: '';
    display: block;
    width: ${fluidSize(0.7, 1.2, 320, 1500)}; // Fluid line width from 1px to 1.2px
    height: 100%;
    background: #1404FB;
    position: relative;
    left: ${fluidSize(2, 3, 320, 1500)}; // Fluid left position from 2px to 3px
  }

  @media (max-width: 767px) {
    top: 7px;
    height: ${fluidSize(8, 30, 320, 1500)}; // Fluid height from 12px to 16px
  }
`;


export const EventLocation = styled.div`
  font-family: 'Sequel Sans Regular';
  color: white;
  margin: 0;
  margin-top: 5px;
  position: relative;
  line-height: 1.2;
  text-transform: uppercase;
  
  @media (max-width: 767px) {
    font-size: 1.5rem;
    max-width: 90vw;
    margin-top: 0px;
    padding-right: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  @media (min-width: 768px) {
    max-width: 350px;
    white-space: normal; // Allow wrapping
    ${fluidTypography(1.2, 1.9, 320, 1500)}
  }
`;

export const LocationFirstLine = styled.span`
  display: block;
  padding-left: 25px;  // Padding only for first line
`;

export const LocationWrappedLine = styled.span`
  display: block;
  margin-top: 3px;
  padding-left: 7px;     // No padding for wrapped lines
`;



export const EventDescription = styled.p`
  font-family: 'Sequel Sans Regular';
  color: white;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  opacity: 0.9;
  word-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: 767px) {
    max-width: 90vw;
    font-size: 0.8rem;
    line-height: 1.4;
    padding-bottom: 20px;
    margin-top: 17px;
    margin-bottom: 0; // Remove bottom margin
  }
  
  @media (min-width: 768px) {
    max-width: 300px;
    ${fluidTypography(0.7, 0.8, 320, 1500)}
  }
`;

export const MobileEventButton = styled.button`
  width: 90vw;  // Match description's max-width
  margin: 10px 10px 0;  // Match description's margins
  padding: 0.3rem 0;
  border: 1px solid black;
  background: white;
  color: black;
  font-family: 'Sequel Sans Regular';
  font-size: 0.7rem;
  display: flex;           
  justify-content: center; 
  align-items: center;     
  transition: all 0.3s ease-in-out;  // Add smooth transition

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    background: #1404FB;
    color: white;
    border-color: white;
  }
`;


// ---------------------------------- PAST EVENTS ----------------------------------

export const PastEventsTitle = styled.h2`
  font-family: 'Sequel Sans Regular';
  font-size: 4.5rem;
  color: black;
  margin: 2rem 0 3.5rem;
  padding: 0 2rem;

  @media (max-width: 767px) {
    font-size: 2.5rem;
    padding: 0 1rem;
    margin: 0.15rem 0 1.75rem;
  }
`;

export const PastEventName = styled.h3`
  font-family: 'Sequel Sans Regular';
  font-size: 2rem;
  color: black;
  margin: 0 0 0.3rem;  /* Reduced from 0.5rem to 0.2rem */
  text-transform: uppercase;
`;

export const PastEventDescription = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 0.85rem;
  color: black;
  margin: 0;
  line-height: 1.4;
`;

export const ViewOverlay = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  color: black;
  border: 1px solid black;
  font-size: 0.7rem;
  padding: 0.3rem 3rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sequel Sans Regular';

  &:hover {
    background: #1404FB;
    color: white;
    border-color: transparent;
    transition: background 0.3s ease-in-out;
  }
`;

export const PastEventCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  padding-bottom: 3rem;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    margin-bottom: 0.1rem;
  }
`;

export const PastEventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 1rem 4rem;
  
  /* Add empty columns to maintain layout */
  &::after {
    content: '';
    grid-column: span 4;
  }

  /* Ensure single items take up same space */
  ${PastEventCard} {
    min-height: 100%;
    width: 100%;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;  /* Single column on mobile */
    gap: 1rem;  /* Reduced gap for mobile */
    
    &::after {
      grid-column: span 1;  /* Update empty column span for mobile */
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  // margin-bottom: 0.01rem;
`;

export const MobileEventNav = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  top: 2rem;
  margin-left: 23px;
  z-index: 2;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const EventNumber = styled.button<{ isActive: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid white;
  border-radius: 0;
  background: ${props => props.isActive ? '#0000FF' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'white'};
  font-family: 'Sequel Sans Regular';
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  aspect-ratio: 1;
  box-sizing: border-box;
  outline: none;

  &:hover {
    background: ${props => props.isActive ? '#0000FF' : 'white'};
    color: ${props => props.isActive ? 'white' : 'black'};
  }

  &:focus {
    outline: none;
  }
`;