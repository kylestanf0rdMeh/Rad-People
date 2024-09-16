import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Gallery from './pages/Gallery';
import Events from './pages/Events';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
  );
}

export default App;