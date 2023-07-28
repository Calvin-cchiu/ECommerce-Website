import React , {useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useSearchParams} from 'react-router-dom'

import {listProducts} from '../actions/productActions'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const {products, loading, error, pages} = productList

  let [searchParams, setSearchParams] = useSearchParams()

  let keyword = searchParams.get('keyword')
  let page = searchParams.get('page')

  useEffect(() => {
      dispatch(listProducts(keyword, page))
  }, [dispatch, keyword, page])

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest product</h1>
      { // Show Loading or Error message or Render Products
        loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
      <div>
      <Row>
        {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
      </Row>

      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
      </div>
      }

    </div>
  )
}
export default HomeScreen
