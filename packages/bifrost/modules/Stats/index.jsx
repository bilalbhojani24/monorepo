import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '../Icon';
import PropTypes, { oneOf } from 'prop-types';
import classNames from 'classnames';
import './styles.scss';
import { STATS_SPACING } from './const/statsConstants';

const Stats = (props) => {
  const { heading, options, brandIcon, spacing, textColor } = props;

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">{heading}</h3>
      <dl
        className={classNames('mt-5 grid grid-cols-1', {
          'gap-5 sm:grid-cols-2 lg:grid-cols-3': spacing === STATS_SPACING[0],
          'divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x':
            spacing === STATS_SPACING[1],
        })}
      >
        {options.map((item) => (
          <div
            key={item.id}
            className={classNames(
              {
                'pb-12 ': brandIcon,
                'rounded-lg': spacing === STATS_SPACING[0],
                'shadow': spacing == STATS_SPACING[0]
              },
              'relative overflow-hidden bg-white px-4 pt-5 sm:px-6 sm:pt-6'
            )}
          >
            <dt>
              {brandIcon && (
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              )}
              <p className={classNames({ 'ml-16': brandIcon }, 'truncate text-sm font-medium text-gray-500')}>
                {item.name}
              </p>
            </dt>
            <dd className={classNames({ 'ml-16': brandIcon }, 'flex items-baseline pb-6 sm:pb-7')}>
              <p className={`text-2xl font-semibold ${textColor}`}>{item.stat}</p>
              {brandIcon && (
                <p
                  className={classNames(
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                    'ml-2 flex items-baseline text-sm font-semibold'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                  )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </p>
              )} 
              {brandIcon && (
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="www.google.com" className="font-medium text-indigo-600 hover:text-indigo-500">
                      View all<span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

Stats.propTypes = {
  heading: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      stat: PropTypes.string,
      icon: PropTypes.node,
      change: PropTypes.string,
      changeType: oneOf(['increase', 'decrease']),
    })
  ).isRequired,
  brandIcon: PropTypes.bool,
  spacing: PropTypes.string,
  textColor: PropTypes.bool,
};
Stats.defaultProps = {
  heading: 'Last 30 days',
  options: [
    { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
    {
      id: 3,
      name: 'Avg. Click Rate',
      stat: '24.57%',
      icon: CursorArrowRaysIcon,
      change: '3.2%',
      changeType: 'decrease',
    },
    {
      id: 3,
      name: 'Avg. Click Rate',
      stat: '24.57%',
      icon: CursorArrowRaysIcon,
      change: '3.2%',
      changeType: 'decrease',
    },
    {
      id: 3,
      name: 'Avg. Click Rate',
      stat: '24.57%',
      icon: CursorArrowRaysIcon,
      change: '3.2%',
      changeType: 'decrease',
    },
  ],
  brandIcon: false,
  spacing: STATS_SPACING[0],
  badge: true,
  textColor: "text-gray-900"
};

export default Stats;
