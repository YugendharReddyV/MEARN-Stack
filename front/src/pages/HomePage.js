import React from "react";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";
import biryaniImage from "../assets/biryani.jpg";
import pavbhajiImage from "../assets/pavbhaji.jpeg";
import littichokhaImage from "../assets/Litti-Chokha.jpg";
import MisalPav from "../assets/MisalPav.jpg";
import pannerDosa from "../assets/pannerDosa.jpeg";
import MasalaChaas from "../assets/Masala-Chaas.jpg";
import HaldiSabji from "../assets/Haldi-Ki-Sabji.jpg";

const HomePage = ({ updateCart }) => {
  const products = [
    { id: 1, name: "Hydrabadi Chicken biryani", price: 150, image: biryaniImage, description: "A cool product." },
    { id: 2, name: "Pav bhaji", price: 50, image: pavbhajiImage, description: "An amazing product." },
    { id: 3, name: "Litti-Chokha", price: 50, image: littichokhaImage, description: "A must-have product." },
    { id: 4, name: "MisalPav", price: 75, image: MisalPav, description: "A must-have product." },
    { id: 5, name: "Panner Dosa", price: 110, image: pannerDosa, description: "A must-have product." },
    { id: 6, name: "Masala Chaas", price: 20, image: MasalaChaas, description: "A must-have product." },
    { id: 7, name: "Haldi Sabji", price: 65, image: HaldiSabji, description: "A must-have product." },
  ];

  const handleAddToCart = (product, quantity) => {
    updateCart((prevCart) => {
      const updatedCart = [...prevCart];
      const cartItemIndex = updatedCart.findIndex((item) => item.id === product.id);
      if (cartItemIndex >= 0) {
        updatedCart[cartItemIndex].quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity });
      }
      return updatedCart;
    });
  };

  return (
    <div>
      <h1>Browse and shop your favorite products!</h1>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product, 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;