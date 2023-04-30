import React from 'react'

const PlaceOrder = () => {
  return (
    <div className='container'>
      <h2>Order Number here</h2>
      <div className='flex'>
        <div className='w-8/12 p-5'>
          <div className='Flex flex-col p-5'>
            <div className=' mb-2'>
              <h2>SHIPPING</h2>
            </div>
            <p>Name: </p>
            <div className='py-3 mb-2'>
              <h2>Payment Method</h2>
            </div>
            <div className='py-3 mb-2'>
              <h2>Order Items</h2>
            </div>
          </div>
        </div>
        <div className='p-4 w-4/12'>
          <div className='Flex flex-col border p-5'>something</div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
