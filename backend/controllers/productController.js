import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(400)
    throw new error('No products found')
  }
})

export { getProducts }
