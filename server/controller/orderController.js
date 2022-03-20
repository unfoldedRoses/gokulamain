import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

import Razorpay from "razorpay";

// This razorpayInstance will be used to
// access any resource from razorpay
const razorpay = new Razorpay({
  key_id: "rzp_test_xSuam6zt5xfqxe",
  key_secret: "0BXEFJQHQXfIB8I5Qwkc1yRx",
});

//@desc       Create New Order
//@route      POST /api/orders
//@access     Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    let cartItems
    const payment_capture = 1;
    const amount = req.body.totalPrice*100;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: 3434343,
      payment_capture,
    };

    res.status(201).json(options);
  }
});

//@desc       Get order by id
//@route      GET /api/orders/:id
//@access     Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc       Update order to paid
//@route      GET /api/orders/:id/pay
//@access     Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id);

  if (orders) {
    orders.isPaid = true;
    orders.paidAt = Date.now();
    orders.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await Order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc       Get logged in user orders
//@route      GET /api/orders/myorders
//@access     Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//@desc       Get all orders
//@route      GET /api/orders
//@access     Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name email");
  res.json(orders);
});

//@desc       Update order to pending
//@route      GET /api/orders/:id/pending
//@access     Private
const updateOrderToPending = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPending = true;
    order.pendingAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc       Update order to delivered
//@route      GET /api/orders/:id/delivered
//@access     Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToPending,
  updateOrderToDelivered,
};
