import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <nav className='flex justify-center mb-4'>
      <Link to='/shipping'>
        <div
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            step1
              ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer'
              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
          }`}
        >
          Shipping
        </div>
      </Link>
      <Link to='/payment'>
        <div
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            step2
              ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer'
              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
          }`}
        >
          Payment
        </div>
      </Link>
      <Link to='/placeorder'>
        <div
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            step3
              ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer'
              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
          }`}
        >
          Place Order
        </div>
      </Link>
    </nav>
  )
}
export default CheckoutSteps
