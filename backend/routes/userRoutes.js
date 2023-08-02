import express from 'express'
import {
  registerUser,
  authUser,
  logoutUser,
} from '../controllers/userController.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/auth', authUser)
router.route('/logout', logoutUser)

export default router
