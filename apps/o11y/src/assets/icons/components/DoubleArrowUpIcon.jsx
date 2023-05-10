/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const DoubleArrowUpIcon = (props) => (
  <svg
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M6 17.59L7.41 19 12 14.42 16.59 19 18 17.59l-6-6z" />
    <path d="M6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z" />
  </svg>
);

export default DoubleArrowUpIcon;
