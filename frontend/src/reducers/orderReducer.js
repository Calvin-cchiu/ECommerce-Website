import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAID_REQUEST,
    ORDER_PAID_SUCCESS,
    ORDER_PAID_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_RESET,


 } from '../constants/orderConstants'


const orderCreateReducer = (state = {}, action) => {
    switch (action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: true}
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: action.payload}
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

const orderDetailsReducer = (state = {loading:true, orderItems:[], shippingAddress:{}}, action) => {
    switch (action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state, 
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload}
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


const orderPaidReducer = (state = {}, action) => {
    switch (action.type){
        case ORDER_PAID_REQUEST:
            return {loading: true}
        case ORDER_PAID_SUCCESS:
            return {loading: false, success: true}
        case ORDER_PAID_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

const orderDeliveredReducer = (state = {}, action) => {
    switch (action.type){
        case ORDER_DELIVERED_REQUEST:
            return {loading: true}
        case ORDER_DELIVERED_SUCCESS:
            return {loading: false, success: true}
        case ORDER_DELIVERED_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_DELIVERED_RESET:
            return {}
        default:
            return state
    }
}


const orderListMyReducer = (state = {orders:[]}, action) => {
    switch (action.type){
        case ORDER_LIST_MY_REQUEST:
            return {loading: true}
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_LIST_MY_RESET:
            return {orders:[]}
        default:
            return state
    }
}


const orderListReducer = (state = {orders:[]}, action) => {
    switch (action.type){
        case ORDER_LIST_REQUEST:
            return {loading: true}
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export {orderCreateReducer, 
    orderDetailsReducer, 
    orderPaidReducer,
    orderListMyReducer, 
    orderListReducer, 
    orderDeliveredReducer,
}