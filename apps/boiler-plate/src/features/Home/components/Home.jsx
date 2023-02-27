import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="bg-brand-500 flex min-h-screen items-center justify-center p-5 text-3xl text-white">
    Home Page
    <p>
      <Link to="/counter/dummy">Counter</Link>
    </p>
    <p>
      <Link to="/counter/new">Counter new</Link>
    </p>
  </div>
);

export default Home;
