import React from 'react';
import { SiJirasoftware } from '@browserstack/bifrost';
import AddIssuesModal from 'common/AddIssuesModal/components/AddIssuesModal';
import { TMAttachments, TMBadge, TMButton } from 'common/bifrostProxy';
import { DetailsSnippet, StepSnippet } from 'common/DataBox';
import ImageModal from 'common/ImageModal';
import {
  BDD,
  statusOptions,
  templateOptions,
  testCaseTypesOptions
} from 'features/Repository/const/addTestCaseConst';
import PropTypes from 'prop-types';
import { getMappedValue, getSystemOrCustomValue } from 'utils/helperFunctions';

import StackTrace from './StackTrace';
import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseBasicData = ({ isFromTestRun }) => {
  const {
    detailsRef,
    showImagePreview,
    imageViewData,
    testCaseDetails,
    onAttachmentClick,
    closePreview,
    showAddIssuesModal,
    isShowAddIssuesModal,
    hideAddIssuesModal,
    saveAddIssesModal,
    onJiraButtonClick
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
          {testCaseDetails.template === templateOptions?.[0].value ||
          testCaseDetails.template === BDD ? (
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
              <DetailsSnippet
                title={isFromTestRun ? 'Assign To' : 'Owner'}
                value={getSystemOrCustomValue(
                  testCaseDetails?.assignee?.full_name,
                  testCaseDetails?.owner_imported
                )}
              />
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
                value={getSystemOrCustomValue(
                  testCaseDetails?.status,
                  testCaseDetails?.status_imported,
                  statusOptions
                )}
              />
            </div>
            <div className="w-3/6">
              <DetailsSnippet
                title="Type of test case"
                value={getSystemOrCustomValue(
                  testCaseDetails?.case_type,
                  testCaseDetails?.case_type_imported,
                  testCaseTypesOptions
                )}
              />
            </div>
            <div className="w-3/6">
              <DetailsSnippet
                title="Priority"
                // value={testCaseDetails?.priority || '--'}
                value={getSystemOrCustomValue(
                  testCaseDetails?.priority,
                  testCaseDetails?.priority_imported
                )}
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
        {testCaseDetails?.custom_fields.map((field) => (
          <DetailsSnippet
            key={field?.field_name}
            parseContent
            title={<span className="capitalize">{field.field_user_name}</span>}
            value={field?.value && field?.value !== '' ? field.value : '--'}
          />
        ))}
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
        <div />
      </div>
      <ImageModal
        imageLink={imageViewData?.link}
        show={showImagePreview}
        onClose={closePreview}
        altText={
          imageViewData?.name
            ? imageViewData.name
            : `${testCaseDetails?.identifier || '--'}_image`
        }
      />
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
