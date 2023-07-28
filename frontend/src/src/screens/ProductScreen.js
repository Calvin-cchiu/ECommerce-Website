import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import {useParams} from 'react-router-dom'

import { listProductDetails, createProductReview} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

import Rating from '../components/Rating'

function ProductScreen() {

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  // find the product with the id that matches the id in the URL
  const {id} = useParams()
  // const product = products.find((p) => p._id === id)
  const productDetails = useSelector(state => state.productDetail)
  const {product} = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } = productReviewCreate

  const dispatch = useDispatch()

  useEffect(() => {
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  // Add Cart
  let navigate = useNavigate()
  const addToCartHandler = () => {
    console.log(`Add to Cart productid: ${id}, qty: ${qty}`)
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id,{ rating , comment }))
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
      
      <Row className='my-3'>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews?.length === 0 && <p>No Reviews</p>}

          <hr/>

          <ListGroup variant='flush'>

            {product.reviews?.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.title}</strong>
                <Rating value={review.rating} color='#f8e825'/>
                <p>{review.created_at.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}

            <ListGroup.Item>
              <h4>Write a Review</h4>

              {successProductReview && <p>Review Submitted</p>}
              {errorProductReview && <p>{errorProductReview}</p>}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                      as='textarea' 
                      row='3' 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)}>
                    </Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='dark'>Submit</Button>


                </Form>
              ) : (
                <p>Please <Link to='/login'>sign in</Link> to write a review</p>
              )}
            </ListGroup.Item>

          </ListGroup>
        </Col>
      </Row>

    </div>
  );
}

export default ProductScreen
