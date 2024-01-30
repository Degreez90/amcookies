import express from 'express'
import {
  sendMessage,
  mailOrderConfirmation,
} from '../controllers/mailController.js'
const router = express.Router()

router.route('/').post(sendMessage)
router.route('/order').post(mailOrderConfirmation)

export default router
