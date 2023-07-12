import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Sidemenu = ({
  isOpen,
  toggleMenu,
  isChecked,
  setIsChecked,
  sideMenuRef,
}) => {
  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  const count = cartItems
    ? cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)
    : 0

  //Contains code for all clicks outside of side menu to open and close

  const onClickHandler = () => {
    toggleMenu()
    setIsChecked(!isChecked)
  }

  return (
    <div
      ref={sideMenuRef}
      className={`w-[284px] h-screen fixed ${
        isOpen ? `translate-x-[0px]` : `translate-x-[284px]`
      } transition-transform duration-300 ease-in-out right-0 top-20 bg-slate-950`}
    >
      <div className='flex p-4 justify-end'>
        {/* <div className='flex flex-grow'>
          <button className='btn btn-square'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div> */}
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
              <span className='badge badge-sm indicator-item'>{count}</span>
            ) : (
              <span className='badge badge-sm indicator-item'>0</span>
            )}
          </div>
        </div>
      </div>
      <div className='flex p-4 justify-center'>
        <ul className=' text-center font-g1'>
          <NavLink to={'/'} onClick={onClickHandler}>
            <li className='mb-3'>Cookies</li>
          </NavLink>
          <NavLink to={'/about'} onClick={onClickHandler}>
            <li className='mb-3'>About</li>
          </NavLink>
          <NavLink to={'/contact'} onClick={onClickHandler}>
            <li className='mb-3'>Contact</li>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}

export default Sidemenu
