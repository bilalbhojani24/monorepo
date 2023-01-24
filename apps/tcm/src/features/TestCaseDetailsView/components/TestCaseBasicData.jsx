import React from 'react';
// import { TMButton } from 'common/bifrostProxy';
import DetailsSnippet from 'common/DetailsSnippet';

import useTestCaseView from './useTestCaseView';

const TestCaseBasicData = () => {
  const { testCaseDetails, currentFlow } = useTestCaseView();

  return (
    <>
      <div className="mb-4 flex w-full text-xs">
        <div className="mr-1 font-semibold">Location:</div>
        <div className="text-base-700">{currentFlow}</div>
      </div>
      <div className="flex flex-col">
        <DetailsSnippet
          title="Description"
          value={testCaseDetails?.description || 'N/A'}
        />
        <DetailsSnippet
          title="Expected Result"
          value={testCaseDetails?.expected_result || 'N/A'}
        />

        <div className="flex w-full flex-wrap">
          <div className="w-3/6">
            <DetailsSnippet
              title="Template"
              value={
                testCaseDetails?.template?.replace('test_case_', '') || 'N/A'
              }
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Estimate"
              value={testCaseDetails?.estimate || 'N/A'}
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Configurations"
              value={testCaseDetails?.configurations || 'N/A'}
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Priority"
              value={testCaseDetails?.priority || 'N/A'}
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Tags"
              value={testCaseDetails?.tags || 'N/A'}
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Issues"
              value={testCaseDetails?.tc_jira_tickets || 'N/A'}
            />
          </div>
        </div>
        <DetailsSnippet
          title="Attachments"
          value={testCaseDetails?.attachments || 'N/A'}
        />
        <div />
      </div>
    </>
  );
};

export default TestCaseBasicData;
