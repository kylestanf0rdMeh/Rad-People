import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FaArrowRight, FaTimes, FaBars, FaShoppingBag} from 'react-icons/fa'
import { 
        NavBarContainer, 
        DesktopNav, 
        NavLink, 
        Logo, 
        NavLinks, 
        CartLink, 
        MobileNav, 
        MobileLogo, 
        MenuIcon,
        CartIcon, 
        MobileMenu, 
        MobileMenuLink, 
        MobileMenuLinks 
       } from '../styles/NavBarStyles';

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => navigate(path), 300); // Wait for menu close animation before navigating
  };

  return (
    <NavBarContainer>
      <DesktopNav>
        <Logo to='/'>RADPEOPLE</Logo>
        <NavLinks>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/gallery">GALLERY</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/agency">AGENCY</NavLink>
        </NavLinks>
        <CartLink as={NavLink} to="/cart">cart</CartLink>
      </DesktopNav>
      <MobileNav> 
        <MenuIcon onClick={toggleMobileMenu} >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuIcon>
        <MobileLogo as={Link} to='/'>RADPEOPLE</MobileLogo>
        <CartIcon onClick={() => handleMobileNavClick("/cart")}>
          <FaShoppingBag />
        </CartIcon>
      </MobileNav>
      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuLinks>
          <MobileMenuLink onClick={() => handleMobileNavClick("/about")}>
            About <FaArrowRight />
          </MobileMenuLink>
          <MobileMenuLink onClick={() => handleMobileNavClick("/gallery")}>
            Gallery <FaArrowRight />
          </MobileMenuLink>
          <MobileMenuLink onClick={() => handleMobileNavClick("/shop")}>
            Shop <FaArrowRight />
          </MobileMenuLink>
          <MobileMenuLink onClick={() => handleMobileNavClick("/agency")}>
            Agency <FaArrowRight />
          </MobileMenuLink>
        </MobileMenuLinks>
      </MobileMenu>
    </NavBarContainer>
  );
};

export default NavBar;