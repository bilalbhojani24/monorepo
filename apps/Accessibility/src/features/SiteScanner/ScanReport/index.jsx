import React from 'react';
import {
  Badge,
  Button,
  MdDownload,
  MdPerson,
  MdShare,
  Tabs
} from '@browserstack/bifrost';

import Issues from './Allissues/Issues';
import ScanLogs from './ScanLogs';
import ScanReportSummary from './ScanReportSummary';
import useScanReport from './useScanReport';

export default function ScanReport() {
  const {
    activeTab,
    onTabChange,
    activeTabIndex,
    tabsOptions,
    reportCommonData,
    isLoading,
    scanLogsStateData,
    onFilterApplied,
    reportOverviewData
  } = useScanReport();

  const getTabContent = () => {
    switch (activeTab) {
      case tabsOptions.SUMMARY.id:
        return reportOverviewData ? <ScanReportSummary /> : 'loading';
      case tabsOptions.ALLISSUES.id:
        return <Issues />;
      case tabsOptions.SCANLOGS.id:
        return (
          <ScanLogs
            logs={scanLogsStateData}
            isLoading={isLoading}
            onFilterApplied={onFilterApplied}
          />
        );
      default:
        return reportOverviewData ? <ScanReportSummary /> : 'loading';
    }
  };

  return (
    <>
      <div className="bg-base-50">
        <div className="flex justify-between px-6 py-4">
          <div className="flex-col">
            <div className="flex items-center">
              <h1 className="mb-2 mr-2 text-2xl font-bold">Main user flow</h1>
              <Badge
                text="Website scan report of Feb 2, 2023, 12:00 PM"
                wrapperClassName="mr-2 h-6"
              />
            </div>
            <span className="mr-2 flex items-center text-sm">
              <span className="mr-0.5">
                <MdPerson color="#9CA3AF" />
              </span>{' '}
              <span className="text-base-500">Kaustubh Saxena</span>
            </span>
          </div>
          <div className="flex items-center">
            <Button
              colors="white"
              onClick={() => {}}
              size="small"
              type="subtle"
              wrapperClassName="h-10 mr-2"
              icon={<MdShare />}
              iconPlacement="end"
            >
              Share Link
            </Button>
            <Button
              onClick={() => {}}
              size="small"
              type="subtle"
              wrapperClassName="h-10 mr-2"
              icon={<MdDownload />}
              iconPlacement="end"
            >
              Export
            </Button>
          </div>
        </div>
        <div className="pl-6">
          <Tabs
            defaultIndex={activeTabIndex}
            id="menu"
            onTabChange={onTabChange}
            tabsArray={[
              tabsOptions.SUMMARY,
              tabsOptions.ALLISSUES,
              tabsOptions.SCANLOGS
            ]}
          />
        </div>
      </div>
      {getTabContent()}
    </>
  );
}
