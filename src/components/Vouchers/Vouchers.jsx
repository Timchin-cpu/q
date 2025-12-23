import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import styles from "./Vouchers.module.css";
import {
  ArrowLeft,
  ShoppingCart,
  Ticket,
  Copy,
  Check,
  Calendar,
  Percent,
} from "lucide-react";
import { useState } from "react";

// Фейковые ваучеры
const fakeVouchers = [
  {
    id: 1,
    code: "SUMMER2024",
    discount: "20%",
    title: "Summer Sale",
    description: "Get 20% off on all products",
    minPurchase: 50,
    expiryDate: "Dec 31, 2024",
    color: "#6c9687ff",
    used: false,
  },
  {
    id: 2,
    code: "FREESHIP",
    discount: "Free",
    title: "Free Shipping",
    description: "Free shipping on orders over $30",
    minPurchase: 30,
    expiryDate: "Dec 25, 2024",
    color: "#696063ff",
    used: false,
  },
  {
    id: 3,
    code: "FIRST10",
    discount: "10%",
    title: "First Order",
    description: "10% off on your first purchase",
    minPurchase: 0,
    expiryDate: "Jan 15, 2025",
    color: "#d687ccff",
    used: false,
  },
  {
    id: 4,
    code: "MEGA50",
    discount: "50%",
    title: "Mega Discount",
    description: "50% off on selected items",
    minPurchase: 100,
    expiryDate: "Dec 28, 2024",
    color: "#6c9687ff",
    used: true,
  },
  {
    id: 5,
    code: "NEWYEAR",
    discount: "15%",
    title: "New Year Sale",
    description: "15% off on all categories",
    minPurchase: 40,
    expiryDate: "Jan 5, 2025",
    color: "#696063ff",
    used: false,
  },
];

function Vouchers() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </div>
        <h1 className={styles.title}>My Vouchers</h1>
        <div className={styles.headerButton} onClick={() => navigate("/cart")}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>

      <div className={styles.vouchersContainer}>
        {fakeVouchers.map((voucher) => (
          <div
            key={voucher.id}
            className={`${styles.voucherCard} ${
              voucher.used ? styles.usedVoucher : ""
            }`}
            style={{
              background: voucher.used
                ? "#f3f4f6"
                : `linear-gradient(135deg, ${voucher.color}20, ${voucher.color}10)`,
            }}
          >
            <div className={styles.voucherHeader}>
              <div
                className={styles.discountBadge}
                style={{
                  background: voucher.used ? "#9ca3af" : voucher.color,
                }}
              >
                <Percent size={16} strokeWidth={2.5} />
                <span>{voucher.discount}</span>
              </div>
              {voucher.used && <span className={styles.usedLabel}>Used</span>}
            </div>

            <div className={styles.voucherContent}>
              <h3 className={styles.voucherTitle}>{voucher.title}</h3>
              <p className={styles.voucherDescription}>{voucher.description}</p>

              <div className={styles.voucherDetails}>
                <div className={styles.detailItem}>
                  <Calendar size={14} />
                  <span>Valid until {voucher.expiryDate}</span>
                </div>
                <div className={styles.detailItem}>
                  <Ticket size={14} />
                  <span>Min. purchase: ${voucher.minPurchase}</span>
                </div>
              </div>
            </div>

            <div className={styles.voucherFooter}>
              <div className={styles.codeSection}>
                <span className={styles.codeLabel}>Code:</span>
                <span className={styles.code}>{voucher.code}</span>
              </div>
              <button
                className={styles.copyButton}
                onClick={() => handleCopyCode(voucher.code, voucher.id)}
                disabled={voucher.used}
              >
                {copiedId === voucher.id ? (
                  <>
                    <Check size={16} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vouchers;
