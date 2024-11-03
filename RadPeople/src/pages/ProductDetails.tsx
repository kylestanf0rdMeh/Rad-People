import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ProductItem } from '../models/Product.model';
import {
  ProductContainer,
  ImageSection,
  ProductSummary,
  ProductTitle,
  ProductPrice,
  ProductImage,
  ProductDescription,
  ProductColor,
  SizesContainer,
  SizeButton,
  DescriptionItem,
  TitleRow,
  AddToCartButton,
  ShippingContainer
} from '../styles/ProductDetails';

interface LocationState {
  product: ProductItem;
}

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.product) {
    return <Navigate to="/" replace />;
  }

  const { product } = state;
  const shippingWeeks = product.fields.shipingInWeeks || '4';


  const allImages = [
    product.fields.image[0],
    ...(product.fields.altImages || [])
  ];


  const deriveDescriptionQueues = () => {
    const description = product.fields.description;
    // Split by dash but keep the dash in the result
    const items = description.split(/(?=-)/).filter(item => item.trim().length > 0);
    return items.map(item => item.trim());
  };

  const sortSizes = (sizes: string[]) => {
    const sizeOrder = { 'xxs': 0, 'xs': 1, 's': 2, 'm': 3, 'l': 4, 'xl': 5, 'xxl': 6 };
    return sizes.sort((a, b) => sizeOrder[a] - sizeOrder[b]);
  };

  // Convert sizes string to array
  const sizeOptions = sortSizes(
    product.fields.sizes.split(',').map(size => size.trim().toLowerCase())
  );

  const [selectedSize, setSelectedSize] = useState<string>(sizeOptions[0]);


  return (
    <Layout>
      <ProductContainer>

        {/* LEFT SIDE */}
        <ImageSection>
          {allImages.map((image, index) => (
            <ProductImage
              key={`product-image-${index}`}
              src={`https:${image.fields.file.url}`}
              alt={image.fields.title || product.fields.name}
            />
          ))}
        </ImageSection>
        
        {/* RIGHT SIDE */}
        <ProductSummary>
          <TitleRow>
            <ProductTitle>{product.fields.name}</ProductTitle>
            <ProductPrice>${product.fields.price}</ProductPrice>
          </TitleRow>
          <ProductDescription>
            {deriveDescriptionQueues().map((item, index) => (
              <DescriptionItem key={`desc-${index}`}>
                {item}
              </DescriptionItem>
            ))}
          </ProductDescription>
          <ProductColor>Color: {product.fields.color}</ProductColor>
          
          <SizesContainer>
            {sizeOptions.map((size, index) => (
              <SizeButton 
                key={`size-${index}`}
                isSelected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeButton>
            ))}
          </SizesContainer>
          <AddToCartButton>
            Add to cart
          </AddToCartButton>
          <ShippingContainer>
            This product will ship in {shippingWeeks} weeks
          </ShippingContainer>
        </ProductSummary>
      </ProductContainer>
    </Layout>
  );
};

export default ProductDetail;