import contentfulClient from '../services/contentful';
import { EntryCollection } from 'contentful';
import { EventItem } from '../models/Event.model';

export const fetchEvents = async (): Promise<EventItem[]> => {
    try {
      const response: EntryCollection<EventItem> = await contentfulClient.getEntries({
        content_type: 'events',
      });

      return response.items.map(item => ({
        sys: item.sys,
        fields: item.fields,
        contentTypeId: item.sys.contentType.sys.id
      })) as EventItem[];
      
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }
  };

// Add more events-related middleware functions here as needed