import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  return (
    <div className='bg-white relative min-h-screen flex flex-col'>
      <ToastContainer />
      <Hero />
      <main className='container mx-auto mt-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
