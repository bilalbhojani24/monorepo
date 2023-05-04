import React from 'react';

// import AuthWallLoader from './AuthWallLoader';
import AuthWallLogin from './AuthWallLogin';
import useAuthWall from './useAuthWall';

const AuthWall = () => {
  useAuthWall();

  return <AuthWallLogin />;
};

export default AuthWall;
