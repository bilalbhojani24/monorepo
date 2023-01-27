import React from 'react';
import Attachments from 'common/Attachments';
import { TMBadge } from 'common/bifrostProxy';
import { DetailsSnippet, StepSnippet } from 'common/DataBox';
import { templateOptions } from 'features/Repository/const/addTestCaseConst';

import useTestCaseView from './useTestCaseView';

const TestCaseBasicData = () => {
  const { testCaseDetails } = useTestCaseView();

  return (
    <>
      <div className="flex flex-col">
        {testCaseDetails.template === templateOptions?.[0].value ? (
          <>
            <DetailsSnippet
              isPrimary
              title="Steps"
              value={
                typeof testCaseDetails?.steps?.[0] === 'string'
                  ? testCaseDetails?.steps?.[0]
                  : 'N/A'
              }
            />
            <DetailsSnippet
              isPrimary
              title="Expected Result"
              value={testCaseDetails?.expected_result || 'N/A'}
            />
          </>
        ) : (
          <>
            <DetailsSnippet
              isPrimary
              title="Description"
              value={testCaseDetails?.description || 'N/A'}
            />
            <DetailsSnippet
              isPrimary
              title="All Steps & Results:"
              value={
                <>
                  {testCaseDetails?.steps?.map((item, index) => (
                    <StepSnippet
                      key={item.step}
                      step={item.step}
                      result={item.expected_result}
                      index={index + 1}
                    />
                  ))}
                </>
              }
            />
          </>
        )}

        <div className="border-base-200 mb-4 w-full border-b" />

        <div className="flex w-full flex-wrap">
          <div className="w-3/6">
            <DetailsSnippet
              title="Assigned to"
              value={testCaseDetails?.owner || 'N/A'}
            />
          </div>
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
              title="Priority"
              value={testCaseDetails?.priority || 'N/A'}
            />
          </div>
          <div className="w-full">
            <DetailsSnippet
              title="Tags"
              value={
                testCaseDetails?.tags ? (
                  <div className="mt-1 flex flex-wrap gap-1 normal-case">
                    {testCaseDetails.tags.map((item) => (
                      <TMBadge text={item} size="large" isRounded />
                    ))}
                  </div>
                ) : (
                  'N/A'
                )
              }
            />
          </div>
          {/* <div className="w-full">
            <DetailsSnippet
              title="Issues"
              value={
                testCaseDetails?.issues ? (
                  <div className="flex flex-wrap gap-1 normal-case">
                    {testCaseDetails.issues?.map((item) => (
                      <TMBadge text={item} size="large" isRounded />
                    ))}
                  </div>
                ) : (
                  'N/A'
                )
              }
            />
          </div> */}
        </div>
        <DetailsSnippet
          title="Attachments"
          value={
            testCaseDetails?.attachments.length ? (
              <Attachments
                wrapperClassName="mt-2"
                attachments={testCaseDetails?.attachments || []}
              />
            ) : (
              'N/A'
            )
          }
        />
        <DetailsSnippet
          title="Preconditions"
          value={testCaseDetails?.preconditions || 'N/A'}
        />
        <div />
      </div>
    </>
  );
};

export default TestCaseBasicData;
