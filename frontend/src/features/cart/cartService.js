import axios from 'axios'

const API_URL = '/api/products/'

const addToCart = async (item, qty) => {
  console.log(item + ':' + qty)
  const response = await axios.get(API_URL + item)

  const data = {
    id: response.data._id,
    name: response.data.name,
    image: response.data.image,
    price: response.data.price,
    inStock: response.data.inStock,
    qty,
  }

  console.log(data)

  return data
}

const cartService = {
  addToCart,
}

export default cartService
