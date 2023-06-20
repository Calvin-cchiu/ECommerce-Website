import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import '../styles/RegisterScreen.css'

import { getUserDetails, getUpdateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

import Loader from '../components/Loader'
import Message from '../components/Message'

import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'


function ProfileScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const userDetails = useSelector(state => state.userDetails)
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const orderListMy = useSelector(state => state.orderListMy)

    const { userInfo } = userLogin
    const { user, loading, error } = userDetails
    const { success:updateSuccess } = userUpdateProfile
    const { orders, loading: loadingOrders, error: errorOrders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else{
            if(!user || !user.name || updateSuccess || !orders){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, user, updateSuccess, userInfo, orders, navigate])

    const sumbitHandler = (e) => {

        e.preventDefault()
        // clear message
        setMessage('')

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(getUpdateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }


    }
    return (
        <Row>
        <Col md={3}>
            <h2>User Profile</h2>
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
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders 
                ? <Loader/> : 
                errorOrders 
                ? <Message variant='danger' message={errorOrders}/> :
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Order Details</th>
                    </tr>
                </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.created_at.substring(0, 10)}</td>
                                <td>{order.total_price}</td>
                                <td>{order.is_paid ? order.paid_at.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>{order.is_delivered ? order.delivered_at.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                <Link to={`/order/${order._id}`}>
                                    <Button variant='primary'>
                                        Details
                                    </Button>
                                </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </Table>
            }
        </Col>
        </Row>
    )
}

export default ProfileScreen
