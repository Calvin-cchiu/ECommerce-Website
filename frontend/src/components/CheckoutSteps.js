import React from 'react'
import {Nav, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function CheckoutSteps(props) {

  return (
    <Nav className="justify-content-center mb-4">
        <Nav.Item className="d-flex align-items-center m-3">
            {props.step1 
            ? (<Link to='/login'>Login</Link>)
            : (<Nav.Link>Login</Nav.Link>)
            }
        </Nav.Item>

        <Nav.Item className="d-flex align-items-center m-3">
            {props.step2 
            ? (<Link to='/shipping'>Shipping</Link>)
            : (<Nav.Link>Shipping</Nav.Link>)
            }
        </Nav.Item>

        <Nav.Item className="d-flex align-items-center m-3">
            {props.step3 
            ? (<Link to='/payment'>Payment</Link>)
            : (<Nav.Link disabled>Payment</Nav.Link>)
            }
        </Nav.Item>

        <Nav.Item className="d-flex align-items-center m-3">
            {props.step4 
            ? (<Link to='/placeorder'>Place Order</Link>)
            : (<Nav.Link disabled>Place Order</Nav.Link>)
            }
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
