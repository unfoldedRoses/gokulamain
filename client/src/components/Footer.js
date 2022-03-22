import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <Container fluid className=" my-5">
        <Row className="mx-md-5 px-md-5">
          <Col md={4}>
            <h3>Gokula Organic Shop</h3>
            <p className="">
              Plot No.38, SCNO.40, Kuvempu Nagar,,Hanuman Nagar, Stage 1,
              Belagavi,Karnataka
              <br/>
              Email: gokulaorganics@gmail.com
            </p>
          </Col>
          <Col md={3}>
            <h3 className="pt-0">Services</h3>
            <Link to="/terms" className="d-block mb-3">
              Terms and conditions
            </Link>
            <Link to="/" className="d-block mb-3">
              Delivery Services
            </Link>
            <Link to="/contactus" className="d-block mb-3">
              Contact us
            </Link>
            <Link to="/refundpolicy" className="d-block mb-3">
              Refund Policy
            </Link>
            <Link to="/privacy" className="d-block mb-3">
              Privacy Policy
            </Link>
            <Link to="/aboutus" className="d-block mb-3">
              About us
            </Link>
          </Col>

          <Col md={3}>
            <h3 className="pt-0">Users</h3>
            <Link to="/login" className="d-block mb-3">
              User Login
            </Link>
            <Link to="/register" className="d-block mb-3">
              User Register
            </Link>
            <Link to="/profile" className="d-block mb-3">
              Account Settings
            </Link>
            <Link to="/orders" className="d-block mb-3">
              Orders
            </Link>
          </Col>

         
        </Row>
        <Row>
          <Col className="text-center pt-3 mt-5">
            Copyright &copy; Gokula Organic Shop <br />
           
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
