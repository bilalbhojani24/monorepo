import React from 'react';
import dependencyLoader from 'assets/tripleDots.gif';

const AuthWallLoader = () => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <img src={dependencyLoader} alt="loading..." className="mb-1 w-24" />
  </div>
);

export default AuthWallLoader;
