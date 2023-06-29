import React from 'react';
import PropTypes from 'prop-types';

const WebIcon = ({ iconClass, iconColor }) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path
      d="M14.5 8C14.5 11.3137 11.8137 14 8.5 14M14.5 8C14.5 4.68629 11.8137 2 8.5 2M14.5 8H2.5M8.5 14C5.18629 14 2.5 11.3137 2.5 8M8.5 14C9.60457 14 10.5 11.3137 10.5 8C10.5 4.68629 9.60457 2 8.5 2M8.5 14C7.39543 14 6.5 11.3137 6.5 8C6.5 4.68629 7.39543 2 8.5 2M2.5 8C2.5 4.68629 5.18629 2 8.5 2"
      stroke={iconColor || '#374151'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

WebIcon.propTypes = {
  iconClass: PropTypes.string,
  iconColor: PropTypes.string
};
WebIcon.defaultProps = {
  iconClass: '',
  iconColor: '#374151'
};

export default WebIcon;
