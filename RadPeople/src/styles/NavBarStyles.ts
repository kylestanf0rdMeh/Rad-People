import styled from 'styled-components';
import { FaBars, FaShoppingBag } from 'react-icons/fa';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';

const BORDER_THICKNESS = '1px';
const BLUE_COLOR = '#1404FB';

export const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
  border-bottom: ${BORDER_THICKNESS} solid black; // Add this line for the border
`;

export const DesktopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem; //CHANGE NAVBAR HEIGHT

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled(Link)`
  font-family: 'NF Ultra', sans-serif;
  font-size: 0.9rem;
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
  margin-left: -100px;
`;

export const NavLink = styled(RouterNavLink)`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  text-decoration: none;
  color: black;
  margin-top: 2px;
  font-size: 0.9rem; // Adjust this value to change the font size
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${BLUE_COLOR};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${BLUE_COLOR};

    &::after {
      transform: scaleX(1);
    }
  }

  &.active {
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
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${BLUE_COLOR};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${BLUE_COLOR};

    &::after {
      transform: scaleX(1);
    }
  }

  &.active {
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
  padding: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MenuIcon = styled(FaBars)`
  font-size: 1.5rem;
  cursor: pointer;
`;

export const MobileLogo = styled.h1`
  font-family: 'NF Ultra', sans-serif;
  font-size: 1.2rem;
  margin: 0;
  color: #1404FB;
  text-decoration: none;

  &:hover {
    color: #1404FB;
    text-decoration: none;
  }
`;

export const CartIcon = styled(FaShoppingBag)`
  font-size: 1.5rem;
`;

export const MobileMenu = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? '0' : '-100%')};
  width: 100%;
  height: 100%;
  background-color: white;
  transition: left 0.3s ease-in-out;
  z-index: 1001;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const MobileMenuLink = styled(Link)`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  text-decoration: none;
  color: black;
  padding: 1rem 0;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;