// src/components/Cart/Cart.jsx (замени черновик)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import styles from "./Cart.module.css";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft } from "lucide-react";

function Cart() {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className={styles.emptyCart}>
        <ShoppingCart size={64} className={styles.emptyIcon} />
        <h2>Your cart is empty</h2>
        <p>Add some products to get started</p>
        <button className={styles.continueButton} onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h3>My Cart ({cartItems.length})</h3>
      </div>

      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.itemImage}
            />
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className={styles.quantityControls}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className={styles.quantityButton}
              >
                <Plus size={16} />
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className={styles.quantityButton}
              >
                <Minus size={16} />
              </button>
            </div>
            <button
              className={styles.removeButton}
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.cartFooter}>
        <div className={styles.total}>
          <span>Total:</span>
          <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutButton}>Proceed to Checkout</button>
        <button
          className={styles.clearButton}
          onClick={() => dispatch({ type: "CLEAR_CART" })}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
