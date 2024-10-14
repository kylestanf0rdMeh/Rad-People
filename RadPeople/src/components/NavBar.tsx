import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa'
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
        CloseIcon, 
        MobileMenuLink, 
        MobileMenuLinks 
       } from '../styles/NavBarStyles';



const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <MenuIcon onClick={() => setMobileMenuOpen(true)} />
        <MobileLogo as={Link} to='/'>RADPEOPLE</MobileLogo>
        <CartIcon to="/cart" />
      </MobileNav>
      <MobileMenu open={mobileMenuOpen}>
        <CloseIcon onClick={() => setMobileMenuOpen(false)} />
        <MobileMenuLinks>
          <MobileMenuLink to="/about">
            About <FaArrowRight />
          </MobileMenuLink>
          <MobileMenuLink to="/gallery">
            Gallery <FaArrowRight />
          </MobileMenuLink>
          <MobileMenuLink to="/shop">
            Shop <FaArrowRight />
          </MobileMenuLink>
          <MobileMenuLink to="/agency">
            Agency <FaArrowRight />
          </MobileMenuLink>
        </MobileMenuLinks>
      </MobileMenu>
    </NavBarContainer>
  );
};

export default NavBar;