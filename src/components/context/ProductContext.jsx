import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/ProductReducer";

const AppContext = createContext();

const API = "http://localhost:8000/api/products/";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featuredProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProduct = async (url) => {
    dispatch({ type: 'SET_LOADING' });

    try {
      const res = await axios.get(url);
      const product = res.data;
      dispatch({ type: 'SET_API_DATA', payload: product });
    } catch (error) {
      dispatch({ type: 'API_ERROR' });
    }
  };

  // For Single Page API
  const getSingleProduct = async(url)=>{
    dispatch({type: 'SET_SINGLE_LOADING'})
    try {
      const res = await axios.get(url);
      const singleProduct = res.data;
      dispatch({type: 'SET_SINGLE_PRODUCT', payload: singleProduct})
    } catch (error) {
      dispatch({type: 'SINGLE_ERROR'})
    }
  }

  useEffect(() => {
    getProduct(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useProductContext };
