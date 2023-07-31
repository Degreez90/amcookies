import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ products }) => {
  // console.log(products.name);
  return (
    <div className='mt-5 mx-3 card w-64 bg-gray-700 shadow-xl'>
      <Link to={`/details/${products._id}`}>
        <figure>
          <img
            className=' rounded-2xl w-full h-[250px]'
            src={products.image}
            alt='cookies'
          />
        </figure>
      </Link>
      <div className='card-body pt-1 gap-3 text-center'>
        <h2 className='card-title pb-2 text-white font-bold justify-center items-center h-16'>
          {products.name}
        </h2>
        {/* <p className='text-white'>{products.description}</p> */}
        <div className='card-actions justify-center'>
          <Link to={`/details/${products._id}`}>
            <button className='btn btn-primary'>Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
