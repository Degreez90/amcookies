import axios from 'axios'

const API_URL = '/api/'

export const getProducts = async () => {
  const response = await axios.get(API_URL + 'products')
  return response.data
}
