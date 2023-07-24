import React, { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { ToastContainer } from 'react-toastify'
import Sidemenu from '../components/menu/Sidemenu'
import { Link, NavLink } from 'react-router-dom'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const sideMenuRef = useRef(null)
  const menuButtonRef = useRef(null)

  const onClickHandler = () => {
    setIsOpen(!isOpen)
    setIsChecked(!isChecked)
  }

  const handleButtonClick = (event) => {
    if (menuButtonRef.current && menuButtonRef.current.contains(event.target)) {
      setIsOpen(!isOpen)
      setIsChecked(!isChecked)
      console.log('inside button')
      window.removeEventListener('click', handleButtonClick)
    }
  }

  const handleClickOutside = (event) => {
    if (
      sideMenuRef.current &&
      !sideMenuRef.current.contains(event.target) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target) &&
      event.target !== menuButtonRef.current
    ) {
      if (
        isOpen &&
        !menuButtonRef.current.contains(event.target) &&
        event.target !== menuButtonRef.current
      ) {
        console.log('we are here')
        setIsOpen(!isOpen)
        setIsChecked(!isChecked)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside)
    }
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia('(max-width: 640px)').matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')

    const handleScreenChange = (e) => {
      setIsSmallScreen(e.matches)
    }

    const updateIsSmallScreen = () => {
      setIsSmallScreen(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleScreenChange)

    window.addEventListener('resize', updateIsSmallScreen)

    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange)
      window.removeEventListener('resize', updateIsSmallScreen)
    }
  }, [setIsSmallScreen])

  useEffect(() => {
    if (isOpen && !isSmallScreen) {
      onClickHandler()
    }
  }, [isOpen, isSmallScreen])

  return (
    <div className='bg-white relative min-h-screen flex flex-col '>
      <ToastContainer />
      <div className='z-10'>
        <Hero
          onClickHandler={onClickHandler}
          isOpen={isOpen}
          menuButtonRef={menuButtonRef}
        />
      </div>
      <div className='z-[10]'>
        {/* Modal for Sign up */}
        <dialog id='my_modal_2' className='modal'>
          <form method='dialog' className='modal-box max-w-[370px]'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
            <div className='text-center font-g1 justify-items-center whitespace-nowrap mb-4'>
              <h3 className='font-bold text-lg mb-4'>AM</h3>
              <div className='flex mx-auto justify-center text-lg mb-4 w-8/12'>
                <div className='text-center grow'>
                  <NavLink
                    to={'/'}
                    className='hover:border-b-2 pb-1 active:outline-none'
                  >
                    Sign In
                  </NavLink>
                </div>
                <div className='text-center grow'>
                  <NavLink
                    to='/'
                    className='hover:border-b-2 pb-1'
                    autoFocus={false}
                    end
                  >
                    Sign Up
                  </NavLink>
                </div>
              </div>
              <div className='mx-auto text-left w-[75%]'>
                <label htmlFor=''>Email:</label>
                <div className='flex justify-center w-full mb-4 mt-1'>
                  <input className='w-full' type='text' />
                </div>
                <label htmlFor=''>Password:</label>
                <div className='flex w-full justify-center mb-4 mt-1'>
                  <input className='w-full' type='text' />
                </div>
              </div>
            </div>
          </form>
          <form method='dialog' className='modal-backdrop'>
            <button>close</button>
          </form>
        </dialog>
        <Sidemenu
          isOpen={isOpen}
          onClickHandler={onClickHandler}
          sideMenuRef={sideMenuRef}
        />
      </div>
      <main className='container mx-auto mt-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
