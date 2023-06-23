import React from 'react'
import hours from '../data/hours.json'
const About = () => {
  return (
    <div className='container'>
      <div className='flex flex-col md:flex-row'>
        <div className='grow md:mr-10 lg:mr-0 mb-3'>
          <h2 className='mb-3 text-2xl font-bold'>Location</h2>
          <img
            className='mx-auto md:mx-0 w-96 h-96'
            src='/images/map.png'
            alt=''
          />
        </div>
        <div className='flex flex-col grow'>
          <div className='col-span-3 row-span-1'>
            <h2 className='mb-3 font-bold text-2xl'>Hours</h2>
          </div>
          <div className='flex'>
            <div className='grow pr-3 md:shrink md:pr-4 lg:pr-18'>
              <h2 className='font-semibold text-xl'>Store Hours:</h2>
            </div>
            <div className='flex grow'>
              <div className='grid grid-rows-7 w-full'>
                {hours.map((day) => (
                  <div className='col-span-1 row-span-1'>
                    <h2 className='font-semibold text-xl'>{day.day}</h2>
                  </div>
                ))}
              </div>
              <div className='grid grid-rows-7 w-full'>
                {hours.map((day) => (
                  <div className='col-span-1 row-span-1'>
                    <h2 className='font-semibold text-xl'>{day.hours}</h2>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className='col-span-1'>
              <h2 className='font-semibold text-xl'>Store Hours:</h2>
            </div>
            <div className='col-span-1 row-span-1'>
              {hours.map((day) => (
                <h2 className='font-semibold text-xl'>{day.day}</h2>
              ))}
            </div>
            <div className='col-span-1 row-span-1'>
              {hours.map((day) => (
                <h2 className='font-semibold text-xl'>{day.hours}</h2>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
