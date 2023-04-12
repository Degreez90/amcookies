import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Hero from '../components/hero'

const Layout = () => {
  return (
    <div className='bg-white relative min-h-screen flex flex-col'>
      <Hero />
      <main className='container mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
