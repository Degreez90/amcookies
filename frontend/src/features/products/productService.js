import axios from 'axios'

const API_URL = '/api/products'

const getProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const getProduct = async () => {
  const response = await axios.get(API_URL)
  console.log(response)
  return response.data
}

const productService = {
  getProducts,
  getProduct,
}

export default productService
