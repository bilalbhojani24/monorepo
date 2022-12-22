import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '../Icon';
import PropTypes, { oneOf } from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const Stats = (props) => {
  const { heading, options, withBrandIcon } = props;

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">{heading}</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((item) => (
          <div
            key={item.id}
            className={classNames(
              { 'pb-12 ': withBrandIcon },
              'relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6'
            )}
          >
            <dt>
              {withBrandIcon && (
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              )}
              <p className={classNames({ 'ml-16': withBrandIcon }, 'truncate text-sm font-medium text-gray-500')}>
                {item.name}
              </p>
            </dt>
            <dd className={classNames({ 'ml-16': withBrandIcon }, 'flex items-baseline pb-6 sm:pb-7')}>
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              {withBrandIcon && (
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
              {withBrandIcon && (
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
      changeType: oneOf(['increase', 'decrease'])
    })
  ).isRequired,
  withBrandIcon: PropTypes.bool
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
      changeType: 'decrease'
    }
  ],
  withBrandIcon: false
};

export default Stats;
