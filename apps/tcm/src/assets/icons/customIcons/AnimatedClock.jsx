import React from 'react';
import { useSelector } from 'react-redux';

const AnimatedClock = () => {
  const isHoverActive = useSelector(
    (state) => state.importProgress.hoverActive
  );

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-brand-900 mr-4"
    >
      <path
        d="M18 7V0L15.36 2.64C13.74 1.01 11.49 0 9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9H16C16 12.86 12.86 16 9 16C5.14 16 2 12.86 2 9C2 5.14 5.14 2 9 2C10.93 2 12.68 2.79 13.95 4.05L11 7H18Z"
        fill={isHoverActive ? '#666666' : '#9ca3af'}
        className="origin-center animate-spin"
      />
      <path
        d="M0 0V5L4.25 7.52L5.02 6.24L1.5 4.15V0H0Z"
        fill={isHoverActive ? '#666666' : '#9ca3af'}
        style={{
          fillOpacity: 1,
          fillRule: 'evenodd',
          stroke: 'none'
        }}
        transform="translate(8,5)"
      />
    </svg>
  );
};

export default AnimatedClock;
// #4b5563
