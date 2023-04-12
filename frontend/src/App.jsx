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
import Layout from './layout/layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home products={products} />} />
      <Route path='details/:id' element={<Details products={products} />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
