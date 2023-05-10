import React from 'react';
import { twClassNames } from '@browserstack/utils';

import SnPTestsFilter from '../containers/TestsFilter';

const SnPTestsHeader = () => (
  <div className={twClassNames('mb-4 px-6 pt-5')}>
    <SnPTestsFilter />
  </div>
);

SnPTestsHeader.propTypes = {};

export default SnPTestsHeader;
