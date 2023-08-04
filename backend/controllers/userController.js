import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
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

// @desc    Login a new user
// @route   /api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { emailSI, passwordSI } = req.body
  console.log(emailSI)

  const user = await User.findOne({ email: emailSI })
  console.log(user)

  if (user && (await user.matchPassword(passwordSI))) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

export { registerUser, loginUser, logoutUser }
