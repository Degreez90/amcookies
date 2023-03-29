import React from 'react';

const Hero = () => {
  return (
    <div>
      <div
        className='mx-auto w-full h-[500px]'
        style={{ backgroundImage: `url(./images/banner.jpg)`, backgroundPosition: 'center', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}
      >
        <div className='w-full h-full sticky bg-slate-800/[.70]'>
          <div className='bg-slate-700 shadow-lg shadow-gray-900'>
            <nav className='flex py-3 mx-auto container'>
              <div className='w-full'>AM</div>
              <div>
                <ul className='flex space-x-3'>
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
    </div>
  );
};

export default Hero;
