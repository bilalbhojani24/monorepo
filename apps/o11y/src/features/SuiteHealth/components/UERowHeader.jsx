import React from 'react';
import { twClassNames } from '@browserstack/utils';
import MiniChart from 'common/MiniChart';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_MAIN_HEADER } from '../constants';

const UERowHeader = ({ data }) => (
  <>
    <div className={twClassNames(UNIQUE_ERROR_MAIN_HEADER.testCount.bodyClass)}>
      <p className="text-base-500 text-sm leading-5">
        {data.impactedTests ? data.impactedTests : '-'}
      </p>
    </div>
    <div
      className={twClassNames(
        UNIQUE_ERROR_MAIN_HEADER.errorCount.bodyClass,
        'flex items-center gap-4'
      )}
    >
      <div className="h-5 w-12">
        <MiniChart
          data={data.chartData}
          chartType="area"
          color="var(--colors-danger-100)"
          lineColor="var(--colors-danger-400)"
        />
      </div>
      <p className="text-base-500 text-sm leading-5">
        {data.errorCount ? data.errorCount : '-'}
      </p>
    </div>
  </>
);

UERowHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default UERowHeader;
