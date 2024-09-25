import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import NavBar from './components/NavBar';

function App() {
  const [navItems, setNavItems] = useState([
    { id: 0, to: "/", label: "CREATE" },
    { id: 1, to: "/events", label: "EVENTS" },
    { id: 2, to: "/gallery", label: "GALLERY" },
    { id: 3, to: "/products", label: "SHOP" },
    { id: 4, to: "/info", label: "INFO" }
  ]);

  const handleNavClick = (clickedId: number) => {
    setNavItems((prevItems) => {
      const clickedIndex = prevItems.findIndex((item) => item.id === clickedId);
      return [
        prevItems[clickedIndex],
        ...prevItems.slice(clickedIndex + 1),
        ...prevItems.slice(0, clickedIndex)
      ];
    });
  };

  return (
    <>
      <GlobalStyles/>
      <Router>
        <NavBar navItems={navItems} handleNavClick={handleNavClick} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;