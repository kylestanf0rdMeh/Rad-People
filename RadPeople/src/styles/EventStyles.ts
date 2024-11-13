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
  height: ${props => Math.min(props.screenWidth * 0.5, props.screenHeight * 0.9, 1000)}px;
  position: relative;
  margin-bottom: 2rem;
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

export const BackgroundImage = styled.div<{ imageUrl: string; isActive: boolean; screenWidth: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => Math.min(props.screenWidth * 0.5, 1000)}px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity 2s ease-in-out;

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
  transition: opacity 0.8s ease-in-out;
  will-change: opacity;

  &.active {
    opacity: 1;
  }

  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1.01);
    
    iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw !important;
      height: 56.25vw !important;
      min-height: 100%;
      min-width: 177.77vh;
      transform: translate(-50%, -50%);
      pointer-events: none;
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
    const basePosition = Math.min(props.screenHeight * 0.6, props.screenWidth * 0.27);
    const minPosition = 200; // minimum distance from top
    const maxPosition = 800; // maximum distance from top
    return Math.min(Math.max(basePosition, minPosition), maxPosition);
  }}px;
  left: 0;
  width: 100%;
  margin: 0;
  padding: ${props => Math.min(props.screenWidth * 0.02, 70)}px ${props => Math.min(props.screenWidth * 0.03, 48)}px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => Math.min(props.screenWidth * 0.01, 16)}px;
`;


export const EventTitle = styled.div`
  position: absolute;
  top: 2rem;
  left: 1rem;
  color: white;
`;

export const EventTitleText = styled.h2`
  font-family: 'Sequel Sans Regular';
  font-size: 10rem;
  -webkit-text-stroke: 1px black;
  line-height: 135px;
  margin: 0;
  text-transform: uppercase;
`;

export const EventContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const EventItemContainer = styled.div<{ isActive: boolean; screenWidth: number }>`
  max-width: ${props => Math.min(props.screenWidth * 0.2, 350)}px;
  opacity: ${props => props.isActive ? 1 : 0.6};
  transition: opacity 0.7s ease;
  margin-top: ${props => Math.min(props.screenWidth * 0.01, 24)}px;
  
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
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  ${fluidTypography(0.7, 0.9, 320, 1500)}
`;

export const EventName = styled.h3`
  font-family: 'Sequel Sans Regular';
  color: white;
  cursor: pointer;
  margin: 0;
  word-wrap: break-word;
  hyphens: auto;
  text-transform: uppercase;
  line-height: 0.9;
  ${fluidTypography(1.4, 2.2, 320, 1500)}
`;



export const LocationIcon = styled.div`
  position: absolute;
  left: 0;
  top: 4px;
  height: ${fluidSize(8, 16, 320, 1500)}; // Fluid height from 12px to 16px
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
`;


export const EventLocation = styled.div`
  font-family: 'Sequel Sans Regular';
  color: white;
  margin: 0;
  margin-top: 5px;
  position: relative;
  line-height: 1;
  text-transform: uppercase;
  max-width: 350px;
  ${fluidTypography(1.2, 1.9, 320, 1500)}
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
  max-width: 300px;
  margin-left: 10px;
  opacity: 0.9;
  word-wrap: break-word;
  hyphens: auto;
  ${fluidTypography(0.7, 0.8, 320, 1500)}
`;


// ---------------------------------- PAST EVENTS ----------------------------------

export const PastEventsTitle = styled.h2`
  font-family: 'Sequel Sans Regular';
  font-size: 2.5rem;
  color: black;
  margin: 4rem 0 2rem;
  padding: 0 2rem;
`;

export const PastEventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 2rem 4rem;
`;

export const PastEventCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    margin-bottom: 1rem;
  }
`;

export const PastEventName = styled.h3`
  font-family: 'Sequel Sans Regular';
  font-size: 1.2rem;
  color: black;
  margin: 0 0 0.5rem;
`;

export const PastEventDescription = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 0.8rem;
  color: black;
  margin: 0;
  line-height: 1.4;
`;