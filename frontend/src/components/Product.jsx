import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cartAddItem, resetCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'

const Product = ({ product }) => {
  const [qty, setQty] = useState(1)

  const { id } = useParams()
  const navigate = useNavigate

  const dispatch = useDispatch()

  const addToCartHandler = () => {
    dispatch(cartAddItem({ item: product._id, qty }))
  }

  const deleteCart = () => {
    localStorage.removeItem('cartItems')
    dispatch(resetCart())
  }

  // const addToCartHandler = () => {
  //   navigate(`/cart/${id}?qty=${qty}`)
  // }

  return (
    <div className='card w-4/5 md:w-fit md:max-h-[fit] mx-auto md:card-side customCard shadow-xl mt-10'>
      <figure className='max-h-[500px]'>
        <img
          className='md:w-[400px] md:h-[480px] w-full h-96'
          src={product.image}
        />
      </figure>
      <div className='card-body md:max-w-lg lg:max-w-2xl xl:max-w-3xl'>
        <h2 className='card-title text-white'>{product.name}</h2>
        <p className='grow-0 text-white'>{product.description}</p>
        <div>
          <span className='text-white'>Status: </span>
          <span
            className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className='mb-4 grow'>
          <select
            className=' bg-white text-black'
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
        <div className='card-actions justify-start'>
          <button
            className='btn btn-primary'
            onClick={addToCartHandler}
            disabled={!product.inStock}
          >
            Add
          </button>
          <button
            className='btn btn-primary'
            onClick={deleteCart}
            disabled={!product.inStock}
          >
            clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
