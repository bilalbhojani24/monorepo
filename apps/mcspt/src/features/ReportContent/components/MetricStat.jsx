import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../../utils';

const MetricStat = ({
  wrapperClassName,
  metricTitle,
  metricText,
  MetricIcon
  // isCriteriaBreached,
  // triangleDirection
}) => (
  <div className={twClassNames('flex flex-1 flex-col', wrapperClassName)}>
    <div className="flex items-center">
      <div className="text-base-500 mr-2 text-sm font-medium leading-5">
        {metricTitle}
      </div>

      {MetricIcon}
    </div>

    <div className="text-3xl font-semibold leading-9">{metricText}</div>
  </div>
);

MetricStat.propTypes = {
  wrapperClassName: PropTypes.string,
  metricTitle: PropTypes.string,
  metricText: PropTypes.string,
  MetricIcon: PropTypes.node
  // isCriteriaBreached: PropTypes.bool,
  // triangleDirection: PropTypes.string
};

MetricStat.defaultProps = {
  wrapperClassName: '',
  metricTitle: '',
  metricText: '',
  MetricIcon: ''
  // isCriteriaBreached: false,
  // triangleDirection: ''
};

export default MetricStat;
