import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import CheckoutSteps from '../components/CheckoutSteps'
import Shipping from './Shipping'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { createOrder } from '../features/orders/orderSlice'
import { resetOrder } from '../features/orders/orderSlice'
import { clearLocalStorage, resetCart } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [sdkReady, setSdkReady] = useState(false)
  const [toastDisplayed, setToastDisplayed] = useState(false)

  const [{ isPending }] = usePayPalScriptReducer()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const { shipping } = cart

  const order = useSelector((state) => state.order)
  const { orderDetails } = order

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // if (cartItems.length === 0 && !toastDisplayed) {
  //   toast.error('No items in cart')
  //   setToastDisplayed(true)
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000)
  // } else if (!cart.payment && !toastDisplayed) {
  //   toast.error('No items in cart twice')
  //   setToastDisplayed(true)
  //   setTimeout(() => {
  //     navigate('/payment')
  //   }, 2000)
  // }

  useEffect(() => {
    if (orderDetails._id) {
      navigate('/orderconfirm')
    } else if (cartItems.length === 0 && !toastDisplayed) {
      console.log('why')
      toast.error('No items in cart', {
        toastId: 'success1',
      })
      setToastDisplayed(true)
      navigate('/')
    } else if (!cart.payment && !toastDisplayed) {
      toast.error('No payment specified', {
        toastId: 'success1',
      })
      setToastDisplayed(true)

      navigate('/payment')
    }
  }, [
    navigate,
    orderDetails._id,
    cartItems.length,
    cart.payment,
    toastDisplayed,
  ])

  //calc prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const price = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  const shippingPrice = 0

  const taxPrice = addDecimals(Number((0.07 * price).toFixed(2)))
  const totalPrice = (
    Number(price) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  const [clientId, setClientId] = useState(null)

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal')
      setClientId(data)
    }
    addPayPalScript()
  }, [setClientId])

  useEffect(() => {
    if (orderDetails._id) {
      dispatch(resetCart())
      dispatch(clearLocalStorage())
    }
  }, [dispatch, orderDetails._id])

  const initialOptions = {
    'client-id': clientId,
    currency: 'USD',
  }

  const paypalOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice,
          },
        },
      ],
    })
  }

  const paypalApprove = async (data, action) => {
    try {
      const details = await action.order.capture()
      console.log(details)
      dispatch(
        createOrder({
          nonRegUser: {
            firstName: shipping.firstName,
            lastName: shipping.lastName,
            email: shipping.email,
            phoneNumber: shipping.phoneNumber,
          },
          orderItems: cartItems,
          shippingAddress: {
            address: shipping.address,
            city: shipping.city,
            postalCode: shipping.zipCode,
            country: shipping.country,
          },
          paymentResults: {
            id: details.id,
            status: details.status,
            update_time: details.update_time,
            emails_address: details.payer.email_address,
          },
          paymentMethod: cart.payment,
          itemsPrice: price,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <CheckoutSteps step1 step2 step3 />
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-8/12 p-5'>
          <div className='Flex flex-col p-5'>
            <div className=' mb-2 border-b border-custom-gray '>
              {orderDetails._id ? (
                <div>
                  <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                    THANK YOU FOR YOUR PURCHASE
                  </h2>
                  <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                    Order Confirmation#: {orderDetails._id}
                  </h2>
                </div>
              ) : null}
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                SHIPPING
              </h2>
              <p>
                Name: {shipping.firstName} {shipping.lastName}
              </p>
              <p>Email: {shipping.email} </p>
              <p>Address: {shipping.address}</p>
            </div>
            <div className='py-3 mb-2 border-b border-custom-gray '>
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                PAYMENT METHOD
              </h2>
              <p>Payment: {cart.payment} </p>
            </div>
            <div className='py-3 mb-2'>
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                ORDER ITEMS
              </h2>
              <div className='col-span-2'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col items-center md:flex-row border-b border-custom-gray py-3'
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
                    <div className='w-full md:w-1/5 flex items-center justify-center'>
                      <select
                        value={item.qty}
                        onChange={(e) => console.log(e.target.value)}
                        className='rounded-md border-gray-400'
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      {/* <button
                        className='ml-2 text-red-500'
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <figure></figure>
        <div className='py-3 px-4 md:w-4/12'>
          <div className='border border-custom-gray '>
            <div className='flex flex-col border-b border-custom-gray  p-5 text-2xl font-bold'>
              ORDER SUMMARY
            </div>
            <div className='flex border-b border-custom-gray  py-3 px-4'>
              <div className='basis-0 grow'>Items</div>
              <div className='basis-0 grow'>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className='flex border-b border-custom-gray  py-3 px-4'>
              <div className='basis-0 grow'>Shipping</div>
              <div className='basis-0 grow'>$ 0</div>
            </div>
            <div className='flex border-b border-custom-gray  py-3 px-4'>
              <div className='basis-0 grow'>Tax</div>
              <div className='basis-0 grow'>$ {taxPrice}</div>
            </div>
            <div className='flex border-b border-custom-gray  py-3 px-4'>
              <div className='basis-0 grow'>Total</div>
              <div className='basis-0 grow'>$ {totalPrice}</div>
            </div>
            <div className='flex border-b border-custom-gray  py-3 px-4'></div>
            <div className='flex border-b border-custom-gray  py-3 px-4'>
              {isPending ? (
                <p>loading..</p>
              ) : (
                <PayPalButtons
                  className='mx-auto'
                  options={initialOptions}
                  createOrder={(totalPrice, actions) =>
                    paypalOrder(totalPrice, actions)
                  }
                  onApprove={paypalApprove}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
