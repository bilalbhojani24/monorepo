import React from 'react';
import { TMButton, TMTabs } from 'bifrostProxy';

import { TABS_ARRAY } from '../const/testCaseViewConst';

import useTestCaseView from './useTestCaseView';

const TestCaseMutliData = () => {
  const { testRunsDetails, handleTabChange } = useTestCaseView();

  return (
    <>
      <TMTabs
        id="project-tabs"
        tabsArray={TABS_ARRAY}
        onTabChange={handleTabChange}
      />
      {testRunsDetails.length}
    </>
  );
};

export default TestCaseMutliData;
