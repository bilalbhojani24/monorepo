import React from 'react';

import AverageDurationMetric from '../components/AverageDurationMetric';
import AverageFailureRatesMetric from '../components/AverageFailureRatesMetric';
import TotalFailuresMetric from '../components/TotalFailuresMetric';

const TestsMetrics = () => (
  <div className="flex items-center gap-5 px-6 pb-4">
    <TotalFailuresMetric />
    <AverageDurationMetric />
    <AverageFailureRatesMetric />
  </div>
);

TestsMetrics.propTypes = {};

export default TestsMetrics;
