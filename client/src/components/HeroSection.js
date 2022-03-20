import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <div className="mx-md-5 px-md-5">
      <Row className="d-flex align-items-center">
        <Col md={6}>
          <h1 className="text-capitalize font-weight-bold">
            want organic products? You're <br /> in the right place
          </h1>

          <p className="mb-4">
            With the aim and vision to provide the best quality organic produce,
            he started GOIL, and since then, in the last 10 years GOIL has
            successfully built a strong foothold in the export business of
            organic products.
          </p>
          <Button className="btn custom-btn">Find Products</Button>
        </Col>

        <Col md={6} className={styles.hero_bg}>
        </Col>
      </Row>
    </div>
  );
};

export default HeroSection;
