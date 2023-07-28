import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
            <Col className='text-center py-3 me-auto'>Copyright &copy; Calvin</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
