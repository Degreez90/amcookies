import React from 'react';
import Card from './Card';

const Section = ({ products }) => {
  console.log(products);
  return (
    <div className='py-3 text-black mb-10'>
      <h1 className='text-center font-semibold text-4xl'>Freshly Baked </h1>
      <p className='text-center py-3'>Straight to your Stomach</p>
      <div>
        <div className='grid gap-2 grid-cols-4'>
          {products.map((product) => (
            <Card key={product._id} products={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
