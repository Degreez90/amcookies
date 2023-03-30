import Hero from './components/Hero';
import Section from './components/Section';
import Home from './pages/Home';

function App() {
  return (
    <div className='bg-white text-white'>
      <Hero />
      <div className='container mx-auto'>
        <Home />
      </div>
    </div>
  );
}

export default App;
