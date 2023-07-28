import React, {useState}from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/?keyword=${keyword}&page=1`)
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex w-50 ms-5'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
            />
        <Button
            type='submit'
            variant='outline-success'
            className='p-2 m-2'
        >
            Search
        </Button>

    </Form>
  )
}

export default SearchBox