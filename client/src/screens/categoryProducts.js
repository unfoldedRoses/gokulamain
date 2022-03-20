import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import axiosInstance from "../api/AxiosInstance";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";

const CategoryProducts = ({ match, history }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(pageNumber);
  const [postsPerPage] = React.useState(9);

  const getProducts = async (id) => {
    setLoading(true);
    try {
      let res;
      console.log(`/api/products/category/${id}`);
      res = await axiosInstance.get(`/api/products/category/${id}`);
      setLoading(false);
      setProducts(res.data?.data);
      setError(res.data?.Message);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(match.params.id);
    getProducts(match.params.id);
  }, []);

  return (
    <div className="mx-md-5 px-md-3">
    
      <div className="mx-md-5 px-md-5 my-md-5 py-md-5">
        <h1 className="font-weight-bold text-capitalize text-center mb-md-5">
          Discover Organic products
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {products?.length > 0 ? (
                <>
                  {products?.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </>
              ) : (
                  <div className="d-flex justify-content-center">
                    <h1>No Products Found</h1>
                  </div>
                
              )}
            </Row>
            {/* <Paginate
              pages={pages}
              page={currentPage}
              keyword={keyword ? keyword : ""}
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
