import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {
  const API_URL = '/api/mailer'

  const [firstName, setFirstName] = useState('')
  const [subject, setSubject] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  const resetState = () => {
    setFirstName('')
    setLastName('')
    setSubject('')
    setEmail('')
    setPhoneNumber('')
    setMessage('')
  }

  const submitHandler = (e) => {
    const data = {
      firstName,
      lastName,
      subject,
      from: email,
      phoneNumber,
      message,
    }
    e.preventDefault()
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

  return (
    <div className='container w-full px-4'>
      <ToastContainer />
      <div className='border-b mb-8 border-gray-400 lg:mx-24'>
        <p className='mb-8'>
          Welcome to our Contact Page! We are delighted to provide you with a
          convenient and straightforward way to get in touch with us. Whether
          you have a question, feedback, or simply want to reach out, our
          Contact Page is the perfect place to connect.
        </p>
      </div>
      {responseMessage ? <div>{responseMessage}</div> : <div></div>}
      <form onSubmit={submitHandler}>
        <div className='md:px-0 lg:px-24 grid sm:grid-cols-2 md:gap-x-4 gap-x-4 grid-cols-2'>
          <div className='border-b mb-8 border-gray-400 col-span-2'>
            <label className='block' htmlFor=''>
              Choose Subject:{' '}
            </label>
            <select
              name=''
              className='p-2 rounded-lg border border-gray-300  bg-gray-700 focus:ring-2 focus:ring-blue-500 mb-8'
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value=''>Choose a subject</option>
              <option value='compliment'>Compliment</option>
            </select>
          </div>
          <div className='mb-6 col-span-2 sm:col-span-1'>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>What is your first name?</span>
              </label>
              <input
                type='text'
                value={firstName}
                required
                placeholder='First Name'
                className='input input-bordered w-full max-w-xs'
              />
            </div>
            {/* old input */}
            {/* <label className='block' htmlFor=''>
              First Name:{' '}
            </label>
            <input
              className='rounded-lg p-2 w-full bg-gray-700'
              type='text'
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            /> */}
          </div>
          <div className='mb-6 col-span-2 sm:col-span-1'>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>What is your last name?</span>
              </label>
              <input
                type='text'
                value={lastName}
                required
                placeholder='First Name'
                className='input input-bordered w-full max-w-xs'
              />
            </div>

            <label className='block' htmlFor=''>
              Last Name:{' '}
            </label>
            <input
              className='rounded-lg p-2 w-full bg-gray-700'
              type='text'
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='mb-6 col-span-2 sm:col-span-1'>
            <label className='block' htmlFor=''>
              Email Address:{' '}
            </label>
            <input
              className='rounded-lg p-2 w-full bg-gray-700'
              type='text'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6 col-span-2 sm:col-span-1'>
            <label className='block' htmlFor=''>
              Phone Number:{' '}
            </label>
            <input
              className='rounded-lg p-2 w-full bg-gray-700'
              type='text'
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='mb-6 col-span-2'>
            <label className='block' htmlFor=''>
              Message:{' '}
            </label>
            <textarea
              className='w-full h-[96px] rounded-lg bg-gray-700'
              name=''
              id=''
              cols='30'
              rows='10'
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
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
  )
}

export default Contact
