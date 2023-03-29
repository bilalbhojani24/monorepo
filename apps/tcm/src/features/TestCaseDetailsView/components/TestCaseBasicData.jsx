import React from 'react';
import { SiJirasoftware } from '@browserstack/bifrost';
import AddIssuesModal from 'common/AddIssuesModal/components/AddIssuesModal';
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
import {
  statusOptions,
  templateOptions,
  testCaseTypesOptions
} from 'features/Repository/const/addTestCaseConst';
import PropTypes from 'prop-types';
import { getMappedValue } from 'utils/helperFunctions';

import StackTrace from './StackTrace';
import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseBasicData = ({ isFromTestRun }) => {
  const {
    detailsRef,
    showImagePreview,
    imageLink,
    testCaseDetails,
    onAttachmentClick,
    closePreview,
    showAddIssuesModal,
    isShowAddIssuesModal,
    hideAddIssuesModal,
    saveAddIssesModal,
    onJiraButtonClick,
    getAssignedTo
  } = useTestCaseViewDetails();

  return (
    <>
      <div ref={detailsRef}>
        {isFromTestRun && <StackTrace />}
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
                dontCapitalize
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
              <DetailsSnippet title="Assigned to" value={getAssignedTo()} />
            </div>
            <div className="w-3/6">
              <DetailsSnippet
                title="Template"
                value={
                  testCaseDetails?.template
                    ? getMappedValue(templateOptions, testCaseDetails.template)
                    : '--'
                }
              />
            </div>
            {/* <div className="w-3/6">
              <DetailsSnippet
                title="Estimate"
                value={testCaseDetails?.estimate || '--'}
              />
            </div> */}
            <div className="w-3/6">
              <DetailsSnippet
                title="State"
                value={
                  testCaseDetails?.status
                    ? getMappedValue(statusOptions, testCaseDetails.status)
                    : '--'
                }
              />
            </div>
            <div className="w-3/6">
              <DetailsSnippet
                title="Type of test case"
                value={
                  testCaseDetails?.case_type
                    ? getMappedValue(
                        testCaseTypesOptions,
                        testCaseDetails.case_type
                      )
                    : '--'
                }
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
                          id={item.jira_id}
                          onClick={() => onJiraButtonClick(item.jira_id)}
                          icon={
                            <SiJirasoftware className="text-brand-600 h-4 w-4" />
                          }
                        >
                          {item.jira_id}
                        </TMButton>
                      ))}
                    </div>
                  ) : (
                    <>
                      <TMButton
                        type="submit"
                        variant="minimal"
                        wrapperClassName="text-sm"
                        onClick={showAddIssuesModal}
                      >
                        Link to Jira
                      </TMButton>
                      <AddIssuesModal
                        isVisible={isShowAddIssuesModal}
                        onClose={hideAddIssuesModal}
                        onSave={saveAddIssesModal}
                      />
                    </>
                  )
                }
              />
            </div>
          </div>
        </div>
        <DetailsSnippet
          dontCapitalize
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
          parseContent
          title="Preconditions"
          value={testCaseDetails?.preconditions || '--'}
        />
        {Object.keys(testCaseDetails?.custom_fields).map((field) => (
          <DetailsSnippet
            key={field}
            parseContent
            title={
              <span className="capitalize">{field?.split('_')?.join(' ')}</span>
            }
            value={testCaseDetails.custom_fields[field]}
          />
        ))}
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
        <TMModalBody className=" flex justify-center">
          <img
            src={imageLink}
            alt={imageLink}
            className="h-full max-h-full max-w-full object-contain"
          />
        </TMModalBody>
        <TMModalFooter position="right" />
      </TMModal>
    </>
  );
};

TestCaseBasicData.propTypes = {
  isFromTestRun: PropTypes.bool
};

TestCaseBasicData.defaultProps = {
  isFromTestRun: false
};

export default TestCaseBasicData;
