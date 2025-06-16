import styled from "styled-components";


export const EventContentContainer = styled.div`
  position: relative;
  min-height: 100vh;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767px) {
    display: block;
  }
`;

export const FixedBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  border-radius: 0;
  
  @media (max-width: 767px) {
    position: absolute; 
    height: 70%;  // Fill the container
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

export const EventDetailsInfoOverlay = styled.div`
  position: absolute;
  bottom: 3.5rem;
  left: 2rem;
  width: 30%;
  z-index: 5;
  
  @media (max-width: 767px) {
    bottom: 5rem;
    left: 1rem;
    width: 75%;
  }
`;

export const EventDetailLocation = styled.div`
  font-family: 'Sequel Sans Regular';
  color: white;
  margin: 0;
  margin-top: 5px;
  position: relative;
  line-height: 1.2;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const EventDetailLocationText = styled.span`
  display: block;
  padding-left: 25px;
`;

export const DetailEventDescription = styled.p`
  font-family: 'Sequel Sans Regular';
  color: white;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  opacity: 0.9;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 100%; // Allow full width
  line-height: 1.2; // Tighter line height
  font-size: 0.8rem; // Smaller font size
  white-space: normal; // Allow wrapping
  overflow: hidden; // Hide overflow
  display: -webkit-box;
  -webkit-line-clamp: 3; // Show up to 3 lines
  -webkit-box-orient: vertical;
  
  @media (max-width: 767px) {
    max-width: 90vw;
    font-size: 0.65rem; // Even smaller on mobile
    -webkit-line-clamp: 2; // Show fewer lines on mobile
  }
`;

// For image backgrounds
export const FixedBackgroundImage = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  display: block;
  padding: 0;
  margin: 0;
`;

// For video backgrounds - updated to match the fixed-position-video approach
export const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: -1rem;
  overflow: hidden;
  border-radius: 0;
  
  @media (max-width: 767px) {
    position: absolute;
    margin-left: 0;
    height: 100%;
    top: 0;
    left: 0;
    border-bottom: 1px solid black;
  }
  
  /* This is the key part - ensure the Wistia player maintains its size */
  .wistia-player-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 1920px !important;
    height: 1080px !important;
    max-width: none !important;
    object-fit: none !important;
    pointer-events: none;
    border-radius: 0;
    
    @media (max-width: 767px) {
      position: absolute;
      top: 50%;
      left: 50%;
      /* Add scale to zoom out the video - adjust the 0.6 value as needed */
      transform: translate(-50%, -50%) scale(0.6);
    }
  }

  /* Target all possible elements inside the Wistia player */
  iframe, video, div {
    border-radius: 0 !important;
  }
`;

// Update RightColumnDescription to show all content
export const RightColumnDescription = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  line-height: 1.4;
  margin-top: 1.2rem;
  white-space: normal;
  word-wrap: break-word;
  margin-bottom: 2rem; // Add bottom margin for footer spacing
`;

// Update RightColumnOverlay to grow with content
export const RightColumnOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 22%;
  height: 100%; // <-- Use height, not min-height
  background-color: white;
  z-index: 10;
  border-left: 1px solid #e5e7eb;
  overflow-y: auto; // <-- Enable vertical scrolling
  padding: 20px;
  color: black;
  flex-direction: column;
  box-sizing: border-box;

  @media (prefers-color-scheme: dark) {
    background-color: white;
    border-left: 1px solid #374151;
    color: black;
  }
`;

export const OverlayBackButton = styled.h2`
  font-size: 0.8rem;
  margin-top: 1rem;
  font-weight: regular;
  margin-bottom: 1rem;
  color: black;
  margin-left: -7px; /* Added negative margin to move closer to the left border */
`;

export const BackNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-top: -1rem; /* Added the 2rem margin top here */
  margin-left: -3px; /* Added negative margin to move closer to the left border */
  `;

export const OverlayTItle = styled.p`
  margin-top: 20rem;
  font-size: 2.8rem;
  color: black;
  font-weight: semi-bold;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 2.5rem;
  margin-left: -3px;
  width: 90%;
`;

export const EventTitle = styled.h1`
  position: absolute; // Changed from fixed
  top: 40px;
  left: 20px;
  z-index: 5;
  font-family: 'Sequel Sans Regular';
  -webkit-text-stroke: 1px black;
  margin: 0;
  text-transform: uppercase;
  color: white;
  width: 60%;
  word-wrap: break-word;
  
  @media (min-width: 1251px) {
    font-size: 6rem;
    line-height: 5.5rem;
  }

  @media (min-width: 991px) and (max-width: 1250px) {
    font-size: 4rem;
    line-height: 4.5rem;
  }

  @media (min-width: 768px) and (max-width: 990px) {
    font-size: 5rem;
    line-height: 4.2rem;
  }

  @media (max-width: 767px) {
    font-size: 2.5rem;
    line-height: 3rem;
    -webkit-text-stroke: 1px white;
  }
`;

export const AlternateDescription = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  line-height: 1.1;
  margin-top: -1.3rem;
  text-transform: uppercase;
`;

export const OverlayDate = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  text-transform: uppercase;
  margin-top: -1rem;
  font-weight: semi-bold;
`

export const OverlayTime = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  text-transform: uppercase;
  margin-top: -1.1rem;
  font-weight: semi-bold;
`

export const LocationText = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  line-height: 1.4;
  margin-top: 1.6rem;
`;


// ------------------------ MOBILE VIEW ELEMENTS ------------------------

export const MobileViewContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 5;
`;

export const MobileBackNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  padding: 0.5rem;
  border-top: none;
  border-bottom: 1px solid black;
  z-index: 10;
  cursor: pointer;
`;

export const MobileBackButton = styled.h2`
  font-size: 0.8rem;
  font-weight: regular;
  color: black;
  margin: 0;
`;

export const MobileEventContent = styled.div`
  position: relative;
  width: 100%;
  height: 60vh; // Fixed height for mobile
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden; // Ensure content stays within bounds
  
  /* This ensures the FixedBackgroundContainer appears within this container */
  & > ${FixedBackgroundContainer} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const MobileEventTitle = styled.h1`
  font-family: 'Sequel Sans Regular';
  color: white;
  text-transform: uppercase;
  margin: 0;
  padding: 1rem;
  font-size: 1.8rem;
  line-height: 2.5rem;
  -webkit-text-stroke: 0.7px black;
  position: absolute;
  top: 1rem;
  left: 0;
  z-index: 6;
  width: 80%;
  word-wrap: break-word;
`;

export const MobileEventInfoOverlay = styled.div`
  width: 100%;
  padding: 1rem;
  padding-bottom: 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 6;
`;

export const MobileDetailsSection = styled.div`
  border-top: 1px solid black;
  padding: 1rem;
  background-color: white;
  color: black;
  width: 100%;
  box-sizing: border-box;
  max-height: 50vh;   
  overflow-y: auto;   
`;

export const MobileEventDetailTitle = styled.h2`
  font-size: 1.8rem;
  line-height: 2rem;
  color: black;
  text-transform: uppercase;
  margin: 0;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
  font-family: 'Sequel Sans Regular';
`;

export const MobileAlternateDescription = styled.p`
  font-size: 0.8rem;
  color: black;
  line-height: 1.1;
  margin-bottom: -0.9rem;
  text-transform: uppercase;
`;

export const MobileEventDate = styled.p`
  font-size: 0.8rem;
  color: black;
  margin-bottom: -1.1rem;
  text-transform: uppercase;
  font-weight: semi-bold;
`;

export const MobileEventTime = styled.p`
  font-size: 0.8rem;
  color: black;
  text-transform: uppercase;
  font-weight: semi-bold;
`;

export const MobileLocationText = styled.p`
  font-size: 0.8rem;
  color: black;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

export const MobileEventDescription = styled.p`
  font-size: 0.8rem;
  color: black;
  line-height: 1.4;
  white-space: normal;
  word-wrap: break-word;
  margin: 0;
  margin-bottom: 2rem;
`;