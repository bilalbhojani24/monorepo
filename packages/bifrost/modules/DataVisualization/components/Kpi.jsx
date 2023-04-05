import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ArrowDownIcon, ArrowUpIcon } from '../../Icon';
import { DATA_VISUALIZATION_STATS_DIRECTION } from '../const/dataVisualizationConstants';

const Kpi = ({
  title,
  changeType,
  difference,
  percentage,
  description,
  direction,
  leadingIcon,
  trailingIconNode
}) => (
  <div>
    <p className="text-base-900 break-all text-base font-normal leading-6">
      {title}
    </p>

    <div
      className={twClassNames(
        'flex',
        direction === DATA_VISUALIZATION_STATS_DIRECTION[0]
          ? 'flex-col items-start gap-1'
          : 'items-center'
      )}
    >
      <div className="flex items-center">
        {leadingIcon}
        <p className="text-base-900 mr-2.5 flex break-all text-3xl font-semibold leading-9">
          {percentage}%
        </p>
      </div>

      {description.length > 0 && (
        <>
          <div
            className={twClassNames('flex items-center', {
              'flex-row-reverse':
                direction === DATA_VISUALIZATION_STATS_DIRECTION[0]
            })}
          >
            <p
              className={twClassNames(
                'text-sm font-medium leading-5 text-base-500',
                {
                  'ml-1.5': direction === DATA_VISUALIZATION_STATS_DIRECTION[0],
                  'mr-1.5': direction === DATA_VISUALIZATION_STATS_DIRECTION[1]
                }
              )}
            >
              {description}
            </p>
            {trailingIconNode}
          </div>

          <div
            className={twClassNames(
              changeType === 'increase'
                ? 'bg-success-100 text-success-800'
                : 'bg-danger-100 text-danger-800',
              direction === DATA_VISUALIZATION_STATS_DIRECTION[0]
                ? 'mt-2.5'
                : 'ml-2.5',
              'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium break-all'
            )}
          >
            {changeType === 'increase' ? (
              <ArrowUpIcon
                className="text-success-500 -ml-1 mr-0.5 h-5 w-5 shrink-0 self-center"
                aria-hidden="true"
              />
            ) : (
              <ArrowDownIcon
                className="text-danger-500 -ml-1 mr-0.5 h-5 w-5 shrink-0 self-center"
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
  direction: PropTypes.oneOf([
    DATA_VISUALIZATION_STATS_DIRECTION[1],
    DATA_VISUALIZATION_STATS_DIRECTION[0]
  ]),
  leadingIcon: PropTypes.node,
  trailingIconNode: PropTypes.node
};

Kpi.defaultProps = {
  title: '',
  difference: '',
  changeType: '',
  description: '',
  percentage: '',
  direction: DATA_VISUALIZATION_STATS_DIRECTION[1],
  leadingIcon: null,
  trailingIconNode: null
};

export default Kpi;
