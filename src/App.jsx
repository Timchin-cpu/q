import { useState, useEffect,useCallback,useRef} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import { useCart } from "./contexts/CartContext";

import {
  ArrowBigLeft,
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
  MessageCircleQuestionMark,
  PanelRightOpen,
  Rabbit,
  Search,
  Settings,
  ShoppingCart,
  Snail,
  Ticket,
  UserRound,
} from "lucide-react";
const products = [
  {
    id: 1,
    name: "Royal Canin Adult Dog Food",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#6c9687ff ",
  },
  {
    id: 2,
    name: "Cat Scratching Post",
    price: 19.99,
    description: "Durable sisal rope cat scratching post with platforms",
    weight: "2.5 kg",
    image: "/images/product2.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#696063ff",
  },
  {
    id: 3,
    name: "Hamster Cage Deluxe",
    price: 45.99,
    description: "Spacious multi-level hamster habitat with accessories",
    weight: "4 kg",
    image: "/images/product.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#d687ccff",
  },
  {
    id: 4,
    name: "Bird Seed Mix",
    price: 8.99,
    description: "Premium seed blend for small birds",
    weight: "1 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#6c9687ff ",
  },
  {
    id: 5,
    name: "Royal Canin Adult Dog Food",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#6c9687ff ",
  },
  {
    id: 6,
    name: "Cat Scratching Post",
    price: 19.99,
    description: "Durable sisal rope cat scratching post with platforms",
    weight: "2.5 kg",
    image: "/images/product2.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#696063ff",
  },
  {
    id: 7,
    name: "Hamster Cage Deluxe",
    price: 45.99,
    description: "Spacious multi-level hamster habitat with accessories",
    weight: "4 kg",
    image: "/images/product.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#d687ccff",
  },
  {
    id: 8,
    name: "Bird Seed Mix",
    price: 8.99,
    description: "Premium seed blend for small birds",
    weight: "1 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff", // цвет из пачки
    gradientTo: "#6c9687ff ",
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
const categories = [
  {
    id: 1,
    name: "Dog",
    image: "/images/dog.png",
  },
  {
    id: 2,
    name: "Cat",
    image: "/images/cat.png",
  },
  {
    id: 3,
    name: "Rabbit",
    image: "/images/rabbit.png",
  },
  {
    id: 4,
    name: "Fish",
    image: "/images/fish.png",
  },
];
function App() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolledMain, setIsScrolledMain] = useState(false);
  const [hasMarginRightMain, setHasMarginRightMain] = useState(false);
  const [isScrolledMin, setIsScrolledMin] = useState(false);
  const [hasMarginRightMin, setHasMarginRightMin] = useState(false);
  
  const carouselRef = useRef(null);
  const carouselMinRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleMainScroll = useCallback(() => {
    if (carouselRef.current) {
      const el = carouselRef.current;
      const scrolled = el.scrollLeft > 10; // Небольшой порог для избежания тряски
      const nearEnd = el.scrollWidth - el.scrollLeft - el.clientWidth < 10;
      
      setIsScrolledMain(scrolled);
      setHasMarginRightMain(scrolled && !nearEnd);
    }
  }, []);

  const handleMinScroll = useCallback(() => {
    if (carouselMinRef.current) {
      const el = carouselMinRef.current;
      const scrolled = el.scrollLeft > 10; // Небольшой порог
      const nearEnd = el.scrollWidth - el.scrollLeft - el.clientWidth < 50;
      
      setIsScrolledMin(scrolled);
      setHasMarginRightMin(scrolled && !nearEnd);
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const carouselMin = carouselMinRef.current;
    
    if (carousel) {
      carousel.addEventListener('scroll', handleMainScroll, { passive: true });
      // Вызываем один раз для начального состояния
      handleMainScroll();
    }
    if (carouselMin) {
      carouselMin.addEventListener('scroll', handleMinScroll, { passive: true });
      handleMinScroll();
    }

    return () => {
      if (carousel) carousel.removeEventListener('scroll', handleMainScroll);
      if (carouselMin) carouselMin.removeEventListener('scroll', handleMinScroll);
    };
  }, [handleMainScroll, handleMinScroll]);

  return (
    <div style={{ width: "87%" }} className={styles.app}>
      {" "}
      <div className={styles.header}>
        <div className={styles.buttonBar} onClick={toggleSidebar}>
          <Menu size={17} />
        </div>
        <div className={styles.buttonBar}>
          <ShoppingCart size={17} onClick={() => navigate("/cart")} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>
      <h1>Products</h1>
      <div className={styles.inputContainer}>
        <Search
          color="gray"
          size={17}
          style={{
            paddingLeft: "10px",
          }}
        />
        <input type="text" />
      </div>
      <div 
        ref={carouselRef}
        className={`${styles.productsCarousel} 
                   ${isScrolledMain ? styles.scrolledLeft : ''} 
                   ${hasMarginRightMain ? styles.scrolledRight : ''}`}
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
            <div className={styles.productTextInfo}>
              <h3 className={styles.productTitle}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>

              <p className={styles.productPrice}>${product.price}</p>
              <p className={styles.productWeight}>{product.weight}</p>
              <ShoppingCart size={15} className={styles.cartTop} />
            </div>

            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
        ))}
      </div>
      <h2>Categories</h2>
      <div className={styles.productsCarouselMin}>
        <div className={styles.categoryCardMin}>
          <Dog />
        </div>
        <div className={styles.categoryCardMin}>
          <Cat />
        </div>{" "}
        <div className={styles.categoryCardMin}>
          <Rabbit />
        </div>{" "}
        <div className={styles.categoryCardMin}>
          <Fish />
        </div>
        <div className={styles.categoryCardMin}>
          <Bird />
        </div>
        <div className={styles.categoryCardMin}>
          <Snail />
        </div>
      </div>
      <div className={styles.productsAll}>
        {productsMin.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/productmin/${product.id}`)}
            className={styles.productCardMin}
            style={{ maxWidth: "119px", minWidth: "119px" }}
          >
            <div className={styles.productTextInfoMin}>
              <h3 className={styles.productTitleMin}>{product.name}</h3>

              <p>${product.price}</p>
            </div>

            <img
              src={product.image}
              alt={product.name}
              className={styles.productImageAll}
            />
            <ShoppingCart size={15} className={styles.cart} color="white" />
          </div>
        ))}
      </div>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div
          style={{
            width: "68%",
            paddingTop: "100px",
            paddingLeft: "17px",
            minWidth: "198px",
          }}
        >
          <div className={styles.panelClose} onClick={toggleSidebar}>
            <PanelRightOpen size="25" />
          </div>

          <div className={styles.infoButton} style={{ paddingBottom: "40px" }}>
            <CircleUserRound width="40px" height="40px" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ margin: "0" }}>Dobrynya Nkitich</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Circle fill="#99ff99 " size="12px" />
                <p
                  style={{ margin: "0", fontSize: "14px", paddingLeft: "10px" }}
                >
                  Active Now
                </p>
              </div>
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <div className={styles.infoButtonLI}>
              <ShoppingCart />
              <p>My Cart</p>
            </div>
            <div className={styles.infoButtonLI}>
              <Heart />
              <p>Wish List</p>
            </div>
            <div className={styles.infoButtonLI}>
              <ListOrdered />
              <p>My Order</p>
            </div>
            <div className={styles.infoButtonLI}>
              <Ticket />
              <p>Vouchar</p>
            </div>
            <div className={styles.infoButtonLI}>
              <MessageCircleQuestionMark />
              <p>Help</p>
            </div>
            <div className={styles.infoButtonLI}>
              <Settings />
              <p>Settings</p>
            </div>
          </div>
        </div>
        <div className={styles.LogOut}>
          <LogOut />
          <p>Sign Out </p>
        </div>
      </div>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
    </div>
  );
}

export default App;
