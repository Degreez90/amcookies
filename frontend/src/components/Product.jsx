import React from 'react'

const Product = ({ product }) => {
  const { products } = useContext(ProductContext)

  return (
    <div className='card lg:card-side bg-base-100 shadow-xl mt-10'>
      <figure>
        <img src={product.image} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{product.name}</h2>
        <p className='grow-0'>{product.description}</p>
        <div>Status: In Stock</div>
        <div>
          <select name='' id=''>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Add</button>
        </div>
      </div>
    </div>
  )
}

export default Product
