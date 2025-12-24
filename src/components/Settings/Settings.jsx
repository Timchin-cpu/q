import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import styles from "./Settings.module.css";
import {
  ArrowLeft,
  ShoppingCart,
  ChevronRight,
  User,
  Bell,
  Lock,
  Globe,
  CreditCard,
  MapPin,
  Moon,
  Smartphone,
  Mail,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useState } from "react";

function Settings() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Фейковые настройки
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    biometric: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const accountSettings = [
    {
      id: 1,
      icon: User,
      title: "Personal Information",
      description: "Update your name, email, and phone",
      action: () => console.log("Personal Info"),
    },
    {
      id: 2,
      icon: MapPin,
      title: "Addresses",
      description: "Manage your saved addresses",
      action: () => console.log("Addresses"),
    },
    {
      id: 3,
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your payment cards",
      action: () => console.log("Payment Methods"),
    },
    {
      id: 4,
      icon: Lock,
      title: "Password & Security",
      description: "Change password and security settings",
      action: () => console.log("Security"),
    },
  ];

  const preferencesSettings = [
    {
      id: 1,
      icon: Bell,
      title: "Push Notifications",
      description: "Receive order updates and offers",
      toggle: true,
      value: settings.notifications,
      action: () => toggleSetting("notifications"),
    },
    {
      id: 2,
      icon: Mail,
      title: "Email Notifications",
      description: "Get newsletters and promotions",
      toggle: true,
      value: settings.emailNotifications,
      action: () => toggleSetting("emailNotifications"),
    },
    {
      id: 3,
      icon: Moon,
      title: "Dark Mode",
      description: "Switch to dark theme",
      toggle: true,
      value: settings.darkMode,
      action: () => toggleSetting("darkMode"),
    },
    {
      id: 4,
      icon: Globe,
      title: "Language",
      description: "English (US)",
      action: () => console.log("Language"),
    },
  ];

  const securitySettings = [
    {
      id: 1,
      icon: Smartphone,
      title: "Biometric Login",
      description: "Use fingerprint or face ID",
      toggle: true,
      value: settings.biometric,
      action: () => toggleSetting("biometric"),
    },
    {
      id: 2,
      icon: Shield,
      title: "Privacy Policy",
      description: "Read our privacy policy",
      action: () => console.log("Privacy Policy"),
    },
    {
      id: 3,
      icon: HelpCircle,
      title: "Terms of Service",
      description: "View terms and conditions",
      action: () => console.log("Terms"),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </div>
        <h1 className={styles.title}>Settings</h1>
        <div className={styles.headerButton} onClick={() => navigate("/cart")}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileAvatar}>
          <User size={32} strokeWidth={1.5} />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>Dobrynya Nikitich</h2>
          <p className={styles.profileEmail}>dobrynya@example.com</p>
        </div>
      </div>

      {/* Account Settings */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Account</h3>
        <div className={styles.settingsList}>
          {accountSettings.map((item) => (
            <button
              key={item.id}
              className={styles.settingItem}
              onClick={item.action}
            >
              <div className={styles.settingIcon}>
                <item.icon size={20} />
              </div>
              <div className={styles.settingContent}>
                <p className={styles.settingTitle}>{item.title}</p>
                <p className={styles.settingDescription}>{item.description}</p>
              </div>
              <ChevronRight size={20} className={styles.chevron} />
            </button>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Preferences</h3>
        <div className={styles.settingsList}>
          {preferencesSettings.map((item) => (
            <button
              key={item.id}
              className={styles.settingItem}
              onClick={item.action}
            >
              <div className={styles.settingIcon}>
                <item.icon size={20} />
              </div>
              <div className={styles.settingContent}>
                <p className={styles.settingTitle}>{item.title}</p>
                <p className={styles.settingDescription}>{item.description}</p>
              </div>
              {item.toggle ? (
                <div
                  className={`${styles.toggle} ${
                    item.value ? styles.toggleActive : ""
                  }`}
                >
                  <div className={styles.toggleCircle}></div>
                </div>
              ) : (
                <ChevronRight size={20} className={styles.chevron} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Security & Legal */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Security & Legal</h3>
        <div className={styles.settingsList}>
          {securitySettings.map((item) => (
            <button
              key={item.id}
              className={styles.settingItem}
              onClick={item.action}
            >
              <div className={styles.settingIcon}>
                <item.icon size={20} />
              </div>
              <div className={styles.settingContent}>
                <p className={styles.settingTitle}>{item.title}</p>
                <p className={styles.settingDescription}>{item.description}</p>
              </div>
              {item.toggle ? (
                <div
                  className={`${styles.toggle} ${
                    item.value ? styles.toggleActive : ""
                  }`}
                >
                  <div className={styles.toggleCircle}></div>
                </div>
              ) : (
                <ChevronRight size={20} className={styles.chevron} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutButton}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
        <p className={styles.version}>Version 1.0.0</p>
      </div>
    </div>
  );
}

export default Settings;
