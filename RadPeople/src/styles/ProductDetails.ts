import styled from 'styled-components';

export const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 100vw;
  padding: 0 max(5px, calc((100vw - 100%) / 2));
  box-sizing: border-box;
  overflow: hidden; // Prevent content from spilling out
`;

export const ImageSection = styled.div`
  flex: 1;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px; // Space between images
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const ProductSummary = styled.div`
  flex: 1;
  padding: 0 15px 0 20px;
  border-left: 1px solid #000000;
  max-width: 50%; // Ensure it takes up exactly half the container
  box-sizing: border-box; // Include padding in width calculation
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 10px 0; // Reduced bottom margin from 15px to 10px
  width: 100%;
`;

export const ProductTitle = styled.h1`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 17px;
  margin: 0;
  color: black;
  text-transform: uppercase;
`;

export const ProductPrice = styled.p`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 17px;
  color: black;
  margin: 0;
  padding-right: 20px; // Add right padding
`;


export const ProductDescription = styled.div`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: black;
  margin: 0 0 15px 0;
  padding-right: 15px;
  word-wrap: break-word;
  max-width: 100%;
`;

export const DescriptionItem = styled.p`
  margin: 0 0 12px 0; // Add space between items
  padding: 0;
`;

export const ProductColor = styled.div`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  color: black;
  margin: 0 0 20px 0;
//   text-transform: uppercase;
`;

export const SizesContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const SizeButton = styled.button<{ isSelected: boolean }>`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  padding: 12px 20px;
  background-color: #F5F5F5;
  border: 1px solid ${props => props.isSelected ? '#000000' : 'transparent'};
  cursor: pointer;
  min-width: 60px;
  display: flex;
  color: black;
  align-items: center;
  justify-content: center;
  border-radius: 0;

  &:hover {
    border-color: #000000;
    background-color: #EBEBEB;
  }

  &:focus {
    outline: none;
  }
`;

export const AddToCartButton = styled.button`
  width: calc(100% - 30px);
  padding: 15px 0;
  background-color: #000000;
  color: #FFFFFF;
  border: 1px solid #000000;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0px 15px 0 0;
  transition: all 0.2s ease;
  border-radius: 0;

  &:hover {
    background-color: #FFFFFF;
    color: #000000;
    border-color: #000000;
  }

  &:focus {
    outline: none;
  }
`;

export const ShippingContainer = styled.div`
  width: calc(100% - 30px);
  padding: 15px 0;
  background-color: #F5F5F5;
  color: #000000;
  border: none;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  text-align: center;
  margin: 15px 15px 0 0;
  text-transform: uppercase;
`;