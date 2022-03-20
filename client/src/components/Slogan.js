import React from 'react'
import { Row, Col, Button, Image } from 'react-bootstrap'
import sloganImg from '../assets/slogan.png'
const Slogan = () => {
  return (
    <div className='mx--md-5 px-md-5 my-md-5 py-md-5'>
      <Row className='d-flex align-items-center'>
        <Col md={5}>
          <h1 className='font-weight-bold'>
            Best Organic food Straight to your door
          </h1>
          <p className='text-justify'>
          {' '}
          ith the aim and vision to provide the best quality organic produce,
            he started GOIL, and since then, in the last 10 years GOIL has
            successfully built a strong foothold in the export business of
            organic products.
          </p>
          <Button className='btn custom-btn mt-3'>Ah! I want to order</Button>
        </Col>
        <Col md={7} className='text-right'>
          <Image src={sloganImg} alt='slogan' fluid />
        </Col>
      </Row>
    </div>
  )
}

export default Slogan
