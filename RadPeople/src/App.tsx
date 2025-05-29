import React, { useState, useEffect, useRef } from 'react';
import playboiCartiMp3 from './assets/Playboi_Carti-24_Songs_feat.KanyeWest_Original.mp3';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetails from './pages/Events/EventDetails';
import Gallery from './pages/Gallery';
import Clients from './pages/Clients';
import NavBar from './components/NavBar';
import Checkout from './pages/Checkout'
import CartModal from './components/CartModal';
import ProductList from './pages/Products/ProductList';
import GlobalStyles from './styles/GlobalStyles';
import ProductDetail from './pages/Products/ProductDetails';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProductsProvider } from './contexts/ProductsContext';
import { GalleryProvider } from './contexts/GalleryContext';
import FontLoader from './components/FontLoader';
import { EventsProvider } from './contexts/EventsContext';
import { CartProvider } from './contexts/CartContext';
import { ClientsProvider } from './contexts/ClientsContext';


// Create a context for cart modal state
export const CartModalContext = React.createContext({
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {}
});

// Animated routes component
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/shop/:productId/:name" element={<ProductDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/events/:eventId/:name" element={<EventDetails />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to play audio on mount (may be blocked by browser)
    audioRef.current?.play().catch(() => {
      // Optionally handle autoplay block here
    });
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <Router>
      <FontLoader>
        <ProductsProvider>
          <GalleryProvider>
            <EventsProvider>
              <CartProvider>
                <ClientsProvider>
                  <CartModalContext.Provider value={{ isCartOpen, openCart, closeCart }}>
                    <audio ref={audioRef} src={playboiCartiMp3} autoPlay />
                    <GlobalStyles />
                    <NavBar />
                    <AnimatedRoutes />
                    <CartModal isOpen={isCartOpen} onClose={closeCart} />
                  </CartModalContext.Provider>
                </ClientsProvider>
              </CartProvider>
            </EventsProvider>
          </GalleryProvider>
        </ProductsProvider>
      </FontLoader>
    </Router>
  );
}

export default App;