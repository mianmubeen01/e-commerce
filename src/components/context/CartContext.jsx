import { createContext, useReducer, useContext, useEffect } from 'react';
import reducer from '../reducer/CartReducer';

const CartContext = createContext();
// const getLocalStorage = () => {
//   try {
//     const data = localStorage.getItem("holdCart");
//     const parsedData = JSON.parse(data);
//     return Array.isArray(parsedData) ? parsedData : [];
//   } catch (error) {
//     return [];
//   }
// };

const initialState = {
    cart: [],
    // cart: getLocalStorage(),
    total_item: "",
    total_price: "",
    shipping_fee: 20000
};

const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
// add to  cart
    const addtoCart = (id, color, amount, product) =>{
        dispatch({type: 'ADD_TO_CART', payload: { id, color, amount, product}})
    };
// remove cart item
    const removeItem = (id) =>{
        dispatch({type: 'REMOVE_ITEM', payload: id})
    }
    // SET DECREASE
    const setDecrease = (id) =>{
        dispatch({type: 'DECREASE_ITEM', payload: id})
    }
    // SET INCREASE
    const setIncrease = (id) =>{
        dispatch({type: 'INCREASE_ITEM', payload: id})
    }
    // add cart into local storage
    useEffect(() =>{
        dispatch({type: 'CART_TOTAL_ON_ICON'}),
        dispatch({type: 'CART_TOTAL_PRICE'})
        // localStorage.setItem('holdCart', JSON.stringify(state.cart))
    },[state.cart]);

    // For updata cart icon on Nav
    // useEffect(() =>{
    //     dispatch({type: "CART_TOTAL-ON-ICON "})
    // }, [])

    // Clear Cart
    const clearCart = () =>{
        dispatch({type: 'CLEAR_CART'})
    }
  return (
    <CartContext.Provider value={{...state, addtoCart, removeItem, clearCart, setDecrease, setIncrease}}>
        {children}
    </CartContext.Provider>
  )
};

const useCartContext = ()=>{
    return useContext(CartContext);
}

export {CartProvider, useCartContext};