import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../cart/cartService'

const cart = JSON.parse(localStorage.getItem('cartItems'))

const initialState = {
  cartItems: cart ? cart : [],
  shipping: {},
}

export const cartAddItem = createAsyncThunk(
  'cart/getItem',
  async ({ id, qty }, thunkAPI) => {
    try {
      console.log(id + ':' + qty)
      return await cartService.addToCart(id, qty)
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

        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        )
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
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
