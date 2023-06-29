import React from 'react'
import axios from 'axios'

const Contact = () => {
  const API_URL = '/api/mailer'

  const submitHandler = (e) => {
    e.preventDefault()
    const sendMessage = async (data) => {
      const response = await axios.get(API_URL, data)
      return response.data
    }

    sendMessage()
  }
  return (
    <div className='container p-1 w-full0'>
      <div>
        <div className='border-b-2 mb-8 border-gray-400'>
          <p className='mb-8'>
            Welcome to our Contact Page! We are delighted to provide you with a
            convenient and straightforward way to get in touch with us. Whether
            you have a question, feedback, or simply want to reach out, our
            Contact Page is the perfect place to connect.
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className='px-48 grid grid-cols-2 grid-rows-7 gap-x-16 justify-between'>
            <div className='border-b-2 mb-8 border-gray-400 col-span-2'>
              <label className='block' htmlFor=''>
                Choose Subject:{' '}
              </label>
              <select
                name=''
                className='p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 mb-8'
              >
                <option value='choose'>Choose a subject</option>
                <option value='compliment'>Compliment</option>
              </select>
            </div>
            <div className='mb-8'>
              <label className='block' htmlFor=''>
                First Name:{' '}
              </label>
              <input className='rounded-lg p-2 w-full' type='text' />
            </div>
            <div className=''>
              <label className='block' htmlFor=''>
                Last Name:{' '}
              </label>
              <input className='rounded-lg p-2 w-full' type='text' />
            </div>
            <div className=''>
              <label className='block' htmlFor=''>
                Email Address:{' '}
              </label>
              <input className='rounded-lg p-2 w-full' type='text' />
            </div>
            <div className=''>
              <label className='block' htmlFor=''>
                Phone Number:{' '}
              </label>
              <input className='rounded-lg p-2 w-full' type='text' />
            </div>
            <div className=' col-span-2'>
              <label className='block' htmlFor=''>
                Message:{' '}
              </label>
              <textarea
                className='w-full h-[96px] rounded-lg'
                name=''
                id=''
                cols='30'
                rows='10'
              ></textarea>
            </div>
            <div className=' col-span-2'>
              <button
                type='submit'
                className='py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
