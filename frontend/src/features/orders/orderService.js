import axios from 'axios'

const API_URL = '/api/orders/'

const createOrder = async (order) => {
  const response = await axios.post(API_URL, order)

  return response.data
}

const orderService = {
  createOrder,
}

export default orderService
