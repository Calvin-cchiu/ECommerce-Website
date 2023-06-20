import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAID_REQUEST,
    ORDER_PAID_SUCCESS,
    ORDER_PAID_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

 } from '../constants/orderConstants'
import {CART_CLEAR_ITEMS} from '../constants/cartConstants'


export const createOrder = (order) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.post(
            '/api/orders/add/',
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.get(
            `/api/orders/${id}`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const paidOrder = (id, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_PAID_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
        }}

        const {data} = await axios.put(
            `api/orders/${id}/paid/`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAID_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_PAID_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.get(
            `/api/orders/myorders`,
            config
        )

        // reverse data to show the latest order first
        data.reverse()

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}