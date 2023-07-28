import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import '../styles/RegisterScreen.css'

import { register } from '../actions/userActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

function RegisterScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo, loading, error } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])

    const sumbitHandler = (e) => {
        e.preventDefault()
        setMessage('')

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(name, email, password))
        }


    }


    return (
        <FormContainer>
            <h1>Register account</h1>

            {loading ? <Loader></Loader> : null}
            {message ? <Message variant='danger' message={message}></Message> : null}
            {error ? <Message variant='danger' message={error}></Message> : null}

            <Form onSubmit={sumbitHandler}>

                <Form.Group className="form-group" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form-group" controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
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
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="form-group" controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>

                <Row className='py-3'>
                    <Col>
                    Alredy have account? {' '}
                    <Link to='/login' id="login">
                        Login here
                    </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
