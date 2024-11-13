import Cart from './pages/Cart'
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDescription from './pages/EventDescription';
import Gallery from './pages/Gallery';
import NavBar from './components/NavBar';
import ProductList from './pages/Products/ProductList';
import GlobalStyles from './styles/GlobalStyles';
import ProductDetail from './pages/Products/ProductDetails';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';


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
        <Route path="/events/:id/:name" element={<EventDescription />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <NavBar />
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;