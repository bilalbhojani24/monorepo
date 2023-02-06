import React from 'react';
import LoaderImage from 'assets/blue-spinner.svg';

export default function Loader() {
  return (
    <div className="flex h-full items-center justify-center">
      <img src={LoaderImage} alt="loading" />
    </div>
  );
}
