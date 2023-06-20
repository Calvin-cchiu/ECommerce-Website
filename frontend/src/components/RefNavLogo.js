// import {React, useState}from 'react'
// import {Nav, Navbar, Container} from 'react-bootstrap'
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { LinkContainer } from 'react-router-bootstrap'
// import {Link} from 'react-router-dom'


// function Header() {

//   const [fixedTop, setFixedTop] = useState(null)

//   function handleFixedTop() {
//     if (window.scrollY > 100)
//       setFixedTop("top")
//     else
//       setFixedTop(null)
//   }

//   window.addEventListener('scroll', handleFixedTop)

//   return (
//       <header>
//         <Navbar fixed={fixedTop} bg="dark" variant="dark" expand="lg">
//           <Container>
//             <Link to='/ref=navlogo'>
//               <Navbar.Brand>ECommerce</Navbar.Brand>
//             </Link>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="mr-auto">
//                 <LinkContainer to='/cart'>
//                   <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to='/login'>
//                   <Nav.Link ><i className="fas fa-user"></i>Login</Nav.Link>
//                 </LinkContainer>
//                 <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.2">
//                     Another action
//                   </NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#action/3.4">
//                     Separated link
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       </header>
//   )
// }

// export default Header
