/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const WindowsPhoneIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M-4-4h18v18H-4z" />
      <path
        fill="#E81123"
        d="M0 1.364L4.003.83l.001 3.786-4 .022L0 1.364zm4 3.688l.004 3.79-4-.54-.001-3.275L4 5.052zM4.487.76L9.793 0v4.568l-5.307.041V.76zm5.308 4.328v4.548L4.485 8.9 4.478 5.08l5.316.008z"
      />
    </g>
  </svg>
);

export default WindowsPhoneIcon;
