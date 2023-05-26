import React from 'react';
import { useSelector } from 'react-redux';

const Clock = () => {
  const isHoverActive = useSelector(
    (state) => state.importProgress.hoverActive
  );

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-3"
    >
      <path
        d="M11 8V13L15.25 15.52L16.02 14.24L12.5 12.15V8H11ZM21 10V3L18.36 5.64C16.74 4.01 14.49 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12H19C19 15.86 15.86 19 12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C13.93 5 15.68 5.79 16.95 7.05L14 10H21Z"
        fill={isHoverActive ? '#666666' : '#9ca3af'}
      />
    </svg>
  );
};

export default Clock;
