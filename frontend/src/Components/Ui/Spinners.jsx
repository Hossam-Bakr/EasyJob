import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Spinners = () => {
  return (
  <Spinner animation='border' variant='info' role="status" size='md'>
     <span className="visually-hidden">Loading...</span>
  </Spinner>)
}

export default Spinners
