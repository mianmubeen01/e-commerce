const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'SET_API_DATA':
      // Filter featured products
      const featuredData = action.payload.filter((item) => item.featured === true);
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuredProducts: featuredData,
      };

    case 'API_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      // For Single PAGE
      case 'SET_SINGLE_LOADING':
        return{
          ...state,
          isSingleLoading:true
        };
      case 'SET_SINGLE_PRODUCT':
        return{
          ...state,
          isSingleLoading:false,
          singleProduct: action.payload
        };
      case 'SINGLE_ERROR':
        return{
          ...state,
          isSingleLoading: false,
          isError: true
        };

    default:
      return state;
  }
};

export default ProductReducer;
