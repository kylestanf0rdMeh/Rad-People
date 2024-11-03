import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ProductItem } from '../models/Product.model';

interface LocationState {
    product: ProductItem;
}

const ProductDetail: React.FC = () => {
    const location = useLocation();
    const state = location.state as LocationState;

  // If no state exists (e.g., direct URL access), redirect to products page
  if (!state?.product) {
    return <Navigate to="/" replace />;
  }

  const { product } = state;

  console.log(product)

  return (
    <Layout>
      {/* Add your product detail layout here */}
      <h1>{product.fields.name}</h1>
      <p>${product.fields.price}</p>
      {/* Add more product details */}
    </Layout>
  );
};

export default ProductDetail;