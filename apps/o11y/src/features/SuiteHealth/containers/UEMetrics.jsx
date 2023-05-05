import React from 'react';

import TotalImpactedExecutionsMetric from '../components/TotalImpactedExecutionsMetric';
import TotalUniqueErrorMetric from '../components/TotalUniqueErrorMetric';
import UniqueImpactedTestsMetric from '../components/UniqueImpactedTestsMetric';

const UEMetrics = () => (
  <div className="flex items-center gap-5 px-6 pb-4">
    <TotalUniqueErrorMetric />
    <UniqueImpactedTestsMetric />
    <TotalImpactedExecutionsMetric />
  </div>
);

UEMetrics.propTypes = {};

export default UEMetrics;
