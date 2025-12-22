// src/components/Cart/Cart.jsx (замени черновик)

import styles from "./Cart.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
function Cart() {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <ShoppingCart size={80} strokeWidth={1.5} style={styles.emptyIcon} />
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Add some products to get started</p>
        <button style={styles.continueButton} onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.cartPage}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={styles.title}>My Cart</h1>
        <div style={{ width: 44 }}></div>
      </div>

      <div style={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <img src={item.image} alt={item.name} style={styles.itemImage} />
            <div style={styles.itemInfo}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
            </div>
            <div style={styles.quantityControls}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={styles.quantityButton}
              >
                <Plus size={16} />
              </button>
              <span style={styles.quantity}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={styles.quantityButton}
              >
                <Minus size={16} />
              </button>
            </div>
            <button
              style={styles.removeButton}
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <div style={styles.totalSection}>
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>
              Subtotal (
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
            <span style={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button style={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
export default Cart;
