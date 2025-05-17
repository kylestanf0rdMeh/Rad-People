import React, { useState, useCallback, memo, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useProducts } from '../contexts/ProductsContext';
import { usePrefetchData } from '../hooks/usePrefetchData';
import { useEvents } from '../contexts/EventsContext';
import { useGallery } from '../contexts/GalleryContext';
import { useCart } from '../contexts/CartContext';
import { CartModalContext } from '../App';
import { 
  NavBarContainer, 
  DesktopNav, 
  NavLink as StyledNavLink, 
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
  MobileMenuIcon
} from '../styles/NavBarStyles';

const NavBar: React.FC = memo(() => {
  const { prefetchProducts } = useProducts();
  const { prefetchAllData } = usePrefetchData();
  const { prefetchEvents } = useEvents();
  const { prefetchGallery } = useGallery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => {
      // If we're opening the menu, trigger prefetch
      if (!prev) {
        prefetchAllData();
      }
      return !prev;
    });
  }, [prefetchAllData]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleShopInteraction = useCallback(() => {
    prefetchProducts();
  }, [prefetchProducts]);

  const handleEventsInteraction = useCallback(() => {
    prefetchEvents();
  }, [prefetchEvents]);

  const handleClientsInteraction = useCallback(() => {
    prefetchEvents();
  }, [prefetchEvents]);

  const handleGalleryInteraction = useCallback(() => {
    prefetchGallery();
  }, [prefetchGallery]);

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
          <StyledNavLink to="/about" as={NavLink}>ABOUT</StyledNavLink>
          <StyledNavLink 
            to="/gallery" 
            as={NavLink}
            onMouseEnter={handleGalleryInteraction}
          >
            GALLERY
          </StyledNavLink>
          <StyledNavLink 
            to="/shop" 
            as={NavLink} 
            end={false}
            onMouseEnter={handleShopInteraction}
          >
            SHOP
          </StyledNavLink>
          <StyledNavLink 
            to="/events" 
            as={NavLink} 
            end={false}
            onMouseEnter={handleEventsInteraction}
          >
            EVENTS
          </StyledNavLink>

          <StyledNavLink 
            to="/clients" 
            as={NavLink} 
            end={false}
            onMouseEnter={handleClientsInteraction}
          >
            CLIENTS
          </StyledNavLink>
        </NavLinks>

        <CartLink onClick={handleCartClick} as="button">
          CART
          {totalItems > 0 && <CartIndicator pulse={cartPulse} />}
        </CartLink>
      </DesktopNav>

      <MobileNav> 
        <MenuIcon onClick={() => {
          toggleMobileMenu();
          handleShopInteraction();
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
          <MobileMenuLink as={Link} to="/clients" onClick={closeMobileMenu}>
            <span>CLIENTS</span> <MobileMenuIcon/>
          </MobileMenuLink>
        </MobileMenuLinks>
      </MobileMenu>
    </NavBarContainer>
  );
});

export default NavBar;