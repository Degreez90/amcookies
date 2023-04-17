import React from 'react'

const Cart = () => {
  return (
    <div>
      <div className='grid gap-4 grid-cols-2 py-3 grid-rows-none'>
        <div className='text-center'>
          <h1 className='text-3xl tracking-widest'>SHOPPING CART</h1>
        </div>
        <div>
          <div className='text-center border'>
            <div className='text-2xl tracking-widest'>Sutotal Items</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
