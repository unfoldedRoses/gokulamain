import axios from "../api/AxiosInstance";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Spinner, Image } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import leftArrow from "../assets/icons/arrow-left.svg";
import axiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";

const CategoryCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formData = new FormData();
      formData.append("title", name);

      formData.append("image", image);

      formData.append("description", description);

      let res = await axiosInstance.post("/api/category/add", formData);
      setloading(false);
      if (res.status === 200) {
        toast.success("Category Created Successfully");
        history.push("/admin/categorylist");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      setloading(false);
      console.log(err);
    }

    // dispatch(createProduct(formData));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const formData = new FormData();
    // s

    // try {

    //   formData.append("image", file);
    //   const { data } = await axios.post("/api/upload", formData);

    //   setImage(data);
    //   console.log("data", data);
    //   setUploading(false);
    // } catch (error) {
    //   console.error(error);
    //   setUploading(false);
    // }
  };

  return (
    <div className="mx-md-5 px-md-5">
      <Link to="/admin/categorylist" className="btn btn-dark my-3">
        <span>
          <Image src={leftArrow} fluid />
        </span>{" "}
        Go Back
      </Link>

      <FormContainer>
        <h1>Create category</h1>
        {/*loadingUpdate && <Loader />*/}
        {error !== null && <Message variant="danger">{error}</Message>}

        {loading ? (
          <Loader />
        ) : error !== null ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image Url </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter image url address"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input"
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Spinner size="sm" animation="border" />}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description </Form.Label>
              <Form.Control
                type="text"
                required
                as="textarea"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
              ></Form.Control>
            </Form.Group>

            {loading ? (
              <span>
                <Button
                  type="submit"
                  variant="primary"
                  disabled
                  className="rounded"
                >
                  <Spinner size="sm" animation="border" /> {"  "} Creating...
                </Button>
              </span>
            ) : (
              <Button type="submit" variant="primary" className="">
                create category
              </Button>
            )}
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default CategoryCreateScreen;
