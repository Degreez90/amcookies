import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Modal = ({ isModalOpen, setModalOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalBoxRef = useRef()
  const modalRef = useRef()
  const modalForm = useRef()

  const [isSignUp, setIsSignUp] = useState(true)

  const [formData, setFormData] = useState({
    emailSU: '',
    emailSI: '',
    firstName: '',
    lastName: '',
    passwordSU: '',
    passwordSU2: '',
    passwordSI: '',
  })

  const { user, isSuccess, isError } = useSelector((state) => state.auth)

  const {
    emailSU,
    emailSI,
    firstName,
    lastName,
    password,
    passwordSU,
    passwordSU2,
    passwordSI,
  } = formData

  const handleModal = (e) => {
    //desc  Close modal from outside click
    if (modalRef.current.contains(e.target)) {
      console.log('close')
      setModalOpen(false)
    }
  }

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

  //desc  Sign in form handler
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      emailSI,
      passwordSI,
    }
    console.log(userData)

    dispatch(login(userData))
  }

  //desc Signup form handler
  const onSubmit2 = async (e) => {
    e.preventDefault()

    if (passwordSU !== passwordSU2) {
      toast.error('Passwords do not match')
      console.log('run')
    } else {
      const userData = {
        firstName,
        lastName,
        email: emailSU,
        password: passwordSU,
      }

      dispatch(register(userData))
    }
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess)
      toast(`Welcome ${user.firstName}`)
      setModalOpen(false)
      navigate('/')
    }
  }, [isSuccess, user])

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('click', handleModal)
    }

    return () => {
      document.removeEventListener('click', handleModal)
    }
  }, [isModalOpen])

  return (
    <>
      {/* Modal for Sign up */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div
          ref={modalBoxRef}
          onClick={(e) => {
            e.stopPropagation() // Prevent the click event from bubbling up
          }}
          className='modal-box'
        >
          <div onClick={() => setModalOpen(false)} className='modal-action'>
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
                  className={` ${
                    isSignUp
                      ? 'border-b-2 border-primary'
                      : 'border-b-2 border-transparent'
                  } pb-1 text-2xl`}
                >
                  Sign Up
                </button>
              </div>
              <div className='text-center grow mb-3'>
                <button
                  onClick={handleSignIn}
                  to={'/'}
                  className={` ${
                    !isSignUp
                      ? 'border-b-2 border-primary'
                      : 'border-b-2 border-transparent'
                  } pb-1 text-2xl`}
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
                      type='text'
                      name='emailSU'
                      value={emailSU}
                      onChange={onChange}
                      className='input input-bordered w-full max-w-xs'
                      required
                    />
                  </div>
                  <label htmlFor=''>First Name:</label>
                  <div className='flex justify-center w-full mb-4 mt-1'>
                    <input
                      type='text'
                      name='firstName'
                      value={firstName}
                      onChange={onChange}
                      className='input input-bordered w-full max-w-xs'
                      required
                    />
                  </div>
                  <label htmlFor=''>Last Name:</label>
                  <div className='flex justify-center w-full mb-4 mt-1'>
                    <input
                      type='text'
                      name='lastName'
                      value={lastName}
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
                      name='emailSI'
                      value={emailSI}
                      onChange={onChange}
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
                  <div className='flex justify-center '>
                    <button className='btn btn-wide'>Submit</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <label ref={modalRef} className='modal-backdrop' htmlFor='my_modal_7'>
          Close
        </label>
      </div>
    </>
  )
}

export default Modal
