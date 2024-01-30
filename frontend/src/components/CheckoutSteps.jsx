import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <nav className='flex justify-center mb-4'>
      {step1 ? (
        <Link to='/shipping'>
          <div className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer'>
            Shipping
          </div>
        </Link>
      ) : (
        <div className='px-4 py-2 rounded-md text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed'>
          Shipping
        </div>
      )}
      {step2 ? (
        <Link to='/payment'>
          <div className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer'>
            Payment
          </div>
        </Link>
      ) : (
        <div className='px-4 py-2 rounded-md text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed'>
          Payment
        </div>
      )}
      {step3 ? (
        <Link to='/placeorder'>
          <div className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer'>
            Place Order
          </div>
        </Link>
      ) : (
        <div className='px-4 py-2 rounded-md text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed'>
          Place Order
        </div>
      )}
    </nav>
  )
}
export default CheckoutSteps
