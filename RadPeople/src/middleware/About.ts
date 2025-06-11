import { EntryCollection } from 'contentful';
import contentfulClient from '../services/contentful';
import { AboutItem } from '../models/About.model';

export const fetchAbout = async (): Promise<AboutItem[]> => {
  try {
    const response: EntryCollection<AboutItem> = await contentfulClient.getEntries({
      content_type: 'about',
    });
    return response.items.map(item => ({
      sys: item.sys,
      fields: item.fields as AboutItem['fields'],
      contentTypeId: item.sys.contentType.sys.id
    }));
  } catch (error) {
    console.error('Error fetching about:', error);
    throw error;
  }
};