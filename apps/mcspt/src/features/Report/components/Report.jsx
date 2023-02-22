import React from 'react';
import { MediaPlayer } from '@browserstack/bifrost';

import ReportContent from '../../ReportContent';
import ReportHeader from '../../ReportHeader';

import useReport from './useReport';

const Report = () => {
  const { sessionData } = useReport();

  return (
    <div id="reportContentContainer" className="flex min-h-screen flex-col">
      <ReportHeader />

      <div className="flex max-w-full flex-1">
        <div className="flex w-64 shrink-0 grow-0 flex-col items-center lg:w-64 xl:w-[360px]">
          <div className="bg-base-100 mx-3 h-full w-full">
            <MediaPlayer
              url={`securefileprotocol://${sessionData?.metadata?.video}`}
              controlPanelStickToBottom
              controlPanelClassName="fixed z-20"
            />
          </div>
        </div>
        <div id="reportContentContainer" className="flex-1">
          <ReportContent />
        </div>
      </div>

      <div id="footerContainer" />
    </div>
  );
};

export default Report;
