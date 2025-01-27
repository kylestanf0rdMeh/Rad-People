import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { EventItem } from '../models/Event.model';
import PageWrapper from '../components/PageWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useEvents } from '../contexts/EventsContext';
import { BackgroundImage, VideoWrapper, EventBackground, EventContentWrapper, EventDate, EventDescription, EventItemContainer, EventLink, EventLocation, EventName, EventNamesContainer, EventsContainer, EventTitle, EventTitleText, LocationFirstLine, LocationIcon, LocationWrappedLine, PastEventsTitle, PastEventsList, PastEventCard, PastEventName, PastEventDescription, ViewOverlay } from '../styles/EventStyles';
import { Link } from 'react-router-dom';
import { WistiaPlayer } from '@wistia/wistia-player-react';

declare global {
  interface Window {
    _wq: Array<{
      id: string;
      options: {
        doNotTrack: boolean;
        plugin: {
          metrics: boolean;
          googleAnalytics4: boolean;
          visitorTracking: boolean;
        };
      };
    }>;
  }
}

if (typeof window !== 'undefined') {
  window._wq = window._wq || [];
  window._wq.push({
    id: '*',
    options: {
      doNotTrack: true,
      plugin: {
        metrics: false,
        googleAnalytics4: false,
        visitorTracking: false
      }
    }
  });
}

const Events: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { events, loading, prefetchEvents } = useEvents();
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [activeEventImage, setActiveEventImage] = useState<string>('');
  const [activeEventId, setActiveEventId] = useState<string>('');
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set());

  // Trigger fetch on mount
  useEffect(() => {
    prefetchEvents();
  }, [prefetchEvents]);

  // Process events when data arrives
  useEffect(() => {
    if (events.length > 0) {
      const { past, upcoming } = categorizeEvents(events);
      const sortedUpcoming = sortEventsByDate(upcoming);
      
      setUpcomingEvents(sortedUpcoming);
      setPastEvents(sortEventsByDate(past, false));

      // Set initial active event
      if (sortedUpcoming.length > 0) {
        const firstEvent = sortedUpcoming[0];
        const media = getEventMedia(firstEvent);
        setActiveEventId(firstEvent.sys.id);
        setActiveEventImage(media.url);
        if (media.isVideo && media.videoId) {
          setCurrentVideo(media.videoId);
        }
      }
    }
  }, [events]);

  // Preload videos when upcoming events are set
  useEffect(() => {
    const videoIds = upcomingEvents
      .map(event => event.fields.wistiaVideo?.items?.[0]?.hashed_id)
      .filter((id): id is string => !!id);

    videoIds.forEach(videoId => {
      if (!preloadedVideos.has(videoId)) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'iframe';
        preloadLink.href = `https://fast.wistia.net/embed/iframe/${videoId}?background=true&autoPlay=true&loop=true`;
        document.head.appendChild(preloadLink);
        setPreloadedVideos(prev => new Set([...prev, videoId]));
      }
    });
  }, [upcomingEvents, preloadedVideos]);

  const sortEventsByDate = (events: EventItem[], ascending: boolean = true) => {
    return [...events].sort((a, b) => {
      const comparison = new Date(a.fields.date).getTime() - new Date(b.fields.date).getTime();
      return ascending ? comparison : -comparison;
    });
  };

  // Helper function to get the appropriate media URL for an event
  const getEventMedia = (event: EventItem): { url: string; isVideo: boolean; videoId?: string } => {
    // Check for Wistia video first
    if (event.fields.wistiaVideo?.items?.[0]) {
      const wistiaItem = event.fields.wistiaVideo.items[0];
      return {
        url: `https://fast.wistia.net/embed/iframe/${wistiaItem.hashed_id}`,
        isVideo: true,
        videoId: wistiaItem.hashed_id
      };
    }
    
    // Fallback to thumbnail image
    return {
      url: event.fields.thumbnailImage?.[0]?.fields?.file?.url || '',
      isVideo: false
    };
  };

  const categorizeEvents = (events: EventItem[]) => {
    const now = new Date();
    return events.reduce<{ past: EventItem[], upcoming: EventItem[] }>(
      (acc, event) => {
        const eventDate = new Date(event.fields.date);
        const category = eventDate < now ? 'past' : 'upcoming';
        acc[category].push(event);
        return acc;
      },
      { past: [], upcoming: [] }
    );
  };

  // Helper function to split text into lines based on width
  const splitIntoLines = (text: string, maxChars: number = 15) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      if ((currentLine + ' ' + word).length <= maxChars) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const handleEventHover = (event: EventItem) => {
    const videoId = event.fields.wistiaVideo?.items?.[0]?.hashed_id;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (videoId) {
      // Keep current video playing while fading out
      // Immediately set new video to start loading/playing
      setCurrentVideo(videoId);
    } else {
      setCurrentVideo(null);
    }

    setActiveEventId(event.sys.id);
    setActiveEventImage(event.fields.thumbnailImage?.[0]?.fields?.file?.url || '');
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Add debug logging
  useEffect(() => {
    if (events.length > 0) {
      // console.log('First video data:', events[0].fields.wistiaVideo?.items?.[0]);
    }
  }, [events]);

  // Add useEffect to fetch events if none exist
  useEffect(() => {
    if (!events.length && !loading) {
      prefetchEvents();
    }
  }, [events.length, loading, prefetchEvents]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <Layout>
        {upcomingEvents.length > 0 && (
        <>
          <EventsContainer screenWidth={screenWidth} screenHeight={screenHeight}>
            {/* VIDEO BACKGROUND */}
            <EventBackground imageUrl={activeEventImage}>
              <div className="video-background">
                {upcomingEvents.map(event => {
                  const videoId = event.fields.wistiaVideo?.items?.[0]?.hashed_id;
                  if (!videoId) return null;
                  
                  return (
                    <VideoWrapper 
                      key={videoId}
                      screenWidth={screenWidth} 
                      className={activeEventId === event.sys.id ? 'active' : ''}
                    >
                      <div className="video-container">
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
                          onLoadStart={(_event) => {
                            // console.log('Video loading started:', videoId);
                          }}
                          onLoadedData={(_event) => {
                            // console.log('Video loaded:', videoId);
                          }}
                          onLoadedMediaData={(_event) => {
                            // console.log('Media data loaded:', videoId);
                          }}
                        />
                      </div>
                    </VideoWrapper>
                  );
                })}
              </div>
              {!currentVideo && (
                <BackgroundImage 
                  imageUrl={activeEventImage}
                  isActive={true}
                  screenWidth={screenWidth}
                />
              )}
            </EventBackground>

              {/* Our Overlay */}
              <EventTitle>
                <EventTitleText>EVENT</EventTitleText>
                <EventTitleText>CALENDAR</EventTitleText>
              </EventTitle>

              <EventNamesContainer screenWidth={screenWidth} screenHeight={screenHeight}>
                {/* Only display 4 events */}
                {[...Array(4)].map((_, i) => {
                  const event = upcomingEvents[i];
                  return event ? (
                    <EventItemContainer
                      key={event.sys.id}
                      isActive={activeEventId === event.sys.id}
                      screenWidth={screenWidth}
                      onMouseEnter={() => handleEventHover(event)}
                    >
                      <EventLink 
                        to={`/events/${event.sys.id}/${encodeURIComponent(event.fields.name)}`}
                        state={{ event }}
                      >
                        <EventContentWrapper>
                          <EventDate>
                            {new Date(event.fields.date).toLocaleDateString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: '2-digit'
                            }).replace(/\//g, '.')}
                          </EventDate>

                          <EventName>{event.fields.name}</EventName>
                          <EventLocation>
                            <LocationIcon />
                            {splitIntoLines(event.fields.location || '').map((line, i) => (
                              i === 0 ? (
                                <LocationFirstLine key="first">{line}</LocationFirstLine>
                              ) : (
                                <LocationWrappedLine key={i}>{line}</LocationWrappedLine>
                              )
                            ))}
                          </EventLocation>
                          <EventDescription>
                            {event.fields.description?.split('\n')[0] || ''}
                          </EventDescription>
                        </EventContentWrapper>
                      </EventLink>
                    </EventItemContainer>
                  ) : (
                    <EventItemContainer 
                      key={`empty-${i}`} 
                      isActive={false} 
                      screenWidth={screenWidth}
                    />
                  );
                })}
              </EventNamesContainer>
            </EventsContainer>
        </>
        )}


      {/* PAST EVENTS */}
      <PastEventsTitle>PAST</PastEventsTitle>
        <PastEventsList>
          {pastEvents.map((event) => (
            <PastEventCard 
              key={event.sys.id} 
              as={Link} 
              to={`/events/${event.sys.id}/${encodeURIComponent(event.fields.name)}`}
              state={{ event }}
            >
              <img 
                src={event.fields.thumbnailImage?.[0]?.fields.file.url} 
                alt={event.fields.name}
              />
              <ViewOverlay>VIEW</ViewOverlay>
              <PastEventName>{event.fields.name}</PastEventName>
              <PastEventDescription>
                {event.fields.description?.split('\n')[0] || ''}
              </PastEventDescription>
            </PastEventCard>
          ))}
        </PastEventsList>
      </Layout>
    </PageWrapper>
  );
};

export default Events;