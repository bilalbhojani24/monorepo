import React from 'react';
import PropTypes from 'prop-types';

const TriangleIcon = ({ wrapperClassName }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    strokeWidth="0"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={wrapperClassName}
  >
    <path
      fillRule="evenodd"
      d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
    />
  </svg>
);

TriangleIcon.propTypes = {
  wrapperClassName: PropTypes.string
};

TriangleIcon.defaultProps = {
  wrapperClassName: ''
};

export default TriangleIcon;
