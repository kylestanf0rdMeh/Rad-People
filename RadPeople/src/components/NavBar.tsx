import React, { useState, useCallback, memo, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { CartModalContext } from '../App';
import { 
  NavBarContainer, 
  DesktopNav, 
  Logo, 
  NavLinks, 
  CartLink, 
  CartIndicator,
  MobileNav, 
  MobileLogo, 
  MenuIcon,
  CartIcon, 
  CartIconIndicator,
  MobileMenu, 
  MobileMenuLink, 
  MobileMenuLinks,
  MobileMenuIcon,
  StyledDesktopLink
} from '../styles/NavBarStyles';

const NavBar: React.FC = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openCart } = useContext(CartModalContext);
  const { items, totalItems } = useCart();
  const [cartPulse, setCartPulse] = useState(false);


  // Add effect to track changes in cart items and trigger pulse
  useEffect(() => {
    if (totalItems > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => {
        setCartPulse(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [items]); // Only trigger on items changes

  // Delays the disappearance of the mobile menu
  const handleMobileMenuLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 200); // or 1000 for a full second
  };
  

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => {
      return !prev;
    });
  }, []);

  // Handle cart click
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openCart();
  };

  return (
    <NavBarContainer>
      <DesktopNav>
        <Logo to='/' as={Link}>RADPEOPLE</Logo>

        <NavLinks>
          <StyledDesktopLink
            href="/about"
            className={location.pathname === '/about' ? 'active' : ''}
          >
            ABOUT
          </StyledDesktopLink>
          <StyledDesktopLink
            href="/gallery"
            className={location.pathname === '/gallery' ? 'active' : ''}
          >
            GALLERY
          </StyledDesktopLink>
          <StyledDesktopLink
            href="/shop"
            className={location.pathname === '/shop' ? 'active' : ''}
          >
            SHOP
          </StyledDesktopLink>
          <StyledDesktopLink
            href="/events"
            className={location.pathname === '/events' ? 'active' : ''}
          >
            EVENTS
          </StyledDesktopLink>
          <StyledDesktopLink
            href="/clients"
            className={location.pathname === '/clients' ? 'active' : ''}
          >
            CLIENTS
          </StyledDesktopLink>
        </NavLinks>

        <CartLink onClick={handleCartClick} as="button">
          CART
          {totalItems > 0 && <CartIndicator pulse={cartPulse} />}
        </CartLink>
      </DesktopNav>

      <MobileNav> 
        <MenuIcon onClick={() => {
          toggleMobileMenu();
        }}>
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
        
        {/* Updated CartIcon to use onClick */}
        <CartIcon onClick={handleCartClick} as="button">
          <FiShoppingBag size={20} strokeWidth={1} />
          {totalItems > 0 && <CartIconIndicator pulse={cartPulse} />}
        </CartIcon>
      </MobileNav>

      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuLinks>
          <MobileMenuLink as="a" href="/about" onClick={e => handleMobileMenuLinkClick(e, "/about")}>
            <span>ABOUT</span> <MobileMenuIcon/>
          </MobileMenuLink>
          <MobileMenuLink as="a" href="/gallery" onClick={e => handleMobileMenuLinkClick(e, "/gallery")}>
            <span>GALLERY</span> <MobileMenuIcon/>
          </MobileMenuLink>
          <MobileMenuLink as="a" href="/shop" onClick={e => handleMobileMenuLinkClick(e, "/shop")}>
            <span>SHOP</span> <MobileMenuIcon/>
          </MobileMenuLink>
          <MobileMenuLink as="a" href="/events" onClick={e => handleMobileMenuLinkClick(e, "/events")}>
            <span>EVENTS</span> <MobileMenuIcon/>
          </MobileMenuLink>
          <MobileMenuLink as="a" href="/clients" onClick={e => handleMobileMenuLinkClick(e, "/clients")}>
            <span>CLIENTS</span> <MobileMenuIcon/>
          </MobileMenuLink>
        </MobileMenuLinks>
      </MobileMenu>
    </NavBarContainer>
  );
});

export default NavBar;