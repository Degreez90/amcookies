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
import products from './products'
import Cart from './pages/cart'
import Layout from './layout/layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home products={products} />} />
      <Route path='details/:id' element={<Details />} />
      <Route path='cart' element={<Cart />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
