import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../cart/cartService'

const cartItem = JSON.parse(localStorage.getItem('cartItems'))

let cart = []

if (cartItem && cartItem.expires > Date.now()) {
  cart = cartItem.data
} else {
  localStorage.removeItem('cartItems')
}

const initialState = {
  cartItems: cart ? cart : [],
  shipping: {},
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

export const saveShippingAddress = createAsyncThunk(
  'cart/saveShipping',
  async (data, thunkAPI) => {
    try {
      console.log(data)
      return data
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
    reset: (state) => initialState,
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
          item.qty = Number(existItemQty) + Number(item.qty)
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
      .addCase(saveShippingAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveShippingAddress.fulfilled, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.shipping = action.payload

        localStorage.setItem(
          'shippingAddress',
          JSON.stringify({
            data: state.shipping,
            expires: Date.now() + 10800000,
          })
        )
      })
      .addCase(saveShippingAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer
