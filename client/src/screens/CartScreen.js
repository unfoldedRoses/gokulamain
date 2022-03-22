import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import emptyCart from "../assets/empty-cart.png";
import crossIcon from "../assets/icons/cross.svg";
import { motion } from "framer-motion";
import axiosInstance, { baseURL } from "../api/AxiosInstance";
import { CART_ADD_ITEM } from "../constants/cartConstants";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (productId) {
    //   dispatch(addToCart(productId, qty))
    // }
  }, []);

  const removeFromCartHandler = async (data) => {
    
    const res = await axiosInstance.post("/api/products/deleteCart", {id:data});
    console.log(res);
    if (res.status === 200) {
      dispatch(removeFromCart(data));
      toast.success("Item removed from cart");
    } else {
      toast.error("Something went wrong");
    }
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-md-5 px-md-5">
        <Row>
          {cartItems.length === 0 ? (
            <Col md={12} className="text-center">
              <Image src={emptyCart} fluid />
            </Col>
          ) : (
            <Col md={8}>
              <h1 className="pt-0">Shopping Cart</h1>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product} className="pl-0">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image
                          src={`${baseURL}/${item?.product?.image}`}
                          alt={item.name}
                          fluid
                          style={{
                            height: "160px",
                            width: "160px",
                            borderRadius: "50%",
                          }}
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>
                          <h4>{item?.product?.name}</h4>
                        </Link>
                      </Col>
                      <Col md={2}>
                        <h4>₹{item?.product?.price}</h4>
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item?.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item?._id)}
                        >
                          <Image
                            src={crossIcon}
                            fluid
                            style={{ width: "40px" }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          )}

          {cartItems.length !== 0 && (
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item?.quantity, 0)})
                      items
                    </h2>{" "}
                    <h4>
                      ${" "}
                      {cartItems
                        .reduce((acc, item) => acc + item?.quantity * item?.product?.price, 0)
                        .toFixed(2)}
                    </h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </motion.div>
  );
};

export default CartScreen;
