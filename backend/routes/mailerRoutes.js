import express from 'express'
import { sendMessage } from '../controllers/mailController.js'
const router = express.Router()

router.route('/').post(sendMessage)

export default router
