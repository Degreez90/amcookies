import Hero from './components/Hero';
import Section from './components/Section';

function App() {
  return (
    <div className=' bg-white text-white'>
      <Hero />
      <div className='container mx-auto'>
        <Section />
      </div>
    </div>
  );
}

export default App;
