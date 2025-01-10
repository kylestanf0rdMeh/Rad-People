import React, { useState, useCallback, memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi'
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

const NavBar: React.FC = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <NavBarContainer>


      <DesktopNav>
        <Logo to='/' as={Link}>RADPEOPLE</Logo>

        <NavLinks>
          <StyledNavLink to="/about" as={NavLink}>ABOUT</StyledNavLink>
          <StyledNavLink to="/gallery" as={NavLink}>GALLERY</StyledNavLink>
          <StyledNavLink to="/shop" as={NavLink} end={false}>SHOP</StyledNavLink>
          <StyledNavLink to="/events" as={NavLink} end={false}>EVENTS</StyledNavLink>
        </NavLinks>

        <CartLink to="/cart" as={Link}>cart</CartLink>
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

        <MobileLogo as={Link} to='/'>RADPEOPLE</MobileLogo>
        
        <CartIcon as={Link} to="/cart">
          <FiShoppingBag size={20} strokeWidth={1} />
        </CartIcon>
      </MobileNav>


      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuLinks>
          <MobileMenuLink as={Link} to="/about" onClick={closeMobileMenu}>
            <span>ABOUT</span> <MobileMenuIcon/>
          </MobileMenuLink>
          <MobileMenuLink as={Link} to="/gallery" onClick={closeMobileMenu}>
            <span>GALLERY</span> <MobileMenuIcon/>
          </MobileMenuLink>
          <MobileMenuLink as={Link} to="/shop" onClick={closeMobileMenu}>
            <span>SHOP</span> <MobileMenuIcon/>
          </MobileMenuLink>
          <MobileMenuLink as={Link} to="/events" onClick={closeMobileMenu}>
            <span>EVENTS</span> <MobileMenuIcon/>
          </MobileMenuLink>
        </MobileMenuLinks>
      </MobileMenu>
    </NavBarContainer>
  );
});

export default NavBar;