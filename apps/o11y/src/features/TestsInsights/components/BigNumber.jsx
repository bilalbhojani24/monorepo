import React from 'react';
// import {
//   MdArrowDownward,
//   MdArrowUpward,
//   MdTipsAndUpdates
// } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';

export default function BigNumber({ data, onClick, config }) {
  // Note: Commented code as there is no clarity on icons
  // const renderIcon = (type) => {
  //   switch (type.toLowerCase()) {
  //     case 'positive':
  //       return <MdArrowUpward fontSize="inherit" />;
  //     case 'negative':
  //       return <MdArrowDownward fontSize="inherit" />;
  //     case 'default':
  //       return <MdTipsAndUpdates fontSize="inherit" />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="flex flex-col" role="presentation" onClick={onClick}>
      <div className="flex justify-start">
        {!!data.heading && (
          <p className="text-base-500 mb-1 text-sm font-medium">
            {data.heading}
          </p>
        )}
      </div>
      <div
        className={twClassNames('flex items-center justify-start', {
          'hover:text-brand-600 cursor-pointer pointer-events-auto':
            !config.noHover
        })}
      >
        {!!data.title && (
          <p className="text-base-600 hover:text-brand-600 mb-1 text-base">
            {data.title}
          </p>
        )}
        <p
          className={twClassNames('mr-2.5 text-3xl font-semibold', {
            'hover:text-brand-600': !config.noHover
          })}
        >
          {data?.count !== undefined && abbrNumber(data.count)}
          {(data.inPercentage || config.inPercentage) && (
            <span className="text-3xl">%</span>
          )}
        </p>
        <div
          className={twClassNames('text-base-500 my-1 flex items-center', {
            'hover:text-brand-600': !config.noHover,
            'w-[calc(100%-50px)]': !config.noHover
          })}
        >
          {!isEmpty(data.insights) && (
            <p className="flex items-center">
              {/* <span>{renderIcon(data.insights.type)}</span> */}
              <span className="mr-1">{data.insights.text}</span>
            </p>
          )}
          <p
            className={twClassNames(
              'text-base-500 text-sm font-medium truncate',
              {
                'hover:text-brand-600': !config.noHover
              }
            )}
          >
            {data.meta}
          </p>
        </div>
      </div>
    </div>
  );
}
BigNumber.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func,
  config: PropTypes.objectOf(PropTypes.any)
};
BigNumber.defaultProps = {
  onClick: () => {},
  config: {}
};
