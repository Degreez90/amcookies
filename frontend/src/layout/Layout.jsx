import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const Layout = () => {
  return (
    <div className='bg-white'>
      <Hero />
      <main className='container mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
