import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { ProductItem } from '../../models/Product.model';
import { fetchProducts } from '../../middleware/Product';
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
  const { width } = useWindowDimensions();
  const [activeGrid, setActiveGrid] = useState<number>(4); // Default to 4
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [sortedProducts, setSortedProducts] = useState<{
    default: ProductItem[];
    oldToNew: ProductItem[];
    priceLowToHigh: ProductItem[];
    priceHighToLow: ProductItem[];
  }>({ default: [], oldToNew: [], priceLowToHigh: [], priceHighToLow: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [sortType, setSortType] = useState('date-new');


  useEffect(() => {
    const loadProducts = async () => {
      try{
        const fetchedProducts = await fetchProducts();
        preComputeProducts(fetchedProducts);
      }catch(e){
        console.error('Error loading products: ', e)
      }
    }

    loadProducts()
  }, []);

  useEffect(() => {
    if (width <= 768) { // mobile breakpoint
      setActiveGrid(2); // or whatever grid size you want for mobile
    } else if (activeGrid < 4) { // if coming back to desktop
      setActiveGrid(4); // reset to default desktop view
    }
  }, [width]); // dependency on width changes

  const gridClick = (viewSize: number) => {
    setActiveGrid(viewSize)
    setIsModalOpen(!isModalOpen)
  }

  const handleSort = (type: string) => {
    setSortType(type);
    setSortModalOpen(false);
    
    switch(type) {
      case 'date-old':
        setProducts(sortedProducts.oldToNew);
        break;
      case 'price-low':
        setProducts(sortedProducts.priceLowToHigh);
        break;
      case 'price-high':
        setProducts(sortedProducts.priceHighToLow);
        break;
      default: // 'date-new' or initial state
        setProducts(sortedProducts.default);
    }
  };

  const preComputeProducts = (fetchedProducts: ProductItem[]) => {
    const defaultOrder = [...fetchedProducts];
    // Pre-compute all sort orders
    const oldToNew = [...defaultOrder].reverse();
    const priceLowToHigh = [...defaultOrder].sort((a, b) => a.fields.price - b.fields.price);
    const priceHighToLow = [...defaultOrder].sort((a, b) => b.fields.price - a.fields.price);

    setProducts(defaultOrder);
        setSortedProducts({
          default: defaultOrder,
          oldToNew,
          priceLowToHigh,
          priceHighToLow
    });
  }

  return (
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
          {products.map((product) => (
            <ProductLink 
              key={product.sys.id}
              to={`/product/${product.sys.id}/${encodeURIComponent(product.fields.name.toLowerCase().replace(/\s+/g, '-'))}`}
              state={{ product }}  // Pass the product data as state
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
  );
};

export default ProductList;