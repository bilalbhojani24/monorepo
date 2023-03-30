import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yButton } from 'common/bifrostProxy';
import { SNP_DATE_RANGE } from 'constants/common';
import PropTypes from 'prop-types';

const DateRangeFilter = ({ activeKey, onDateRangeChange }) => (
  <div className="flex items-center">
    <O11yButton
      colors="white"
      wrapperClassName={twClassNames(
        `border border-base-300 rounded-none rounded-l-md border-r-0 
                focus:ring-offset-0 focus:border-r peer/days7 focus:z-10 focus:ring-1 
                ring-brand-500 text-sm font-medium text-base-700`,
        {
          'border-brand-500 ring-1 z-10 border-r':
            activeKey === SNP_DATE_RANGE.days7.key
        }
      )}
      onClick={() => onDateRangeChange(SNP_DATE_RANGE.days7.key)}
    >
      {SNP_DATE_RANGE.days7.label}
    </O11yButton>
    <O11yButton
      colors="white"
      wrapperClassName={twClassNames(
        `peer/days15 peer-focus/days7:border-l-0 focus:z-10 focus:ring-1 
                ring-brand-500 border border-base-300 rounded-none focus:ring-offset-0 
                focus:border-r border-r-0 text-sm font-medium text-base-700`,
        {
          'border-brand-500 ring-1 z-10 border-r':
            activeKey === SNP_DATE_RANGE.days15.key,
          'border-l-0': activeKey === SNP_DATE_RANGE.days7.key
        }
      )}
      onClick={() => onDateRangeChange(SNP_DATE_RANGE.days15.key)}
    >
      {SNP_DATE_RANGE.days15.label}
    </O11yButton>
    <O11yButton
      colors="white"
      wrapperClassName={twClassNames(
        `peer-focus/days15:border-l-0 focus:z-10 focus:ring-1 ring-brand-500 
                border border-base-300 rounded-none first:rounded-l-md last:rounded-r-md focus:ring-offset-0 
                text-sm font-medium text-base-700`,
        {
          'border-brand-500 ring-1 z-10':
            activeKey === SNP_DATE_RANGE.days30.key,
          'border-l-0': activeKey === SNP_DATE_RANGE.days15.key
        }
      )}
      onClick={() => onDateRangeChange(SNP_DATE_RANGE.days30.key)}
    >
      {SNP_DATE_RANGE.days30.label}
    </O11yButton>
  </div>
);

DateRangeFilter.propTypes = {
  activeKey: PropTypes.string.isRequired,
  onDateRangeChange: PropTypes.func.isRequired
};

export default DateRangeFilter;
