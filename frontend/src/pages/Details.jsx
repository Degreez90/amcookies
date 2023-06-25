import { useEffect } from 'react'
import Product from '../components/Product'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/products/productSlice'

const Details = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.products)
  const { product, isError, isLoading, message } = productDetails

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProduct(id))
  }, [isError, message, id])

  return (
    <>
      <Product product={product} />c
    </>
  )
}

export default Details
