// ... existing code ...
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import { EventItem } from '../../models/Event.model';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';
import { fetchSingleEvent } from '../../middleware/Events';
import { WistiaPlayer } from '@wistia/wistia-player-react';
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
  width: 17%;
  height: 100vh;
  background-color: white;
  z-index: 10;
  border-left: 1px solid #e5e7eb;
  overflow-y: auto;
  padding: 20px;
  color: black;
  
  @media (prefers-color-scheme: dark) {
    background-color: white;
    border-left: 1px solid #374151;
    color: black;
  }
`;

// New styled components for the right column content
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: black;
`;

const SectionDescription = styled.p`
  margin-bottom: 1rem;
  color: black;
`;

const SectionContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoCard = styled.div`
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
`;

const InfoCardTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: black;
`;

const InfoCardText = styled.p`
  font-size: 0.875rem;
  color: black;
`;

const EventTitle = styled.h1`
  position: fixed;
  top: 30px;
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
    font-size: 3rem;
    line-height: 3.5rem;
  }

  @media (max-width: 767px) {
    font-size: 2.5rem;
    line-height: 3rem;
    -webkit-text-stroke: 1px white;
  }
`;

const EventDetails: React.FC = () => {
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string; name: string }>();
  const state = location.state as LocationState;
  const wistiaContainerRef = useRef<HTMLDivElement>(null);

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
  }, [eventId, event]);

  // Helper function to get video ID or image URL
  const getEventMedia = () => {
    if (!event) return { hasVideo: false, videoId: null, imageUrl: '' };
    
    const hasVideo = !!event.fields.wistiaVideo?.items?.[0]?.hashed_id;
    const videoId = hasVideo ? event.fields.wistiaVideo.items[0].hashed_id : null;
    const imageUrl = event.fields.thumbnailImage?.[0]?.fields?.file?.url || '';
    
    return { hasVideo, videoId, imageUrl };
  };

  // Effect to apply custom styling to Wistia player after it loads
  useEffect(() => {
    if (wistiaContainerRef.current) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            // Find the Wistia player element and apply our custom styling
            const wistiaPlayer = wistiaContainerRef.current?.querySelector('wistia-player');
            if (wistiaPlayer) {
              wistiaPlayer.setAttribute('style', 
                'position: absolute; top: 0; left: 0; width: 1920px !important; height: 1080px !important; max-width: none !important; object-fit: none !important; pointer-events: none;'
              );
            }
          }
        });
      });
      
      observer.observe(wistiaContainerRef.current, { childList: true, subtree: true });
      
      return () => {
        observer.disconnect();
      };
    }
  }, []);

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
          
          {/* Right column information panel */}
          <RightColumnOverlay>
            <SectionTitle>Event Information</SectionTitle>
            <SectionDescription>
              {event?.fields.description || 'No description available.'}
            </SectionDescription>
            
            <SectionContainer>
              {event?.fields.date && (
                <InfoCard>
                  <InfoCardTitle>Date & Time</InfoCardTitle>
                  <InfoCardText>
                    {new Date(event.fields.date).toLocaleDateString()}
                  </InfoCardText>
                </InfoCard>
              )}
              
              {event?.fields.location && (
                <InfoCard>
                  <InfoCardTitle>Location</InfoCardTitle>
                  <InfoCardText>
                    {event.fields.location}
                  </InfoCardText>
                </InfoCard>
              )}
              
              {/* Add more sections as needed */}
            </SectionContainer>
          </RightColumnOverlay>
        </>
      </Layout>
    </PageWrapper>
  );
};

export default EventDetails;