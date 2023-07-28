import {React, useState}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Nav, Navbar, Container} from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'

import SearchBox from './SearchBox'
import {logout} from '../actions/userActions'

function Header() {

  // Fix Navbar at top after scrolling
  const [fixedTop, setFixedTop] = useState(null)

  function handleFixedTop() {
    if (window.scrollY > 100) 
      setFixedTop("top")
    else
      setFixedTop(null)
  }

  window.addEventListener('scroll', handleFixedTop)


  // User Login and Logout
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
      <header>
        <Navbar fixed={fixedTop} bg="dark" variant="dark" expand="lg">
          <Container>
            <Link to='/'>
              <Navbar.Brand>ECommerce</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to='/cart'><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='AdminMenu'>
                    <NavDropdown.Item as={Link} to='/admin/userlist'>User List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/productlist'>Product List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/orderlist'>Order List</NavDropdown.Item>
                  </NavDropdown>

                )}

              </Nav>
              
              <SearchBox/>

            </Navbar.Collapse>

            {userInfo ? 
            <NavDropdown title={`Hello, ${userInfo.name}`} id='username'>
              <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/logout' onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
            : <Nav.Link as={Link} to='/login' id='username'><i className="fas fa-user"></i>Login</Nav.Link>}
          </Container>
        </Navbar>
      </header>
  )
}

export default Header
