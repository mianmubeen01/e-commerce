// src/context/CartContext.jsx
import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "../reducer/CartReducer";
import APIInstance from "../api/api";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_price: "",
  shipping_fee: 500,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //  Add to cart (frontend only for now)
  const addtoCart = (id, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, amount, product } });
  };

  //  Remove item (with backend sync)
  const removeItem = async (id) => {
    try {
      await APIInstance.post("cart/remove_item/", { product_id: id });
      await fetchCartFromBackend();
    } catch (error) {
      console.error("❌ Failed to remove item:", error.response?.data || error.message);
    }
  };

  //  Decrease quantity
  const setDecrease = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

  //  Increase quantity
  const setIncrease = (id) => {
    dispatch({ type: "INCREASE_ITEM", payload: id });
  };

  //  Clear cart (with backend sync)
  useEffect(()=>{})
  const clearCart = async () => {
    try {
      await APIInstance.post("cart/clear_cart/");
      await fetchCartFromBackend();
    } catch (error) {
      console.error(" Failed to clear cart:", error.response?.data || error.message);
    }
  };

  // Clear cart state (frontend only)
  const clearCartState = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  //  Fetch cart from backend
  const fetchCartFromBackend = async () => {
    try {
      const res = await APIInstance.get("cart/");
      const items = res.data.items.map((item) => ({
        id: item.product.id,
        amount: item.quantity,
        price: item.product.price,
        max: item.product.stock,
        image: `http://localhost:8000${item.product.image}`,
      }));

      dispatch({ type: "SET_CART_FROM_BACKEND", payload: items });
    } catch (err) {
      console.error(" Failed to load cart:", err.response?.data || err.message);
    }
  };

  // On first load
  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  //  Update totals whenever cart changes
  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ON_ICON" });
    dispatch({ type: "CART_TOTAL_PRICE" });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addtoCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
        fetchCartFromBackend, // optional if needed elsewhere
        clearCartState, // new function to clear cart state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartProvider, useCartContext };
