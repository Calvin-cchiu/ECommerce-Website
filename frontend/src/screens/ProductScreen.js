import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import {useParams} from 'react-router-dom'

import { listProductDetail } from '../actions/productActions'

import Rating from '../components/Rating'

// import products from '../products'



function ProductScreen() {
  const [qty, setQty] = useState(1);


  // find the product with the id that matches the id in the URL
  const {id} = useParams()
  // const product = products.find((p) => p._id === id)
  const productDetail = useSelector(state => state.productDetail)
  const {product} = productDetail

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProductDetail(id))
  }, [dispatch, id])

  // Add Cart
  let navigate = useNavigate()
  const addToCartHandler = () => {
    console.log(`Add to Cart productid: ${id}, qty: ${qty}`)
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-dark my-3'>Go Back</Link>
      <Row>

        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup >
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item variant='flush'>
              <Rating value={product.rating} text={`${product.num_reviews} reviews`} color={'#f8e825'}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {`${product.description}`}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>

              
              { // Allow user to select quantity if product is in stock, maximum 10
                product.count_in_stock > 0 ?
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs='auto' className='my-1'>
                      <Form.Select value={qty} onChange={(e) => setQty(e.target.value)}>
                        {
                          [...Array(product.count_in_stock).keys()].map((x) => 
                            <option key={ x+1 } value={ x+1 }>
                              {x + 1}
                            </option>
                          )
                        }
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item> : null
              }

              <ListGroup.Item>
                <Button onClick={addToCartHandler} variant="dark" type='button' disabled={product.count_in_stock <= 0}>
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen
