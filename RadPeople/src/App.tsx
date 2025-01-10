import Cart from './pages/Cart'
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetails from './pages/Events/EventDetails';
import Gallery from './pages/Gallery';
import NavBar from './components/NavBar';
import ProductList from './pages/Products/ProductList';
import GlobalStyles from './styles/GlobalStyles';
import ProductDetail from './pages/Products/ProductDetails';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProductsProvider } from './contexts/ProductsContext';
import { GalleryProvider } from './contexts/GalleryContext';
import FontLoader from './components/FontLoader';
import { EventsProvider } from './contexts/EventsContext';


// I created a separate component for the animated routes
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/product/:id/:name" element={<ProductDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id/:name" element={<EventDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <FontLoader>
        <ProductsProvider>
          <GalleryProvider>
            <EventsProvider>
              <GlobalStyles />
              <NavBar />
              <AnimatedRoutes />
            </EventsProvider>
          </GalleryProvider>
        </ProductsProvider>
      </FontLoader>
    </Router>
  );
}

export default App;