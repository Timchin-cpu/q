import { createContext, useContext, useReducer } from "react";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      // Проверяем, нет ли уже товара в wishlist
      if (state.wishlistItems.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "TOGGLE_WISHLIST":
      const exists = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );
      if (exists) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, action.payload],
        };
      }

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    wishlistItems: [],
  });

  return (
    <WishlistContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
