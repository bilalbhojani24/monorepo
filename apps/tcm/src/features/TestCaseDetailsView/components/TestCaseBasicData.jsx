import React from 'react';
import { SiJira } from '@browserstack/bifrost';
import {
  TMAttachments,
  TMBadge,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import { DetailsSnippet, StepSnippet } from 'common/DataBox';
import { templateOptions } from 'features/Repository/const/addTestCaseConst';

import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseBasicData = () => {
  const {
    showImagePreview,
    imageLink,
    testCaseDetails,
    onAttachmentClick,
    closePreview
  } = useTestCaseViewDetails();

  return (
    <>
      <DetailsSnippet
        title="Description"
        parseContent
        value={testCaseDetails?.description || '--'}
      />

      <div className="flex flex-col">
        {testCaseDetails.template === templateOptions?.[0].value ? (
          <>
            <DetailsSnippet
              title="Steps"
              parseContent
              value={
                typeof testCaseDetails?.steps?.[0] === 'string' &&
                testCaseDetails?.steps?.[0]?.length
                  ? testCaseDetails?.steps?.[0] // this will be a string
                  : '--'
              }
            />
            <DetailsSnippet
              title="Expected Result(s)"
              parseContent
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
              value={testCaseDetails?.assignee?.full_name || '--'}
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
              value={testCaseDetails?.status?.split('_')?.[0] || '--'}
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
                      <TMBadge text={item} size="large" key={item} />
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
                testCaseDetails?.issues?.length ? (
                  <div className="mt-1 flex flex-wrap gap-1 normal-case">
                    {testCaseDetails?.issues?.map((item) => (
                      <TMButton
                        key={item.jira_id}
                        text={item.jira_id}
                        size="extra-small"
                        colors="white"
                        icon={<SiJira className="h-4 w-4" />}
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
            testCaseDetails?.attachments?.length ? (
              <TMAttachments
                wrapperClassName="mt-2"
                onActionClick={onAttachmentClick}
                attachments={
                  testCaseDetails?.attachments.map((item) => ({
                    ...item,
                    actionName: 'View'
                  })) || []
                }
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

      <TMModal
        show={showImagePreview}
        withDismissButton
        onOverlayClick={closePreview}
        size="4xl"
      >
        <TMModalHeader
          heading="Image Preview"
          handleDismissClick={closePreview}
        />
        <TMModalBody className="block">
          <img
            src={imageLink}
            alt={imageLink}
            className="h-full max-h-full w-full object-contain"
          />
        </TMModalBody>
        <TMModalFooter position="right" />
      </TMModal>
    </>
  );
};

export default TestCaseBasicData;
