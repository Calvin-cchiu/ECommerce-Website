import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams} from 'react-router-dom'
import { Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'


function ProductListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const productDelete = useSelector(state => state.productDelete)
    const productCreate = useSelector(state => state.productCreate)
    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin
    const {loading, error, products, pages} =  productList
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    let [searchParams, setSearchParams] = useSearchParams()

    let keyword = searchParams.get('keyword')
    let page = searchParams.get('page')

    useEffect(() => {

        dispatch({type: PRODUCT_CREATE_RESET})

        // If user is not admin, redirect to login page
        if (!userInfo.isAdmin){
            navigate('/login')
        }

        if (successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else{
            dispatch(listProducts(keyword, page))
        }
    
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword, page])

    const deleteHandler = (id) => {
        // Confirm to delete
        if (window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }

  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading ? 
        <Loader/> : error ? 
        <Message variant='danger'>{error}</Message> : 
            <div>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            
                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='primary'>
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm mx-3 ' onClick={()=> deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
            </div>
        }
    </div>
  )
}

export default ProductListScreen