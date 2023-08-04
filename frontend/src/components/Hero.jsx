import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Sidemenu from './menu/Sidemenu'

const Hero = ({
  toggleMenu,
  onClickHandler,
  setModalOpen,
  setIsChecked,
  isChecked,
  setIsOpen,
  isOpen,
  menuButtonRef,
}) => {
  const cart = useSelector((state) => state.cart)

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const { cartItems } = cart

  const count = cartItems
    ? cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)
    : 0

  const [cartMenu, setCartMenu] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartMenuRef = useRef()
  const cartIconRef = useRef()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!cartIconRef.current.contains(e.target)) {
        setCartMenu(false)
      }
    }

    document.addEventListener('click', handleDropDown)
    return () => {
      document.removeEventListener('click', handleDropDown)
    }
  })

  return (
    <div>
      <div
        className='mx-auto w-full h-[400px]'
        style={{
          backgroundImage: `url(/images/banner.jpg)`,
          backgroundPosition: '50% 70%',
          backgroundSize: '100% 900px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='w-full h-full sticky bg-slate-800/[.30]'>
          <div className='bg-gray-700 shadow-lg shadow-gray-900 w-full fixed h-20 justify-center flex'>
            <nav className='flex py-3 px-4 mx-auto items-center text-white container'>
              <div className='w-full font-g1 text-xl '>
                <Link to={'/'}>AM COOKIES</Link>
              </div>
              <div className='font-g1 text-xl hidden sm:flex'>
                <ul className='flex space-x-3 whitespace-nowrap'>
                  <li>
                    <NavLink to={'/'}>Cookies</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/about'}>About</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/contact'}>Contact</NavLink>
                  </li>
                </ul>
              </div>
              <div className='sm:hidden'>
                <label className='btn btn-circle swap swap-rotate'>
                  {/* this hidden checkbox controls the state */}
                  <input
                    className='z-50'
                    ref={menuButtonRef}
                    type='checkbox'
                    onChange={onClickHandler}
                    checked={isOpen}
                  />

                  {/* hamburger icon */}
                  <svg
                    className='swap-off fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 512 512'
                  >
                    <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
                  </svg>

                  {/* close icon */}
                  <svg
                    className='swap-on fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 512 512'
                  >
                    <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
                  </svg>
                </label>
              </div>

              <div
                ref={cartIconRef}
                onClick={() => {
                  setCartMenu(!cartMenu)
                }}
                className='dropdown dropdown-end ml-3 hidden sm:flex'
              >
                <label tabIndex={0}>
                  <div className='btn btn-ghost btn-circle'>
                    <div className='indicator'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-8'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                      {count ? (
                        <span className='badge badge-sm indicator-item'>
                          {count}
                        </span>
                      ) : (
                        <span className='badge badge-sm indicator-item'>0</span>
                      )}
                    </div>
                  </div>
                </label>
                <div
                  onClick={(e) => {
                    e.stopPropagation() // Prevent the click event from bubbling up
                  }}
                  ref={cartMenuRef}
                  className={` ${
                    cartMenu ? 'visible' : 'hidden'
                  } absolute top-[70px] right-0 card-compact h-fit w-48 rounded-lg bg-gray-700`}
                >
                  <div className='card-body'>
                    <span className='font-bold text-lg'>
                      {count ? count.toString() : 0} Items
                    </span>
                    <span className='text-info'>
                      Subtotal:{' $'}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </span>
                    <div className='card-actions'>
                      <NavLink to={'/cart'}>
                        <button
                          onClick={() => setCartMenu(!cartMenu)}
                          className='btn btn-primary btn-block'
                        >
                          View Cart
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ml-4 font-g1 text-xl hidden sm:flex'>
                {user ? (
                  <div className='flex justify-center items-center space-x-3'>
                    <div className='avatar online placeholder'>
                      <div className='bg-neutral-focus text-neutral-content rounded-full w-16'>
                        <span className='text-xl'>U</span>
                      </div>
                    </div>
                    <div
                      className='hover:cursor-pointer'
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </div>
                  </div>
                ) : (
                  <ul className='flex space-x-3 whitespace-nowrap'>
                    <li>
                      <label
                        onClick={() => setModalOpen(true)}
                        htmlFor='my_modal_7'
                      >
                        Sign Up
                      </label>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
