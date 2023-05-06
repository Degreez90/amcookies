import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import Details from './pages/Details'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Layout from './layout/Layout'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='details/:id' element={<Details />} />
      <Route path='cart' element={<Cart />} />
      <Route path='shipping' element={<Shipping />} />
      <Route path='payment' element={<Payment />} />
      <Route path='placeorder' element={<PlaceOrder />} />
    </Route>
  )
)

function App() {
  return (
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  )
}

export default App
