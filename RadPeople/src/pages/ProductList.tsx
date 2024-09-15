import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import shopifyClient from '../services/shopify';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
`;

interface Product {
  id: string;
  title: string;
  images: { src: string }[];
  variants: { price: string }[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts: any = await shopifyClient.product.fetchAll();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <h2>Our Products</h2>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <img src={product.images[0].src} alt={product.title} style={{ maxWidth: '100%' }} />
            <h3>{product.title}</h3>
            <p>${product.variants[0].price}</p>
          </ProductCard>
        ))}
      </ProductGrid>
    </Layout>
  );
};

export default ProductList;