import React, { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { ToastContainer } from 'react-toastify'
import Sidemenu from '../components/menu/Sidemenu'
import { Link, NavLink } from 'react-router-dom'
import Modal from '../components/signup/Modal'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
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
      <div className={'z-[9999]'}>
        <ToastContainer />
      </div>
      <div className='z-10'>
        <Hero
          setModalOpen={setModalOpen}
          onClickHandler={onClickHandler}
          isOpen={isOpen}
          menuButtonRef={menuButtonRef}
        />
      </div>
      <div className='z-[11]'>
        <Sidemenu
          isOpen={isOpen}
          onClickHandler={onClickHandler}
          sideMenuRef={sideMenuRef}
        />
      </div>
      <div>
        <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      </div>
      <main className='container mx-auto mt-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
