import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../contexts/WishlistContext";
import { useCart } from "../../contexts/CartContext";
import styles from "./Wishlist.module.css";
import { ArrowLeft, ShoppingCart, Trash2, Heart } from "lucide-react";

function Wishlist() {
  const navigate = useNavigate();
  const { wishlistItems, dispatch: wishlistDispatch } = useWishlist();
  const { cartItems, dispatch: cartDispatch } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemoveFromWishlist = (id) => {
    wishlistDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id,
    });
  };

  const handleAddToCart = (product) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.header}>
          <div className={styles.headerButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </div>
          <h1 className={styles.title}>Wishlist</h1>
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
        <div className={styles.emptyContent}>
          <Heart size={80} strokeWidth={1.5} color="#d1d5db" />
          <h2 className={styles.emptyTitle}>Your Wishlist is Empty</h2>
          <p className={styles.emptyText}>
            Save your favorite items here and come back to them later!
          </p>
          <button className={styles.shopButton} onClick={() => navigate("/")}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ color: "black" }}>
        <div className={styles.headerButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </div>
        <h1 className={styles.title} style={{ color: "black" }}>
          Wishlist
        </h1>
        <div className={styles.headerButton} onClick={() => navigate("/cart")}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>

      <div className={styles.itemsContainer}>
        {wishlistItems.map((item) => (
          <div key={item.id} className={styles.wishlistItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.itemImage}
              onClick={() => {
                const route = item.gradientFrom
                  ? `/product/${item.id}`
                  : `/productmin/${item.id}`;
                navigate(route);
              }}
            />
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
              <p className={styles.itemPrice}>${item.price}</p>
              <div className={styles.itemActions}>
                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleMoveToCart(item)}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
