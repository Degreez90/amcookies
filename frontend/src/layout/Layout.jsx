import React, { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { ToastContainer } from 'react-toastify'
import Sidemenu from '../components/menu/Sidemenu'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const sideMenuRef = useRef(null)
  const menuButtonRef = useRef(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        toggleMenu()
        setIsChecked(!isChecked)
      } else if (!isOpen && menuButtonRef.current.contains(event.target)) {
        toggleMenu()
        setIsChecked(!isChecked)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen, setIsChecked])

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

  const onClickHandler = () => {
    toggleMenu()
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    if (isOpen && !isSmallScreen) {
      onClickHandler()
    }
  }, [isOpen, isSmallScreen])

  return (
    <div className='bg-white relative min-h-screen flex flex-col'>
      <ToastContainer />
      <div className=' z-50'>
        <Hero
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isSmallScreen={isSmallScreen}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          menuButtonRef={menuButtonRef}
        />
      </div>
      <div className='z-[9999]'>
        <Sidemenu
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
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
