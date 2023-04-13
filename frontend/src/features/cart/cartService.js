import axios from 'axios'

const API_URL = '/api/products/'

const addToCart = async (item, qty) => {
  console.log(item + ':' + qty)
  const response = await axios.get(API_URL + item)

  console.log(response)

  // const data = {
  //   id: response._id,
  //   name: response.name,
  //   image: response.image,
  //   price: response.price,
  //   inStock: response.inStock,
  //   qty,
  // }

  return data
}

const cartService = {
  addToCart,
}

export default cartService
