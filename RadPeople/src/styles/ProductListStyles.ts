import styled from 'styled-components';

const NAVBAR_HEIGHT = '40px'; // Add this constant


export const ProductListContainer = styled.div`
  overflow-x: hidden;
  width: 100%;
  background-color: #FFFFFF;
  /* Add height calculation based on content */
  height: fit-content;
`;

export const ProductLink = styled.a<{ columns: number }>`
  text-decoration: none;
  color: inherit;
  display: block;
  border-bottom: 1px solid #000000;
  border-right: 1px solid #000000;

  /* First column items */
  &:nth-child(${props => props.columns}n+1) {
    @media (min-width: 769px) {
      border-left: none;
    }
  }

  /* Last column items */
  &:nth-child(${props => props.columns}n) {
    @media (min-width: 769px) {
      border-right: none;
      margin-right: 1px;
    }
  }

  /* Mobile layout adjustments */
  @media (max-width: 768px) {
    &:nth-child(2n+1) {
      border-left: none;
    }
    &:nth-child(2n) { // Targets every second item (end of row)
      border-right: none;
      margin-right: 1px;
    }
  }
`;

export const ProductGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  gap: 0;
  background-color: #FFFFFF;
  margin-top: 30px; // Add margin to account for FilterMenu height

  padding-bottom: calc(100vw / ${props => props.columns} * (22/19)); // Calculate padding based on aspect ratio and columns
  
  @media (max-width: 768px) {
    padding-bottom: calc(100vw / 2 * (22/17)); // For mobile (2 columns)
  }
`;

export const ProductCard = styled.div`
  text-align: center;
  aspect-ratio: 17/22; // Reduced from 17/24 to make the card shorter
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const ProductDetails = styled.div`
  height: 26px; // Reduced from 27px
  border-top: 1px solid #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  font-size: 12px;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    padding: 3px 5px; // Reduced vertical padding
    gap: 2px; // Reduced gap between name and price
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ImageWrapper = styled.div<{columns: number}>`
  width: 100%;
  margin-top: ${props => props.columns === 8 ? 'px' : '0px'};
  height: ${props => props.columns === 8 ? '100%' : 'calc(100% - 24px)'};
  overflow: hidden;
`;

export const ProductName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000000;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
`;

export const ProductPrice = styled.span`
  margin-left: 10px;
  color: #000000;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 11px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;



// elements for display Modal
export const FilterMenu = styled.div`
  width: 100vw;
  position: fixed;
  top: ${NAVBAR_HEIGHT}; // Add the navbar height constant
  left: 50%;
  transform: translateX(-50%);
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  margin: 0;
  box-sizing: border-box;
  z-index: 999; // Just below navbar's z-index
  border-bottom: 1px solid #000000;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;


export const GridButton = styled.button`
  width: fit-content;
  height: 100%;
  color: black;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 11px;
  border: none;
  background: #fff;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  text-transform: uppercase;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:focus {
    outline: none;
  }
`;


export const FilterButton = styled.button`
  width: fit-content;
  height: 100%;
  color: black;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 11px;
  border: none;
  background: #fff;
  cursor: pointer;
  padding: 0;
  margin-right: 5px;
  text-transform: uppercase;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: absolute;
  top: 100%; // Position right below the DisplayGrid
  left: 0; // Remove the 5px margin
  width: 235px; // Fixed width for better control
  height: 50px;
  background: white;
  z-index: 30; // Higher than DisplayGrid
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  border: 1px solid #000000;
  border-left: none;
`;

export const SortModal = styled(Modal)`
  right: 0;
  left: auto;
  border-right: none;
  border-left: 1px solid #000000;
  width: 300px;
  height: auto;
  flex-direction: column;
  padding: 10px 0;
  gap: 5px;

  &.mobile {
    right: auto;
    left: 0;
    border-left: none;
    border-right: 1px solid #000000;
  }
`;


export const ModalButton = styled.button<{ isActive?: boolean }>`
  font-family: 'Sequel Sans Regular', sans-serif;
  padding: 5px 15px;
  width: 60px;
  border: 1px solid ${props => props.isActive ? '#000000' : '#E5E5E5'};
  background: white;
  cursor: pointer;
  border-radius: 0; 
  font-size: 11px;
  color: black;
  text-transform: uppercase;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:hover {
    border-color: #000000;
    }
  
  &:focus {
    outline: none;
    }
`;

export const SortButton = styled(ModalButton)`
      width: 90%;
      text-align: left;
      padding: 8px 10px;
      font-size: 11px;
`;
