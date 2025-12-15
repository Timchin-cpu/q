import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ProductPageMin.module.css";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useState, useEffect } from "react";

function ProductPageMin({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, dispatch } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return <div>Product not found</div>;
  }

  // Находим текущий товар в корзине
  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const [isInCart, setIsInCart] = useState(currentQuantity > 0);

  // Синхронизируем состояние с корзиной
  useEffect(() => {
    setIsInCart(currentQuantity > 0);
  }, [currentQuantity]);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    setIsInCart(true);
  };

  const handleIncrement = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: product.id, quantity: currentQuantity + 1 },
    });
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id, quantity: currentQuantity - 1 },
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: product.id,
      });
      setIsInCart(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(150deg, ${
          product.gradientFrom || "#fff"
        }, ${product.gradientTo || "#eee"})`,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className={styles.header}>
        <div className={styles.headerButtons}>
          <div className={styles.headerButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </div>
          <div
            className={styles.headerButton}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <img
          src={product.image}
          alt=""
          width={"150px"}
          className={styles.cardImage}
        />
        <div>
          <div className={styles.cardContent}>
            {" "}
            {/* новый flex-контейнер */}
            <h1 className={styles.productName}>{product.name}</h1>
            <div style={{ paddingTop: "10px" }}>
              <Star fill="yellow" size={20} />
              <Star fill="yellow" size={20} />
              <Star fill="yellow" size={20} />
              <Star size={20} />
              <Star size={20} />
            </div>
            <h2>{product.price}$</h2>
            <div className={styles.weights}>
              <div className={styles.weight}>
                <p>15kg</p>
              </div>
              <div className={styles.weight}>
                <p>15kg</p>
              </div>
              <div className={styles.weight}>
                <p>15kg</p>
              </div>
            </div>
            <h3 style={{ marginBottom: "0" }}>Product Description</h3>
            <p style={{ marginTop: "5px" }}>{product.description}</p>
            <div className={styles.addButtons}>
              <div className={styles.addButtonLike}>
                <Heart fill="black" />
              </div>

              {isInCart ? (
                <div className={styles.quantityContainer}>
                  <button
                    className={styles.quantityButton}
                    onClick={handleDecrement}
                  >
                    <Minus size={18} />
                  </button>
                  <span className={styles.quantity}>{currentQuantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={handleIncrement}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <div className={styles.addButton} onClick={handleAddToCart}>
                  <p>Add to cart</p>
                </div>
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
export default ProductPageMin;
