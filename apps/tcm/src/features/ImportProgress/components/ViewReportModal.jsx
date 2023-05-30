import React from 'react';
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineWarning,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import {
  TMAlerts,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTruncateText
} from 'common/bifrostProxy';
import Loader from 'common/Loader';

import { IMPORT_STATUS } from '../const/immutables';

import useReportModal from './useReportModal';

const ViewReportModal = () => {
  const {
    importStatus,
    isReportModalVisible,
    closeReportModal,
    retryImport,
    reportModalProjects,
    handleDocumentationClick
  } = useReportModal();

  const tableColumns = [
    {
      name: 'PROJECT NAME',
      key: 'project_name'
    },
    {
      name: 'STATUS',
      key: 'status'
    }
  ];

  const getIcon = (status, error) => {
    if (status === 'failure') {
      if (error === 'Import was cancelled by the user.')
        return <MdCancel className="text-danger-600 h-5 w-5" />;
      return <MdOutlineWarning className="text-attention-600 h-5 w-5" />;
    }
    return <MdCheckCircle className="text-success-600 h-5 w-5" />;
  };

  return (
    <TMModal
      size="3xl"
      show={isReportModalVisible}
      onOverlayClick={closeReportModal}
    >
      <TMModalHeader
        heading="View Report"
        handleDismissClick={closeReportModal}
      />
      <TMModalBody>
        {reportModalProjects.length > 0 ? (
          <Table containerWrapperClass="border-base-300 mb-3 rounded-md border h-[400px] max-h-[400px] overflow-scroll">
            <TableHead wrapperClassName="bg-base-50">
              <TableRow>
                {tableColumns.map((col) => (
                  <TableCell
                    key={col.key}
                    wrapperClassName="text-xs text-base-500 font-medium"
                  >
                    {col.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reportModalProjects.map((row) => (
                <TableRow key={row.name} wrapperClassName="w-full">
                  <TableCell wrapperClassName="py-2 w-1/2 max-w-[428px]">
                    <div className="flex">
                      <span>{getIcon(row?.status, row?.error)}</span>
                      <span className="text-base-900 ml-2 text-sm font-medium">
                        <TMTruncateText
                          truncateUsingClamp={false}
                          hidetooltipTriggerIcon
                          isFullWidthTooltip
                          headerTooltipProps={{
                            delay: 500
                          }}
                        >{`${row?.name}`}</TMTruncateText>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell wrapperClassName="py-2 w-1/2 max-w-[436px]">
                    <TMTruncateText
                      truncateUsingClamp={false}
                      hidetooltipTriggerIcon
                      isFullWidthTooltip
                      headerTooltipProps={{
                        delay: 500
                      }}
                    >
                      {row?.status === 'success'
                        ? 'Successfully Imported'
                        : row?.error}
                    </TMTruncateText>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          <div className="border-base-300 align-center mb-3 flex h-[400px] rounded-md border">
            <Loader />
          </div>
        )}
        <TMAlerts
          modifier="primary"
          accentBorder
          alertLinkPosition="inline"
          description="For any assistance related to quick import, refer to our"
          detailsNode={
            <button
              type="button"
              className="underline"
              onClick={handleDocumentationClick}
            >
              documentation.
            </button>
          }
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={closeReportModal}>
          Close
        </TMButton>
        {importStatus === IMPORT_STATUS.FAILURE && (
          <TMButton variant="primary" colors="brand" onClick={retryImport}>
            Retry Import
          </TMButton>
        )}
      </TMModalFooter>
    </TMModal>
  );
};

export default ViewReportModal;
