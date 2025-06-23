
const CartReducer = (state, action) => {
    if(action.type === 'ADD_TO_CART') {
        let {id, color, amount, product} = action.payload;

        // To tackle existing products in cart
        let existingProduct = state.cart.find((curcartItem) =>curcartItem.id == id + color );
        if(existingProduct) {
            let updateproduct = state.cart.map((curElem)=>{
                if(curElem.id == id + color) {
                    let newAmount = curElem.amount + amount;
                    
                    if(newAmount >= curElem.max) {
                        newAmount = curElem.max;
                        }
                        return{
                            ...curElem, amount: newAmount
                        }
                }
                else{
                    return curElem;
                }
        });
        return{
            ...state, cart: updateproduct
        }
        }
        else{
        
        let cartProduct;
        cartProduct = {
            id: id + color,
            color: color,
            amount: amount,
            image: product.image[0].url,
            price: product.price,
            max: product.stock,
        }
        return{
            ...state,
            cart: [...state.cart, cartProduct],
        };
    }}
    // To set Decrease and Increase
    if(action.type === 'DECREASE_ITEM'){
        let upDateCartQuantity = state.cart.map((curELem)=>{
            if(curELem.id == action.payload){
                let decAmount = curELem.amount - 1;
                if(decAmount <= 1){
                    decAmount = 1
                };
                return{
                    ...curELem, amount: decAmount
                };
                
            }
            else{
                return curELem;
            }
        })
        return{
            ...state, cart: upDateCartQuantity
        }
    };

    // For Increament
    if(action.type === 'INCREASE_ITEM'){
        let upDateCartQuantity = state.cart.map((curELem)=>{
            if(curELem.id == action.payload){
                let incAmount = curELem.amount + 1;
                if(incAmount >= curELem.max){
                    incAmount = curELem.max
                }
                return{
                    ...curELem, amount: incAmount
                };
            }
            else{
                return curELem;
            }
        });
        return{
            ...state, cart: upDateCartQuantity
        }
    }
    // For Remove Item on cart
    if(action.type === "REMOVE_ITEM"){
        let updateCart = state.cart.filter((curItem)=>{

            return curItem.id !== action.payload;
        });
        return {
            ...state,
            cart: updateCart
        }};
    
        // For empty or clear cart
    if(action.type === "CLEAR_CART"){
        return {
            ...state,
            cart: []
        };
    };
    // For Add Item to cart Icons
    if(action.type === "CART_TOTAL_ON_ICON"){
        let updataCartIcon = state.cart.reduce((initialVal, curElem)=>{
            let {amount} = curElem;
            let totalcarticon = initialVal + amount;
            return totalcarticon;
        }, 0);
        return{
            ...state,
             total_item: updataCartIcon
        }
    }
    // for tatal in cart
    if(action.type === "CART_TOTAL_PRICE"){
        let {total_item, total_price} = state.cart.reduce((initialVal, curElem)=>{
            let {amount, price} = curElem;
            initialVal.total_item += amount;
            initialVal.total_price += amount * price;
                return initialVal;
        },
        {
            total_item: 0,
            total_price: 0
        }
        );
        return{
            ...state,
            total_item ,
            total_price, 

        }
    }
    
        
  return state;
};



export default CartReducer;