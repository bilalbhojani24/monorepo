import React from 'react';
import PropTypes from 'prop-types';

const GridViewSolidIcon = ({ iconClass }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path
      d="M4.16667 9.16667H7.5C8.41667 9.16667 9.16667 8.41667 9.16667 7.5V4.16667C9.16667 3.25 8.41667 2.5 7.5 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V7.5C2.5 8.41667 3.25 9.16667 4.16667 9.16667Z"
      fill="#398FF4"
    />
    <path
      d="M4.16667 17.5H7.5C8.41667 17.5 9.16667 16.75 9.16667 15.8333V12.5C9.16667 11.5833 8.41667 10.8333 7.5 10.8333H4.16667C3.25 10.8333 2.5 11.5833 2.5 12.5V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5Z"
      fill="#398FF4"
    />
    <path
      d="M10.8333 4.16667V7.5C10.8333 8.41667 11.5833 9.16667 12.5 9.16667H15.8333C16.75 9.16667 17.5 8.41667 17.5 7.5V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5H12.5C11.5833 2.5 10.8333 3.25 10.8333 4.16667Z"
      fill="#398FF4"
    />
    <path
      d="M12.5 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V12.5C17.5 11.5833 16.75 10.8333 15.8333 10.8333H12.5C11.5833 10.8333 10.8333 11.5833 10.8333 12.5V15.8333C10.8333 16.75 11.5833 17.5 12.5 17.5Z"
      fill="#398FF4"
    />
  </svg>
);

GridViewSolidIcon.propTypes = {
  iconClass: PropTypes.string
};
GridViewSolidIcon.defaultProps = {
  iconClass: ''
};

export default GridViewSolidIcon;
