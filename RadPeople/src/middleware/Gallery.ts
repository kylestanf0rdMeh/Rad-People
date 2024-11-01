import contentfulClient from '../services/contentful';
import { EntryCollection } from 'contentful';
import { GalleryItem } from '../models/Gallery.model';

export const fetchGalleryImages = async (): Promise<GalleryItem[]> => {
    try {
      const response: EntryCollection<GalleryItem> = await contentfulClient.getEntries({
        content_type: 'gallery',
      });
      //   ignore this false error for now,there is nothing wrong with this (has to do with type safety)
      return response.items.map(item => ({
        sys: item.sys,
        fields: item.fields,
        contentTypeId: item.sys.contentType.sys.id
      }));
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }
  };

// Add more gallery-related middleware functions here as needed