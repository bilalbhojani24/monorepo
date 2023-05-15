import React from 'react';
import {
  TMAlerts,
  TMButton,
  TMDataTable,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';

import useImportProgress from './useImportProgress';

const ViewReportModal = () => {
  const { isReportModalVisible, closeReportModal } = useImportProgress();

  const tableColumns = [
    {
      name: 'Project Name',
      key: 'project_name',
      cell: (rowData) => (
        <div className="text-base-900 cursor-pointer font-medium">{`${rowData?.jira_id}`}</div>
      )
    },
    {
      name: 'Status',
      key: 'status',
      cell: (rowData) => (
        <div className="text-base-900 cursor-pointer font-medium">{`${rowData?.jira_id}`}</div>
      )
    }
  ];

  return (
    <TMModal
      size="3xl"
      show={isReportModalVisible}
      onOverlayClick={closeReportModal}
    >
      <TMModalHeader
        heading="View Report"
        subHeading=""
        handleDismissClick={closeReportModal}
      />
      <TMModalBody>
        <div className="border-base-300 mb-4 w-full rounded-md border">
          <TMDataTable
            columns={tableColumns}
            rows={[{}, {}]}
            isCondensed
            containerWrapperClass="shadow-none border-none "
            tableWrapperClass="table-fixed w-full"
          />
        </div>
        <TMAlerts
          modifier="primary"
          accentBorder
          // dismissButton
          alertLinkPosition="inline"
          description="For any assistance related to import, read documentation or contact Support."
          linkText={null}
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="brand" onClick={closeReportModal}>
          Retry Import
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

ViewReportModal.propTypes = {};

ViewReportModal.defaultProps = {};

export default ViewReportModal;
