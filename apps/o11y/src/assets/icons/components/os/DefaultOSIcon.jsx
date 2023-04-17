/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const DefaultOSIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="#6b7280"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.5 1.66666H2.50001C1.58334 1.66666 0.833344 2.41666 0.833344 3.33333V13.3333C0.833344 14.25 1.58334 15 2.50001 15H8.33334L6.66668 17.5V18.3333H13.3333V17.5L11.6667 15H17.5C18.4167 15 19.1667 14.25 19.1667 13.3333V3.33333C19.1667 2.41666 18.4167 1.66666 17.5 1.66666ZM17.5 11.6667H2.50001V3.33333H17.5V11.6667Z"
      fill="#6b7280"
    />
  </svg>
);

export default DefaultOSIcon;
