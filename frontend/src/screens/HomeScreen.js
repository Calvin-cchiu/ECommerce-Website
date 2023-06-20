import React , {useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'


import {listProducts} from '../actions/productActions'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Loader'

function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const {products, loading, error} = productList

  useEffect(() => {
      dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Latest product</h1>
      { // Show Loading or Error message or Render Products
        loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
      <Row>
        {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
      </Row>
      }
    </div>
  )
}
export default HomeScreen
