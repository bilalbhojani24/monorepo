/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../../utils';

import TriangleIcon from './TriangleIcon';

const MetricStat = ({
  wrapperClassName,
  metricTitle,
  metricText,
  MetricIcon,
  criteriaForBreach,
  triangleDirection
}) => (
  <div className={twClassNames('flex flex-1 flex-col', wrapperClassName)}>
    <div className="flex items-center">
      <div className="text-base-500 mr-2 text-sm font-medium leading-5">
        {metricTitle}
      </div>

      {MetricIcon}
    </div>

    <div className="flex items-center">
      {criteriaForBreach && (
        <div className="text-danger-600 mr-2 text-xl">
          <TriangleIcon />
        </div>
      )}

      <div
        className={twClassNames('text-3xl  font-semibold leading-9', {
          'text-danger-900': criteriaForBreach
        })}
      >
        {metricText}
      </div>
    </div>
  </div>
);

MetricStat.propTypes = {
  wrapperClassName: PropTypes.string,
  metricTitle: PropTypes.string,
  metricText: PropTypes.string,
  MetricIcon: PropTypes.node,
  criteriaForBreach: PropTypes.bool,
  triangleDirection: PropTypes.string
};

MetricStat.defaultProps = {
  wrapperClassName: '',
  metricTitle: '',
  metricText: '',
  MetricIcon: '',
  criteriaForBreach: false,
  triangleDirection: ''
};

export default MetricStat;
