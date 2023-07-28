import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listUsers, deleteUser } from '../actions/userActions'

import Loader from '../components/Loader'
import Message from '../components/Message'




function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const userLogin = useSelector(state => state.userLogin)
    const userDelete = useSelector(state => state.userDelete)

    const {userInfo} = userLogin
    const {loading, error, users} = userList
    const {success: deleteSuccess} = userDelete

    useEffect(() => {
        // If user is not admin, redirect to login page
        if (userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
        else{
            navigate('/login')
        }
    }, [dispatch, navigate, deleteSuccess, userInfo])

    const deleteHandler = (id) => {
        // Confirm to delete
        if (window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }

  return (
    <div>
        {loading ? 
        <Loader/> : error ? 
        <Message variant='danger'>{error}</Message> : 
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>Is_Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>

                            <td>{user.isAdmin ? 
                            (<i className='fas fa-check' style={{color:'green'}}></i>):
                            (<i className='fas fa-times' style={{color:'red'}}></i>)}
                            </td>
                            
                            <td>
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='primary'>
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm mx-3 ' onClick={()=> deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        }
    </div>
  )
}

export default UserListScreen