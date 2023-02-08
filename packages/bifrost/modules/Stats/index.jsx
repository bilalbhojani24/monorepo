import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import PropTypes, { oneOf } from 'prop-types';

import { STATS_SPACING, STATS_VARIANTS } from './const/statsConstants';

import './styles.scss';

const Stats = (props) => {
  const { heading, options, variant, spacing, textColor } = props;

  return (
    <div>
      {heading?.length > 0 && (
        <h3 className="text-base-900 mb-5 text-lg font-medium leading-6">
          {heading}
        </h3>
      )}
      <dl
        className={twClassNames(' grid grid-cols-1', {
          'gap-5 sm:grid-cols-2 lg:grid-cols-3': spacing === STATS_SPACING[0],
          'md:divide-x': spacing === STATS_SPACING[1] && options?.length < 4,
          'divide-base-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3':
            spacing === STATS_SPACING[1]
        })}
      >
        {options.map((item, index) => (
          <div
            key={item.id}
            className={twClassNames(
              {
                'py-5 sm:py-6':
                  variant === STATS_VARIANTS.WITHOUT_ICON ||
                  variant === STATS_VARIANTS.SIMPLE,
                'py-10 sm:py-10': variant === STATS_VARIANTS.WITH_ICON,
                'shadow rounded-lg': spacing === STATS_SPACING[0],
                'border-b':
                  spacing === STATS_SPACING[1] &&
                  index < options?.length - (options?.length % 3),
                'md:border-r border-base-200':
                  spacing === STATS_SPACING[1] &&
                  (index + 1) % 3 !== 0 &&
                  options?.length > 3
              },
              'relative overflow-hidden bg-white px-4 sm:px-6'
            )}
          >
            <dt>
              {variant === STATS_VARIANTS.WITH_ICON && (
                <div className="bg-brand-500 absolute rounded-md p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
              )}
              <p
                className={twClassNames({
                  'truncate ml-16 font-medium text-sm text-base-500':
                    variant === STATS_VARIANTS.WITH_ICON,
                  'font-normal text-base text-base-900':
                    variant === STATS_VARIANTS.WITHOUT_ICON,
                  'truncate text-sm font-medium text-base-500':
                    variant === STATS_VARIANTS.SIMPLE
                })}
              >
                {item.name}
              </p>
            </dt>
            {variant === STATS_VARIANTS.WITH_ICON && (
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className={`text-2xl font-semibold ${textColor}`}>
                  {item.stat}
                </p>
                <p
                  className={twClassNames(
                    item.changeType === 'increase'
                      ? 'text-success-600'
                      : 'text-danger-600',
                    'ml-2 flex items-baseline text-sm font-semibold'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                      className="text-success-500 h-5 w-5 shrink-0 self-center"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="text-danger-500 h-5 w-5 shrink-0 self-center"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {' '}
                    {item.changeType === 'increase'
                      ? 'Increased'
                      : 'Decreased'}{' '}
                    by{' '}
                  </span>
                  {item.change}
                </p>
                <div className="bg-base-50 absolute inset-x-0 bottom-0 p-4 sm:px-6">
                  <div className="text-sm">
                    <a
                      href={item.link}
                      className="text-brand-600 hover:text-brand-500 font-medium"
                    >
                      View all
                      <span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            )}
            {variant === STATS_VARIANTS.WITHOUT_ICON && (
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="text-brand-600 flex items-baseline text-2xl font-semibold">
                  {item.stat}
                  <span className="text-base-500 ml-2 text-sm font-medium">
                    from {item.previousStat}
                  </span>
                </div>

                <div
                  className={twClassNames(
                    item.changeType === 'increase'
                      ? 'bg-success-100 text-success-800'
                      : 'bg-danger-100 text-danger-800',
                    'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {item.changeType === 'increase' ? (
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
                    {item.changeType === 'increase'
                      ? 'Increased'
                      : 'Decreased'}{' '}
                    by{' '}
                  </span>
                  {item.change}
                </div>
              </dd>
            )}
            {variant === STATS_VARIANTS.SIMPLE && (
              <dd className="text-base-900 mt-1 text-3xl font-semibold tracking-tight">
                {item.stat}
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
  variant: PropTypes.string,
  spacing: PropTypes.string,
  textColor: PropTypes.string
};
Stats.defaultProps = {
  heading: '',
  variant: STATS_VARIANTS.SIMPLE,
  spacing: STATS_SPACING[0],
  textColor: 'text-base-900'
};

export default Stats;
