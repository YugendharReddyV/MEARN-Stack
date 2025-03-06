import React, { createContext, useState, useContext } from "react";

// Create a Context for the Cart
const CartContext = createContext();

// Provider Component to wrap your app and manage the cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add products to the cart
  const addToCart = (product, quantity) => {
    const newCart = [...cart];
    const existingProductIndex = newCart.findIndex(p => p.id === product.id);

    if (existingProductIndex >= 0) {
      newCart[existingProductIndex].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }

    setCart(newCart);
  };

  // Get the number of items in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use CartContext
export const useCart = () => useContext(CartContext);
