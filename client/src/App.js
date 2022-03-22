import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import { AnimatePresence } from "framer-motion";
import PrivacyScreen from "./screens/PrivacyScreen";
import AboutUs from "./screens/AboutUs";
import RefundPolicy from "./screens/RefundPolicy";
import ProductListScreenCreate from "./screens/ProductListScreenCreate";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Contactus from "./screens/Contactus";
import Screen404 from "./screens/404";
import AdminCategoryLIst from "./screens/AdminCategoryLIst";
import CategoryCreateScreen from "./screens/CategoryCreateScreen";
import categoryProducts from "./screens/categoryProducts";
import Terms from "./screens/Terms";
import { useDispatch } from "react-redux";
import axiosInstance from "./api/AxiosInstance";
import { CART_ADD_ITEM } from "./constants/cartConstants";
toast.configure();

const App = () => {
  const dispatch = useDispatch();
  const getcartItems = async () => {
    const res = await axiosInstance.post("/api/products/getCart");

    if (res.status === 200) {
      dispatch({
        type: CART_ADD_ITEM,
        payload: res?.data?.data,
      });
    } else {
      dispatch({
        type: CART_ADD_ITEM,
        payload: [],
      });
    }

    // history.push(`/cart/${match.params.id}?qty=${qty}`)
  };

  useEffect(() => {
    getcartItems();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      <ToastContainer />
      <Router>
        <Header />
        <main className="py-3">
          <Container fluid>
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/product/create"
              component={ProductListScreenCreate}
              exact
            />
            <Route
              path="/categoryProducts/:id"
              component={categoryProducts}
              exact
            />
            <Route
              path="/admin/category/create"
              component={CategoryCreateScreen}
              exact
            />
            <Route path="/terms" component={Terms} exact />

            <Route
              path="/admin/categorylist"
              component={AdminCategoryLIst}
              exact
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/" component={HomeScreen} exact />

            <Route path="/privacy" component={PrivacyScreen} exact />

            <Route path="/aboutus" component={AboutUs} exact />
            <Route path="/contactus" component={Contactus} exact />
            <Route path="/refundpolicy" component={RefundPolicy} exact />
            {/* <Route path="*" component={Screen404} exact /> */}
          </Container>
        </main>
        <Footer />
      </Router>
    </AnimatePresence>
  );
};

export default App;
