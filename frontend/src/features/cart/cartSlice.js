import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../cart/cartService'

//Use data from local storage
const cartItem = JSON.parse(localStorage.getItem('cartItems'))
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))

let cart = []

if (cartItem && cartItem.expires > Date.now()) {
  cart = cartItem.data
} else {
  localStorage.removeItem('cartItems')
}

let shippingInfo = {}
if (shippingAddress && shippingAddress.expires > Date.now()) {
  shippingInfo = shippingAddress.data
} else {
  localStorage.removeItem('shippingAddress')
}

//Setup initial state
const initialState = {
  cartItems: cart ? cart : [],
  shipping: shippingInfo ? shippingInfo : {},
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const cartAddItem = createAsyncThunk(
  'cart/getItem',
  async ({ item, qty }, thunkAPI) => {
    try {
      console.log(item + ':' + qty)
      return await cartService.addToCart(item, qty)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/deleteItem',
  async ({ id }, thunkAPI) => {
    try {
      console.log(id)
      return id
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => initialState,
    clearLocalStorage: (state, action) => {
      const removeFromLocalStorage = (keys) => {
        keys.forEach((key) => localStorage.removeItem(key))
      }
      const keystoRemove = ['paymentMethod', 'shippingAddress', 'cartItems']

      removeFromLocalStorage(keystoRemove)
    },
    savePaymentMethod: (state, action) => {
      const data = action.payload
      state.payment = data

      localStorage.setItem(
        'paymentMethod',
        JSON.stringify({
          data: data,
          expires: Date.now() + 10800000,
        })
      )
    },
    saveShippingAddress: (state, action) => {
      const data = action.payload
      state.shipping = data

      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
          data: state.shipping,
          expires: Date.now() + 10800000,
        })
      )
    },
  },
  extraReducers: (builder) => {
    builder
      //Add Item to Cart
      .addCase(cartAddItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cartAddItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        const item = action.payload
        console.log(item)

        const existItem = state.cartItems.find((x) => x.id === item.id)
        const existItemQty = existItem ? existItem.qty : 0

        if (existItem) {
          item.qty = Number(item.qty) ? Number(item.qty) : Number(existItemQty)
          state.cartItems = state.cartItems.map((x) =>
            x.id === existItem.id ? item : x
          )
          localStorage.setItem(
            'cartItems',
            JSON.stringify({
              data: state.cartItems,
              expires: Date.now() + 10800000,
            })
          )
        } else {
          state.cartItems = [...state.cartItems, item]
          localStorage.setItem(
            'cartItems',
            JSON.stringify({
              data: state.cartItems,
              expires: Date.now() + 10800000,
            })
          )
        }
      })
      .addCase(cartAddItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false

        const item = action.payload

        console.log(item)

        state.cartItems = state.cartItems.filter((x) => x.id !== item)
        localStorage.setItem(
          'cartItems',
          JSON.stringify({
            data: state.cartItems,
            expires: Date.now() + 10800000,
          })
        )
      })
  },
})

export const {
  resetCart,
  savePaymentMethod,
  saveShippingAddress,
  clearLocalStorage,
} = cartSlice.actions
export default cartSlice.reducer
