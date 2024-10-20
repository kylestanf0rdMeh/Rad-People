import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronRight, FiX, FiMenu, FiShoppingBag } from 'react-icons/fi'
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
        MobileMenuLinks,
        MobileMenuIcon
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
          <NavLink to="/events">EVENTS</NavLink>
        </NavLinks>
        <CartLink as={NavLink} to="/cart">cart</CartLink>
      </DesktopNav>
      <MobileNav> 
        <MenuIcon onClick={toggleMobileMenu} >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </MenuIcon>
        <MobileLogo as={Link} to='/'>RADPEOPLE</MobileLogo>
        <CartIcon onClick={() => handleMobileNavClick("/cart")}>
          <FiShoppingBag size={20} />
        </CartIcon>
      </MobileNav>
      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuLinks>
        <MobileMenuLink onClick={() => handleMobileNavClick("/about")}>
          ABOUT <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
        </MobileMenuLink>
        <MobileMenuLink onClick={() => handleMobileNavClick("/gallery")}>
          GALLERY <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
        </MobileMenuLink>
        <MobileMenuLink onClick={() => handleMobileNavClick("/shop")}>
          SHOP <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
        </MobileMenuLink>
        <MobileMenuLink onClick={() => handleMobileNavClick("/events")}>
          EVENTS <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
        </MobileMenuLink>
        </MobileMenuLinks>
      </MobileMenu>
    </NavBarContainer>
  );
};

export default NavBar;