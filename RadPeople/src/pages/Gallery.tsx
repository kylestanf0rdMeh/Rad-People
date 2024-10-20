import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { GalleryItem } from '../models/Gallery.model';
import { fetchGalleryImages } from '../middleware/Gallery';
import { GalleryGrid, GalleryImage } from '../styles/GalleryStyles';


const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchGalleryImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <Layout>
      <h2>Gallery</h2>
      <GalleryGrid>
        {images.map((item) => (
          <GalleryImage
            key={item.sys.id}
            src={`https:${item.fields.image.fields.file.url}`}
            alt={item.fields.descriptions || 'Gallery image'}
          />
        ))}
      </GalleryGrid>
    </Layout>
  );
};

export default Gallery;