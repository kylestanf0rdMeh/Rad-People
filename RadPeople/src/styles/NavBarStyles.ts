import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';

const BORDER_THICKNESS = '1px';
const BLUE_COLOR = '#1404FB';
const SCROLLBAR_WIDTH = '17px'; // Typical scrollbar width
const NAVBAR_HEIGHT = '40px'; // Reduced from 60px to 40px


export const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
  border-bottom: ${BORDER_THICKNESS} solid black;
  padding-right: ${SCROLLBAR_WIDTH}; // Add padding to account for scrollbar
  height: ${NAVBAR_HEIGHT};
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
  padding: 0 1rem;
  height: ${NAVBAR_HEIGHT};
  background-color: white; // Ensure the background is white

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MenuIcon = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  color: black;
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
  color: black;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
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
`;

export const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: black; // Set the color to black
//   color: #1404FB; // Set the color to blue if you prefer
`;

export const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const MobileMenuLink = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  text-decoration: none;
  color: black;
  padding: 1rem 0;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent; // Disable tap highlight on iOS
  user-select: none; // Prevent text selection
  -webkit-touch-callout: none; // Disable callout on long-press (iOS)

  // Remove hover and active effects
  &:hover, &:active {
    color: inherit;
    background-color: transparent;
  }
`;