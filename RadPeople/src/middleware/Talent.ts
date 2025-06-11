import { EntryCollection } from 'contentful';
import contentfulClient from '../services/contentful';
import { TalentItem } from '../models/Talent.model';

export const fetchTalent = async (): Promise<TalentItem[]> => {
  try {
    const response: EntryCollection<TalentItem> = await contentfulClient.getEntries({
      content_type: 'talent',
    });
    return response.items.map(item => ({
      sys: item.sys,
      fields: item.fields as TalentItem['fields'],
      contentTypeId: item.sys.contentType.sys.id
    }));
  } catch (error) {
    console.error('Error fetching talent:', error);
    throw error;
  }
};