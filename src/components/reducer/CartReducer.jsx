const CartReducer = (state, action) => {
  // Load cart from backend
  if (action.type === "SET_CART_FROM_BACKEND") {
    return {
      ...state,
      cart: action.payload,
    };
  }

   if (action.type === "INCREASE_ITEM") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        let newAmount = item.amount + 1;
        if (newAmount > item.max) newAmount = item.max;
        return { ...item, amount: newAmount };
      }
      return item;
    });
    return { ...state, cart: updatedCart };
  }

  if (action.type === "DECREASE_ITEM") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        let newAmount = item.amount - 1;
        if (newAmount < 1) newAmount = 1;
        return { ...item, amount: newAmount };
      }
      return item;
    });
    return { ...state, cart: updatedCart };
  }

  // Total items (e.g. for cart icon)
  if (action.type === "CART_TOTAL_ON_ICON") {
    let totalItems = state.cart.reduce((sum, item) => sum + item.amount, 0);
    return { ...state, total_item: totalItems };
  }

  // Total price
  if (action.type === "CART_TOTAL_PRICE") {
    let { total_item, total_price } = state.cart.reduce(
      (acc, item) => {
        acc.total_item += item.amount;
        acc.total_price += item.amount * item.price;
        return acc;
      },
      { total_item: 0, total_price: 0 }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }

  return state;
};

export default CartReducer;
