import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import { EventItem } from '../../models/Event.model';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';
import { fetchSingleEvent } from '../../middleware/Events';

interface LocationState {
  event: EventItem;
}

const EventDetails: React.FC = () => {
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string; name: string }>();
  const state = location.state as LocationState;

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if ((error || !event) && fetchAttempted) {
    return <Navigate to="/events" replace />;
  }

  return (
    <PageWrapper>
      <Layout>
        <div>
          <h1>{event?.fields.name}</h1>
          {/* We'll add more content here later */}
        </div>
      </Layout>
    </PageWrapper>
  );
};

export default EventDetails; 