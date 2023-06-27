import React from 'react';
import PropTypes from 'prop-types';

const LiveIcon = ({ iconClass, iconColor }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={iconColor || '#374151'}
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path d="M15 4.5H1.5V3H15C15.825 3 16.5 3.675 16.5 4.5V12.75H18V15H7.5V12.75H15V4.5ZM0.75 6H5.25C5.6625 6 6 6.3375 6 6.75V14.25C6 14.6625 5.6625 15 5.25 15H0.75C0.3375 15 0 14.6625 0 14.25V6.75C0 6.3375 0.3375 6 0.75 6ZM1.5 12.75H4.5V7.5H1.5V12.75Z" />
  </svg>
);

LiveIcon.propTypes = {
  iconClass: PropTypes.string,
  iconColor: PropTypes.string
};
LiveIcon.defaultProps = {
  iconClass: '',
  iconColor: ''
};

export default LiveIcon;
