import React from 'react';
import PropTypes from 'prop-types';

const AppIcon = ({ iconClass, iconColor }) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill={iconColor || '#374151'}
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path d="M11.1667 0.666656H5.83334C4.72668 0.666656 3.83334 1.55999 3.83334 2.66666V13.3333C3.83334 14.44 4.72668 15.3333 5.83334 15.3333H11.1667C12.2733 15.3333 13.1667 14.44 13.1667 13.3333V2.66666C13.1667 1.55999 12.2733 0.666656 11.1667 0.666656ZM11.8333 12H5.16668V2.66666H11.8333V12ZM9.83334 14H7.16668V13.3333H9.83334V14Z" />
  </svg>
);

AppIcon.propTypes = {
  iconClass: PropTypes.string,
  iconColor: PropTypes.string
};
AppIcon.defaultProps = {
  iconClass: '',
  iconColor: ''
};

export default AppIcon;
