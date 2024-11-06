import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  overflow: hidden;
  

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    overflow: visible;
  }
`;

export const MobileOrderWrapper = styled.div`
  order: 3;
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 20px;
  }
`;

export const DesktopDescription = styled.div`
  order: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileImageWrapper = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
    border-bottom: 1px solid black;
    background-color: #edeff1;
  }
`;

export const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  height: 29px; // Same height as FilterMenu
  width: 100%;
  background-color: #FFFFFF;
  padding: 0 10px;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  border-bottom: 1px solid #000000;
`;

export const BreadcrumbLink = styled(Link)`
  color: #000000;
  text-decoration: underline;
  
  &:hover {
    text-decoration: underline;
    color: #000000;
  }
`;

export const BreadcrumbArrow = styled.span`
  margin: 0 8px;
  font-size: 11px;
  color: black;
`;

export const BreadcrumbCurrent = styled.span`
  color: #000000;
`;

export const ImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100vh;
  scrollbar-width: none;
  margin: 0;
  padding: 0;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100vw; // Full viewport width
    height: auto;
    overflow: visible;
    margin: 0;
    padding: 0;

    /* Show only first image on mobile */
    & > img:not(:first-child) {
      display: none;
    }
  }
`;

export const ProductOptions = styled.div`
  order: 2;

  @media (max-width: 768px) {
    order: 1;
    padding-bottom: 20px;
    border-bottom: 2px solid #e7e9eb;
  }
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
  max-width: 50%;
  box-sizing: border-box;
  overflow-y: auto;
  height: auto;
  min-height: 100%;
  position: sticky;
  top: 0;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    border-left: none;
    padding: 0px;
    position: relative;
    margin-top: 8px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 10px 0;
  width: 100%;

  @media (max-width: 768px) {
    margin: 0px 0 0 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #e7e9eb; // Changed to light gray to match other borders
  }
`;

export const ProductTitle = styled.h1`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 17px;
  margin: 0;
  color: black;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-left: 10px;
  }
`;

export const ProductPrice = styled.p`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 17px;
  color: black;
  margin: 0;
  margin-right: 10px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
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

  @media (max-width: 768px) {
    margin-left: 10px;
  }

`;

export const DropdownsWrapper = styled.div`
  margin-top: 20px;
  order: 999; // Ensure it's always last
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

@media (max-width: 768px) {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e7e9eb;
  }
`;

export const SizesContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;

  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

export const SizeButton = styled.button<{ isSelected: boolean }>`
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  padding: 12px 20px;
  background-color: #edeff1;
  border: 1px solid ${props => props.isSelected ? '#000000' : 'transparent'};
  cursor: pointer;
  min-width: 60px;
  display: flex;
  color: black;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:hover {
    border-color: #000000;
    background-color: #edeff1;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    &:active {
      border-color: #000000;
      background-color: #edeff1;
      transition: none;
    }
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
  -webkit-tap-highlight-color: transparent; // Remove tap highlight on mobile

  @media (max-width: 768px) {
    width: calc(100% - 20px); // Adjust width to account for margins
    margin: 0 10px;

    &:active {
      background-color: #FFFFFF;
      color: #000000;
      transition: none;
    }
    
    &:not(:active) {
      transition: all 0.2s ease;
    }
  }

  @media (min-width: 769px) {
    &:hover {
      background-color: #FFFFFF;
      color: #000000;
      border-color: #000000;
    }
  }

  &:focus {
    outline: none;
  }
`;

export const ShippingContainer = styled.div`
  width: calc(100% - 30px);
  padding: 15px 0;
  background-color: #edeff1;
  color: #000000;
  border: none;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  text-align: center;
  margin: 15px 15px 0 0;
  text-transform: uppercase;

  @media (max-width: 768px) {
    width: calc(100% - 20px); // Adjust width to account for margins
    margin: 15px 10px 0; // Equal margins on both sides
  }
`;