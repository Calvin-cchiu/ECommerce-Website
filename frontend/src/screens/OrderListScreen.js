import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listOrders } from '../actions/orderActions'

import Loader from '../components/Loader'
import Message from '../components/Message'




function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        // If user is not admin, redirect to login page
        if (userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }
        else{
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])

  return (
    <div>
        <h1>Orders</h1>
        {loading ? 
        <Loader/> : 
        error ? 
        <Message variant='danger'>{error}</Message> : 
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user_id.name}</td>
                            <td>{order.created_at.substring(0,10)}</td>
                            <td>${order.total_price}</td>

                            <td>{order.is_paid ?
                            (order.paid_at.substring(0,10)):
                            (<i className='fas fa-times' style={{color:'red'}}></i>)}
                            </td>

                            <td>{order.is_delivered ?
                            (order.delivered_at.substring(0,10)):
                            (<i className='fas fa-times' style={{color:'red'}}></i>)}
                            </td>
                            
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
    </div>
  )
}

export default OrderListScreen