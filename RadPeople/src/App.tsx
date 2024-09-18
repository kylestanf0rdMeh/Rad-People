import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyles = createGlobalStyle`
//   body {
//     overflow-x: hidden;
//     width: 100%;
//     box-sizing: border-box;
//   }
// `;

// Add this component to your App.tsx, just inside the Router component

function App() {
  return (
    <>
      <GlobalStyles/>
      <Router>
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