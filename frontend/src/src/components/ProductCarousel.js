import React, { useEffect }from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'

import {listTopProducts} from '../actions/productActions'

function ProductCarousel() {

    const dispatch = useDispatch()

    const productTop = useSelector(state => state.productTop)
    const {loading, error, products} = productTop

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])


  return (
    <div className='m-3'>
        {
            loading ? <Loader /> : 
            error ? <Message variant='danger'>{error}</Message> : 
            (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(product => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <Image src={product.image} alt={product.name} fluid />
                                        <Carousel.Caption className='carousel-caption'>
                                            <h2 className='text-light'>{product.name} ${product.price}</h2>
                                        </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            )
        }
    </div>
    )
}

export default ProductCarousel