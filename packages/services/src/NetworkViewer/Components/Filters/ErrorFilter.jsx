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
      border={false}
      onChange={handleChange}
      data={{
        label: 'Errors only',
        value: 'errors-only'
      }}
      name="Errors only"
    />
  );
};

ErrorFilter.propTypes = {
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ErrorFilter;
