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

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.status(200).json(product)
})

export { getProducts, getProduct }
