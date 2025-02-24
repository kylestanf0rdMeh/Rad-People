import contentfulClient from '../services/contentful';
import { EntryCollection } from 'contentful';
import { EventItem } from '../models/Event.model';

// Type guard to check if a field exists and has a value
const hasRequiredField = (obj: any, field: string): boolean => {
  return obj && obj.fields && field in obj.fields && obj.fields[field] !== null && obj.fields[field] !== undefined;
};

// Transform contentful response to EventItem
const transformEventResponse = (response: any): EventItem => {
  // Add debug logging

  // Check for minimum required fields
  if (!hasRequiredField(response, 'name')) {
    throw new Error('Event missing required field: name');
  }

  const transformedEvent = {
    sys: {
      id: response.sys.id,
      contentType: {
        sys: {
          id: response.sys.contentType.sys.id
        }
      }
    },
    fields: response.fields,
    contentTypeId: response.sys.contentType.sys.id
  };


  return transformedEvent as EventItem;
};

export const fetchEvents = async (): Promise<EventItem[]> => {
  try {
    const response: EntryCollection<any> = await contentfulClient.getEntries({
      content_type: 'events',
    });
    
    // Add debug logging
    console.log('Fetched events:', response.items.length);
    
    return response.items.map(transformEventResponse);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchSingleEvent = async (eventId: string): Promise<EventItem> => {
  try {
    const response = await contentfulClient.getEntry(eventId);
    return transformEventResponse(response);
  } catch (error) {
    console.error('Error fetching single event:', error);
    throw error;
  }
};

// Add more events-related middleware functions here as needed