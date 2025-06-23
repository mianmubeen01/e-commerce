import { createContext, useContext, useEffect, useReducer } from "react";
import {useProductContext}from './ProductContext'
import reducer from '../reducer/filterReducer'

const FilterContext = createContext();

const initialState ={
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest",
    filters: {
        text: ""
    }
}

const FilterContextProvider =  ({children})=>{
    const {products} = useProductContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    // To Set GRid View
    const setGridView = ()=>{
        return dispatch({type: 'SET_GRID_VIEW'})
    }

    // To Set List View
    const setListView = ()=>{
        return dispatch({type: 'SET_LIST_VIEW'})
    }

    // For SOrting
    const sorting = (event) =>{
        const userValue = event.target.value;
        dispatch({type: 'SET_SORTING_VALUE', payload: userValue})
    }
    // For Search
    const updateFiltersValue = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        return dispatch({type: 'UPDATE_FILTERS_VALUE', payload: {name, value}})
    }

    useEffect(()=>{
        dispatch({type: 'FILTER_PRODUCTS'})
        dispatch({type: 'SORTING_PRODUCTS'})
        
    }, [products, state.sorting_value, state.filters])



    useEffect(()=>{
        dispatch({type: 'LOAD_FILTER_PRODUCTS', payload: products})
    }, [products])
    return(
        <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFiltersValue }}>
            {children}
        </FilterContext.Provider>
    )
};

const useFilterContext =()=>{
    return useContext(FilterContext)
}

export {FilterContextProvider, useFilterContext}