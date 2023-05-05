import React from 'react';

import AuthWallLoader from './AuthWallLoader';
import AuthWallLogin from './AuthWallLogin';
import useAuthWall from './useAuthWall';

const AuthWall = () => {
  const { isAuthWallChecked, authWallActivated } = useAuthWall();

  return (
    <>
      {!isAuthWallChecked && <AuthWallLoader />}

      {isAuthWallChecked && authWallActivated && <AuthWallLogin />}
    </>
  );
};

export default AuthWall;
