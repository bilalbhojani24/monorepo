import React, { useEffect } from 'react';
import { TMButton, TMTabs } from 'bifrostProxy';
import { DetailsSnippet } from 'features/Reusables';

import { TABS_ARRAY } from '../const/testCaseViewConst';

import useTestCaseView from './useTestCaseView';

const TestCaseView = () => {
  const { handleTabChange } = useTestCaseView();

  return (
    <div className="flex h-full flex-col items-stretch pt-5">
      <div className="mb-4 flex w-full items-center text-xs">
        <div className="mr-1 font-semibold">Location:</div>
        <div className="text-base-700">BrowserStack &gt; </div>
      </div>
      <div className="h-full w-full overflow-y-auto ">
        <DetailsSnippet title="Description" value="value" />
        <DetailsSnippet title="Expected Result" value="value" />
        <div />
        <div>
          <TMTabs
            id="project-tabs"
            tabsArray={TABS_ARRAY}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <TMButton variant="minimal" colors="white">
          Previous
        </TMButton>
        <TMButton variant="minimal" colors="white">
          Next
        </TMButton>
      </div>
    </div>
  );
};

export default TestCaseView;
