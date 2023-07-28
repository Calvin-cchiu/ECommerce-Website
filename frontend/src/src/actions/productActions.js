import axios from "axios"
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

} from "../constants/productConstants.js"



export const listProducts = (keyword='', page) => async (dispatch) => {
    try{
        let data;
        dispatch({type: PRODUCT_LIST_REQUEST})

        // if page is null set to 1
        page = page ? page : 1

        if (keyword && page) {
            const response = await axios.get(`/api/products?keyword=${keyword}&page=${page}`)
            data = response.data
        }
        else {
            const response = await axios.get(`/api/products?page=${page}`)
            data = response.data
        }
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message 
            ? error.response.data.message : error.message})
    }
}


export const listTopProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_TOP_REQUEST})
        const {data} = await axios.get('/api/products/top/')
        dispatch({type: PRODUCT_TOP_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: PRODUCT_TOP_FAIL, payload: error.response && error.response.data.message 
            ? error.response.data.message : error.message})
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS, 
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAIL_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message : error.message})
    }
}


export const deleteProduct = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const createProduct = () => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload:data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const updateProduct = (product) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload:data,
        })

        // refresh page for the product with updated data
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload:data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const createProductReview = (productId, review) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.post(
            `/api/products/${productId}/review/`,
            review,
            config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload:data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}