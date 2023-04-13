import React from 'react';

const Loader = () => (
  <svg
    className="animate-spin"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="60"
      cy="60"
      r="59"
      stroke="url(#paint0_linear_151_46167)"
      strokeWidth="2"
    />
    <defs>
      <linearGradient
        id="paint0_linear_151_46167"
        x1="0"
        y1="0"
        x2="104.268"
        y2="102.073"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default Loader;
