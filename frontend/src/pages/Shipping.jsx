import React from 'react'

const Shipping = () => {
  return (
    <div>
      <div className='container px-4 md:px-0'>
        <h1 className='text-3xl font-bold text-center my-4 md:text-left'>
          SHOPPING CART
        </h1>
        <div className='flex flex-col items-center'>
          <form
            action=''
            className='w-full max-w-md mt-8 p-4 bg-gray-100 rounded-lg'
          >
            <div className='flex flex-col mb-4'>
              <label htmlFor='firstName' className='mb-2 font-medium'>
                First Name:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='First Name'
                type='text'
                required
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='lastName' className='mb-2 font-medium'>
                Last Name:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Last Name'
                type='text'
                required
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='address' className='mb-2 font-medium'>
                Address:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Address'
                type='text'
                required
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='city' className='mb-2 font-medium'>
                City:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='City'
                type='text'
                required
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='zipCode' className='mb-2 font-medium'>
                Zip Code:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Zipcode'
                type='text'
                required
              />
            </div>
            <button className='w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Shipping
