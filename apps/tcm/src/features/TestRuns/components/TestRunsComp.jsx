import React from 'react';

import useTestRuns from './useTestRuns';

const TestRuns = () => {
  const { projectId } = useTestRuns();
  return <div>TestRuns {projectId}</div>;
};

export default TestRuns;
