import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import PageWrapper from '../../components/PageWrapper';
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
  BreadcrumbCurrent,
  FeedbackMessage
} from '../../styles/ProductDetailsStyles';
import { fetchSingleProduct } from '../../middleware/Product';




interface LocationState {
  product: ProductItem;
}

interface AddToCartStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { width } = useWindowDimensions();
  const location = useLocation();
  const isMobile = width <= 768;
  const state = location.state as LocationState;
  const imageRef = React.useRef<HTMLDivElement>(null);
  const summaryRef = React.useRef<HTMLDivElement>(null);
  
  const [product, setProduct] = useState<ProductItem | null>(state?.product || null);
  const [loading, setLoading] = useState(!state?.product && !!productId);
  const [error, setError] = useState(false);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('None');
  const [showAddedText, setShowAddedText] = useState(false);
  
  // cart logic
  const { addItem } = useCart();
  const [cartStatus, setCartStatus] = useState<AddToCartStatus>({
    loading: false,
    error: null,
    success: false
  });





  useEffect(() => {
    const loadProduct = async () => {
      if (!product) {
        try {
          setLoading(true);
          const fetchedProduct = await fetchSingleProduct(productId);
          setProduct(fetchedProduct);
        } catch (err) {
          console.error('Error loading product:', err);
          setError(true);
        } finally {
          setLoading(false);
          setFetchAttempted(true);
        }
      } else {
        setFetchAttempted(true);
      }
    };

    loadProduct();
  }, [productId, state?.product]);

  useEffect(() => {
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
  }, [isMobile]);



  const deriveDescriptionQueues = () => {
    const description = product?.fields.description;
    // Split by dash but keep the dash in the result
    const items = description?.split(/(?=-)/).filter(item => item.trim().length > 0);
    return items?.map(item => item.trim());
  };

  const handleSizeSelection = (size: string) => {
    setCartStatus({
      loading: false,
      error: null,
      success: false
    });

    setSelectedSize(size)
  }

  const sortSizes = (sizes: string[]) => {
    const sizeOrder: Record<string, number> = { 'xxs': 0, 'xs': 1, 's': 2, 'm': 3, 'l': 4, 'xl': 5, 'xxl': 6 };
    return sizes.sort((a, b) => sizeOrder[a] - sizeOrder[b]);
  };

  // Add this new function
  const handleAddToCart = async () => {
    // Reset states
    setCartStatus({ loading: true, error: null, success: false });
    setShowAddedText(false);
  
    // Validation
    if (!selectedSize || selectedSize == 'None') {
      setCartStatus({
        loading: false,
        error: "Please select a size",
        success: false
      });
      return;
    }
  
    if (!product) {
      setCartStatus({
        loading: false,
        error: "Product data is missing",
        success: false
      });
      return;
    }
  
    try {
      // Prepare cart item
      const cartItem = {
        id: `${product.sys.id}-${selectedSize}`,
        name: product.fields.name,
        price: product.fields.price,
        quantity: 1,
        image: `https:${product.fields.image[0].fields.file.url}`,
        size: selectedSize,
      };
  
      // Add to cart
      await addItem(cartItem);
  
      // Only show success if we got here (no error was thrown)
      setTimeout(() => {
        setCartStatus({ loading: false, error: null, success: true });
        setShowAddedText(true);
        
        // Reset "Added to cart" text after 3.5 seconds
        setTimeout(() => {
          setShowAddedText(false);
        }, 3500);
      }, 900);
  
    } catch (error) {
      setCartStatus({
        loading: false,
        error: "Failed to add item to cart",
        success: false
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if ((error || !product) && fetchAttempted) {
    return <Navigate to="/" replace />;
  }

  const shippingWeeks = product?.fields.shipingInWeeks || '4';

  // mapping images
  const allImages = [
    product?.fields.image[0],
    ...(product?.fields.altImages || [])
  ];

  // Convert sizes string to array
  const sizeOptions = sortSizes(
    product?.fields.sizes.split(',').map(size => size.trim().toLowerCase()) || []
  );

  return (
    <PageWrapper>
      <Layout>
        <BreadcrumbContainer>
          <BreadcrumbLink to="/shop">Product List</BreadcrumbLink>
          <BreadcrumbArrow>→</BreadcrumbArrow>
          <BreadcrumbCurrent>{product?.fields.name}</BreadcrumbCurrent>
        </BreadcrumbContainer>


        <ProductContainer>

          {/* LEFT SIDE */}
          {isMobile ? (
            <MobileImageWrapper>
              <ImageSection ref={imageRef}>
                {allImages.map((image, index) => (
                  <ProductImage
                    key={`product-image-${index}`}
                    src={`https:${image?.fields.file.url}`}
                    alt={image?.fields.title || product?.fields.name}
                  />
                ))}
              </ImageSection>
            </MobileImageWrapper>
          ) : (
            <ImageSection ref={imageRef}>
              {allImages.map((image, index) => (
                <ProductImage
                  key={`product-image-${index}`}
                  src={`https:${image?.fields.file.url}`}
                  alt={image?.fields.title || product?.fields.name}
                />
              ))}
            </ImageSection>
          )}
          
          {/* RIGHT SIDE */}
          <ProductSummary ref={summaryRef}>

            <TitleRow>
              <ProductTitle>{product?.fields.name}</ProductTitle>
              <ProductPrice>${product?.fields.price}</ProductPrice>
            </TitleRow>


            {/* DESKTOP ORDER */}
            <DesktopDescription>
              <ProductDescription>

                {deriveDescriptionQueues()?.map((item, index) => (
                  <DescriptionItem key={`desc-${index}`}>
                    {item}
                  </DescriptionItem>
                ))}

              </ProductDescription>

            </DesktopDescription>

            <ProductOptions>
              <ProductColor>Color: {product?.fields.color}</ProductColor>
              
              <SizesContainer>

                {sizeOptions.map((size, index) => (
                  <SizeButton 
                    key={`size-${index}`}
                    isSelected={selectedSize === size}
                    onClick={() => handleSizeSelection(size)}
                  >
                    {size}
                  </SizeButton>
                ))}

              </SizesContainer>
          
              <AddToCartButton 
                onClick={handleAddToCart}
                disabled={cartStatus.loading || !selectedSize}
              >
                {cartStatus.loading ? 'Adding...' : showAddedText ? 'Added to cart' : 'Add to cart'}
              </AddToCartButton>

              {cartStatus.error && (
                <FeedbackMessage isError>
                  {cartStatus.error}
                </FeedbackMessage>
              )}

              <ShippingContainer>
                This product will ship in {shippingWeeks} weeks
              </ShippingContainer>
            </ProductOptions>


            {/* MOBILE ORDER */}
            <MobileOrderWrapper>

              <ProductDescription>
                {deriveDescriptionQueues()?.map((item, index) => (
                  <DescriptionItem key={`desc-${index}`}>
                    {item}
                  </DescriptionItem>
                ))}
              </ProductDescription>
            </MobileOrderWrapper>

            <DropdownsWrapper>
              <DetailsDropdown 
                title="Size + Fit"
                content={product?.fields.sizeAndFit || 'Size and fit information not available.'}
              />

              <DetailsDropdown 
                title="Care"
                content={product?.fields.care || 'Care information not available.'}
              />
            </DropdownsWrapper>
          </ProductSummary>
        </ProductContainer>
      </Layout>
    </PageWrapper>
  );
};

export default ProductDetail;