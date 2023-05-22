import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../features/cart/cartSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const { shipping } = cart

  const [firstName, setFirstName] = useState(shipping.firstName || '')
  const [lastName, setLastName] = useState(shipping.lastName || '')
  const [address, setAddress] = useState(shipping.address || '')
  const [email, setEmail] = useState(shipping.email || '')
  const [phoneNumber, setPhoneNumber] = useState(shipping.phoneNumber || '')
  const [city, setCity] = useState(shipping.city || '')
  const [zipCode, setZipCode] = useState(shipping.city || '')
  const [country, setCountry] = useState(shipping.country || 'United States')

  console.log(firstName)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
        city,
        zipCode,
        country,
      })
    )
    navigate('/payment')
  }

  return (
    <div>
      <div className='container px-4 md:px-0'>
        <CheckoutSteps step1 />
        <h1 className='text-3xl font-bold text-center my-4 md:text-left'>
          SHIPPING INFO
        </h1>
        <div className='flex flex-col items-center'>
          <form
            onSubmit={submitHandler}
            className='w-full max-w-md mt-8 p-4 bg-gray-100 rounded-lg'
          >
            <div className='flex flex-col mb-4'>
              <label htmlFor='firstName' className='mb-2 font-medium'>
                First Name:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='First Name'
                value={firstName}
                type='text'
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='lastName' className='mb-2 font-medium'>
                Last Name:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Last Name'
                value={lastName}
                type='text'
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='Email' className='mb-2 font-medium'>
                Email:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Email'
                value={email}
                type='text'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='phoneNumber' className='mb-2 font-medium'>
                Phone Number:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Phone Number'
                value={phoneNumber}
                type='text'
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='address' className='mb-2 font-medium'>
                Address:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Address'
                value={address}
                type='text'
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='city' className='mb-2 font-medium'>
                City:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='City'
                value={city}
                type='text'
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='zipCode' className='mb-2 font-medium'>
                Zip Code:
              </label>
              <input
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Zipcode'
                value={zipCode}
                type='text'
                required
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='country' className='mb-2 font-medium'>
                Country:
              </label>
              <select
                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value='United States'>United States</option>
              </select>
            </div>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Shipping
