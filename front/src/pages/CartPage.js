import React, { useState } from "react";
import "./CartPage.css";

function CartPage({ cart, updateCart, recommendedProducts }) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const taxRate = 0.18; // Example tax rate
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxes = subtotal * taxRate;
  const totalAmount = subtotal + taxes;
  const discountedTotal = totalAmount - totalAmount * discount;

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    updateCart(updatedCart);
  };

  const applyDiscount = () => {
    if (coupon === "SAVE10") {
      setDiscount(0.1); // 10% discount
    } else {
      alert("Invalid discount code");
    }
  };

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Checkout successful!");
    }, 2000);
  };

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || "placeholder.png"} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Summary</h2>
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Taxes (18% GST): ₹{taxes.toFixed(2)}</p>
            <p>Total: ₹{totalAmount.toFixed(2)}</p>
            {discount > 0 && (
              <p className="discounted-total">
                Discounted Total: ₹{discountedTotal.toFixed(2)}
              </p>
            )}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyDiscount}>Apply</button>
            </div>
            <button className="checkout-button" onClick={handleCheckout} disabled={loading}>
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}

      {recommendedProducts && recommendedProducts.length > 0 && (
        <div className="recommended-section">
          <h2>Recommended Products</h2>
          <div className="recommended-products">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="recommended-item">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <button onClick={() => updateCart([...cart, { ...product, quantity: 1 }])}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
