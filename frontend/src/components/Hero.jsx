import React from 'react';

const Hero = () => {
  return (
    <div>
      <div
        className='mx-auto w-full h-[500px]'
        style={{ backgroundImage: `url(./images/banner.jpg)`, backgroundPosition: 'center', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}
      >
        <div className='relative w-full h-full bg-slate-800/[.40]'>
          <nav className='flex py-3 mx-auto container'>
            <div className='w-full'>AM</div>
            <div>
              <ul className='flex space-x-2'>
                <li>Home</li>
                <li>Cookies</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Hero;
