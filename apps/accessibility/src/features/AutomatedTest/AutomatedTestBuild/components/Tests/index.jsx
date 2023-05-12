import React from 'react';

import useAutomatedTestBuild from '../../useAutomatedTestBuild';

import TestsTable from './TestsTable';

export default function Tests() {
  const { testRuns } = useAutomatedTestBuild();
  return <TestsTable testRuns={testRuns} />;
}
