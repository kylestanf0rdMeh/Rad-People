import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchEvents } from '../middleware/Events';
import { EventItem } from '../models/Event.model';
import useWindowDimensions from '../hooks/useWindowDimensions';
import defaultVideo from '../assets/radpeople-landingPage.mp4';


const EventList = styled.div`
  display: grid;
  gap: 20px;
`;

const EventCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  color: black;
`;

const EventsContainer = styled.div<{ screenWidth: number }>`
  height: ${props => Math.min(props.screenWidth * 0.5, 1000)}px; // 50% of width, max 1000px
  position: relative;
  margin-bottom: 2rem;
`;

const EventBackground = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in-out;
`;

const BackgroundImage = styled.div<{ imageUrl: string; isActive: boolean; screenWidth: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => Math.min(props.screenWidth * 0.5, 1000)}px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity 0.4s ease-in-out;

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

const BackgroundVideo = styled.video`
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

const VideoWrapper = styled.div<{ screenWidth: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => Math.min(props.screenWidth * 0.55, 820)}px;

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

const EventNamesContainer = styled.div<{ screenWidth: number }>`
  position: absolute;
  top: ${props => Math.min(props.screenWidth * 0.27, 800)}px; // Increased multiplier from 0.2 to 0.4
  left: 0;
  width: 100%;
  margin: 0;
  padding: ${props => Math.min(props.screenWidth * 0.02, 70)}px ${props => Math.min(props.screenWidth * 0.03, 48)}px; // Adjusted padding
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => Math.min(props.screenWidth * 0.01, 16)}px;
`;


const EventTitle = styled.div`
  position: absolute;
  top: 2rem;
  left: 1rem;
  color: white;
`;

const EventTitleText = styled.h2`
  font-family: 'Sequel Sans Regular';
  font-size: 10rem;
  -webkit-text-stroke: 1px black;
  line-height: 135px;
  margin: 0;
  text-transform: uppercase;
`;

const EventContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EventItemContainer = styled.div<{ isActive: boolean; screenWidth: number }>`
  max-width: 250px;
  opacity: ${props => props.isActive ? 1 : 0.6};
  transition: opacity 0.7s ease;
  margin-top: ${props => Math.min(props.screenWidth * 0.01, 24)}px; // Dynamic margin-top
  
  &:hover {
    opacity: 1;
  }
`;

const EventLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const EventDate = styled.p`
  font-family: 'Helvetica Neue LT Com';
  font-size: 0.9rem;
  color: white;
  margin: 0 0 0.5rem 0;  // Reduced bottom margin
  text-transform: uppercase;
`;

const EventName = styled.h3`
  font-family: 'Sequel Sans Regular';
  font-size: 2.2rem;
  color: white;
  cursor: pointer;
  margin: 0;
  transition: transform 0.2s ease;
  word-wrap: break-word;
  hyphens: auto;
  text-transform: uppercase;
  line-height: 0.9;  // Reduce line height for tighter text wrapping
`;

const LocationIcon = styled.div`
  position: absolute;
  left: 0;
  top: 5.2px;
  height: 1rem;
  width: 15px;

  &::before {
    content: '';
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #1404FB;
    margin-bottom: auto;
  }

  &::after {
    content: '';
    display: block;
    width: 1.2px;
    height: 100%;
    background: #1404FB;
    position: relative;
    left: 3px;
  }
`;


const EventLocation = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 1.6rem;
  color: white;
  margin: 0;
  margin-top: 5px;
  padding-left: 25px;  // Space for icon
  position: relative;  // For absolute positioning of icon
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1;
  text-transform: uppercase;
`;


const EventDescription = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 0.8rem;
  color: white;
  margin-top: 10px;
  max-width: 250px;
  opacity: 0.9;
  word-wrap: break-word;
  hyphens: auto;
`;

const Events: React.FC = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [activeEventImage, setActiveEventImage] = useState<string>('');
  const [activeEventId, setActiveEventId] = useState<string>('');




  const sortEventsByDate = (events: EventItem[], ascending: boolean = true) => {
    return [...events].sort((a, b) => {
      const comparison = new Date(a.fields.date).getTime() - new Date(b.fields.date).getTime();
      return ascending ? comparison : -comparison;
    });
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

// PRODUCTION USEFFECT
  // useEffect(() => {
  //   const getEvents = async () => {
  //     try {
  //       const fetchedEvents = await fetchEvents();
  //       const { past, upcoming } = categorizeEvents(fetchedEvents);
  //       console.log(fetchedEvents)
  //       setPastEvents(sortEventsByDate(past, false));     // newest first
  //       setUpcomingEvents(sortEventsByDate(upcoming));    // soonest first
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   };

  //   getEvents();
  // }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        const { past, upcoming } = categorizeEvents(fetchedEvents);
        
        // Clone events if we have less than 4
        let processedUpcoming = sortEventsByDate(upcoming);
        if (processedUpcoming.length < 4) {
          const clonedEvents = [...processedUpcoming];
          while (processedUpcoming.length < 4) {
            const nextClone = {...clonedEvents[processedUpcoming.length % clonedEvents.length]};
            nextClone.sys.id = `${nextClone.sys.id}-clone-${processedUpcoming.length}`;
            processedUpcoming.push(nextClone);
          }
        }
        
        setUpcomingEvents(processedUpcoming);
        setPastEvents(sortEventsByDate(past, false));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    getEvents();
  }, []);

  useEffect(() => {
    // Set initial background image when upcoming events load
    if (upcomingEvents.length > 0) {
      setActiveEventImage(upcomingEvents[0].fields.thumbnail[0].fields.file.url);
    }
  }, [upcomingEvents]);





  return (
    <Layout>
      {upcomingEvents.length > 0 && (
      <>
        <EventsContainer screenWidth={screenWidth}>
        <EventBackground imageUrl={activeEventImage || upcomingEvents[0].fields.thumbnail[0].fields.file.url}>
            {activeEventImage === upcomingEvents[0].fields.thumbnail[0].fields.file.url ? (
              <VideoWrapper screenWidth={screenWidth}>
                <BackgroundVideo autoPlay loop muted playsInline>
                  <source src={defaultVideo} type="video/mp4" />
                </BackgroundVideo>
              </VideoWrapper>
            ) : (
              <BackgroundImage 
                imageUrl={activeEventImage || upcomingEvents[0].fields.thumbnail[0].fields.file.url}
                isActive={true}
                screenWidth={screenWidth}
              />
            )}
          </EventBackground>

          <EventTitle>
            <EventTitleText>EVENT</EventTitleText>
            <EventTitleText>CALENDAR</EventTitleText>
          </EventTitle>

          <EventNamesContainer screenWidth={screenWidth}>
            {[...Array(4)].map((_, i) => {
              const event = upcomingEvents[i];
              return event ? (
                <EventItemContainer
                  key={`upcoming-${event.sys.id}`}
                  isActive={activeEventId === event.sys.id}
                  screenWidth={screenWidth}
                  onMouseEnter={() => {
                    setActiveEventImage(event.fields.thumbnail[0].fields.file.url);
                    setActiveEventId(event.sys.id);
                  }}
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
                        <span>{event.fields.location}</span>
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

      <h2>Past Events</h2>
      <EventList>
        {pastEvents.map((event) => (
          <EventCard key={`past-${event.sys.id}`}>
            <h3>{event.fields.name}</h3>
            <p>Date: {new Date(event.fields.date).toLocaleDateString()}</p>
            <p>{event.fields.description}</p>
          </EventCard>
        ))}
      </EventList>
    </Layout>
  );
};

export default Events;