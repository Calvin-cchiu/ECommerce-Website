import axios from "axios";

import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,

    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM, 
        payload: {
            _id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            count_in_stock: data.count_in_stock,
            qty
        }
    })

    // store Item in localStorage so that it can be retrieved even after refreshing the page
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}