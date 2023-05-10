/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const OperaIcon = (props) => (
  <svg viewBox="0 0 23 22" width="16" height="16" {...props}>
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
        d="M7.409 17.13c-1.22-1.428-2.001-3.54-2.053-5.908v-.513c.052-2.368.842-4.48 2.053-5.907 1.58-2.034 3.898-2.95 6.516-2.95 1.615 0 3.134.112 4.422.967a10.901 10.901 0 00-7.28-2.796h-.044C4.953.023.033 4.922.033 10.966.033 16.83 4.67 21.626 10.5 21.9c.171.008.352.008.523.008a10.94 10.94 0 007.324-2.787c-1.288.855-2.722.89-4.336.89-2.61.008-5.031-.838-6.602-2.881z"
      />
      <path
        fill="url(#opera-b)"
        d="M7.405 4.738c1.006-1.187 2.313-1.897 3.74-1.897 3.208 0 5.806 3.607 5.806 8.067 0 4.461-2.598 8.067-5.805 8.067-1.428 0-2.726-.718-3.741-1.897 1.582 2.034 3.93 3.333 6.544 3.333a7.957 7.957 0 004.412-1.342c2.253-2.016 3.672-4.93 3.672-8.17 0-3.238-1.419-6.152-3.672-8.152a7.936 7.936 0 00-4.412-1.341c-2.623 0-4.97 1.29-6.544 3.332z"
      />
    </g>
  </svg>
);

export default OperaIcon;
