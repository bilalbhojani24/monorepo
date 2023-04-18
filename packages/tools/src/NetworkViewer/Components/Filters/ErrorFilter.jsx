import React from 'react';
import { Checkbox } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const ErrorFilter = ({ isError, onChange }) => {
  const handleChange = () => {
    onChange(!isError);
  };

  return (
    <Checkbox
      checked={isError}
      onChange={handleChange}
      labelText="Errors only"
      id="har-viewer-error-filter"
      ariaLabelText="Errors only"
      iconProps={{
        'aria-hidden': false,
        title: 'Error filter',
        role: 'img'
      }}
    />
  );
};

ErrorFilter.propTypes = {
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ErrorFilter;
