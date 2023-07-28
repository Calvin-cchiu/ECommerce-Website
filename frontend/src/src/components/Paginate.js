import React from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Paginate({pages, page, keyword='', isAdmin=false}) {

  return (
    <Pagination>
        {[...Array(pages).keys()].map(x => (
            <Link key={x+1} to={
                !isAdmin ?
                `/?keyword=${keyword}&page=${x+1}`:
                `/admin/productlist/?keyword=${keyword}&page=${x+1}`
                }> 
                <Button className='m-2'>
                    {x+1}
                </Button> 
            </Link>
        ))}
    </Pagination>
    )
}

export default Paginate