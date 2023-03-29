import React from 'react';
import PropTypes from 'prop-types';

const TestLogFilters = ({ onSearchChange }) => {
  const a = 123;
  return (
    <>
      <div>search</div>
      <div className="flex items-center gap-3">
        <div>steps</div>
        <div>filters</div>
      </div>
    </>
  );
};

TestLogFilters.propTypes = {
  onSearchChange: PropTypes.func.isRequired
};

export default TestLogFilters;
