import React from 'react';
import PropTypes from 'prop-types';
import { InformationCircleIcon, ArrowUpIcon, ArrowDownIcon } from '../../Icon';
import classNames from 'classnames';

const Stat = ({ title, changeType, difference, percentage, description }) => {
  return (
    <div>
      <p className="text-base leading-6 font-normal text-gray-900">{title}</p>

      <div className="flex items-center">
        <p className="mr-2.5 text-3xl leading-9 font-semibold text-gray-900">{percentage}%</p>

        <p className="mr-1.5 text-sm leading-5 font-medium text-gray-500">{description}</p>
        <InformationCircleIcon className="cursor-pointer h-4 w-4 flex-shrink-0" aria-hidden="true" />

        <div
          className={classNames(
            changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
            'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0 ml-2.5'
          )}
        >
          {changeType === 'increase' ? (
            <ArrowUpIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
          ) : (
            <ArrowDownIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
          )}
          <span className="sr-only"> {changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
          {difference}%
        </div>
      </div>
    </div>
  );
};

Stat.propTypes = {
  title: PropTypes.string,
  changeType: PropTypes.string,
  difference: PropTypes.string,
  description: PropTypes.string,
  percentage: PropTypes.string
};

Stat.defaultProps = {
  title: '',
  difference: '',
  changeType: '',
  description: '',
  percentage: ''
};

export default Stat;
