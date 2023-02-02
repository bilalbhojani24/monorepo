import React from 'react';
import { SourceOutlinedIcon } from 'assets/icons';
import { TMAttachments, TMBadge, TMButton } from 'common/bifrostProxy';
import { DetailsSnippet, StepSnippet } from 'common/DataBox';
import { templateOptions } from 'features/Repository/const/addTestCaseConst';

import useTestCaseView from './useTestCaseView';

const TestCaseBasicData = () => {
  const { testCaseDetails } = useTestCaseView();

  return (
    <>
        <DetailsSnippet
            title="Description"
            value={testCaseDetails?.description || '--'}
        />

        <div className="flex flex-col">
        {testCaseDetails.template === templateOptions?.[0].value ? (
          <>
            <DetailsSnippet
              title="Steps"
              value={
                typeof testCaseDetails?.steps?.[0] === 'string' &&
                testCaseDetails?.steps?.[0]?.length > 0
                  ? testCaseDetails?.steps?.[0]
                  : '--'
              }
            />
            <DetailsSnippet
              title="Expected Result"
              value={testCaseDetails?.expected_result || '--'}
            />
          </>
        ) : (
          <>
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
              value={testCaseDetails?.assignee ? testCaseDetails?.assignee.full_name : '--'}
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Template"
              value={
                testCaseDetails?.template?.replace('test_case_', '') || '--'
              }
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Estimate"
              value={testCaseDetails?.estimate || '--'}
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="State"
              value={testCaseDetails?.status.split('_')?.[0] || '--'}
            />
          </div>
          <div className="w-3/6">
            <DetailsSnippet
              title="Priority"
              value={testCaseDetails?.priority || '--'}
            />
          </div>
          <div className="w-full">
            <DetailsSnippet
              title="Tags"
              value={
                testCaseDetails?.tags.length > 0 ? (
                  <div className="mt-1 flex flex-wrap gap-1 normal-case">
                    {testCaseDetails.tags.map((item) => (
                      <TMBadge text={item} size="large" isRounded />
                    ))}
                  </div>
                ) : (
                  '--'
                )
              }
            />
          </div>
          <div className="w-full">
            <DetailsSnippet
              title="Issues"
              value={
                testCaseDetails?.issues &&
                testCaseDetails?.issues.length > 0 ? (
                  <div className="mt-1 flex flex-wrap gap-1 normal-case">
                    {testCaseDetails.issues.map((item) => (
                      <TMButton
                        text={item.jira_id}
                        size="extra-small"
                        colors="white"
                        icon={<SourceOutlinedIcon className="!h-5 !w-5" />}
                      >
                        {item.jira_id}
                      </TMButton>
                    ))}
                  </div>
                ) : (
                  '--'
                )
              }
            />
          </div>
        </div>
        <DetailsSnippet
          title="Attachments"
          value={
            testCaseDetails?.attachments.length ? (
              <TMAttachments
                wrapperClassName="mt-2"
                attachments={testCaseDetails?.attachments || []}
              />
            ) : (
              '--'
            )
          }
        />
        <DetailsSnippet
          title="Preconditions"
          value={testCaseDetails?.preconditions || '--'}
        />
        <div />
      </div>
    </>
  );
};

export default TestCaseBasicData;
