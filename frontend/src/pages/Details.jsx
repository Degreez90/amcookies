import React from 'react';
import Product from '../components/Product';
import { Routes, Route, useParams } from 'react-router-dom';
import products from '../products';

const Details = () => {
  const { id } = useParams();

  const product = products.find((p) => p._id == id);

  return (
    <>
      <Product product={product} />;
    </>
  );
};

export default Details;
