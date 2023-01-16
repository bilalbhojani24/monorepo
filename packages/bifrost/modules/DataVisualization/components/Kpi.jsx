import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ArrowDownIcon, ArrowUpIcon, InformationCircleIcon } from '../../Icon';

const Kpi = ({
  title,
  changeType,
  difference,
  percentage,
  description,
  direction,
}) => (
  <div>
    <p className="text-base-900 text-base font-normal leading-6">{title}</p>

    <div
      className={classNames(
        'flex',
        direction === 'vertical'
          ? 'flex-col items-start gap-1'
          : 'items-center',
      )}
    >
      <p className="text-base-900 mr-2.5 text-3xl font-semibold leading-9">
        {percentage}%
      </p>

      {description.length > 0 && (
        <>
          <div
            className={classNames('flex items-center', {
              'flex-row-reverse': direction === 'vertical',
            })}
          >
            <p
              className={classNames(
                'text-sm font-medium leading-5 text-base-500',
                {
                  'ml-1.5': direction === 'vertical',
                  'mr-1.5': direction === 'horizontal',
                },
              )}
            >
              {description}
            </p>
            <InformationCircleIcon
              className="h-4 w-4 shrink-0 cursor-pointer"
              aria-hidden="true"
            />
          </div>

          <div
            className={classNames(
              changeType === 'increase'
                ? 'bg-success-100 text-success-800'
                : 'bg-danger-100 text-danger-800',
              direction === 'vertical' ? 'mt-2.5' : 'ml-2.5',
              'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium',
            )}
          >
            {changeType === 'increase' ? (
              <ArrowUpIcon
                className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-success-500"
                aria-hidden="true"
              />
            ) : (
              <ArrowDownIcon
                className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-danger-500"
                aria-hidden="true"
              />
            )}
            <span className="sr-only">
              {' '}
              {changeType === 'increase' ? 'Increased' : 'Decreased'} by{' '}
            </span>
            {difference}%
          </div>
        </>
      )}
    </div>
  </div>
);

Kpi.propTypes = {
  title: PropTypes.string,
  changeType: PropTypes.string,
  difference: PropTypes.string,
  description: PropTypes.string,
  percentage: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
};

Kpi.defaultProps = {
  title: '',
  difference: '',
  changeType: '',
  description: '',
  percentage: '',
  direction: 'horizontal',
};

export default Kpi;
