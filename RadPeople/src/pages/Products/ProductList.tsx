import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/Layout';
import { ProductItem } from '../../models/Product.model';
import PageWrapper from '../../components/PageWrapper';

import { useProducts } from '../../contexts/ProductsContext';
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { 
  ProductCard, 
  ProductListContainer, 
  ProductLink, 
  ProductGrid, 
  ProductDetails, 
  ProductImage, 
  ProductName, 
  ProductPrice, 
  ImageWrapper,
  FilterMenu,
  GridButton,
  Modal,
  ModalButton,
  SortButton,
  SortModal,
  FilterButton
} from '../../styles/ProductListStyles';


const ProductList: React.FC = () => {
  const { products, loading, prefetchProducts } = useProducts();
  const { width } = useWindowDimensions();
  const [activeGrid, setActiveGrid] = useState<number>(4);
  const [sortedProducts, setSortedProducts] = useState<{
    default: ProductItem[];
    oldToNew: ProductItem[];
    priceLowToHigh: ProductItem[];
    priceHighToLow: ProductItem[];
  }>({ default: [], oldToNew: [], priceLowToHigh: [], priceHighToLow: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [sortType, setSortType] = useState('date-new');
  const [displayProducts, setDisplayProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    if (!products.length) {
      prefetchProducts();
    }
  }, [products.length, prefetchProducts]);

  const preComputeProducts = useCallback((products: ProductItem[]) => {
    const defaultOrder = [...products];
    const oldToNew = [...defaultOrder].reverse();
    const priceLowToHigh = [...defaultOrder].sort((a, b) => a.fields.price - b.fields.price);
    const priceHighToLow = [...defaultOrder].sort((a, b) => b.fields.price - a.fields.price);

    setSortedProducts({
      default: defaultOrder,
      oldToNew,
      priceLowToHigh,
      priceHighToLow
    });
    setDisplayProducts(defaultOrder);
  }, []);

  const gridClick = useCallback((viewSize: number) => {
    setActiveGrid(viewSize);
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      preComputeProducts(products);
    }
  }, [products, preComputeProducts]);

  // Handle responsive grid
  useEffect(() => {
    if (width <= 768) {
      setActiveGrid(2);
    } else if (activeGrid < 4) {
      setActiveGrid(4);
    }
  }, [width]);

  const handleSort = useCallback((type: string) => {
    setSortType(type);
    setSortModalOpen(false);
    
    switch(type) {
      case 'date-old':
        setDisplayProducts(sortedProducts.oldToNew);
        break;
      case 'price-low':
        setDisplayProducts(sortedProducts.priceLowToHigh);
        break;
      case 'price-high':
        setDisplayProducts(sortedProducts.priceHighToLow);
        break;
      default:
        setDisplayProducts(sortedProducts.default);
    }
  }, [sortedProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <Layout>
        <ProductListContainer>
          <FilterMenu>
            {width > 768 ? ( // Only render on desktop
            <>
              <GridButton onClick={() => setIsModalOpen(!isModalOpen)}>
                View By ({activeGrid})
              </GridButton>

              {/* VIEW FILTER */}
              <Modal isOpen={isModalOpen}>
                <ModalButton 
                  isActive={activeGrid === 2} 
                  onClick={() => gridClick(2)}
                >
                  2
                </ModalButton>
                <ModalButton 
                  isActive={activeGrid === 4} 
                  onClick={() => gridClick(4)}
                >
                  4
                </ModalButton>
                <ModalButton 
                  isActive={activeGrid === 8} 
                  onClick={() => gridClick(8)}
                >
                  8
                </ModalButton>
              </Modal>
            </>

            ) : (
              <div></div>
            )}
            

            {/* SORT FILTER */}
            <FilterButton 
              onClick={() => setSortModalOpen(!sortModalOpen)}
              className={width <= 768 ? 'mobile' : ''}
            >
              Sort By
            </FilterButton>
            <SortModal isOpen={sortModalOpen} className={width <= 768 ? 'mobile' : ''}>
              <SortButton 
                isActive={sortType === 'date-new'} 
                onClick={() => handleSort('date-new')}
              >
                Date, New to Old
              </SortButton>
              <SortButton 
                isActive={sortType === 'date-old'} 
                onClick={() => handleSort('date-old')}
              >
                Date, Old to New
              </SortButton>
              <SortButton 
                isActive={sortType === 'price-high'} 
                onClick={() => handleSort('price-high')}
              >
                Price, High to Low
              </SortButton>
              <SortButton 
                isActive={sortType === 'price-low'} 
                onClick={() => handleSort('price-low')}
              >
                Price, Low to High
              </SortButton>
            </SortModal>
          </FilterMenu>

          {/* PRODUCTS ARE LISTED IN THIS SECTION */}
          <ProductGrid columns={activeGrid}>
            {displayProducts.map((product) => (
              <ProductLink 
                key={product.sys.id}
                to={`/shop/${product.sys.id}/${encodeURIComponent(product.fields.name.toLowerCase().replace(/\s+/g, '-'))}`}
                state={{ product }}
                columns={activeGrid}
              >
                <ProductCard>
                  <ImageWrapper columns = {activeGrid}>
                    <ProductImage 
                      src={`https:${product.fields.image[0].fields.file.url}` || ''} 
                      alt={product.fields.name} 
                    />
                  </ImageWrapper>
                  {activeGrid !== 8 && (
                    <ProductDetails>
                      <ProductName>{product.fields.name}</ProductName>
                      <ProductPrice>${product.fields.price}</ProductPrice>
                    </ProductDetails>
                  )}
                </ProductCard>
              </ProductLink>
            ))}
          </ProductGrid>
        </ProductListContainer>
      </Layout>
    </PageWrapper>
  );
};

export default ProductList;