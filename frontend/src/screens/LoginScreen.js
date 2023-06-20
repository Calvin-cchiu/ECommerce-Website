import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import '../styles/LoginScreen.css'

import { login } from '../actions/userActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

function LoginScreen() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector(state => state.userLogin)

  const { userInfo, loading, error } = userLogin

  

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  const sumbitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }


  return (
    <FormContainer>
      <h1>Sign In</h1>

      {loading ? <Loader></Loader> : null}
      {error ? <Message variant='danger' message={error}></Message> : null}

      <Form onSubmit={sumbitHandler}>

        <Form.Group className="form-group" controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-group" controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>

      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? {' '}
          <Link to='/register' id="register">
            Register
          </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default LoginScreen
