import React, {useEffect} from 'react'
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

import Message from '../components/Message'



function CartScreen() {
  const {id} = useParams()
  const productId  = id

  const location = useLocation()
  // location.serach return all the query string in the URL (e.g ?qty=3)
  // extract the number from query string
  const qty = location.search ? parseInt(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect( () => {
    if (productId)
      dispatch(addToCart(productId, qty))
    }
    , [dispatch, productId, qty]
  )

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    console.log(`checkoutHandler`)
    //navigate('/login?redirect=shipping')
    navigate('/shipping')
  }

  return (
    <Row>
      <Col md={9}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?
          <Message variant='info' message='Your cart is empty'>
          </Message>
          :
          <ListGroup variant='flush'>
              {cartItems.map((item) =>
                (
                  <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                      <Col md={1}> Qty: </Col>
                      <Col md={2}>
                        <Form.Select value={item.qty} onChange={(e) => dispatch(addToCart(item._id, Number(e.target.value)))}>
                        {
                          [...Array(item.count_in_stock).keys()].map((x) =>
                            <option key={ x+1 } value={ x+1 }>
                              {x + 1}
                            </option>
                          )
                        }
                        </Form.Select>
                      </Col>
                      <Col md={2}>
                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                  </Row>
                </ListGroup.Item>
                )
                )}
          </ListGroup>
        }
      <Row md={3}>
        <Link to='/' className='btn btn-dark my-3'>Go Back</Link>
      </Row>
      </Col>
      <Col md={3}>
        <Card className="my-5">
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5 className="mb-auto"> Subtotal ({cartItems.reduce((sum, item) => sum + item.qty, 0)}) items</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              {/* sum up the total price of all items in the cart, rounded to 2 decimal places*/}
              <h2>$ {cartItems.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
