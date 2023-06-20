import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer} from './reducers/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderPaidReducer, orderListMyReducer} from './reducers/orderReducer'



const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPaid: orderPaidReducer,
    orderListMy: orderListMyReducer,
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