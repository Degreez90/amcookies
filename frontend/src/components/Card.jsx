import React from 'react';

const Card = ({ products }) => {
  // console.log(products.name);
  return (
    <div className='card w-64 bg-base-100 shadow-xl'>
      <figure>
        <img className=' w-full h-[250px]' src={products.image} alt='cookies' />
      </figure>
      <div className='card-body text-center'>
        <h2 className='card-title text-white font-bold justify-center items-start h-16'>{products.name}</h2>
        <p className='text-white'>{products.description}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
