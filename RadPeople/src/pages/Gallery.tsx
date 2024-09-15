import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import contentfulClient from '../services/contentful';

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

interface GalleryItem {
  fields: {
    title: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response: any = await contentfulClient.getEntries({
          content_type: 'galleryImage',
        });
        setImages(response.items as GalleryItem[]);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Layout>
      <h2>Gallery</h2>
      <GalleryGrid>
        {images.map((item, index) => (
          <GalleryImage
            key={index}
            src={item.fields.image.fields.file.url}
            alt={item.fields.title}
          />
        ))}
      </GalleryGrid>
    </Layout>
  );
};

export default Gallery;