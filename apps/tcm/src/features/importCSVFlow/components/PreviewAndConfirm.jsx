import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  FolderIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon
} from 'assets/icons';
import { TMButton, TMSectionHeadings } from 'common/bifrostProxy';

import { PREVIEW_AND_CONFIRM_COLUMNS } from '../const/importCSVConstants';

import FolderInputWButton from './folderInputWButtons';
import ImportCSVModal from './importCSVModal';
import usePreviewAndConfirm from './usePreviewAndConfirm';

const PreviewAndConfirm = () => {
  const {
    folderName,
    confirmCSVImportNotificationConfig,
    totalImportedProjectsInPreview,
    previewAndConfirmTableRows,
    handleImportTestCaseClick
  } = usePreviewAndConfirm();

  const navigate = useNavigate();

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <ArrowUpwardOutlinedIcon className="text-danger-500 mr-2" />;
      case 'low':
        return <ArrowDownwardOutlinedIcon className="text-success-500 mr-2" />;
      case 'critical':
        return (
          <KeyboardDoubleArrowUpOutlinedIcon className="text-danger-700 mr-2" />
        );
      case 'medium':
        return <RemoveOutlinedIcon className="text-brand-500 mr-2" />;
      default:
        return '';
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, confirmCSVImportNotificationConfig]);

  return (
    <div className="border-base-200 m-4 flex h-max w-4/5 max-w-7xl flex-col rounded-md border-2 border-solid bg-white p-6">
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
      <FolderInputWButton
        label="Folder Location"
        icon={<FolderIcon className="text-brand-400 h-4 w-4" />}
        text={folderName}
        firstCta="Change Folder"
        secondCta="Upload to Root Folder"
      />
      <div className="text-base-800 mt-8 text-base font-medium">
        {totalImportedProjectsInPreview} entries ready for import
      </div>
      <div className="text-base-500 mb-4 text-sm font-normal">
        Showing a preview of few test cases before importing:
      </div>
      <Table className="h-full">
        <TableHead wrapperClass="w-full rounded-xs">
          <TableRow wrapperClass="relative">
            {PREVIEW_AND_CONFIRM_COLUMNS.map((col) => (
              <TableCell
                key={col.key}
                variant="header"
                textTransform="uppercase"
                wrapperClassName="text-base-500 font-medium"
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {previewAndConfirmTableRows.map((row) => (
            <TableRow key={row.title}>
              <TableCell>{row.id}</TableCell>
              <TableCell wrapperClassName="text-base-900 font-medium">
                {row.title}
              </TableCell>
              <TableCell>{formatTemplate(row.templateType)}</TableCell>
              <TableCell>{formatPriority(row.priority)}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
