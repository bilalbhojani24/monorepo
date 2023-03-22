import React from 'react';

import CombinationsMenu from '../components/CombinationsMenu';
import ErrorInfo from '../components/ErrorInfo';

import ErrorBuilds from './ErrorBuilds';
import ErrorTrend from './ErrorTrend';

const RunsTab = () => (
  <>
    <CombinationsMenu />
    <ErrorInfo />
    <ErrorTrend />
    <ErrorBuilds />
  </>
);

export default RunsTab;
