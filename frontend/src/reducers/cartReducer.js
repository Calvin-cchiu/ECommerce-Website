import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,

    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS
} from '../constants/cartConstants';

export const cartReducer = (state = {cartItems: [], shippingAddress: {} }, action) => {
    switch(action.type){

        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x._id === item._id) // x is the item in the cart

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === existItem._id ? item : x) // if the item is already in the cart, replace it with the new item
                }
            }
            else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.payload)  // payload will contain the id of the item to be removed

            }
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}