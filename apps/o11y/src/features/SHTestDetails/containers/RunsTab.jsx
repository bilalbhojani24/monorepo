import React from 'react';

import CombinationsMenu from '../components/CombinationsMenu';

import TestBuilds from './TestBuilds';
import TestStats from './TestStats';
import TestTrend from './TestTrend';

const RunsTab = () => (
  <div className="flex-1">
    <CombinationsMenu />
    <TestStats />
    <TestTrend />
    <TestBuilds />
  </div>
);

export default RunsTab;
