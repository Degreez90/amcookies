import React from 'react'
import Card from './Card'
import { useState, useEffect, useContext } from 'react'
import ProductContext from '../context/products/ProductsContext'
import { getProducts } from '../context/products/ProductActions'

const Section = () => {
  const { products, loading, dispatch } = useContext(ProductContext)

  useEffect(() => {
    async function fetchData() {
      const products = await getProducts()
      console.log(products)
      dispatch({ type: 'GET_PRODUCTS', payload: products })
    }
    fetchData()
  }, [])

  console.log(products)
  return (
    <div className='py-3 text-black mb-10'>
      <h1 className='text-center font-semibold text-4xl'>Freshly Baked </h1>
      <p className='text-center py-3'>Straight to your Stomach</p>
      <div>
        <div className='grid gap-2 grid-cols-4'>
          {loading ? <div>loading...</div> : products ? products.map((product) => <Card key={product._id} products={product} />) : <div>no products available</div>}
        </div>
      </div>
    </div>
  )
}

export default Section
