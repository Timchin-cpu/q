import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductPageMin from "./components/ProductPageMin/ProductPageMin";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./components/Cart/Cart.jsx";
import { WishlistProvider } from "./contexts/WishlistContext";
import Wishlist from "./components/Wishlist/Wishlist";
import Orders from "./components/Orders/Orders";

const products = [
  {
    id: 1,
    name: "Royal Canin Adult Dog Food",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#6c9687ff ",
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
    gradientTo: "#6c9687ff ",
  },
  {
    id: 5,
    name: "Royal Canin Adult Dog Food",
    price: 29.99,
    description: "Premium dry dog food for adult dogs of all breeds",
    weight: "3 kg",
    image: "/images/product1.png",
    gradientFrom: "#e7ecb6ff",
    gradientTo: "#6c9687ff ",
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/product/:id"
              element={<ProductPage products={products} />}
            />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/productmin/:id"
              element={<ProductPageMin products={productsMin} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} /> {/* НОВЫЙ РОУТ */}
          </Routes>
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  </StrictMode>
);
