import React from 'react';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdTipsAndUpdates
} from '@browserstack/bifrost';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';

export default function BigNumber({ data, onClick, config }) {
  const renderIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'positive':
        return <MdArrowUpward fontSize="inherit" />;
      case 'negative':
        return <MdArrowDownward fontSize="inherit" />;
      case 'default':
        return <MdTipsAndUpdates fontSize="inherit" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="hover:text-brand-600 flex items-end gap-2"
      role="presentation"
      onClick={onClick}
    >
      {!!data.title && (
        <p className="text-base-600 mb-1 text-base">{data.title}</p>
      )}
      <p className="text-3xl font-semibold">
        {data?.count !== undefined && abbrNumber(data.count)}
        {(data.inPercentage || config.inPercentage) && (
          <span className="text-3xl">%</span>
        )}
      </p>
      <div className="mx-2 my-1">
        {!isEmpty(data.insights) && (
          <p className="flex items-center">
            <span>{renderIcon(data.insights.type)}</span>
            <span className="mr-1">{data.insights.text}</span>
          </p>
        )}
        <p className="text-sm font-normal">{data.meta}</p>
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
