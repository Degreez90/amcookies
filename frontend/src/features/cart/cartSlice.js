import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../products/productService'

const initialState = {
  cartItems: [],
  shipping: {},
}

export const cartItems = createAsyncThunk(
  'cart/getItem',
  async ({ item, qty }, thunkAPI) => {
    try {
      const cart = thunkAPI.getState().cartItems
      return await cartService.getItems(item, qty, cart)
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
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(cartClearItems.fulfilled, (state, action) => {
        state.cartItems = []
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer
