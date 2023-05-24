import React from 'react';
import {
  TMAlerts,
  TMBadge,
  TMButton,
  TMProgressBar
} from 'common/bifrostProxy';
import Loader from 'common/Loader';

import { ZEPHYR } from '../../quickImportFlow/const/importSteps';
import { IMPORT_STATUS } from '../const/immutables';

import CancelModal from './CancelModal';
import ImportDetailsModal from './ImportDetailsModal';
import useImportProgress from './useImportProgress';

const ImportProgress = () => {
  const {
    isVisible,
    importStatus,
    importDetails,
    showAlertLoader,
    showDetailsModal,
    showReportModal,
    closeProgress,
    currentTool,
    isDetailsModalVisible,
    isCancelModalVisible
  } = useImportProgress();

  if (!isVisible) return null;

  if (showAlertLoader) {
    return (
      <div className="border-base-300 mb-4 rounded-md border bg-white py-3">
        <Loader />
      </div>
    );
  }
  if (importStatus === IMPORT_STATUS.SUCCESS)
    return (
      <div className="mb-4">
        <TMAlerts
          dismissButtonFn={closeProgress}
          modifier="success"
          accentBorder
          dismissButton
          detailsNode="View Report"
          alertLinkPosition="inline"
          handleLinkClick={showReportModal}
          description={`${importDetails?.successfullyImportedProjects}/${importDetails?.totalProjects} Projects imported from ${currentTool} successfully.`}
        />
      </div>
    );

  if (importStatus === IMPORT_STATUS.FAILURE)
    return (
      <div className="mb-4">
        <TMAlerts
          dismissButtonFn={closeProgress}
          modifier="warn"
          accentBorder
          dismissButton
          alertLinkPosition="inline"
          handleLinkClick={showReportModal}
          description={`${importDetails?.successfullyImportedProjects}/${
            importDetails?.totalProjects
          } Projects imported from ${
            currentTool === ZEPHYR ? 'Zephyr Scale' : 'TestRail'
          }.`}
          detailsNode="View Report"
        />
      </div>
    );

  return (
    <div className="border-base-300 mb-4 flex justify-between rounded-md border bg-white p-4">
      <div className="w-full pr-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base-800 text-sm font-medium">
            Quick Import in progress: {importDetails?.percent}%{' '}
            {importDetails?.successfullyImportedProjects > 0 && (
              <TMBadge
                text={`${importDetails?.successfullyImportedProjects} Project Imported`}
                isRounded
                modifier="success"
                wrapperClassName="ml-1"
              />
            )}
          </div>
          <TMButton variant="minimal" colors="brand" onClick={showDetailsModal}>
            View Details
          </TMButton>
        </div>
        <TMProgressBar
          title={null}
          percentage={importDetails?.percent}
          wrapperClassName="mt-3"
        />
      </div>
      {/* <div className="border-base-300 flex  w-36 flex-col justify-center break-normal border-l pl-5 text-sm">
        <div className="text-base-600">Time Remaining</div>
        <div className="text-base-700 mt-1 font-medium">About 5 min</div>
      </div> */}
      <ImportDetailsModal
        headerText="Quick Import"
        show={isDetailsModalVisible}
      />
      <CancelModal show={isCancelModalVisible} />
    </div>
  );
};

export default ImportProgress;
