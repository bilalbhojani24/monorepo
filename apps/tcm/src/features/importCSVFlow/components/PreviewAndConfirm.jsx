import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { MdFolderOpen } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon
} from 'assets/icons';
import {
  TMAccordion,
  TMAccordionInteractiveHeader,
  TMAccordionPanel,
  TMButton,
  TMSectionHeadings
} from 'common/bifrostProxy';

import ImportCSVModal from './importCSVModal';
import PreviewAndConfirmSingleNode from './previewAndConfirmSingleNode';
import usePreviewAndConfirm from './usePreviewAndConfirm';

const PreviewAndConfirm = () => {
  const {
    previewData,
    confirmCSVImportNotificationConfig,
    totalImportedProjectsInPreview,
    handleImportTestCaseClick
  } = usePreviewAndConfirm();

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <>
            <ArrowUpwardOutlinedIcon className="text-danger-500 mr-2" />
            <span>High</span>
          </>
        );
      case 'low':
        return (
          <>
            <ArrowDownwardOutlinedIcon className="text-success-500 mr-2" />
            <span>Low</span>
          </>
        );
      case 'critical':
        return (
          <>
            <KeyboardDoubleArrowUpOutlinedIcon className="text-danger-700 mr-2" />
            <span>Critical</span>
          </>
        );
      case 'medium':
        return (
          <>
            <RemoveOutlinedIcon className="text-brand-500 mr-2" />
            <span>Medium</span>
          </>
        );
      default:
        return priority;
    }
  };

  const formatTemplate = (template) => {
    if (template === 'test_case_text') return 'Text';
    return 'Steps';
  };

  return (
    <div className="border-base-300 mx-4 mb-4 flex h-max w-4/5 max-w-7xl flex-col rounded-md border border-solid bg-white p-6">
      <TMSectionHeadings
        title="Preview & Confirm"
        variant="buttons"
        trailingHeadNode={
          <div className="min-w-fit">
            <TMButton variant="primary" onClick={handleImportTestCaseClick}>
              Import Test Cases
            </TMButton>
          </div>
        }
      />
      <div className="text-base-800 mt-4 text-base font-medium">
        {totalImportedProjectsInPreview} entries ready for import
      </div>
      <div className="text-base-500 mb-4 text-sm font-normal">
        Showing a preview of few test cases before importing:
      </div>
      {previewData.map((data, idx) => (
        <div className="border-base-100 border-y">
          <TMAccordion defaultOpen={idx === 0}>
            <TMAccordionInteractiveHeader
              title={data?.name}
              wrapperClassName={twClassNames('pr-0 pl-0 [&_button]:text-left')}
            />
            <TMAccordionPanel wrapperClassName={twClassNames('pl-8')}>
              <div className="border-base-300 mt-2 flex flex-col rounded-md border bg-white p-4">
                <div className="flex w-full justify-between gap-4">
                  <PreviewAndConfirmSingleNode
                    text="Folder"
                    descWrapperClassName="flex-wrap break-all"
                    wrapperClassName="basis-1/2"
                    description={
                      <div className="flex">
                        <MdFolderOpen className="text-brand-500 mr-1 h-5 w-5 shrink-0" />
                        {data?.test_case_folder_id}
                      </div>
                    }
                  />
                  <div className="flex basis-1/2">
                    <PreviewAndConfirmSingleNode
                      text="Template Type"
                      descWrapperClassName=""
                      wrapperClassName="basis-1/2"
                      description={formatTemplate(data?.template)}
                    />
                    <PreviewAndConfirmSingleNode
                      text="Priority"
                      descWrapperClassName="flex flex-row items-center"
                      wrapperClassName="basis-1/2"
                      description={formatPriority(data?.priority)}
                    />
                  </div>
                </div>
                {data?.steps &&
                  data?.steps?.length &&
                  typeof data?.steps?.[0] === 'string' && (
                    <div className="mt-4 flex justify-between gap-4">
                      <PreviewAndConfirmSingleNode
                        text="Steps"
                        wrapperClassName="basis-1/2"
                        description={ReactHtmlParser(data?.steps?.[0])}
                      />
                      <PreviewAndConfirmSingleNode
                        text="Expected Results"
                        wrapperClassName="basis-1/2"
                        description={ReactHtmlParser(data?.expected_result)}
                      />
                    </div>
                  )}
                {data?.steps &&
                  data?.steps?.length &&
                  typeof data?.steps[0] === 'object' &&
                  data?.steps.map((step, index) => (
                    <div className="mt-4 flex justify-between gap-4">
                      <PreviewAndConfirmSingleNode
                        text={`Steps ${(index + 1).toLocaleString('en-US', {
                          minimumIntegerDigits: 2,
                          useGrouping: false
                        })}`}
                        wrapperClassName="basis-1/2"
                        description={ReactHtmlParser(step?.step)}
                      />
                      <PreviewAndConfirmSingleNode
                        text={`Expected Result ${(index + 1).toLocaleString(
                          'en-US',
                          {
                            minimumIntegerDigits: 2,
                            useGrouping: false
                          }
                        )}`}
                        wrapperClassName="basis-1/2"
                        description={ReactHtmlParser(step?.expected_result)}
                      />
                    </div>
                  ))}
              </div>
            </TMAccordionPanel>
          </TMAccordion>
        </div>
      ))}
      {confirmCSVImportNotificationConfig.show && (
        <ImportCSVModal
          show={confirmCSVImportNotificationConfig.show}
          data={confirmCSVImportNotificationConfig.modalData}
          progress={confirmCSVImportNotificationConfig?.progress}
          status={confirmCSVImportNotificationConfig.status}
        />
      )}
    </div>
  );
};

export default PreviewAndConfirm;
