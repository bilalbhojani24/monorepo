import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ label, required }) => (
  <p className="text-base-700 mb-1 text-sm font-medium">
    {label}
    {required ? <span className="text-danger-500">*</span> : null}
  </p>
);

Label.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired
};

export default Label;
