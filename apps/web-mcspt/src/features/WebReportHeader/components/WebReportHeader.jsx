import React from 'react';
import { Banner, Button, MdOutlineAnalytics } from '@browserstack/bifrost';

import useReportHeader from './useWebReportHeader';
import WebShareReportButton from './WebShareReportButton';

const ReportHeader = () => {
  const {
    sessionData,
    showDesktopAppDownloadBanner,
    dismissDesktopAppDownloadBanner,
    redirectToDesktopApp
  } = useReportHeader();

  return (
    <div
      id="reportHeader"
      className="border-base-300 z-10 flex w-full flex-col border-b bg-white shadow"
    >
      <div className="flex flex-1 justify-between px-4 py-2">
        <div className="flex items-center">
          <div className="text-base-600 cursor-pointer  text-xl">
            <MdOutlineAnalytics />
          </div>

          <div className="text-base-900 mx-2  text-sm font-medium leading-5">
            {sessionData.name}
          </div>
        </div>

        <div className="text-base-700">
          <WebShareReportButton />
        </div>
      </div>

      {showDesktopAppDownloadBanner && (
        <Banner
          align="centered"
          isDismissButton
          onDismissClick={dismissDesktopAppDownloadBanner}
          ctaButton={
            <Button
              variant="primary"
              colors="white"
              onClick={redirectToDesktopApp}
            >
              Download app
            </Button>
          }
          description="Uncover issues by running performance tests on your mobile apps."
          modifier="brand"
          placement="relative"
        />
      )}
    </div>
  );
};
export default ReportHeader;
