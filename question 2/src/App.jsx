import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AllProductsPage from './components/AllProductsPage';
import ProductDetailsPage from './components/ProductDetailsPage';

function App() {
  return (
    <Router>
        < Routes>
          <Route path="/" exact element={<AllProductsPage/>} />
          <Route path="/product/:id" element={<ProductDetailsPage/>} />
        </Routes>
    </Router>
  );
}

export default App;