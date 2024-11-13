import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { fetchEvents } from '../middleware/Events';
import { EventItem } from '../models/Event.model';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { BackgroundImage, VideoWrapper, EventBackground, EventContentWrapper, EventDate, EventDescription, EventItemContainer, EventLink, EventLocation, EventName, EventNamesContainer, EventsContainer, EventTitle, EventTitleText, LocationFirstLine, LocationIcon, LocationWrappedLine, PastEventsTitle, PastEventsList, PastEventCard, PastEventName, PastEventDescription } from '../styles/EventStyles';


const Events: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [activeEventImage, setActiveEventImage] = useState<string>('');
  const [activeEventId, setActiveEventId] = useState<string>('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousVideoRef = useRef<string | null>(null);


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

  // Add video load handler
  const handleVideoLoad = () => {
    setTimeout(() => {
      setIsVideoLoaded(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Match transition duration
    }, 100); // Small delay to ensure smooth transition
  };

  // Reset states when active event changes
  useEffect(() => {
    setIsVideoLoaded(false);
  }, [activeEventId]);

  // Set initial events and override first two event thumbnails with videos
  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        // console.log('FETCHED EVENTS: ', fetchedEvents);
        const { past, upcoming } = categorizeEvents(fetchedEvents);
        const sortedUpcoming = sortEventsByDate(upcoming);
    
        setUpcomingEvents(sortedUpcoming);
        setPastEvents(sortEventsByDate(past, false));
    
        // Set initial active event
        if (sortedUpcoming.length > 0) {
          const firstEvent = sortedUpcoming[0];
          const media = getEventMedia(firstEvent);
          setActiveEventId(firstEvent.sys.id);
          setActiveEventImage(media.url);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);

  // Set initial active event
  useEffect(() => {
    if (upcomingEvents.length > 0) {
      const firstEvent = upcomingEvents[0];
      const media = getEventMedia(firstEvent);
      setActiveEventId(firstEvent.sys.id);
      setActiveEventImage(media.url);
    }
  }, [upcomingEvents]);

  const handleEventHover = (event: EventItem) => {
    setIsTransitioning(true);
    const media = getEventMedia(event);
    
    // Store current video ID before updating
    if (event.fields.wistiaVideo?.items?.[0]) {
      previousVideoRef.current = activeEventId;
    }

    // Set new active event
    setActiveEventId(event.sys.id);
    setActiveEventImage(media.url);
  };


  return (
    <Layout>
      {upcomingEvents.length > 0 && (
      <>
        <EventsContainer screenWidth={screenWidth} screenHeight={screenHeight}>
          <EventBackground imageUrl={activeEventImage}>
            {upcomingEvents.find(event => event.sys.id === activeEventId)?.fields.wistiaVideo?.items?.[0] ? (
              <>
                {/* Show previous video during transition */}
                {isTransitioning && previousVideoRef.current && (
                  <VideoWrapper 
                    screenWidth={screenWidth}
                    className="active fadeOut"
                  >
                    <div className="video-container">
                      <iframe 
                        src={`https://fast.wistia.net/embed/iframe/${previousVideoRef.current}?autoPlay=1&loop=1&background=1&controlsVisibleOnLoad=false&playButton=false&playerColor=000000&videoFoam=true&muted=1&silentAutoPlay=true&fitStrategy=contain`}
                        allowTransparency={true}
                        className="wistia_embed loaded"
                        name="wistia_embed"
                        allow="autoplay; fullscreen"
                        style={{ backgroundColor: 'black' }}
                      />
                    </div>
                  </VideoWrapper>
                )}
                
                {/* New video */}
                <VideoWrapper 
                  screenWidth={screenWidth}
                  className={`${isVideoLoaded ? 'active' : ''} ${isTransitioning ? 'fadeIn' : ''}`}
                >
                  <div className="video-container">
                    <iframe 
                      src={`https://fast.wistia.net/embed/iframe/${upcomingEvents.find(event => 
                        event.sys.id === activeEventId)?.fields.wistiaVideo.items[0].hashed_id}?autoPlay=1&loop=1&background=1&controlsVisibleOnLoad=false&playButton=false&playerColor=000000&videoFoam=true&muted=1&silentAutoPlay=true&fitStrategy=contain`}
                      allowTransparency={true}
                      className={`wistia_embed ${isVideoLoaded ? 'loaded' : ''}`}
                      name="wistia_embed"
                      allow="autoplay; fullscreen"
                      style={{ backgroundColor: 'black' }}
                      onLoad={handleVideoLoad}
                    />
                  </div>
                </VideoWrapper>
              </>
              ) : (
              <BackgroundImage 
                imageUrl={activeEventImage}
                isActive={true}
                screenWidth={screenWidth}
              />
            )}
          </EventBackground>

            <EventTitle>
              <EventTitleText>EVENT</EventTitleText>
              <EventTitleText>CALENDAR</EventTitleText>
            </EventTitle>

            <EventNamesContainer screenWidth={screenWidth} screenHeight={screenHeight}>
              {[...Array(4)].map((_, i) => {
                const event = upcomingEvents[i];
                return event ? (
                  <EventItemContainer
                    key={event.sys.id}
                    isActive={activeEventId === event.sys.id}
                    screenWidth={screenWidth}
                    onMouseEnter={() => handleEventHover(event)}
                  >
                    <EventLink to={`/events/${event.sys.id}/${encodeURIComponent(event.fields.name)}`}>
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

    <PastEventsTitle>Past Events</PastEventsTitle>
      <PastEventsList>
        {pastEvents.map((event) => (
          <PastEventCard key={event.sys.id}>
            <img 
              src={event.fields.thumbnailImage?.[0]?.fields.file.url} 
              alt={event.fields.name}
            />
            <PastEventName>{event.fields.name}</PastEventName>
            <PastEventDescription>
              {event.fields.description?.split('\n')[0] || ''}
            </PastEventDescription>
          </PastEventCard>
        ))}
      </PastEventsList>
    </Layout>
  );
};

export default Events;