import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { cartReducer } from './reducers/cartReducer'

import { productListReducer, 
        productDetailReducer, 
        productDeleteReducer,
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer,
        productTopReducer
} from './reducers/productReducer'

import { userLoginReducer, 
        userRegisterReducer, 
        userDetailsReducer, 
        userUpdateProfileReducer, 
        userListReducer, 
        userDeleteReducer,
        userUpdateReducer,
} from './reducers/userReducer'

import { orderCreateReducer, 
        orderDetailsReducer, 
        orderPaidReducer, 
        orderListMyReducer,
        orderListReducer,
        orderDeliveredReducer,
} from './reducers/orderReducer'



const reducer = combineReducers({

    productList: productListReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTop: productTopReducer,

    
    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer, // update user by admin

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPaid: orderPaidReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDelivered: orderDeliveredReducer,
})

const cartItemsFromStroage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStroage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStroage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStroage, shippingAddress: shippingAddressFromStroage},
    userLogin: { userInfo: userInfoFromStroage }

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;