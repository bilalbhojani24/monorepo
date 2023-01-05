import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import PropTypes, { oneOf } from 'prop-types';
import classNames from 'classnames';
import './styles.scss';
import { STATS_SPACING } from './const/statsConstants';

const Stats = (props) => {
  const { heading, options, badge, spacing, textColor } = props;

  return (
    <div>
      {heading?.length > 0 && <h3 className="text-lg font-medium leading-6 text-base-900 mb-5">{heading}</h3>}
      <dl
        className={classNames(' grid grid-cols-1', {
          'gap-5 sm:grid-cols-2 lg:grid-cols-3': spacing === STATS_SPACING[0],
          'md:divide-x': spacing === STATS_SPACING[1] && options?.length < 4,
          'divide-base-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3': spacing === STATS_SPACING[1]
        })}
      >
        {options.map((item, index) => (
          <div
            key={item.id}
            className={classNames(
              {
                'py-5 sm:py-6': !badge,
                'py-10 sm:py-10': badge,
                'shadow rounded-lg': spacing === STATS_SPACING[0],
                'border-b': spacing == STATS_SPACING[1] && index < options?.length - (options?.length % 3),
                'md:border-r border-base-200':
                  spacing == STATS_SPACING[1] && (index + 1) % 3 !== 0 && options?.length > 3
              },
              'relative overflow-hidden bg-white px-4 sm:px-6'
            )}
          >
            <dt>
              {badge && (
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              )}
              <p
                className={classNames({
                  'truncate ml-16 font-medium text-sm text-base-500': badge,
                  'font-normal text-base text-base-900': !badge
                })}
              >
                {item.name}
              </p>
            </dt>
            {badge ? (
              <dd className={'ml-16 flex items-baseline pb-6 sm:pb-7'}>
                <p className={`text-2xl font-semibold ${textColor}`}>{item.stat}</p>
                <p
                  className={classNames(
                    item.changeType === 'increase' ? 'text-success-600' : 'text-danger-600',
                    'ml-2 flex items-baseline text-sm font-semibold'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-success-500" aria-hidden="true" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-danger-500" aria-hidden="true" />
                  )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-base-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href={item.link} className="font-medium text-indigo-600 hover:text-indigo-500">
                      View all<span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            ) : (
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {item.stat}
                  <span className="ml-2 text-sm font-medium text-base-500">from {item.previousStat}</span>
                </div>

                <div
                  className={classNames(
                    item.changeType === 'increase'
                      ? 'bg-success-100 text-success-800'
                      : 'bg-danger-100 text-danger-800',
                    'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-success-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-danger-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </div>
              </dd>
            )}
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
      previousStat: PropTypes.string,
      link: PropTypes.string,
      changeType: oneOf(['increase', 'decrease'])
    })
  ).isRequired,
  badge: PropTypes.bool,
  spacing: PropTypes.string,
  textColor: PropTypes.string
};
Stats.defaultProps = {
  heading: '',
  options: [],
  badge: false,
  spacing: STATS_SPACING[0],
  textColor: 'text-base-900'
};

export default Stats;
