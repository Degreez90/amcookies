import React, { useEffect, useState } from 'react'

const Product = ({ product }) => {
  const [qty, setQty] = useState(1)

  return (
    <div className='card lg:card-side bg-base-100 shadow-xl mt-10'>
      <figure>
        <img className=' h-96 w-96' src={product.image} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{product.name}</h2>
        <p className='grow-0'>{product.description}</p>
        <div>
          {product.inStock ? 'Status: In Stock' : 'Status: Out of Stock'}
        </div>
        <div>
          <select
            name=''
            id=''
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary' disabled={!product.inStock}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
