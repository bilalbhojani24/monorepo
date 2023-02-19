import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import PropTypes, { oneOf } from 'prop-types';

import { STATS_INC, STATS_VARIANTS } from './const/statsConstants';

import './styles.scss';

const Stats = (props) => {
  const {
    cardWrapperClassname,
    heading,
    option,
    variant,
    textColor,
    wrapperClassName
  } = props;

  return (
    <div className={wrapperClassName}>
      {heading?.length > 0 && (
        <h3 className="text-base-900 mb-5 text-lg font-medium leading-6">
          {heading}
        </h3>
      )}
      <div
        key={option.id}
        className={twClassNames(
          {
            'py-5 sm:py-6':
              variant === STATS_VARIANTS.WITHOUT_ICON ||
              variant === STATS_VARIANTS.SIMPLE,
            'py-10 sm:py-10': variant === STATS_VARIANTS.WITH_ICON
          },
          'relative overflow-hidden bg-white px-4 sm:px-6 shadow rounded-lg',
          cardWrapperClassname
        )}
        role="button"
        onClick={(e) => option.onClick?.(e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') option.onClick?.(e);
        }}
        tabIndex={typeof option.onClick === 'function' ? 0 : -1}
      >
        <div>
          {variant === STATS_VARIANTS.WITH_ICON && (
            <div
              className={twClassNames(
                'bg-brand-500 absolute rounded-md p-3',
                option.iconContainerWrapperClass
              )}
            >
              {option.icon}
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
            {option.name}
          </p>
        </div>
        {variant === STATS_VARIANTS.WITH_ICON && (
          <div className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className={`text-2xl font-semibold ${textColor}`}>
              {option.stat}
            </p>
            <p
              className={twClassNames(
                option.changeType === STATS_INC
                  ? 'text-success-600'
                  : 'text-danger-600',
                'ml-2 flex items-baseline text-sm font-semibold'
              )}
            >
              {option.changeType === STATS_INC ? (
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
                {option.changeType === STATS_INC ? 'Increased' : 'Decreased'}
                by
              </span>
              {option.change}
            </p>
            <div className="bg-base-50 absolute inset-x-0 bottom-0 p-4 sm:px-6">
              <div className="text-sm">{option.link}</div>
            </div>
          </div>
        )}
        {variant === STATS_VARIANTS.WITHOUT_ICON && (
          <div className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="text-brand-600 flex items-baseline text-2xl font-semibold">
              {option.stat}
              <span className="text-base-500 ml-2 text-sm font-medium">
                from {option.previousStat}
              </span>
            </div>

            <div
              className={twClassNames(
                option.changeType === STATS_INC
                  ? 'bg-success-100 text-success-800'
                  : 'bg-danger-100 text-danger-800',
                'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
              )}
            >
              {option.changeType === STATS_INC ? (
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
                {option.changeType === STATS_INC ? 'Increased' : 'Decreased'}
                by
              </span>
              {option.change}
            </div>
          </div>
        )}
        {variant === STATS_VARIANTS.SIMPLE && (
          <div className="text-base-900 mt-1 text-3xl font-semibold tracking-tight">
            {option.stat}
          </div>
        )}
      </div>
    </div>
  );
};

Stats.propTypes = {
  cardWrapperClassname: PropTypes.string,
  heading: PropTypes.string,
  option: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    stat: PropTypes.string,
    icon: PropTypes.node,
    iconContainerWrapperClass: PropTypes.string,
    change: PropTypes.string,
    previousStat: PropTypes.string,
    link: PropTypes.node,
    changeType: oneOf([STATS_INC, 'decrease']),
    onClick: PropTypes.func
  }).isRequired,
  variant: PropTypes.string,
  textColor: PropTypes.string,
  wrapperClassName: PropTypes.string
};
Stats.defaultProps = {
  cardWrapperClassname: '',
  heading: '',
  variant: STATS_VARIANTS.SIMPLE,
  textColor: 'text-base-900',
  wrapperClassName: ''
};

export default Stats;
