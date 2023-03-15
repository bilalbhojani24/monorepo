import React from 'react';

import CombinationsMenu from '../components/CombinationsMenu';

import TestBuilds from './TestBuilds';
import TestStats from './TestStats';
import TestTrend from './TestTrend';

const RunsTab = () => (
  <div className="flex flex-1 flex-col">
    <CombinationsMenu />
    <TestStats />
    <TestTrend />
    <TestBuilds />
  </div>
);

export default RunsTab;
