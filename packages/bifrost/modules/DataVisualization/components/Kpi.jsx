import React from 'react';
import PropTypes from 'prop-types';
import { InformationCircleIcon, ArrowUpIcon, ArrowDownIcon } from '../../Icon';
import classNames from 'classnames';

const Kpi = ({ title, changeType, difference, percentage, description, direction }) => {
  return (
    <div>
      <p className="text-base leading-6 font-normal text-gray-900">{title}</p>

      <div className={classNames('flex', direction === 'vertical' ? 'flex-col gap-1 items-start' : 'items-center')}>
        <p className="mr-2.5 text-3xl leading-9 font-semibold text-gray-900">{percentage}%</p>

        {description.length > 0 && (
          <>
            <div
              className={classNames('flex items-center', {
                'flex-row-reverse': direction === 'vertical'
              })}
            >
              <p
                className={classNames('text-sm leading-5 font-medium text-gray-500', {
                  'ml-1.5': direction === 'vertical',
                  'mr-1.5': direction === 'horizontal'
                })}
              >
                {description}
              </p>
              <InformationCircleIcon className="cursor-pointer h-4 w-4 flex-shrink-0" aria-hidden="true" />
            </div>

            <div
              className={classNames(
                changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                direction === 'vertical' ? 'mt-2.5' : 'ml-2.5',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium'
              )}
            >
              {changeType === 'increase' ? (
                <ArrowUpIcon
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ArrowDownIcon
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only"> {changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
              {difference}%
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Kpi.propTypes = {
  title: PropTypes.string,
  changeType: PropTypes.string,
  difference: PropTypes.string,
  description: PropTypes.string,
  percentage: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical'])
};

Kpi.defaultProps = {
  title: '',
  difference: '',
  changeType: '',
  description: '',
  percentage: '',
  direction: 'horizontal'
};

export default Kpi;
