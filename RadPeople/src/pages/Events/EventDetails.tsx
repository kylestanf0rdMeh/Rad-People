// ... existing code ...
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Navigate, useParams, useNavigate } from 'react-router-dom';
import { EventItem } from '../../models/Event.model';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';
import { fetchSingleEvent } from '../../middleware/Events';
import { WistiaPlayer } from '@wistia/wistia-player-react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { IoArrowBack } from 'react-icons/io5'; // Import back arrow icon
import { EventContentWrapper, EventDate, EventDescription, EventItemContainer, EventLink, EventLocation, EventName, LocationFirstLine, LocationIcon } from '../../styles/EventStyles';
import styled from 'styled-components';

interface LocationState {
  event: EventItem;
}

// Fixed background container
const FixedBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 0;
  margin: 0;
  z-index: 1;
`;

const EventDetailsInfoOverlay = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  width: 30%;
  z-index: 5;
  
  @media (max-width: 767px) {
    bottom: 5rem;
    left: 1rem;
    width: 75%;
  }
`;

const EventDetailLocation = styled.div`
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

const EventDetailLocationText = styled.span`
  display: block;
  padding-left: 25px;
`;

// For image backgrounds
const FixedBackgroundImage = styled.div<{ imageUrl: string }>`
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
const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  /* This is the key part - ensure the Wistia player maintains its size */
  .wistia-player-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 1920px !important; /* Fixed width */
    height: 1080px !important; /* Fixed height */
    max-width: none !important;
    object-fit: none !important;
    pointer-events: none;
  }
`;

const RightColumnOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 22%;
  height: 100vh;
  background-color: white;
  z-index: 10;
  border-left: 1px solid #e5e7eb;
  overflow-y: auto;
  padding: 20px;
  color: black;
  flex-direction: column;
  
  @media (prefers-color-scheme: dark) {
    background-color: white;
    border-left: 1px solid #374151;
    color: black;
  }
`;

// New styled components for the right column content
const OverlayBackButton = styled.h2`
  font-size: 0.8rem;
  margin-top: 1rem;
  font-weight: regular;
  margin-bottom: 1rem;
  color: black;
  margin-left: -7px; /* Added negative margin to move closer to the left border */
`;

const BackNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-top: 1rem; /* Added the 2rem margin top here */
  margin-left: -3px; /* Added negative margin to move closer to the left border */
  `;

const OverlayTItle = styled.p`
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

const EventTitle = styled.h1`
  position: fixed;
  top: 90px;
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

const AlternateDescription = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  line-height: 1.1;
  margin-top: -1.3rem;
  text-transform: uppercase;
`;

const OverlayDate = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  text-transform: uppercase;
  margin-top: -1rem;
  font-weight: semi-bold;
`

const OverlayTime = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  text-transform: uppercase;
  margin-top: -1.1rem;
  font-weight: semi-bold;
`

const LocationText = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-left: -3px;
  line-height: 1.4;
  margin-top: 1.6rem;
`;

const EventDetails: React.FC = () => {
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string; name: string }>();
  const state = location.state as LocationState;
  const wistiaContainerRef = useRef<HTMLDivElement>(null);
  const { width: screenWidth } = useWindowDimensions();
  const navigate = useNavigate(); // Add this hook to handle navigation


  // Add all state hooks at the top
  const [event, setEvent] = useState<EventItem | null>(state?.event || null);
  const [loading, setLoading] = useState(!state?.event && !!eventId);
  const [error, setError] = useState(false);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      if (!event && eventId) {
        try {
          setLoading(true);
          const fetchedEvent = await fetchSingleEvent(eventId);
          setEvent(fetchedEvent);
        } catch (err) {
          console.error('Error loading event:', err);
          setError(true);
        } finally {
          setLoading(false);
          setFetchAttempted(true);
        }
      } else {
        setFetchAttempted(true);
      }
    };

    loadEvent();
    console.log(event)
  }, [eventId, event]);

  // Helper function to get video ID or image URL
  const getEventMedia = () => {
    if (!event) return { hasVideo: false, videoId: null, imageUrl: '' };
    
    const hasVideo = !!event.fields.wistiaVideo?.items?.[0]?.hashed_id;
    const videoId = hasVideo ? event.fields.wistiaVideo.items[0].hashed_id : null;
    const imageUrl = event.fields.thumbnailImage?.[0]?.fields?.file?.url || '';
    
    return { hasVideo, videoId, imageUrl };
  };

  // Handler for back navigation
  const handleBackClick = () => {
    navigate('/events');
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      // Format as MM.DD.YYYY
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}.${day}.${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string if parsing fails
    }
  };

    // Helper function to format date in MM.DD.YY format
    const formatDateShort = (dateString: string): string => {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        }).replace(/\//g, '.');
      } catch (error) {
        console.error('Error formatting date:', error);
        return '';
      }
    };


  if (loading) {
    return <div>Loading...</div>;
  }

  if ((error || !event) && fetchAttempted) {
    return <Navigate to="/events" replace />;
  }

  const { hasVideo, videoId, imageUrl } = getEventMedia();

  return (
    <PageWrapper>
      <Layout>
        <>
          {/* Fixed position background (image or video) */}
          <FixedBackgroundContainer>
            {hasVideo && videoId ? (
              <VideoContainer>
                <div ref={wistiaContainerRef} className="wistia-player-container">
                  <WistiaPlayer
                    mediaId={videoId}
                    autoplay={true}
                    playBarControl={false}
                    fullscreenControl={false}
                    volumeControl={false}
                    controlsVisibleOnLoad={false}
                    playerColor="000000"
                    muted={true}
                    silentAutoplay={true}
                    endVideoBehavior="loop"
                    doNotTrack={true}
                  />
                </div>
              </VideoContainer>
            ) : (
              <FixedBackgroundImage imageUrl={imageUrl} />
            )}
          </FixedBackgroundContainer>
          
          {/* Event title overlay */}
          <EventTitle>{event?.fields.name}</EventTitle>

          {/* Add the event info overlay similar to Events.tsx */}
          <EventDetailsInfoOverlay>
            <EventItemContainer
              isActive={true}
              screenWidth={screenWidth || 1000} // Default value if screenWidth is undefined
            >
              <EventContentWrapper>
                {event?.fields.date && (
                  <EventDate>
                    {formatDateShort(event.fields.date)}
                  </EventDate>
                )}

                <EventName>{event?.fields.name}</EventName>
                
                {event?.fields.location && (
                <EventDetailLocation>
                  <LocationIcon />
                  <EventDetailLocationText>{event.fields.location}</EventDetailLocationText>
                </EventDetailLocation>
              )}
                
                {event?.fields.description && (
                  <EventDescription>
                    {(() => {
                      const description = event.fields.description?.split('\n')[0] || '';
                      const charLimit = 300;
                      
                      return description.length > charLimit 
                        ? `${description.slice(0, charLimit)}...`
                        : description;
                    })()}
                  </EventDescription>
                )}
              </EventContentWrapper>
            </EventItemContainer>
          </EventDetailsInfoOverlay>
          
          {/* Right column information panel */}
          <RightColumnOverlay>
            <BackNavigation onClick={handleBackClick}>
              <IoArrowBack size={16} color="black" />
              <OverlayBackButton>BACK TO EVENTS</OverlayBackButton>
            </BackNavigation>

            {/* Further event details */}
            <OverlayTItle>
              {event?.fields.name}
            </OverlayTItle>
            
            {event?.fields.alternateDescription && (
              <AlternateDescription>
                {event.fields.alternateDescription}
              </AlternateDescription>
            )}

            {event?.fields.date && (
              <OverlayDate>
                {formatDate(event.fields.date)}
              </OverlayDate>
            )}

            {event?.fields.time && (
              <OverlayTime>
                {event.fields.time}
              </OverlayTime>
            )}
            
            {event?.fields.location && (
              <LocationText>
                {event.fields.location}
              </LocationText>
            )}
          </RightColumnOverlay>
        </>
      </Layout>
    </PageWrapper>
  );
};

export default EventDetails;