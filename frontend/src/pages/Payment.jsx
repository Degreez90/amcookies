import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  return (
    <div className='container max-w-sm mx-auto'>
      <CheckoutSteps step1 step2 />
      <div className='bg-white rounded-lg shadow-lg my-4 p-5'>
        <div className='flex items-center justify-between mb-5'>
          <div className='text-lg font-bold'>Payment Method</div>
        </div>
        <form className='space-y-4'>
          <fieldset>
            <legend className='block font-medium text-gray-700 mb-2'>
              Select Method
            </legend>
            <div className='space-y-2'>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className='form-radio'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                />
                <span className='ml-2'>PayPal or Credit Card</span>
              </label>
              {/* <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="paymentMethod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)} />
            <span className="ml-2">Stripe</span>
          </label> */}
            </div>
          </fieldset>
          <div className='flex justify-center'>
            <button
              className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg'
              type='submit'
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment
