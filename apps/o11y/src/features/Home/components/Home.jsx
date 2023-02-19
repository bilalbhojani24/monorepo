import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="bg-brand-500 flex min-h-screen items-center justify-center p-5 text-3xl text-white">
    Home Page
    <Link to="/projects">View Counter</Link>
  </div>
);

export default Home;
