import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { ProductItem } from '../../models/Product.model';
import DetailsDropdown from '../../components/DetailsDropdown';
import useWindowDimensions from '../../hooks/useWindowDimensions';
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
  ShippingContainer,
  MobileOrderWrapper,
  ProductOptions,
  DesktopDescription,
  DropdownsWrapper,
  MobileImageWrapper,
  BreadcrumbContainer,
  BreadcrumbLink,
  BreadcrumbArrow,
  BreadcrumbCurrent
} from '../../styles/ProductDetailsStyles';

interface LocationState {
  product: ProductItem;
}

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const imageRef = React.useRef<HTMLDivElement>(null);
  const summaryRef = React.useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  React.useEffect(() => {

    if (isMobile) return;

    const handleScroll = () => {
      if (!imageRef.current || !summaryRef.current) return;

      const imageSection = imageRef.current;
      const summarySection = summaryRef.current;
      
      const imageScrollTop = imageSection.scrollTop;
      const imageScrollHeight = imageSection.scrollHeight - imageSection.clientHeight;

      // Lock summary scroll until images are fully scrolled
      if (imageScrollTop < imageScrollHeight) {
        summarySection.scrollTop = 0;
      }
    };

    const imageSection = imageRef.current;

    imageSection?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      imageSection?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    const sizeOrder: Record<string, number> = { 'xxs': 0, 'xs': 1, 's': 2, 'm': 3, 'l': 4, 'xl': 5, 'xxl': 6 };
    return sizes.sort((a, b) => sizeOrder[a] - sizeOrder[b]);
  };

  // Convert sizes string to array
  const sizeOptions = sortSizes(
    product.fields.sizes.split(',').map(size => size.trim().toLowerCase())
  );

  const [selectedSize, setSelectedSize] = useState<string>(sizeOptions[0]);


  return (
    <Layout>
      <BreadcrumbContainer>
        <BreadcrumbLink to="/shop">Product List</BreadcrumbLink>
        <BreadcrumbArrow>→</BreadcrumbArrow>
        <BreadcrumbCurrent>{product.fields.name}</BreadcrumbCurrent>
      </BreadcrumbContainer>


      <ProductContainer>

        {/* LEFT SIDE */}
        {isMobile ? (
          <MobileImageWrapper>
            <ImageSection ref={imageRef}>
              <ProductImage
                src={`https:${allImages[0].fields.file.url}`}
                alt={allImages[0].fields.title || product.fields.name}
              />
            </ImageSection>
          </MobileImageWrapper>
        ) : (
          <ImageSection ref={imageRef}>
            {allImages.map((image, index) => (
              <ProductImage
                key={`product-image-${index}`}
                src={`https:${image.fields.file.url}`}
                alt={image.fields.title || product.fields.name}
              />
            ))}
          </ImageSection>
        )}
        
        {/* RIGHT SIDE */}
        <ProductSummary ref={summaryRef}>

          <TitleRow>
            <ProductTitle>{product.fields.name}</ProductTitle>
            <ProductPrice>${product.fields.price}</ProductPrice>
          </TitleRow>


          {/* DESKTOP ORDER */}
          <DesktopDescription>
            <ProductDescription>

              {deriveDescriptionQueues().map((item, index) => (
                <DescriptionItem key={`desc-${index}`}>
                  {item}
                </DescriptionItem>
              ))}

            </ProductDescription>

          </DesktopDescription>

          <ProductOptions>
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
          </ProductOptions>


          {/* MOBILE ORDER */}
          <MobileOrderWrapper>

            <ProductDescription>
              {deriveDescriptionQueues().map((item, index) => (
                <DescriptionItem key={`desc-${index}`}>
                  {item}
                </DescriptionItem>
              ))}
            </ProductDescription>
          </MobileOrderWrapper>

          <DropdownsWrapper>
            <DetailsDropdown 
              title="Size + Fit"
              content={product.fields.sizeAndFit || 'Size and fit information not available.'}
            />

            <DetailsDropdown 
              title="Care"
              content={product.fields.care || 'Care information not available.'}
            />
          </DropdownsWrapper>
        </ProductSummary>
      </ProductContainer>
    </Layout>
  );
};

export default ProductDetail;