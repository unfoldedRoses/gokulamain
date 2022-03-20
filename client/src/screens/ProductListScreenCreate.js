import axios from "../api/AxiosInstance";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Spinner, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import {
  createProduct,
  listProductDetail,
  updateProduct,
} from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import leftArrow from "../assets/icons/arrow-left.svg";
import { listCategory } from "../actions/categoryAction";

const ProductCreateScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const categoryList = useSelector((state) => state.categoryList);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);

    dispatch(createProduct(formData));
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

  useEffect(() => {
    dispatch(listCategory("", 1));
  }, []);

  return (
    <div className="mx-md-5 px-md-5">
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        <span>
          <Image src={leftArrow} fluid />
        </span>{" "}
        Go Back
      </Link>

      <FormContainer>
        <h1>Create Product Details</h1>
        {/*loadingUpdate && <Loader />*/}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image Url </Form.Label>
              <Form.Control
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

            <Form.Group controlId="brand">
              <Form.Label>Brand </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="input"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="input"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category </Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose category</option>
                {categoryList?.products?.length &&
                  categoryList?.products?.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item?.title}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
              ></Form.Control>
            </Form.Group>

            {loadingUpdate ? (
              <span>
                <Button
                  type="submit"
                  variant="primary"
                  disabled
                  className="rounded"
                >
                  <Spinner size="sm" animation="border" /> {"  "} Updating...
                </Button>
              </span>
            ) : (
              <Button type="submit" variant="primary" className="">
                create Product
              </Button>
            )}
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductCreateScreen;
