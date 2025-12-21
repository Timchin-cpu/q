import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import styles from "./Orders.module.css";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  CheckCircle,
  Truck,
} from "lucide-react";

// Фейковые заказы
const fakeOrders = [
  {
    id: "ORD-2024-001",
    date: "Dec 18, 2024",
    status: "Delivered",
    total: 89.97,
    items: [
      {
        id: 1,
        name: "Royal Canin Adult Dog Food",
        price: 29.99,
        quantity: 2,
        image: "/images/product1.png",
      },
      {
        id: 2,
        name: "Cat Scratching Post",
        price: 19.99,
        quantity: 1,
        image: "/images/product2.png",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "Dec 15, 2024",
    status: "In Transit",
    total: 45.99,
    items: [
      {
        id: 3,
        name: "Hamster Cage Deluxe",
        price: 45.99,
        quantity: 1,
        image: "/images/product.png",
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "Dec 10, 2024",
    status: "Delivered",
    total: 78.96,
    items: [
      {
        id: 5,
        name: "Jossera Kids",
        price: 29.99,
        quantity: 1,
        image: "/images/eda.png",
      },
      {
        id: 6,
        name: "Jossera Surf & Turf Junior",
        price: 19.99,
        quantity: 1,
        image: "/images/eda1.webp",
      },
      {
        id: 4,
        name: "Bird Seed Mix",
        price: 8.99,
        quantity: 3,
        image: "/images/product1.png",
      },
    ],
  },
  {
    id: "ORD-2024-004",
    date: "Nov 28, 2024",
    status: "Delivered",
    total: 65.98,
    items: [
      {
        id: 7,
        name: "Jossera Nature Energetic",
        price: 45.99,
        quantity: 1,
        image: "/images/eda2.png",
      },
      {
        id: 2,
        name: "Cat Scratching Post",
        price: 19.99,
        quantity: 1,
        image: "/images/product2.png",
      },
    ],
  },
];

function Orders() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getStatusIcon = (status) => {
    if (status === "Delivered") {
      return <CheckCircle size={18} color="#10b981" />;
    } else if (status === "In Transit") {
      return <Truck size={18} color="#f59e0b" />;
    }
    return <Package size={18} color="#6b7280" />;
  };

  const getStatusClass = (status) => {
    if (status === "Delivered") return styles.statusDelivered;
    if (status === "In Transit") return styles.statusTransit;
    return styles.statusPending;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </div>
        <h1 className={styles.title}>My Orders</h1>
        <div className={styles.headerButton} onClick={() => navigate("/cart")}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>

      <div className={styles.ordersContainer}>
        {fakeOrders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderInfo}>
                <h3 className={styles.orderId}>{order.id}</h3>
                <p className={styles.orderDate}>{order.date}</p>
              </div>
              <div
                className={`${styles.orderStatus} ${getStatusClass(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </div>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                  </div>
                  <p className={styles.itemPrice}>${item.price}</p>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <div className={styles.orderTotal}>
                <span>Total:</span>
                <span className={styles.totalAmount}>
                  ${order.total.toFixed(2)}
                </span>
              </div>
              <button className={styles.reorderBtn}>Reorder</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
