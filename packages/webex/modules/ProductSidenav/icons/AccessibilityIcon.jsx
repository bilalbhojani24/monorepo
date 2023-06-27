import React from 'react';
import PropTypes from 'prop-types';

const AccesssibilityIcon = ({ iconClass, iconColor }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={iconColor || '#374151'}
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path d="M15.375 4.5C13.4175 5.025 11.1225 5.25 9 5.25C6.8775 5.25 4.5825 5.025 2.625 4.5L2.25 6C3.645 6.375 5.25 6.6225 6.75 6.75V16.5H8.25V12H9.75V16.5H11.25V6.75C12.75 6.6225 14.355 6.375 15.75 6L15.375 4.5ZM9 4.5C9.825 4.5 10.5 3.825 10.5 3C10.5 2.175 9.825 1.5 9 1.5C8.175 1.5 7.5 2.175 7.5 3C7.5 3.825 8.175 4.5 9 4.5Z" />
  </svg>
);

AccesssibilityIcon.propTypes = {
  iconClass: PropTypes.string,
  iconColor: PropTypes.string
};
AccesssibilityIcon.defaultProps = {
  iconClass: '',
  iconColor: ''
};

export default AccesssibilityIcon;
