import React from 'react'
import Card from './Card'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../features/products/productSlice'

const Section = () => {
  const { products, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.products
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProducts())
  }, [isError, message])

  return (
    <div className='py-3 text-black mb-10'>
      <h1 className='text-center font-semibold text-4xl'>Freshly Baked </h1>
      <p className='text-center py-3'>Straight to your Stomach</p>
      <div>
        <div className='xl:grid xl:gap-2 xl:grid-cols-4 flex flex-wrap justify-center space-x-5'>
          {isLoading ? (
            <div>loading...</div>
          ) : products ? (
            products.map((product) => (
              <Card key={product._id} products={product} />
            ))
          ) : (
            <div>no products available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Section
