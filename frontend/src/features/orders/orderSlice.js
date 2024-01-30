import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
  order: [],
  orderDetails: [],
  Shipping: {},
  orderDisplay: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
}

//create Order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, thunkAPI) => {
    console.log(order)
    try {
      return await orderService.createOrder(order)
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

export const getOrders = createAsyncThunk(
  'orders/get',
  async (orderId, thunkAPI) => {
    try {
      return await orderService.getProduct(productId)
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState,
    resetSuccess: (state) => {
      state.isSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orderDetails = action.payload
        state.orderDisplay = action.payload
        state.shipping = {}

        //Remove cart local storage.
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetOrder, resetSuccess } = orderSlice.actions
export default orderSlice.reducer
