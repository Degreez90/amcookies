import { useContext, useEffect } from 'react'
import Product from '../components/Product'
import { Routes, Route, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Details = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.products)
  const { product } = productDetails

  useEffect(() => {})

  console.log(product)

  return (
    <>
      <Product product={product} />;
    </>
  )
}

export default Details
