import React, { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  MdFolderOpen
} from '@browserstack/bifrost';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon
} from 'assets/icons';
import { TMButton, TMSectionHeadings } from 'common/bifrostProxy';

import { resetImportCSVState } from '../slices/csvThunk';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (confirmCSVImportNotificationConfig.status === 'success') {
      navigate({
        pathname: `/projects/${confirmCSVImportNotificationConfig?.csvImportProjectId}/folder/${confirmCSVImportNotificationConfig?.csvImportFolderId}/test-cases`
      });
      dispatch(resetImportCSVState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, confirmCSVImportNotificationConfig]);

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
      <div className="text-base-800 mt-8 text-base font-medium">
        {totalImportedProjectsInPreview} entries ready for import
      </div>
      <div className="text-base-500 mb-4 text-sm font-normal">
        Showing a preview of few test cases before importing:
      </div>
      {previewData.map((data, idx) => (
        <div className="border-base-100 border-y">
          <Accordion defaultOpen={idx === 0}>
            <AccordionInteractiveHeader title={data?.name} />
            <AccordionPanel>
              <div className="border-base-300 mt-2 flex flex-col rounded-md border bg-white p-4">
                <div className="flex w-full justify-between">
                  <PreviewAndConfirmSingleNode
                    text="Folder"
                    wrapperClassName="basis-1/3"
                    description={
                      <>
                        <MdFolderOpen className="text-brand-500 mr-1 h-5 w-5" />
                        {data?.test_case_folder_id}
                      </>
                    }
                  />
                  <PreviewAndConfirmSingleNode
                    text="Template Type"
                    wrapperClassName="basis-1/3"
                    description={formatTemplate(data?.template)}
                  />
                  <PreviewAndConfirmSingleNode
                    text="Priority"
                    wrapperClassName="basis-1/3"
                    description={formatPriority(data?.priority)}
                  />
                </div>
                {((data?.steps &&
                  data?.steps?.length &&
                  typeof data?.steps?.[0] === 'string') ||
                  data?.expected_result) && (
                  <div className="mt-4 flex justify-between">
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
                  data?.steps.map((step) => (
                    <div className="mt-4 flex justify-between">
                      <PreviewAndConfirmSingleNode
                        text="Steps"
                        wrapperClassName="basis-1/2"
                        description={ReactHtmlParser(step?.step)}
                      />
                      <PreviewAndConfirmSingleNode
                        text="Expected Results"
                        wrapperClassName="basis-1/2"
                        description={ReactHtmlParser(step?.expected_result)}
                      />
                    </div>
                  ))}
              </div>
            </AccordionPanel>
          </Accordion>
        </div>
      ))}
      {confirmCSVImportNotificationConfig.show && (
        <ImportCSVModal
          show={confirmCSVImportNotificationConfig.show}
          data={confirmCSVImportNotificationConfig.modalData}
          status={confirmCSVImportNotificationConfig.status}
        />
      )}
    </div>
  );
};

export default PreviewAndConfirm;
