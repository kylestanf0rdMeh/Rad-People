import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';

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
  padding: 0 2rem;
  height: 100%; // Set a fixed height for the navbar

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled(Link)`
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
  font-family: 'Helvetica Neue LT Com', sans-serif;
  text-decoration: none;
  color: black;
  font-size: 0.8rem; // Slightly reduced font size
  position: relative;
  transition: color 0.3s ease;
  padding: 2px 5px; // Reduced padding

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px; // Adjusted to be closer to the text
    left: 0;
    background-color: ${BLUE_COLOR};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover, &.active {
    color: ${BLUE_COLOR};

    &::after {
      transform: scaleX(1);
    }
  }
`;

export const CartLink = styled(RouterNavLink)`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  text-decoration: none;
  color: black;
  font-size: 0.8rem; // Slightly reduced font size
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px; // Adjusted to be closer to the text
    left: 0;
    background-color: ${BLUE_COLOR};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover, &.active {
    color: ${BLUE_COLOR};

    &::after {
      transform: scaleX(1);
    }
  }
`;

export const MobileNav = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem 0 1rem; // Reduce right padding
  height: 100%;
  background-color: white;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MenuIcon = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  color: ${LIGHT_GRAY_COLOR}; // Changed to light gray
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
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

export const CartIcon = styled.div`
  font-size: 1.2rem;
  color: ${LIGHT_GRAY_COLOR};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
  margin-right: -0.5rem; // Negative margin to offset the padding and hug the right border
`;

export const MobileMenu = styled.div<{ open: boolean }>`
  position: fixed;
  top: ${NAVBAR_HEIGHT};
  left: ${({ open }) => (open ? '0' : '-100%')};
  width: 100%;
  height: calc(100% - ${NAVBAR_HEIGHT});
  background-color: white;
  transition: left 0.3s ease-in-out;
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
  font-family: 'Helvetica Neue LT Com', sans-serif;
  text-decoration: none;
  color: black;
  padding: 0.75rem 1rem; // Reduced vertical padding and horizontal padding
  border-bottom: ${BORDER_THICKNESS} solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;

  &:hover, &:active {
    color: inherit;
    background-color: transparent;
  }
`;

export const MobileMenuIcon = styled.div`
  color: ${LIGHT_GRAY_COLOR};
  margin-left: auto; // Push the icon to the right
  padding-left: 1rem; // Add some space between text and icon
`;