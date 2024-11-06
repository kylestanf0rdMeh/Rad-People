import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus } from 'react-icons/fi';

const DropdownContainer = styled.div`
  width: calc(100% - 30px);
  margin: 20px 15px 15px 0;
  -webkit-tap-highlight-color: transparent;
  border-top: 2px solid #e7e9eb;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 20px 0 15px 0;
    padding: 0 10px; // Added padding instead of margin
    box-sizing: border-box; // Ensure padding is included in width calculation
  }
`;

const DropdownHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  color: black;
  text-align: left;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  text-transform: none;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:hover {
    background: none;
    border-top: none;
    color: black;
  }

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &:active {
    background: none;
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  overflow: hidden;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  padding: ${props => props.isOpen ? '10px 0' : '0'};
  margin: 0;
  color: black;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  -webkit-tap-highlight-color: transparent;
  user-select: text;
`;

interface DetailsDropdownProps {
  title: string;
  content: string;
}

const DetailsDropdown: React.FC<DetailsDropdownProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer>
      <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        {isOpen ? <FiMinus size={12} /> : <FiPlus size={12} />}
      </DropdownHeader>
      <DropdownContent isOpen={isOpen}>
        {content}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DetailsDropdown;