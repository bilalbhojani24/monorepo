import React from 'react';
import { twClassNames } from '@browserstack/utils';

// import PropTypes from 'prop-types';
import SnPTestsFilter from './TestsFilter';

const ErrorsHeader = () => (
  <div className={twClassNames('mb-4 px-6 pt-7')}>
    <SnPTestsFilter />
  </div>
);

ErrorsHeader.propTypes = {};

export default ErrorsHeader;
