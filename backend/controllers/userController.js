import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  // Validation
  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    } else {
      res.status(400)
      throw new error('Invalid user data')
    }
  }
})

export { registerUser }
