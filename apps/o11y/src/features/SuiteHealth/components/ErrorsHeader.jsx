import React from 'react';
import { twClassNames } from '@browserstack/utils';

import SnPTestsFilter from '../containers/TestsFilter';

const ErrorsHeader = () => (
  <div className={twClassNames('mb-4 px-6 pt-7')}>
    <SnPTestsFilter />
  </div>
);

ErrorsHeader.propTypes = {};

export default ErrorsHeader;
