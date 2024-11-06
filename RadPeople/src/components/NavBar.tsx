import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronRight, FiShoppingBag } from 'react-icons/fi'
import { 
        NavBarContainer, 
        DesktopNav, 
        NavLink as StyledNavLink, 
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <NavBarContainer>


      <DesktopNav>
        <Logo to='/' as={NavLink}>RADPEOPLE</Logo>

        <NavLinks>
          <StyledNavLink to="/about" as={NavLink}>ABOUT</StyledNavLink>
          <StyledNavLink to="/gallery" as={NavLink}>GALLERY</StyledNavLink>
          <StyledNavLink to="/shop" as={NavLink}>SHOP</StyledNavLink>
          <StyledNavLink to="/events" as={NavLink}>EVENTS</StyledNavLink>
        </NavLinks>

        <CartLink to="/cart" as={NavLink}>cart</CartLink>
      </DesktopNav>


      <MobileNav> 
        <MenuIcon onClick={toggleMobileMenu}>
        {mobileMenuOpen ? (
            // X icon
            <div style={{ 
              position: 'relative', 
              width: '20px', 
              height: '20px' 
            }}>
              <span style={{ 
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'rotate(45deg)',
                transformOrigin: 'center'
              }}/>
              <span style={{ 
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'rotate(-45deg)',
                transformOrigin: 'center'
              }}/>
            </div>
          ) : (
            // Hamburger icon
            <>
              <span />
              <span />
              <span />
            </>
          )}
        </MenuIcon>

        <MobileLogo as={NavLink} to='/'>RADPEOPLE</MobileLogo>
        
        <CartIcon as={NavLink} to="/cart">
          <FiShoppingBag size={20} strokeWidth={1} />
        </CartIcon>
      </MobileNav>


      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuLinks>
          <MobileMenuLink as={NavLink} to="/about" onClick={closeMobileMenu}>
            <span>ABOUT</span> <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
          </MobileMenuLink>
          <MobileMenuLink as={NavLink} to="/gallery" onClick={closeMobileMenu}>
            <span>GALLERY</span> <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
          </MobileMenuLink>
          <MobileMenuLink as={NavLink} to="/shop" onClick={closeMobileMenu}>
            <span>SHOP</span> <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
          </MobileMenuLink>
          <MobileMenuLink as={NavLink} to="/events" onClick={closeMobileMenu}>
            <span>EVENTS</span> <MobileMenuIcon><FiChevronRight size={20} /></MobileMenuIcon>
          </MobileMenuLink>
        </MobileMenuLinks>
      </MobileMenu>
    </NavBarContainer>
  );
};

export default NavBar;