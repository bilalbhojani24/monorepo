import React from 'react';

const Clock = () => (
  // <svg
  //   width="24"
  //   height="24"
  //   viewBox="0 0 24 24"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  //   className="mr-3"
  // >
  //   <path
  //     d="M11 8V13L15.25 15.52L16.02 14.24L12.5 12.15V8H11ZM21 10V3L18.36 5.64C16.74 4.01 14.49 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12H19C19 15.86 15.86 19 12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C13.93 5 15.68 5.79 16.95 7.05L14 10H21Z"
  //     fill="#9CA3AF"
  //     className="origin-center animate-spin"
  //   />
  // </svg>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 7V0L15.36 2.64C13.74 1.01 11.49 0 9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9H16C16 12.86 12.86 16 9 16C5.14 16 2 12.86 2 9C2 5.14 5.14 2 9 2C10.93 2 12.68 2.79 13.95 4.05L11 7H18Z"
      fill="#9CA3AF"
    />
    <path d="M0 0V5L4.25 7.52L5.02 6.24L1.5 4.15V0H0Z" fill="#9CA3AF" />
  </svg>
);

export default Clock;
