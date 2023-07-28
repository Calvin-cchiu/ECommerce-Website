import React, {useEffect} from 'react'
import { Link, useInRouterContext, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { ORDER_PAID_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants'
import { getOrderDetails, paidOrder, deliveredOrder } from '../actions/orderActions'


function OrderDetailsScreen() {

  const params = useParams()
  const {id} = params

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPaid = useSelector(state => state.orderPaid)
  const { loading: loadingPaid, success: successPaid } = orderPaid

  const orderDelivered = useSelector(state => state.orderDelivered)
  const { loading: loadingDelivered, success: successDelivered } = orderDelivered

  useEffect(() => {
    if(!userInfo)
      navigate('/login')

    // if we don't have order Info, or if the order id doesn't match the id in the url, then dispatch getOrderDetails
    if (!order || order._id !== Number(id) || successDelivered) {
      dispatch({ type: ORDER_DELIVERED_RESET })
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, userInfo, order, id, successDelivered])

  if (!loading && !error)
    order.itemsPrice = order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

  const deliveredHandler = () => {
    dispatch(deliveredOrder(order))
  }

  return (

    loading ? <Loader /> : error ? <Message variant='danger' message={error}/>
    :(
    <div>
        <h1>Order # :{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>

              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Name: </strong>
                    {order.user_id.name}
                </p>
                <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user_id.email}`}>{order.user_id.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postal_code},{' '}
                  {order.shippingAddress.country}
                </p>

                {order.is_delivered
                ? <Message variant='success' message={`Delivered On ${order.delivered_at}`}></Message>
                : <Message variant='warning' message='Not Delivered'></Message>
                }

              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.payment_method}
                </p>
                {order.is_paid 
                ? <Message variant='success' message={`Paid On ${order.paid_at}`}></Message>
                : <Message variant='warning' message='Not Paid'></Message>
                }
              </ListGroup.Item>

            
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.order_items.length === 0 ? (
                  <h2>Your Order is empty</h2>
                ) : (
                  <ListGroup variant='flush'>
                    {order.order_items.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Link to={`/product/${item._id}`}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Link>
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item> 
  
          </ListGroup>              
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>

              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shipping_price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.tax_price}</Col>
                </Row>  
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.total_price}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDelivered && <Loader/>}
              {userInfo && userInfo.isAdmin && order.is_paid && !order.is_delivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliveredHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>)
  )
}

export default OrderDetailsScreen