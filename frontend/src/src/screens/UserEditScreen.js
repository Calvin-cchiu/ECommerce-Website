import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import '../styles/RegisterScreen.css'

import { USER_UPDATE_RESET } from '../constants/userConstants'
import { getUserDetails, updateUser} from '../actions/userActions'

import Loader from '../components/Loader'
import Message from '../components/Message'

import FormContainer from '../components/FormContainer'

function UserEditScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        }


        if (!user || user._id !== Number(id)) {
            dispatch(getUserDetails(id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, id, successUpdate])

    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }


    return (<div>
        <Link to='/admin/userlist' className='btn btn-primary my-3'>
            Go Back
        </Link>
    
        <FormContainer>
            <h1>Edit User</h1>

            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? 
                <Loader/> : 
                error ? 
                <Message variant='danger'>{error}</Message> : (

            <Form onSubmit={sumbitHandler}>

                <Form.Group className="form-group" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
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
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin'>
                    <Form.Check
                        type='checkbox'
                        label = 'Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>

            </Form>
            )}
        </FormContainer>
        </div>)
}

export default UserEditScreen
