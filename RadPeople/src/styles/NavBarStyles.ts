import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link as RouterNavLink } from 'react-router-dom';

const BORDER_THICKNESS = '1px';
const BLUE_COLOR = '#1404FB';
const SCROLLBAR_WIDTH = '17px'; // Typical scrollbar width
const NAVBAR_HEIGHT = '40px'; // Reduced from 60px to 40px
const LIGHT_GRAY_COLOR = '#333333'; // New constant for light gray


export const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
  padding-right: ${SCROLLBAR_WIDTH};
  height: ${NAVBAR_HEIGHT};
  border-bottom: ${BORDER_THICKNESS} solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const DesktopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 max(5px, calc((100vw - 100%) / 2)); // Match the FilterMenu padding style
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled(RouterNavLink)`
  font-family: 'NF Ultra', sans-serif;
  font-size: 0.8rem; // Slightly reduced font size
  color: #1404FB;
  margin: 0;
  text-decoration: none;

  &:hover {
    color: #1404FB;
    text-decoration: none;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  position: absolute; // Position the links absolutely
  left: 50%; // Center the links
  transform: translateX(-50%); // Adjust for centering
`;

export const NavLink = styled(RouterNavLink)`
  font-family: 'Helvetica Neue LT Com';
  font-size: 0.9rem;
  text-decoration: none;
  color: black;
  position: relative;
  transition: color 0.3s ease;
  padding: 2px 5px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${BLUE_COLOR};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &.active {
    color: ${BLUE_COLOR};
    
    &::after {
      transform: scaleX(1);
    }
  }

  &:hover {
    color: ${BLUE_COLOR};
    
    &::after {
      transform: scaleX(1);
    }
  }
`;

export const StyledDesktopLink = styled.a`
  font-family: 'Helvetica Neue LT Com';
  font-size: 0.9rem;
  text-decoration: none;
  color: black;
  position: relative;
  transition: color 0.3s ease;
  padding: 2px 5px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${BLUE_COLOR};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &.active {
    color: ${BLUE_COLOR};
    &::after {
      transform: scaleX(1);
    }
  }

  &:hover {
    color: ${BLUE_COLOR};
    &::after {
      transform: scaleX(1);
    }
  }
`;

export const CartLink = styled.button`
  font-family: 'Helvetica Neue LT Com';
  font-size: 0.9rem;
  color: black;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-transform: uppercase;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: #1404FB;
  }
  
  &:focus {
    outline: none;
  }
`;

export const CartIndicator = styled.div<{ pulse: boolean }>`
  position: absolute;
  top: -7px;
  right: -5px;
  width: 8px;
  height: 8px;
  background-color: #1404FB;
  border-radius: 0;
  animation: ${({ pulse }) => pulse ? 'pulse 1.5s ease-in-out' : 'none'};
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const MobileNav = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px; // Updated to consistent 10px padding
  height: 100%;
  background-color: white;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
  margin: 0;
  padding: 0;

  span {
    display: block;
    width: 20px;
    height: 1px;
    background-color: #000000;
    transition: all 0.3s ease;
  }
`;

export const MobileLogo = styled.h1`
  font-family: 'NF Ultra', sans-serif;
  font-size: 1rem; // Reduced font size
  margin: 0;
  color: #1404FB;
  text-decoration: none;

  &:hover {
    color: #1404FB;
    text-decoration: none;
  }
`;

export const CartIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  position: relative;
  color: black;
  
  &:focus {
    outline: none;
  }

  @media (max-width: 767px) {
    padding-right: 0.2rem; /* Reduce right padding on mobile */
    margin-right: -1.4rem; /* Shift slightly to the right */
  }
`;

export const CartIconIndicator = styled.div<{ pulse: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 7px;
  height: 7px;
  background-color: #1404FB;
  border-radius: 0;
  animation: ${({ pulse }) => pulse ? 'pulse 1.5s ease-in-out' : 'none'};
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const MobileMenu = styled.div<{ open: boolean }>`
  position: fixed;
  top: ${NAVBAR_HEIGHT};
  left: ${({ open }) => (open ? '0' : '-100%')};
  width: 100%;
  height: calc(100% - ${NAVBAR_HEIGHT});
  background-color: white;
  transition: ${({ open }) => open ? 'left 0.3s ease-in-out' : 'none'};
  z-index: 1001;
  overflow-y: auto;
  border-top: ${BORDER_THICKNESS} solid black; // Add the border back
  box-shadow: 0 1px 0 0 black; // Add a box-shadow to create a more visible line
`;

export const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${LIGHT_GRAY_COLOR}; // Changed to light gray
`;

export const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileMenuLink = styled.div`
  font-family: 'Helvetica Neue LT Com';
  font-size: 12px;
  text-decoration: none;
  color: black;
  padding: 0.75rem 10px; // Changed to 10px horizontal padding
  border-bottom: ${BORDER_THICKNESS} solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;

  span {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px; // Adjust this value to position the underline
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${BLUE_COLOR};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
  }

  &:hover, &:active {
    color: black;
    background-color: transparent;

    span::after {
      transform: scaleX(1);
    }
  }
`;

export const MobileMenuIcon = styled.div`
  position: relative;
  width: 8px;
  height: 12px;
  
  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 1px;
    background-color: #000000;
    transform: rotate(45deg);
    transform-origin: left center;
  }

  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 1px;
    background-color: #000000;
    transform: rotate(-45deg);
    transform-origin: left center;
    bottom: 0px;
  }

  ${MobileMenuLink}:hover & {
    &::before, &::after {
      background-color: ${BLUE_COLOR};
    }
  }
`;