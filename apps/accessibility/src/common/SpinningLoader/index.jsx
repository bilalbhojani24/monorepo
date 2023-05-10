import React from 'react';
import animatedLoader from 'assets/spinning_loader.svg';

function SpinningLoader() {
  return (
    <img
      className="mx-1 h-5 w-5 animate-spin"
      src={animatedLoader}
      alt=" Initializing your scan"
    />
  );
}

export default SpinningLoader;
