import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Details from './pages/Details'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Layout from './layout/Layout'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderConfirm from './pages/OrderConfirm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='details/:id' element={<Details />} />
      <Route path='cart' element={<Cart />} />
      <Route path='shipping' element={<Shipping />} />
      <Route path='payment' element={<Payment />} />
      <Route path='placeorder' element={<PlaceOrder />} />
      <Route path='orderconfirm' element={<OrderConfirm />} />
    </Route>
  )
)

function App() {
  // const [clientId, setClientId] = useState(null)

  // useEffect(() => {
  //   const addPayPalScript = async () => {
  //     const { data } = await axios.get('/api/config/paypal')
  //     setClientId(data)
  //   }
  //   addPayPalScript()
  // }, [])

  // const initialOptions = {
  //   'client-id': clientId,
  //   currency: 'USD',
  // }

  return (
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  )
}

export default App
