import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../cart/cartService'

const cart = JSON.parse(localStorage.getItem('cartItems'))

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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartAddItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cartAddItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        const item = action.payload
        console.log(item)

        const existItem = state.cartItems.find((x) => x.id === item.id)

        if (existItem) {
          item.qty = item.qty + 1
          state.cartItems = state.cartItems.map((x) =>
            x.id === existItem.id ? item : x
          )
        } else {
          state.cartItems = [...state.cartItems, item]
        }
      })
      .addCase(cartAddItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer
