import express from 'express'
const router = express.Router()
import { addOrderItems } from '../controllers/orderController.js'

router.route('/').post(addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(getOrderById)

export default router
