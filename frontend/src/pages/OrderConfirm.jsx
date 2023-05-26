import React from 'react'
import { useSelector } from 'react-redux'

const OrderConfirm = () => {
  const order = useSelector((state) => state.order)
  const { orderDetails } = order

  return (
    <div className='container'>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-8/12 p-5'>
          <div className='Flex flex-col p-5'>
            <div>
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                THANK YOU FOR YOUR PURCHASE
              </h2>
              <h2 className='mb-2 font-bold text-2xl tracking-widest'>
                Order Confirmation#: {orderDetails._id}
              </h2>
            </div>

            <h2 className='mb-2 font-bold text-2xl tracking-widest'>
              SHIPPING
            </h2>
            <p>
              Name: {orderDetails.nonRegUser.firstName}{' '}
              {orderDetails.nonRegUser.lastName}
            </p>
            <p>Email: {orderDetails.nonRegUser.email} </p>
            <p>Address: {orderDetails.shippingAddress.address}</p>
          </div>
          <div className='py-3 mb-2 border-b'>
            <h2 className='mb-2 font-bold text-2xl tracking-widest'>
              PAYMENT METHOD
            </h2>
            <p>Payment: {orderDetails.paymentMethod} </p>
          </div>
          <div className='py-3 mb-2'>
            <h2 className='mb-2 font-bold text-2xl tracking-widest'>
              ORDER ITEMS
            </h2>
            <div className='col-span-2'>
              {orderDetails.orderItems.map((item) => (
                <div
                  key={item._id}
                  className='flex flex-col items-center md:flex-row border-b py-3'
                >
                  <div className='md:w-1/5 md:mr-0 mb-2 md:mb-0'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='max-h-64 md:max-h-24 md:object-contain'
                    />
                  </div>
                  <div className='flex-grow md:w-2/5'>
                    <h2 className='text-lg font-medium'>{item.name}</h2>
                    <p className='text-gray-500'>{item.description}</p>
                  </div>
                  <div className='w-full md:w-1/5 flex items-center justify-center'>
                    <span className='text-lg font-medium'>${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <p></p>
          </div>
        </div>
        <figure></figure>
        <div className='py-3 px-4 md:w-4/12'>
          <div className='border'>
            <div className='flex flex-col border-b p-5 text-2xl font-bold'>
              ORDER SUMMARY
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Items</div>
              <div className='basis-0 grow'>$</div>
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Shipping</div>
              <div className='basis-0 grow'>$ 0</div>
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Tax</div>
              <div className='basis-0 grow'>$ {orderDetails.taxPrice}</div>
            </div>
            <div className='flex border-b py-3 px-4'>
              <div className='basis-0 grow'>Total</div>
              <div className='basis-0 grow'>$ {orderDetails.totalPrice}</div>
            </div>
            <div className='flex border-b py-3 px-4'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirm

// import React from 'react'
// import { useSelector } from 'react-redux'

// const OrderConfirm = () => {
//   const order = useSelector((state) => state.order)
//   const { orderDetails } = order

//   return (
//     <div className='container mx-auto p-8'>
//       <h2 className='text-3xl font-bold mb-4 text-slate-400'>
//         Thank You for Your Purchase {orderDetails.nonRegUser.firstName}
//       </h2>
//       <div className='mb-4 text-slate-400 text-xl font-semibold'>
//         Order Confirmation #:{orderDetails._id}
//       </div>
//       <h2 className='text-2xl font-bold mb-4 text-slate-400'>Details</h2>
//       <div className='mb-4'>
//         <div className='text-slate-400 text-xl font-semibold'>
//           <div>
//             First Name:{' '}
//             <span className='text-slate-400 text-base font-normal'>
//               {orderDetails.nonRegUser.firstName}
//             </span>
//           </div>
//         </div>
//         <div className='text-slate-400 text-xl font-semibold'>
//           Last Name:{' '}
//           <span className='text-slate-400 text-base font-normal'>
//             {orderDetails.nonRegUser.lastName}
//           </span>
//         </div>
//         <div className='text-slate-400 text-xl font-semibold'>
//           Address:{' '}
//           <span className='text-slate-400 text-base font-normal'>
//             {orderDetails.shippingAddress.address}
//           </span>
//         </div>
//         <div className='text-slate-400 text-xl font-semibold'>
//           City:{' '}
//           <span className='text-slate-400 text-base font-normal'>
//             {orderDetails.shippingAddress.city}
//           </span>
//         </div>
//         <div className='text-slate-400 text-xl font-semibold'>
//           Postal Code:{' '}
//           <span className='text-slate-400 text-base font-normal'>
//             {orderDetails.shippingAddress.postalCode}
//           </span>
//         </div>
//       </div>
//       <h2 className='text-2xl font-bold mb-4 text-slate-400'>Items</h2>
//       <div>
//         {orderDetails.orderItems.map((items) => (
//           <div key={items.id} className='flex items-center mb-4'>
//             <div className='mr-4'>{items.name}</div>
//             <div className='mr-4 w-full '>{items.price}</div>
//             <div>
//               <img className='h-40 w-40' src={items.image} alt={items.name} />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className='mt-4 text-2xl font-bold text-slate-400'>
//         Total: ${orderDetails.totalPrice}
//       </div>
//     </div>
//   )
// }

// export default OrderConfirm
