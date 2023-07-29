import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import authReducer from '../features/auth/authSlice'
import productsReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/orders/orderSlice'

export const store = configureStore({
  reducer: {
    user: authReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})
