import React from 'react'
import { useSelector } from 'react-redux'

const OrderConfirm = () => {
  const order = useSelector((state) => state.order)
  const { orderDetails } = order

  return (
    <div className='container flex items-center flex-col'>
      <h2>Thank You for Your Purchase {orderDetails.nonRegUser.firstName}</h2>
      <div>Order Confirmation #:{orderDetails._id} </div>
      <div>
        <h2>Details</h2>
        <div>First Name: {orderDetails.nonRegUser.firstName}</div>
        <div>Last Name: {orderDetails.nonRegUser.lastName}</div>
        <div>Address: {orderDetails.shippingAddress.address}</div>
        <div>City: {orderDetails.shippingAddress.city}</div>
        <div>Postal Code: {orderDetails.shippingAddress.postalCode}</div>
      </div>
      <div>
        <h2>Items</h2>
      </div>
    </div>
  )
}

export default OrderConfirm
