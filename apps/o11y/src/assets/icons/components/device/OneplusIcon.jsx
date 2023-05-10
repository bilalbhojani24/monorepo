/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const OneplusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M-3-3h18v18H-3z" />
      <path
        fill="#EA0029"
        fillRule="nonzero"
        d="M3.64 9.403V8.361h1.042V5.233H3.639V4.17h2.086v4.171h1.062v1.043H3.639v.02zM10.425 12V5.213H9.384v5.744H1.043v-8.34h5.744V1.573H0V12h10.426zm0-7.83V2.597H12V1.574h-1.574V0H9.384v1.574H7.81v1.042h1.574V4.19h1.042v-.02z"
      />
    </g>
  </svg>
);

export default OneplusIcon;
