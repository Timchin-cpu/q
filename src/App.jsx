import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import { useCart } from "./contexts/CartContext";

import {
  Bird,
  Cat,
  Circle,
  CircleUserRound,
  Dog,
  Fish,
  Heart,
  ListOrdered,
  LogOut,
  Menu,
  MessageCircleQuestion,
  PanelRightClose,
  Rabbit,
  Search,
  Settings,
  ShoppingCart,
  Snail,
  Ticket,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Royal Canin Adult Dog Food",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#6c9687ff",
  },
  {
    id: 2,
    name: "Cat Scratching Post",
    price: 19.99,
    description: "Durable sisal rope cat scratching post with platforms",
    weight: "2.5 kg",
    image: "/images/product2.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#696063ff",
  },
  {
    id: 3,
    name: "Hamster Cage Deluxe",
    price: 45.99,
    description: "Spacious multi-level hamster habitat with accessories",
    weight: "4 kg",
    image: "/images/product.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#d687ccff",
  },
  {
    id: 4,
    name: "Bird Seed Mix",
    price: 8.99,
    description: "Premium seed blend for small birds",
    weight: "1 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#6c9687ff",
  },
  {
    id: 5,
    name: "Royal Canin Adult Dog Food",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#6c9687ff",
  },
  {
    id: 6,
    name: "Cat Scratching Post",
    price: 19.99,
    description: "Durable sisal rope cat scratching post with platforms",
    weight: "2.5 kg",
    image: "/images/product2.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#696063ff",
  },
  {
    id: 7,
    name: "Hamster Cage Deluxe",
    price: 45.99,
    description: "Spacious multi-level hamster habitat with accessories",
    weight: "4 kg",
    image: "/images/product.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#d687ccff",
  },
  {
    id: 8,
    name: "Bird Seed Mix",
    price: 8.99,
    description: "Premium seed blend for small birds",
    weight: "1 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#6c9687ff",
  },
];

const productsMin = [
  {
    id: 1,
    name: "Jossera Kids",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/eda.png",
  },
  {
    id: 2,
    name: "Jossera Surf & Turf Junior",
    price: 19.99,
    description: "Durable sisal rope cat scratching post with platforms",
    weight: "2.5 kg",
    image: "/images/eda1.webp",
  },
  {
    id: 3,
    name: "Jossera Nature Energetic",
    price: 45.99,
    description: "Spacious multi-level hamster habitat with accessories",
    weight: "4 kg",
    image: "/images/eda2.png",
  },
  {
    id: 4,
    name: "Jossera Mini Senior",
    price: 8.99,
    description: "Premium seed blend for small birds",
    weight: "1 kg",
    image: "/images/eda4.png",
  },
  {
    id: 5,
    name: "Jossera Kids",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/eda.png",
  },
  {
    id: 6,
    name: "Jossera Surf & Turf Junior",
    price: 19.99,
    description: "Durable sisal rope cat scratching post with platforms",
    weight: "2.5 kg",
    image: "/images/eda1.webp",
  },
  {
    id: 7,
    name: "Jossera Nature Energetic",
    price: 45.99,
    description: "Spacious multi-level hamster habitat with accessories",
    weight: "4 kg",
    image: "/images/eda2.png",
  },
  {
    id: 8,
    name: "Jossera Mini Senior",
    price: 8.99,
    description: "Premium seed blend for small birds",
    weight: "1 kg",
    image: "/images/eda4.png",
  },
];

function App() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolledMain, setIsScrolledMain] = useState(false);
  const [isScrolledMin, setIsScrolledMin] = useState(false);
  const carouselRef = useRef(null);
  const carouselMinRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleMainScroll = useCallback(() => {
    if (carouselRef.current) {
      const scrolled = carouselRef.current.scrollLeft > 0;
      setIsScrolledMain(scrolled);
    }
  }, []);

  const handleMinScroll = useCallback(() => {
    if (carouselMinRef.current) {
      const scrolled = carouselMinRef.current.scrollLeft > 0;
      setIsScrolledMin(scrolled);
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const carouselMin = carouselMinRef.current;

    if (carousel) {
      carousel.addEventListener("scroll", handleMainScroll, { passive: true });
    }
    if (carouselMin) {
      carouselMin.addEventListener("scroll", handleMinScroll, {
        passive: true,
      });
    }

    return () => {
      if (carousel) carousel.removeEventListener("scroll", handleMainScroll);
      if (carouselMin)
        carouselMin.removeEventListener("scroll", handleMinScroll);
    };
  }, [handleMainScroll, handleMinScroll]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button
            className={styles.headerButton}
            onClick={toggleSidebar}
            color="black"
          >
            <Menu size={20} />
          </button>
          <button
            className={styles.headerButton}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>

        <h1 className={styles.pageTitle}>Products</h1>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
          />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div
            ref={carouselRef}
            className={`${styles.carousel} ${
              isScrolledMain ? styles.scrolled : ""
            }`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{
                  backgroundImage: `linear-gradient(150deg, ${product.gradientFrom}, ${product.gradientTo})`,
                }}
              >
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <div className={styles.productFooter}>
                    <p className={styles.productPrice}>${product.price}</p>
                    <p className={styles.productWeight}>{product.weight}</p>
                  </div>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
                <button className={styles.addToCartIcon}>
                  <ShoppingCart size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Special Offers</h2>
          <div
            ref={carouselMinRef}
            className={`${styles.carouselMin} ${
              isScrolledMin ? styles.scrolled : ""
            }`}
          >
            {productsMin.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/productmin/${product.id}`)}
                className={styles.productCardMin}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImageMin}
                />
                <div className={styles.productInfoMin}>
                  <h3 className={styles.productTitleMin}>{product.name}</h3>
                  <p className={styles.productPriceMin}>${product.price}</p>
                </div>
                <button className={styles.addToCartIconMin}>
                  <ShoppingCart size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <div className={styles.categoriesGrid}>
            <button className={styles.categoryCard}>
              <Dog size={28} strokeWidth={1.5} />
              <span>Dogs</span>
            </button>
            <button className={styles.categoryCard}>
              <Cat size={28} strokeWidth={1.5} />
              <span>Cats</span>
            </button>
            <button className={styles.categoryCard}>
              <Rabbit size={28} strokeWidth={1.5} />
              <span>Rabbits</span>
            </button>
            <button className={styles.categoryCard}>
              <Fish size={28} strokeWidth={1.5} />
              <span>Fish</span>
            </button>
            <button className={styles.categoryCard}>
              <Bird size={28} strokeWidth={1.5} />
              <span>Birds</span>
            </button>
            <button className={styles.categoryCard}>
              <Snail size={28} strokeWidth={1.5} />
              <span>Others</span>
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>All Products</h2>
          <div className={styles.productsGrid}>
            {productsMin.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/productmin/${product.id}`)}
                className={styles.productCardGrid}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImageGrid}
                />
                <div className={styles.productInfoGrid}>
                  <h3 className={styles.productTitleGrid}>{product.name}</h3>
                  <p className={styles.productPriceGrid}>${product.price}</p>
                </div>
                <button className={styles.addToCartIconGrid}>
                  <ShoppingCart size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <button className={styles.closeSidebar} onClick={toggleSidebar}>
          <PanelRightClose size={24} />
        </button>

        <div className={styles.sidebarContent}>
          <div className={styles.userProfile}>
            <CircleUserRound size={48} strokeWidth={1.5} />
            <div className={styles.userInfo}>
              <p className={styles.userName}>Dobrynya Nikitich</p>
              <div className={styles.userStatus}>
                <Circle size={10} fill="#10b981" stroke="none" />
                <span>Active Now</span>
              </div>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            <button
              className={styles.navItem}
              onClick={() => {
                navigate("/cart");
                toggleSidebar();
              }}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span>My Cart</span>
            </button>
            <button
              className={styles.navItem}
              onClick={() => {
                navigate("/wishlist");
                toggleSidebar();
              }}
            >
              <Heart size={22} strokeWidth={1.5} />
              <span>Wish List</span>
            </button>
            <button
              className={styles.navItem}
              onClick={() => {
                navigate("/orders");
                toggleSidebar();
              }}
            >
              <ListOrdered size={22} strokeWidth={1.5} />
              <span>My Orders</span>
            </button>
            <button
              className={styles.navItem}
              onClick={() => {
                navigate("/vouchers");
                toggleSidebar();
              }}
            >
              <Ticket size={22} strokeWidth={1.5} />
              <span>Vouchers</span>
            </button>
            <button className={styles.navItem}>
              <MessageCircleQuestion size={22} strokeWidth={1.5} />
              <span>Help</span>
            </button>
            <button className={styles.navItem}>
              <Settings size={22} strokeWidth={1.5} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <button className={styles.signOutButton}>
          <LogOut size={22} strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
    </div>
  );
}

export default App;
