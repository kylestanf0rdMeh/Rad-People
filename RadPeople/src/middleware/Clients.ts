import { EntryCollection } from 'contentful';
import contentfulClient from '../services/contentful';
import { ClientItem } from '../models/Clients.model';

export const fetchClients = async (): Promise<ClientItem[]> => {
    try {
      const response: EntryCollection<ClientItem> = await contentfulClient.getEntries({
        content_type: 'clients',
      });
      return response.items.map(item => ({
        sys: item.sys,
        fields: item.fields as ClientItem['fields'],
        contentTypeId: item.sys.contentType.sys.id
      }));
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
};
