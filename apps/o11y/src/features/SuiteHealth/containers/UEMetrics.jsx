import React from 'react';

import TotalImpactedExecutionsMetric from '../components/TotalImpactedExecutionsMetric';
import TotalUniqueErrorMetric from '../components/TotalUniqueErrorMetric';
import UniqueImpactedTestsMetric from '../components/UniqueImpactedTestsMetric';

const UEMetrics = () => (
  <div className="px-6 pb-4">
    <TotalUniqueErrorMetric />
    <UniqueImpactedTestsMetric />
    <TotalImpactedExecutionsMetric />
  </div>
);

UEMetrics.propTypes = {};

export default UEMetrics;
