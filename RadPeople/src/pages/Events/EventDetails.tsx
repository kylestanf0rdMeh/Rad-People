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
import { DetailEventName, EventContentWrapper, EventDate, EventItemContainer, EventName, LocationIcon } from '../../styles/EventStyles';
import { FaChevronDown } from 'react-icons/fa';
import { EventContentContainer, FixedBackgroundContainer, VideoContainer, FixedBackgroundImage, EventTitle, EventDetailsInfoOverlay, EventDetailLocation, EventDetailLocationText, DetailEventDescription, RightColumnOverlay, BackNavigation, OverlayBackButton, OverlayTItle, AlternateDescription, OverlayDate, OverlayTime, LocationText, RightColumnDescription, MobileViewContainer, MobileBackNavigation, MobileBackButton, MobileEventContent, MobileEventTitle, MobileEventInfoOverlay, MobileDetailsSection, MobileEventDetailTitle, MobileAlternateDescription, MobileEventDate, MobileEventTime, MobileLocationText, MobileEventDescription } from '../../styles/EventDetailsStyles';
import { TextScramble } from '../../components/motion-primitives/text-scramble';

interface LocationState {
  event: EventItem;
}


const EventDetails: React.FC = () => {
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string; name: string }>();
  const state = location.state as LocationState;
  const wistiaContainerRef = useRef<HTMLDivElement>(null);
  const mobileDetailsRef = useRef<HTMLDivElement>(null);
  const { width: screenWidth } = useWindowDimensions();
  const navigate = useNavigate();

  // Add all state hooks at the top
  const [event, setEvent] = useState<EventItem | null>(state?.event || null);
  const [loading, setLoading] = useState(!state?.event && !!eventId);
  const [error, setError] = useState(false);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);


  useEffect(() => {
    const loadEvent = async () => {
      const stored = sessionStorage.getItem('selectedEvent');
      if (stored) {
        setEvent(JSON.parse(stored));
        sessionStorage.removeItem('selectedEvent');
        setFetchAttempted(true);
        setLoading(false);
        return;
      }
      if (eventId) {
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
  }, [eventId]);


  // Scroll down for mobile icon
  useEffect(() => {
    const el = mobileDetailsRef.current;
    if (!el) return;
  
    // Show indicator only if content is scrollable and at the top
    const checkScroll = () => {
      setShowScrollDown(el.scrollTop === 0 && el.scrollHeight > el.clientHeight);
    };
  
    checkScroll(); // Initial check
  
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
  
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

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
        <EventContentContainer>
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


          {/* Conditional rendering based on screen width */}
          {screenWidth > 767 ? (
            // Desktop Layout
            <>
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
                      <DetailEventDescription>
                        {event.fields.description?.split('\n')[0] || ''}
                      </DetailEventDescription>
                    )}
                  </EventContentWrapper>
                </EventItemContainer>
              </EventDetailsInfoOverlay>
              
              {/* Right column information panel */}
              <RightColumnOverlay>
              <BackNavigation as="a" href="/events" style={{ cursor: 'pointer' }}>
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

                {event?.fields.description && (
                    <RightColumnDescription>
                      {event.fields.description}
                    </RightColumnDescription>
                )}
              </RightColumnOverlay>
            </>
          ) : (
            // Mobile Layout
            <MobileViewContainer>
              {/* Back Navigation at top with bottom border */}
              <MobileBackNavigation onClick={handleBackClick}>
                <IoArrowBack size={16} color="black" />
                <MobileBackButton>BACK TO EVENTS</MobileBackButton>
              </MobileBackNavigation>

              {/* Mobile Event Content */}
              <MobileEventContent>
                {/* Event title */}
                <MobileEventTitle>{event?.fields.name}</MobileEventTitle>

                {/* Event info from EventDetailsInfoOverlay */}
                <MobileEventInfoOverlay>
                  <EventContentWrapper>
                    {event?.fields.date && (
                      <EventDate>
                        {formatDateShort(event.fields.date)}
                      </EventDate>
                    )}

                    <DetailEventName>{event?.fields.name}</DetailEventName>
                    
                    {event?.fields.location && (
                    <EventDetailLocation>
                      <LocationIcon />
                      <EventDetailLocationText>{event.fields.location}</EventDetailLocationText>
                    </EventDetailLocation>
                    )}
                    
                    {event?.fields.description && (
                      <DetailEventDescription>
                        {event.fields.description?.split('\n')[0] || ''}
                      </DetailEventDescription>
                    )}
                  </EventContentWrapper>
                </MobileEventInfoOverlay>
              </MobileEventContent>

              {/* Content from RightColumnOverlay */}
              <MobileDetailsSection ref={mobileDetailsRef}>
                {/* Event details */}
                <MobileEventDetailTitle>
                  {event?.fields.name}
                </MobileEventDetailTitle>
                
                {event?.fields.alternateDescription && (
                  <MobileAlternateDescription>
                    {event.fields.alternateDescription}
                  </MobileAlternateDescription>
                )}

                {event?.fields.date && (
                  <MobileEventDate>
                    {formatDate(event.fields.date)}
                  </MobileEventDate>
                )}

                {event?.fields.time && (
                  <MobileEventTime>
                    {event.fields.time}
                  </MobileEventTime>
                )}
                
                {event?.fields.location && (
                  <MobileLocationText>
                    {event.fields.location}
                  </MobileLocationText>
                )}

                {event?.fields.description && (
                  <MobileEventDescription>
                    {event.fields.description}
                  </MobileEventDescription>
                )}
              </MobileDetailsSection>
              {showScrollDown && (
                <div
                  style={{
                    position: 'absolute',
                    left: '95%',
                    bottom: '0.4rem',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    background: 'transparent',
                    border: '1px solid black',
                    borderRadius: '0px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaChevronDown color="#1404fb" size={7} />
                </div>
              )}
            </MobileViewContainer>
          )}
        </EventContentContainer>
      </Layout>
    </PageWrapper>
  );
};

export default EventDetails;