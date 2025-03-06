import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => onAddToCart(product, 1)}>Add to Cart</button>
      <button className="quick-view" onClick={toggleModal}>Quick View</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
