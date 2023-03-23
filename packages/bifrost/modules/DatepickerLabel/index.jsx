import React from 'react';
import PropTypes from 'prop-types';

const DatepickerLabel = ({ children, wrapperClassName }) => (
  <div className={wrapperClassName}>
    <span className="text-base-800 text-sm">{children}</span>
  </div>
);

DatepickerLabel.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
DatepickerLabel.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default DatepickerLabel;
