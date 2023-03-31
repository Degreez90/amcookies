import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Section from '../components/Section';

const Home = ({ products }) => {
  return (
    <>
      <Section products={products} />
    </>
  );
};

export default Home;
