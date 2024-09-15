import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import contentfulClient from '../services/contentful';

const EventList = styled.div`
  display: grid;
  gap: 20px;
`;

const EventCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
`;

interface Event {
  fields: {
    title: string;
    date: string;
    description: string;
  };
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response: any = await contentfulClient.getEntries({
          content_type: 'event',
          order: ['fields.date'],
        });
        setEvents(response.items as Event[]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Layout>
      <h2>Upcoming Events</h2>
      <EventList>
        {events.map((event, index) => (
          <EventCard key={index}>
            <h3>{event.fields.title}</h3>
            <p>Date: {new Date(event.fields.date).toLocaleDateString()}</p>
            <p>{event.fields.description}</p>
          </EventCard>
        ))}
      </EventList>
    </Layout>
  );
};

export default Events;