import React from 'react';
import { Modal } from '@browserstack/bifrost';
import dependencyLoader from 'assets/tripleDots.gif';

import useHistoricalReportLoadingModal from './useHistoricalReportLoadingModal';

const HistoricalReportLoadingModal = () => {
  const { showHistoricalReportLoadingModal } =
    useHistoricalReportLoadingModal();

  return (
    <Modal
      wrapperClassName=""
      show={showHistoricalReportLoadingModal}
      size="md"
    >
      <div className="flex flex-col items-center justify-center p-14">
        <img src={dependencyLoader} alt="loading..." className="w-24" />
        <div className="text-2xl font-bold leading-7">
          Test Report is Loading
        </div>
      </div>
    </Modal>
  );
};

export default HistoricalReportLoadingModal;
