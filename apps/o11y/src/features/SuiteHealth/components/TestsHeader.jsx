import React from 'react';
import { twClassNames } from '@browserstack/utils';

// import PropTypes from 'prop-types';
import SnPTestsFilter from './TestsFilter';

const SnPTestsHeader = () => (
  <div className={twClassNames('')}>
    <SnPTestsFilter />
  </div>
);

SnPTestsHeader.propTypes = {};

export default SnPTestsHeader;
