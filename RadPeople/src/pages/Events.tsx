import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { EventItem } from '../models/Event.model';
import PageWrapper from '../components/PageWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useEvents } from '../contexts/EventsContext';
import { BackgroundImage, VideoWrapper, EventBackground, EventContentWrapper, EventDate, EventDescription, EventItemContainer, EventLink, EventLocation, EventName, EventNamesContainer, EventsContainer, EventTitle, EventTitleText, LocationFirstLine, LocationWrappedLine, PastEventsTitle, PastEventsList, PastEventCard, PastEventName, PastEventDescription, ViewOverlay, ImageContainer, MobileEventNav, EventNumber, MobileEventButton } from '../styles/EventStyles';
import { Link } from 'react-router-dom';
import { WistiaPlayer } from '@wistia/wistia-player-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons'; // or free-regular-svg-icons if you prefer
import { TextScramble } from '../components/motion-primitives/text-scramble';


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
  const eventNumberRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState(0);

  // Trigger fetch on mount
  useEffect(() => {
    prefetchEvents();
  }, [prefetchEvents]);


  // Mobile View Events are auto progressed
  useEffect(() => {
    // Only run auto-rotation if screen width is mobile size
    if (screenWidth <= 767) {
      const timer = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % Math.min(4, upcomingEvents.length);
          
          // Remove focus from any button that might have it
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          
          handleEventHover(upcomingEvents[nextIndex]);
          return nextIndex;
        });
      }, 9000);

      return () => clearInterval(timer);
    }
  }, [screenWidth, upcomingEvents]);

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
    // Ensure we have a valid event
    if (!event) return;
    
    // Clear any pending timeout immediately
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  
    // Get event details
    const eventId = event.sys.id;
    const videoId = event.fields.wistiaVideo?.items?.[0]?.hashed_id;
    const imageUrl = event.fields.thumbnailImage?.[0]?.fields?.file?.url || '';
    
    // Set all states synchronously to ensure they update together
    setActiveEventId(eventId);
    setActiveEventImage(imageUrl);
    setCurrentVideo(videoId || null);
    
    // Find the index of this event in upcomingEvents to keep activeIndex in sync
    // This is important for mobile view indicators
    const eventIndex = upcomingEvents.findIndex(e => e.sys.id === eventId);
    if (eventIndex !== -1 && eventIndex < 4) {
      setActiveIndex(eventIndex);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


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
                  return videoId ? (
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
                  ) : null;
                })}
              </div>
              <BackgroundImage 
                imageUrl={activeEventImage}
                isActive={!currentVideo}
                shouldShow={!upcomingEvents.find(event => 
                  event.sys.id === activeEventId)?.fields.wistiaVideo?.items?.[0]?.hashed_id
                }
                screenWidth={screenWidth}
              />
              
              {screenWidth <= 767 && (
                <MobileEventNav>
                {[...Array(Math.min(4, upcomingEvents.length))].map((_, i) => (
                  <EventNumber
                    key={i}
                    ref={el => eventNumberRefs.current[i] = el}
                    isActive={activeIndex === i}
                    onClick={() => {
                      setActiveIndex(i);
                      handleEventHover(upcomingEvents[i]);
                      
                      // Blur the button after clicking to remove focus state
                      setTimeout(() => {
                        if (eventNumberRefs.current[i]) {
                          eventNumberRefs.current[i]?.blur();
                        }
                      }, 300);
                    }}
                  >
                    {i + 1}
                  </EventNumber>
                ))}
              </MobileEventNav>
              )}

              <EventTitle>
                <TextScramble
                  as={EventTitleText} // This will render as your styled component
                  className={EventTitleText.styledComponentId} // If needed
                >
                  EVENT
                </TextScramble>
                <TextScramble
                  as={EventTitleText}
                  className={EventTitleText.styledComponentId}
                >
                  CALENDAR
                </TextScramble>
              </EventTitle>
            </EventBackground>

              <EventNamesContainer screenWidth={screenWidth} screenHeight={screenHeight}>
                {screenWidth > 767 ? (
                  [...Array(4)].map((_, i) => {
                    const event = upcomingEvents[i];
                    return event ? (
                      <EventItemContainer
                      key={event.sys.id}
                      isActive={activeEventId === event.sys.id}
                      screenWidth={screenWidth}
                      onMouseEnter={() => handleEventHover(event)}
                      >
                        <EventContentWrapper>
                        <EventLink
                          href={`/events/${event.sys.id}/${encodeURIComponent(event.fields.name)}`}
                          onClick={() => sessionStorage.setItem('selectedEvent', JSON.stringify(event))}
                        >
                            <EventDate>
                              <TextScramble as="span">
                                {new Date(event.fields.date).toLocaleDateString('en-US', {
                                  month: '2-digit',
                                  day: '2-digit',
                                  year: '2-digit'
                                }).replace(/\//g, '.')}
                              </TextScramble>
                            </EventDate>

                            <EventName>{event.fields.name}</EventName>
                            <EventLocation>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4em' }}>
                                <FontAwesomeIcon icon={faMapPin} style={{ color: '#1404FB', fontSize: '0.7em', verticalAlign: 'middle', marginLeft: '0.3rem' }} />
                                <LocationFirstLine>{event.fields.location}</LocationFirstLine>
                              </span>
                            </EventLocation>
                            <EventDescription>
                              {(() => {
                                const description = event.fields.description?.split('\n')[0] || '';
                                const isMiddleViewport = window.innerWidth >= 768 && window.innerWidth <= 1250;
                                const charLimit = isMiddleViewport ? 200 : 300; // Reduced character limit for middle viewport
                                
                                return description.length > charLimit 
                                  ? `${description.slice(0, charLimit)}...`
                                  : description;
                              })()}
                            </EventDescription>
                          </EventLink>
                        </EventContentWrapper>
                      </EventItemContainer>
                    ) : (
                      <EventItemContainer 
                        key={`empty-${i}`} 
                        isActive={false} 
                        screenWidth={screenWidth}
                      />
                    );
                  })
                ) : (
                  <>
                    {upcomingEvents[activeIndex] && (
                      <EventItemContainer
                        isActive={true}
                        screenWidth={screenWidth}
                      >
                        <EventLink
                          href={`/events/${upcomingEvents[activeIndex].sys.id}/${encodeURIComponent(upcomingEvents[activeIndex].fields.name)}`}
                          onClick={() => sessionStorage.setItem('selectedEvent', JSON.stringify(upcomingEvents[activeIndex]))}
                        >
                          <EventContentWrapper>
                            <EventDate>
                              <TextScramble as="span">
                                {new Date(upcomingEvents[activeIndex].fields.date).toLocaleDateString('en-US', {
                                  month: '2-digit',
                                  day: '2-digit',
                                  year: '2-digit'
                                }).replace(/\//g, '.')}
                              </TextScramble>
                            </EventDate>

                            <EventName>{upcomingEvents[activeIndex].fields.name}</EventName>
                            <EventLocation>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4em' }}>
                                <FontAwesomeIcon icon={faMapPin} style={{ color: '#1404FB', fontSize: '0.7em', verticalAlign: 'middle', marginLeft: '0.3rem' }} />
                                {screenWidth > 767
                                  ? splitIntoLines(upcomingEvents[activeIndex].fields.location || '').map((line, i) =>
                                      i === 0 ? (
                                        <LocationFirstLine key="first">{line}</LocationFirstLine>
                                      ) : (
                                        <LocationWrappedLine key={i}>{line}</LocationWrappedLine>
                                      )
                                    )
                                  : <LocationFirstLine>{upcomingEvents[activeIndex].fields.location}</LocationFirstLine>
                                }
                              </span>
                            </EventLocation>
                            <EventDescription>
                              {(upcomingEvents[activeIndex].fields.description?.split('\n')[0] || '').length > 300 
                                ? `${upcomingEvents[activeIndex].fields.description?.split('\n')[0].slice(0, 300)}...`
                                : upcomingEvents[activeIndex].fields.description?.split('\n')[0] || ''
                              }
                            </EventDescription>
                            <MobileEventButton 
                              as={Link}
                              to={`/events/${upcomingEvents[activeIndex].sys.id}/${encodeURIComponent(upcomingEvents[activeIndex].fields.name)}`}
                            >
                              LEARN MORE
                            </MobileEventButton>
                          </EventContentWrapper>
                        </EventLink>
                      </EventItemContainer>
                    )}
                  </>
                )}
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
            as="a"
            href={`/events/${event.sys.id}/${encodeURIComponent(event.fields.name)}`}
            onClick={() => sessionStorage.setItem('selectedEvent', JSON.stringify(event))}
          >
            <ImageContainer>
              <img 
                src={event.fields.thumbnailImage?.[0]?.fields.file.url} 
                alt={event.fields.name}
              />
              <ViewOverlay>VIEW</ViewOverlay>
            </ImageContainer>
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