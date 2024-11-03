import Cart from './pages/Cart'
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import NavBar from './components/NavBar';
import ProductList from './pages/ProductList';
import GlobalStyles from './styles/GlobalStyles';
import ProductDetail from './pages/ProductDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:id/:name" element={<ProductDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;