import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import convertSecondsToTimeFormat from '../utils/convertSecondsToTimeFormat';

const Marker = ({
  startTime,
  duration,
  onMarkerClick,
  onMarkerMouseEnter,
  onMarkerMouseLeave,
  type,
  wrapperClassName
}) => {
  const startTimeInMinutes = startTime
    ? convertSecondsToTimeFormat(startTime)
    : '00:00';

  const handleOnClick = () => {
    onMarkerClick(startTime, type);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleOnClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={-1}
      aria-label={`Exception at ${startTimeInMinutes}`}
      className={twClassNames(
        'block absolute min-w-[2px] h-full z-10',
        {
          'bg-attention-400': type === 'warning',
          'bg-danger-600': type === 'error'
        },
        wrapperClassName
      )}
      style={{
        left: `${(startTime / duration) * 100}%`,
        width: `${100 / duration}%`
      }}
      onClick={handleOnClick}
      data-markertype={type}
      onMouseEnter={onMarkerMouseEnter}
      onMouseLeave={onMarkerMouseLeave}
      onKeyDown={handleKeyDown}
    />
  );
};

Marker.propTypes = {
  startTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['warning', 'error']),
  wrapperClassName: PropTypes.string,
  onMarkerMouseEnter: PropTypes.func,
  onMarkerMouseLeave: PropTypes.func,
  onMarkerClick: PropTypes.func
};

Marker.defaultProps = {
  onMarkerClick: () => {},
  onMarkerMouseEnter: () => {},
  onMarkerMouseLeave: () => {},
  type: 'warning',
  wrapperClassName: ''
};

export default Marker;
