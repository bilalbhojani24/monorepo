/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const OperaIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" {...props}>
    <defs>
      <linearGradient
        id="opera-a"
        x1="50.003%"
        x2="50.003%"
        y1="1.63%"
        y2="98.545%"
      >
        <stop offset="30%" stopColor="#FF1B2D" />
        <stop offset="43.81%" stopColor="#FA1A2C" />
        <stop offset="59.39%" stopColor="#ED1528" />
        <stop offset="75.81%" stopColor="#D60E21" />
        <stop offset="92.72%" stopColor="#B70519" />
        <stop offset="100%" stopColor="#A70014" />
      </linearGradient>
      <linearGradient
        id="opera-b"
        x1="49.99%"
        x2="49.99%"
        y1=".853%"
        y2="99.519%"
      >
        <stop offset="0%" stopColor="#9C0000" />
        <stop offset="70%" stopColor="#FF4B4B" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="url(#opera-a)"
        d="M6.04 14.07c-.999-1.175-1.638-2.911-1.68-4.86v-.42c.042-1.949.688-3.685 1.68-4.86 1.294-1.673 3.192-2.425 5.337-2.425 1.321 0 2.566.091 3.62.794A8.906 8.906 0 0 0 9.036 0H9a9 9 0 0 0-9 9 9.004 9.004 0 0 0 8.571 8.993C8.711 18 8.86 18 9 18a8.942 8.942 0 0 0 5.998-2.292c-1.055.703-2.23.731-3.551.731-2.138.007-4.12-.689-5.407-2.37z"
      />
      <path
        fill="url(#opera-b)"
        d="M6.04 3.93c.822-.977 1.891-1.56 3.058-1.56 2.623 0 4.747 2.967 4.747 6.637 0 3.67-2.124 6.638-4.747 6.638-1.167 0-2.228-.591-3.058-1.561 1.294 1.673 3.213 2.742 5.35 2.742a6.481 6.481 0 0 0 3.608-1.104A9.025 9.025 0 0 0 18 9a8.972 8.972 0 0 0-3.002-6.708 6.46 6.46 0 0 0-3.607-1.104c-2.145 0-4.064 1.062-5.351 2.742z"
      />
    </g>
  </svg>
);

export default OperaIcon;
