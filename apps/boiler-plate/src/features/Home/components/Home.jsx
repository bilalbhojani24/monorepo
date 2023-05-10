import React from 'react';
import { Link } from 'react-router-dom';
import { Hyperlink } from '@browserstack/bifrost';

const Home = () => (
  <div className="bg-brand-500 flex min-h-screen items-center justify-center p-5 text-3xl text-white">
    Home Page
    <p>
      <Hyperlink
        href="/counter/dummy"
        isCSR
        wrapperClassName="text-danger-900"
        target="_bilal"
      >
        Counter
      </Hyperlink>
    </p>
    <p>
      <Link to="/counter/new">Counter new</Link>
    </p>
  </div>
);

export default Home;
