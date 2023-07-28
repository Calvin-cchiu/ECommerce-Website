import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import '../styles/RegisterScreen.css'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

import Loader from '../components/Loader'
import Message from '../components/Message'

import FormContainer from '../components/FormContainer'

function ProductEditScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id: productId } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetail)
    const { product, loading, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        }

        if (!product || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        }
        else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setBrand(product.brand)
            setCountInStock(product.count_in_stock)
            setDescription(product.description)
        }
    }, [dispatch, navigate, product, productId, successUpdate])

    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (<div>
        <Link to='/admin/productlist' className='btn btn-primary my-3'>
            Go Back
        </Link>
    
        <FormContainer>
            <h1>Edit Product</h1>

            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? 
                <Loader/> : 
                error ? 
                <Message variant='danger'>{error}</Message> : (

            <Form onSubmit={sumbitHandler}>

                <Form.Group className="form-group" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form-group" controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form-group" controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </Form.Control> 

                    <Form.Control
                        type='file'
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                    >
                    </Form.Control>

                    {uploading && <Loader/>}

                </Form.Group>

                <Form.Group className="form-group" controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>   

                <Form.Group className="form-group" controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control   
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form-group" controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter count in stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group> 

                <Form.Group className="form-group" controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                    
                <Button type='submit' variant='primary'>
                    Update
                </Button>

            </Form>
            )}
        </FormContainer>
        </div>)
}

export default ProductEditScreen
