
const filterReducer = (state, action) => {
  switch(action.type){
    case'LOAD_FILTER_PRODUCTS':
    return{
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
    }
    case 'SET_GRID_VIEW':
        return{
            ...state,
            grid_view: true
        }
    case "SET_LIST_VIEW":
        return{
            ...state,
            grid_view: false
        };
     case "SET_SORTING_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };
      case 'SORTING_PRODUCTS':
        let newData;
      const {filter_products ,sorting_value} = state;
      let tempSortProduct = [...filter_products]

      const sort_product = (a, b) =>{
        if(sorting_value === 'lowest'){
          return a.price - b.price
      }
        if(sorting_value === 'highest'){
          return b.price - a.price
      }
        if(sorting_value === 'a-z'){
          return a.name.localeCompare(b.name);
    }   if(sorting_value === 'z-a'){
          return b.name.localeCompare(a.name);
    }

  };
    newData = tempSortProduct.sort(sort_product);
    return{
      ...state,
      filter_products: newData
    }

    // for search

    case 'UPDATE_FILTERS_VALUE':
      const {name, value} = action.payload;
      return {
        ...state, filters: {...state.filters, [name]: value}
      };
    
      case 'FILTER_PRODUCTS':
        let {all_products} = state;
        let FilterProduct =[...all_products];
        const {text} =state.filters;

        if(text){
          FilterProduct = FilterProduct.filter(product =>{
            return product.name.toLowerCase().includes(text.toLowerCase())
          });
        
          return{
            ...state,
            filter_products: FilterProduct
          }
        }
        else{
          return{ ...state, filter_products: all_products}
        }
        
    default:
      return state;
      
  }
}

export default filterReducer