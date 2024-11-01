import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { ProductItem } from '../models/Product.model';
import { fetchProducts } from '../middleware/Product';

const ProductListContainer = styled.div`
  overflow-x: hidden;
  width: 100%;
  background-color: #FFFFFF;
  /* Add height calculation based on content */
  height: fit-content;
`;

const ProductGrid = styled.div<{itemCount: number}>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  gap: 0;
  background-color: #FFFFFF;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* Only cover the height of actual products */
    height: ${props => `${Math.ceil(props.itemCount / 4) * (100 / (Math.ceil(props.itemCount / 4)))}%`};
    background-image: 
      linear-gradient(to right, #000000 1px, transparent 1px),
      linear-gradient(to bottom, #000000 1px, transparent 1px);
    background-size: 25% 100%, 100% auto;
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    &::after {
      background-size: 50% 100%, 100% auto;
      height: ${props => `${Math.ceil(props.itemCount / 2) * (100 / (Math.ceil(props.itemCount / 2)))}%`};
    }
  }
`;

const ProductCard = styled.div`
  text-align: center;
  aspect-ratio: 2/3;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProductDetails = styled.div`
  height: 15px;
  border-top: 1px solid #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  font-size: 12px;
  background-color: #FFFFFF;
  z-index: 2;  /* Ensure it appears above the grid lines */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: calc(100% - 15px);  /* Leave space for details */
  object-fit: cover;
  display: block;
`;

const ProductName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.span`
  margin-left: 10px;
`;



const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try{
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts)
      }catch(e){
        console.error('Error loading products: ', e)
      }
    }

    loadProducts()
  }, []);

  return (
    <Layout>
    <ProductListContainer>
      <ProductGrid itemCount={products.length}>
        {products.map((product) => (
          <ProductCard key={product.sys.id}>
            <ProductImage 
              src={`https:${product.fields.image[0].fields.file.url}` || ''} 
              alt={product.fields.name} 
            />
            <ProductDetails>
              <ProductName>{product.fields.name}</ProductName>
              <ProductPrice>${product.fields.price}</ProductPrice>
            </ProductDetails>
          </ProductCard>
        ))}
      </ProductGrid>
    </ProductListContainer>
  </Layout>
  );
};

export default ProductList;