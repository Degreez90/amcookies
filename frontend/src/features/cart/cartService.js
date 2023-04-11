import axios from 'axios'

const API_URL = '/api/products/'

const addToCart = async (id, qty, cart) => {
  const response = await axios.get(API_URL + id)

  localStorage.setItem('cartItems', JSON.stringify(response.data))

  return response.data
}
