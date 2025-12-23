import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import styles from "./Help.module.css";
import {
  ArrowLeft,
  ShoppingCart,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

// Фейковые FAQ
const faqData = [
  {
    id: 1,
    question: "How do I track my order?",
    answer:
      "You can track your order by going to 'My Orders' section in the menu. Click on the order you want to track and you'll see the current status and tracking information.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unopened products. Items must be in original packaging and condition. Contact our support team to initiate a return.",
  },
  {
    id: 3,
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days. Express shipping is available and takes 1-2 business days. Free shipping is available on orders over $50.",
  },
  {
    id: 4,
    question: "How can I change my delivery address?",
    answer:
      "You can change your delivery address before the order is shipped. Go to 'My Orders', select the order, and click 'Edit Address'. If the order has already shipped, please contact support.",
  },
  {
    id: 5,
    question: "Do you offer gift wrapping?",
    answer:
      "Yes! We offer gift wrapping services for an additional $5. You can select this option during checkout. We'll include a gift message if you provide one.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
  },
];

// Контактная информация
const contactInfo = {
  phone: "+1 (555) 123-4567",
  email: "support@petshop.com",
  hours: "Mon-Fri: 9AM - 6PM EST",
  address: "123 Pet Street, New York, NY 10001",
};

function Help() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [expandedId, setExpandedId] = useState(null);

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </div>
        <h1 className={styles.title}>Help Center</h1>
        <div className={styles.headerButton} onClick={() => navigate("/cart")}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <div className={styles.contactGrid}>
          <a href={`tel:${contactInfo.phone}`} className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <Phone size={20} />
            </div>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>Phone</p>
              <p className={styles.contactValue}>{contactInfo.phone}</p>
            </div>
          </a>

          <a
            href={`mailto:${contactInfo.email}`}
            className={styles.contactCard}
          >
            <div className={styles.contactIcon}>
              <Mail size={20} />
            </div>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>Email</p>
              <p className={styles.contactValue}>{contactInfo.email}</p>
            </div>
          </a>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <Clock size={20} />
            </div>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>Hours</p>
              <p className={styles.contactValue}>{contactInfo.hours}</p>
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <MapPin size={20} />
            </div>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>Address</p>
              <p className={styles.contactValue}>{contactInfo.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqContainer}>
          {faqData.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(faq.id)}
              >
                <HelpCircle size={20} />
                <span>{faq.question}</span>
                <ChevronRight
                  size={20}
                  className={`${styles.chevron} ${
                    expandedId === faq.id ? styles.chevronExpanded : ""
                  }`}
                />
              </button>
              {expandedId === faq.id && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Chat Button */}
      <div className={styles.liveChatSection}>
        <button className={styles.liveChatButton}>
          <MessageCircle size={22} />
          <div className={styles.liveChatText}>
            <span className={styles.liveChatTitle}>Start Live Chat</span>
            <span className={styles.liveChatSubtitle}>We're online now</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Help;
