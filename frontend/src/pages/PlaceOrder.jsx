import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import CheckoutSteps from '../components/CheckoutSteps'
import Shipping from './Shipping'
import { PayPalButtons } from '@paypal/react-paypal-js'

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { cartItems } = cart
  const { shipping } = cart

  const navigate = useNavigate()

  useEffect(() => {
    if (!cart.payment) {
      navigate('/payment')
    }
  }, [navigate, cart])

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

  return (
    <div className='container'>
      <CheckoutSteps step1 step2 step3 />
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-8/12 p-5'>
          <div className='Flex flex-col p-5'>
            <div className=' mb-2 border-b'>
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                SHIPPING
              </h2>
              <p>
                Name: {shipping.firstName} {shipping.lastName}
              </p>
              <p>Email: {shipping.email} </p>
              <p>Address: {shipping.address}</p>
            </div>
            <div className='py-3 mb-2 border-b'>
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
                      <button
                        className='ml-2 text-red-500'
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
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
          <div className='border'>
            <div className='flex flex-col border-b p-5 text-2xl font-bold'>
              ORDER SUMMARY
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Items</div>
              <div className='basis-0 grow'>
                $
                {cartItems
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
              <div className='basis-0 grow'>$ {taxPrice}</div>
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Total</div>
              <div className='basis-0 grow'>$ {totalPrice}</div>
            </div>
            <div className='flex border-b py-3 px-4'></div>
            <div className='flex border-b py-3 px-4'>
              <PayPalButtons className='mx-auto' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
