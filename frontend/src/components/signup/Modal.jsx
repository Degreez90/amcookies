import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../features/auth/authSlice'

const Modal = () => {
  const dispatch = useDispatch()

  const [isSignUp, setIsSignUp] = useState(true)

  const [formData, setFormData] = useState({
    emailSU: '',
    emailSI: '',
    passwordSU: '',
    passwordSU2: '',
    passwordSI: '',
  })

  const { emailSU, emailSI, password, passwordSU, passwordSU2, passwordSI } =
    formData

  const handleSignUp = () => {
    setIsSignUp(true)
  }

  const handleSignIn = () => {
    setIsSignUp(false)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      emailSU,
      passwordSU,
    }

    dispatch(register(userData))
  }

  const onSubmit2 = (e) => {
    e.preventDefault()

    if (passwordSU !== passwordSU2) {
      toast.error('Passwords do not match')
      console.log('run')
    } else {
      const userData = {
        emailSI,
        password,
      }
      dispatch(register)
    }
  }

  return (
    <>
      {/* Modal for Sign up */}
      <input type='checkbox' id='my_modal_7' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <div className='modal-action'>
            <label
              htmlFor='my_modal_7'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              X
            </label>
          </div>
          <div className='flex-col text-center font-g1 whitespace-nowrap mb-4'>
            <h3 className='font-bold text-2xl mb-5'>AM</h3>
            <div className='divider mb-5'>
              {isSignUp ? 'Register' : 'Login'}
            </div>

            <div className='flex flex-col justify-center sm:flex-row sm:mx-auto sm:justify-center text-lg sm:w-8/12'>
              <div className='text-center grow mb-3'>
                <button
                  onClick={handleSignUp}
                  to={'/'}
                  className='border-b-2 border-transparent hover:border-b-2 hover:border-primary pb-1 text-2xl'
                >
                  Sign Up
                </button>
              </div>
              <div className='text-center grow mb-3'>
                <button
                  onClick={handleSignIn}
                  to={'/'}
                  className='border-b-2 border-transparent hover:border-b-2 hover:border-primary pb-1 text-2xl'
                >
                  Sign In
                </button>
              </div>
            </div>
            {isSignUp ? (
              <div className='mx-auto text-left w-[75%]'>
                {/* //* Sign up form   */}

                <form onSubmit={onSubmit2}>
                  <label htmlFor=''>Email:</label>
                  <div className='flex justify-center w-full mb-4 mt-1'>
                    <input
                      type='email'
                      name='emailSU'
                      value={emailSU}
                      onChange={onChange}
                      className='input input-bordered w-full max-w-xs'
                      required
                    />
                  </div>
                  <label htmlFor=''>Password:</label>
                  <div className='flex w-full justify-center mb-4 mt-1'>
                    <input
                      type='password'
                      name='passwordSU'
                      value={passwordSU}
                      onChange={onChange}
                      className='input input-bordered w-full max-w-xs'
                      required
                    />
                  </div>

                  <label htmlFor=''>Confirm Password:</label>
                  <div className='flex w-full justify-center mb-4 mt-1'>
                    <input
                      type='password'
                      name='passwordSU2'
                      value={passwordSU2}
                      onChange={onChange}
                      className='input input-bordered w-full max-w-xs'
                      required
                    />
                  </div>
                  <div className='flex justify-center'>
                    <button className='btn btn-wide'>Submit</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className='mx-auto text-left w-[75%]'>
                {/* //* Sign in form */}

                <form onSubmit={onSubmit}>
                  <label htmlFor=''>Email:</label>
                  <div className='flex justify-center w-full mb-4 mt-1'>
                    <input
                      className='input input-bordered w-full max-w-xs'
                      type='text'
                    />
                  </div>
                  <label htmlFor=''>Password:</label>
                  <div className='flex w-full justify-center mb-4 mt-1'>
                    <input
                      className='input input-bordered w-full max-w-xs'
                      name='passwordSI'
                      value={passwordSI}
                      onChange={onChange}
                      type='password'
                    />
                  </div>
                  <div className='flex justify-center'>
                    <button className='btn btn-wide'>Submit</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <label className='modal-backdrop' htmlFor='my_modal_7'>
          Close
        </label>
      </div>
    </>
  )
}

export default Modal
