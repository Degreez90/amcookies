import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { cartAddItem, removeFromCart } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart({ id: id }))
  }

  const [qty, setQty] = useState(null)

  const addToCartHandler = () => {
    dispatch(cartAddItem({ item: cartItems.id, qty }))
  }

  return (
    <div>
      <div className='container mx-auto px-4 md:px-0'>
        <h1 className='text-3xl font-bold text-center my-4 md:text-left'>
          SHOPPING CART
        </h1>
        {cartItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
            <div className='col-span-2'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex flex-col items-center md:flex-row border-b border-gray-400 py-3'
                >
                  <div className='w-full md:w-1/5 mr-4 md:mr-0 mb-2 md:mb-0'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-full h-auto md:max-h-24 md:object-contain'
                    />
                  </div>
                  <div className='flex-grow md:w-2/5m items-center justify-center'>
                    <h2 className='flex justify-center text-lg font-medium'>
                      {item.name}
                    </h2>
                  </div>
                  <div className='w-full md:w-1/5 flex items-center justify-center'>
                    <span className='text-lg font-medium'>${item.price}</span>
                  </div>
                  <div className='w-full md:w-1/5 flex items-center justify-center'>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          cartAddItem({
                            item: item.id,
                            qty: Number(e.target.value),
                          })
                        )
                      }
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
            <div className='flex flex-col justify-between md:col-span-1'>
              <div className='text-lg font-medium mb-4 md:mb-0'>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                items):
                <span className='ml-2'>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className='text-center md:text-left'>
                <Link to={'/shipping'}>
                  <button className='btn btn-primary'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
