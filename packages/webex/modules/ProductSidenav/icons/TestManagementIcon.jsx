import React from 'react';
import PropTypes from 'prop-types';

const TestManagementIcon = ({ iconClass, iconColor }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={iconColor || '#374151'}
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path d="M12.8618 4.96511C13.1355 5.22669 13.1473 5.66 12.8882 5.93609L10.365 8.62499L8.77501 7.02374C8.48476 6.73142 8.48558 6.2594 8.77688 5.96811C9.06961 5.67536 9.54451 5.6762 9.83626 5.96999L10.365 6.50249L11.8981 4.97515C12.1634 4.71086 12.591 4.70641 12.8618 4.96511Z" />
    <path d="M12.9579 9.58291C13.2554 9.88036 13.25 10.3643 12.9461 10.6551L10.365 13.125L8.77501 11.5238C8.48476 11.2314 8.48558 10.7594 8.77688 10.4681C9.06961 10.1754 9.54451 10.1762 9.83626 10.47L10.365 11.0025L11.8447 9.52838C12.1377 9.23641 12.6119 9.23686 12.9044 9.52936L12.9579 9.58291Z" />
    <path d="M5.25 6H7.5V7.5H5.25V6Z" />
    <path d="M7.5 10.5H5.25V12H7.5V10.5Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H15C15.4142 2.25 15.75 2.58579 15.75 3V15C15.75 15.4142 15.4142 15.75 15 15.75H3C2.58579 15.75 2.25 15.4142 2.25 15V3ZM3.75 14.25V3.75H14.25V14.25H3.75Z"
    />
  </svg>
);

TestManagementIcon.propTypes = {
  iconClass: PropTypes.string,
  iconColor: PropTypes.string
};
TestManagementIcon.defaultProps = {
  iconClass: '',
  iconColor: ''
};

export default TestManagementIcon;
