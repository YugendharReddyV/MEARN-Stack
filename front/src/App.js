import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
// import UserProfilePage from "./pages/UserProfilePage";

function App() {
  const [cart, setCart] = useState([]);
  
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div id="root">
      <Header cartCount={cartCount} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage updateCart={updateCart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage cart={cart} updateCart={updateCart} />} />
        </Routes>
      </div>
      {/* <UserProfilePage /> */}
      <Footer />
    </div>
  );
}

export default App;
