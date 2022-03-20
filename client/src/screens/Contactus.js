import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Spinner, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import mailIcon from "../assets/icons/mail.svg";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import axiosInstance from "../api/AxiosInstance";

const Contactus = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        let payload = {
            email,
            message,
          };
          let { data } = await axiosInstance.post("/contactus", payload);
          setLoading(false);
      
          if (data?.status === 200) {
            toast.success("Message Sent Successfully");
            setEmail("");
            setmessage("");
          } else {
            toast.error("Something Went Wrong");
          }
    }catch(error){
        setLoading(false);
      console.log(error);
    }
   
    // dispatch(login(email, message))
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FormContainer>
        <div className="login_wrapper text-center mb-5">
          <h1 className="p-0">Contact us</h1>
        </div>

        {error && (
          <ToastContainer
            transition={Slide}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHoverautoClose={2000}
          />
        )}
        {/*loading && <Loader />*/}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              required
              type="text"
              placeholder="Enter message"
              minRows={4}
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              className="input"
            ></Form.Control>
          </Form.Group>

          {loading ? (
            <span>
              <Button
                type="submit"
                variant="primary"
                className="rounded login_btn"
                disabled
                style={{ width: "20%" }}
              >
                <Spinner size="sm" animation="border" />
              </Button>
            </span>
          ) : (
            <Button
              type="submit"
              variant="primary"
              className="rounded login_btn"
            >
              Contact us
            </Button>
          )}
        </Form>
      </FormContainer>
    </motion.div>
  );
};

export default Contactus;
