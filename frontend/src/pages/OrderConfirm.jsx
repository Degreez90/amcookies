import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderConfirm = () => {
  const order = useSelector((state) => state.order)
  const { orderDetails } = order

  const navigate = useNavigate()

  const API_URL = '/api/mailer'

  useEffect(() => {
    if (!orderDetails._id) {
      navigate('/')
    } else {
      const data = {
        orderDetails,
      }

      const sendMessage = async (data) => {
        const response = await axios.post(API_URL, data)
        if (response.data) {
          setResponseMessage(response.data)
          resetState()
          toast.success('Your message was sent')
        } else setResponseMessage('There was an error please try again')
        return response.data
      }

      sendMessage(data)
    }
  }, [navigate, orderDetails._id])

  if (!orderDetails.nonRegUser) {
    return null
  }

  return (
    <div className='container'>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-8/12 p-5'>
          <div className='Flex flex-col p-5'>
            <div>
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                THANK YOU FOR YOUR PURCHASE
              </h2>
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                Order Confirmation#: {orderDetails._id}
              </h2>
            </div>

            <h2 className='mb-2 font-bold text-2xl tracking-widest'>
              SHIPPING
            </h2>
            <p>
              Name: {orderDetails.nonRegUser.firstName}{' '}
              {orderDetails.nonRegUser.lastName}
            </p>
            <p>Email: {orderDetails.nonRegUser.email} </p>
            <p>Address: {orderDetails.shippingAddress.address}</p>
          </div>
          <div className='py-3 mb-2 border-b'>
            <h2 className='mb-2 font-bold text-2xl tracking-widest'>
              PAYMENT METHOD
            </h2>
            <p>Payment: {orderDetails.paymentMethod} </p>
          </div>
          <div className='py-3 mb-2'>
            <h2 className='mb-2 font-bold text-2xl tracking-widest'>
              ORDER ITEMS
            </h2>
            <div className='col-span-2'>
              {orderDetails.orderItems.map((item) => (
                <div
                  key={item._id}
                  className='flex flex-col items-center md:flex-row border-b py-3'
                >
                  <div className='md:w-1/5 md:mr-0 mb-2 md:mb-0'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='max-h-64 md:max-h-24 md:object-contain'
                    />
                  </div>
                  <div className='flex-grow md:w-2/5'>
                    <h2 className='text-lg font-medium'>{item.name}</h2>
                    <p className='text-gray-500'>{item.description}</p>
                  </div>
                  <div className='w-full md:w-1/5 flex items-center justify-center'>
                    <span className='text-lg font-medium'>${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <p></p>
          </div>
        </div>
        <figure></figure>
        <div className='py-3 px-4 md:w-4/12'>
          <div className='border'>
            <div className='flex flex-col border-b p-5 text-2xl font-bold'>
              ORDER SUMMARY
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Items</div>
              <div className='basis-0 grow'>
                ${' '}
                {orderDetails.orderItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Shipping</div>
              <div className='basis-0 grow'>$ 0</div>
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Tax</div>
              <div className='basis-0 grow'>$ {orderDetails.taxPrice}</div>
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Total</div>
              <div className='basis-0 grow'>
                $ {orderDetails.totalPrice.toFixed(2)}
              </div>
            </div>
            <div className='flex border-b py-3 px-4'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirm
