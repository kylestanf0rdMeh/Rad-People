import React, { createContext, useContext, useState } from 'react';
import { EventItem } from '../models/Event.model';
import { useDataFetching } from '../hooks/useDataFetching';
import { fetchEvents } from '../middleware/Events';

interface EventsContextType {
  events: EventItem[];
  loading: boolean;
  error: Error | null;
  prefetchEvents: () => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error, loading } = useDataFetching<EventItem[]>(
    'events',
    fetchEvents,
    { maxAge: 30 * 60 * 1000 }, // 30 minutes cache
    shouldFetch
  );

  const prefetchEvents = () => {
    setShouldFetch(true);
  };

  return (
    <EventsContext.Provider value={{
      events: data || [],
      loading,
      error,
      prefetchEvents
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}; 