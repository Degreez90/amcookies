import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Details from './pages/Details';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Section from './components/Section';
import Home from './pages/Home';
import products from './products';
import Layout from './layout/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home products={products} />} />
      <Route path='details/:id' element={<Details products={products} />} />
    </Route>
  )
);

function App() {
  return (
    // <div className='bg-white text-white relative min-h-screen flex flex-col'>
    //   <Router>
    //     <Hero />
    //     <div className='container mx-auto'>
    //       <Routes>
    //         <Route index element={<Home products={products} />} />
    //         <Route path='/details/:id' element={<Details products={products} />} />
    //       </Routes>
    //     </div>
    //     <Footer />
    //   </Router>
    // </div>
    <RouterProvider router={router} />
  );
}

export default App;
