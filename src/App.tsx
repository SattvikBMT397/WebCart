import React from 'react'
import Display from './component/Display'
import Header from './component/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './component/Cart';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Display />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
