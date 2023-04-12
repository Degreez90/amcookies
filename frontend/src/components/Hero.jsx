import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  const { cart } = useSelector((state) => state.cart)

  return (
    <div>
      <div
        className='mx-auto w-full h-[500px]'
        style={{
          backgroundImage: `url(/images/banner.jpg)`,
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='w-full h-full sticky bg-slate-800/[.30]'>
          <div className='bg-slate-700 shadow-lg shadow-gray-900'>
            <nav className='flex py-3 px-3 mx-auto items-center container'>
              <div className='w-full'>AM</div>
              <div>
                <ul className='flex space-x-3'>
                  <li>
                    <NavLink to={'/'}>Home</NavLink>
                  </li>
                  <li>Cookies</li>
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div className='mx-4 avatar placeholder'>
                <div className='bg-neutral-focus text-neutral-content rounded-full w-12'>
                  <span>PF</span>
                </div>
              </div>
              <div className='dropdown dropdown-end'>
                <label tabIndex={0} className='btn btn-ghost btn-circle'>
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
                    {cart ? (
                      <span className='badge badge-sm indicator-item'>
                        {cart.qty}
                      </span>
                    ) : (
                      <span className='badge badge-sm indicator-item'>8</span>
                    )}
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
                >
                  <div className='card-body'>
                    <span className='font-bold text-lg'>8 Items</span>
                    <span className='text-info'>Subtotal: $999</span>
                    <div className='card-actions'>
                      <button className='btn btn-primary btn-block'>
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
