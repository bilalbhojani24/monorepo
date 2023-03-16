import React from 'react';

import CombinationsMenu from '../components/CombinationsMenu';

import TestBuilds from './TestBuilds';
import TestStats from './TestStats';
import TestTrend from './TestTrend';

const RunsTab = () => (
  <>
    <CombinationsMenu />
    <TestStats />
    <TestTrend />
    <TestBuilds />
  </>
);

export default RunsTab;
