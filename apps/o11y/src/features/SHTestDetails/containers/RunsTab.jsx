import React from 'react';

import CombinationsMenu from '../components/CombinationsMenu';

import TestBuilds from './TestBuilds';
import TestStats from './TestStats';

const RunsTab = () => (
  <>
    <CombinationsMenu />
    <TestStats />
    <TestBuilds />
  </>
);

export default RunsTab;
