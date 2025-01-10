import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { EventItem } from '../../models/Event.model';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';

interface LocationState {
  event: EventItem;
}

const EventDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.event) {
    return <Navigate to="/events" replace />;
  }

  const { event } = state;

  return (
    <PageWrapper>
      <Layout>
        <div>
          <h1>{event.fields.name}</h1>
          {/* We'll add more content here later */}
        </div>
      </Layout>
    </PageWrapper>
  );
};

export default EventDetails; 