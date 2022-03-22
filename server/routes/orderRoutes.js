import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToPending,placeOrderCod
} from '../controller/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/orderCreate').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myOrders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/pending').put(protect, admin, updateOrderToPending)
router.route('/orderCreate/cod').post(protect, placeOrderCod)

export default router
