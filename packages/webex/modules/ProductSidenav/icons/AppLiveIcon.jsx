import React from 'react';
import PropTypes from 'prop-types';

const AppLiveIcon = ({ iconClass, iconColor }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={iconColor || '#374151'}
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 15H3C2.58578 15 2.25 14.6642 2.25 14.25V2.25C2.25 1.83579 2.58579 1.5 3 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V4.5H15C15.4142 4.5 15.75 4.83579 15.75 5.25V15.75C15.75 16.1642 15.4142 16.5 15 16.5H8.25C7.83577 16.5 7.5 16.1642 7.5 15.75V15ZM3.75 12.75V3.75H9V4.5H8.25C7.83577 4.5 7.5 4.83579 7.5 5.25V12.75H3.75ZM9 14.25V6.75H14.25V14.25H9Z"
    />
  </svg>
);

AppLiveIcon.propTypes = {
  iconClass: PropTypes.string,
  iconColor: PropTypes.string
};
AppLiveIcon.defaultProps = {
  iconClass: '',
  iconColor: ''
};

export default AppLiveIcon;
