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
  // TMDataTable,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTruncateText
} from 'common/bifrostProxy';

import useReportModal from './useReportModal';

const ViewReportModal = () => {
  const {
    isReportModalVisible,
    closeReportModal,
    retryImport,
    reportModalProjects
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
      <TMModalBody className="overflow-y-auto">
        <Table containerWrapperClass="border-base-300 mb-3 rounded-md border">
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
        <TMAlerts
          modifier="primary"
          accentBorder
          alertLinkPosition="inline"
          description="For any assistance related to import, read documentation or contact support"
          // description={
          //   <>
          //     For any assistance related to import, read{' '}
          //     <button
          //       type="button"
          //       underline
          //       className="text-brand-800"
          //       // onClick={() =>
          //       //   window.open(
          //       //     'https://www.browserstack.com/docs/test-management/quick-start/quick-import'
          //       //   )
          //       // }
          //     >
          //       documentation
          //     </button>{' '}
          //     or contact{' '}
          //     <button
          //       type="button"
          //       underline
          //       className="text-brand-800"
          //       // onClick={() =>
          //       //   window.open('https://www.browserstack.com/contact')
          //       // }
          //     >
          //       Support
          //     </button>
          //     .
          //   </>
          // }
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={closeReportModal}>
          Cancel
        </TMButton>
        <TMButton variant="primary" colors="brand" onClick={retryImport}>
          Retry Import
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default ViewReportModal;
