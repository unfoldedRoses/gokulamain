import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import cartModal from "../models/cartModal.js";
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
    let cartItems;
    const payment_capture = 1;
    const amount = req.body.totalPrice;
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

const OrderSave = asyncHandler(async (req, res) => {
  try {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  } catch (err) {
    throw new Error(err.message);
  }
});

// order with cod
const placeOrderCod = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;
  try {
    const cartItems = await cartModal
      .find({ user: req.user._id })
      .populate("product");

    //calculate total price mongo db
    let totalPrice = 0;

    const orderItems = cartItems.map((cartItem) => {
      totalPrice += cartItem.quantity * cartItem.product.price;
      return {
        name: cartItem?.product.name,
        qty: cartItem?.quantity,
        price: cartItem?.product?.price,
        product: cartItem?.product?._id,
      };
    });

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice,
    });

    const createdOrder = await order.save();

    //remove cart items
    await cartModal.deleteMany({ user: req.user._id });
    if (createdOrder) {
      res.status(200).json({
        data: createdOrder,
        message: "Order placed successfully",
      });
    } else {
      res.status(201).json({
        message: "Something went wrong",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
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
  placeOrderCod,
};
