import { useSelector } from 'react-redux'

const Cart = () => {
  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  return (
    <div>
      <div className='grid gap-4 grid-cols-3 py-5 grid-rows-none'>
        <div className='text-center col-span-2'>
          <h1 className='text-3xl tracking-widest'>SHOPPING CART</h1>
          <div className='border-b border-b-1 py-3 px-3'>
            <div className='grid grid-cols-5'>
              <div>
                <img
                  style={{ width: '100px', height: '100px' }}
                  src={cartItems[0].image}
                ></img>
              </div>
              <div>{cartItems[0].name}</div>
              <div>{cartItems[0].price}</div>
              <div></div>
            </div>
          </div>
        </div>
        <div>
          <div className='text-center border'>
            <div className='text-2xl tracking-widest'>Sutotal Items</div>
            <div className='border-t border-t-1 p-5'>
              <button className='btn btn-primary'>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
