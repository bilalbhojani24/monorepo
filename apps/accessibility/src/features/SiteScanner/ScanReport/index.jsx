import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Badge,
  Breadcrumb,
  Button,
  MdCalendarToday,
  MdDownload,
  MdPerson,
  MdShare,
  Tabs,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import dateFormat from 'dateformat';

import Loader from '../../../common/Loader';

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
    reportOverviewData,
    isCopied,
    setIsCopied,
    reportMetaData,
    selected
  } = useScanReport();

  const getTabContent = () => {
    switch (activeTab) {
      case tabsOptions.SUMMARY.id:
        return reportOverviewData ? <ScanReportSummary /> : <Loader />;
      case tabsOptions.ALLISSUES.id:
        return reportMetaData.meta ? <Issues /> : <Loader />;
      case tabsOptions.SCANLOGS.id:
        return (
          <ScanLogs
            logs={scanLogsStateData}
            isLoading={isLoading}
            onFilterApplied={onFilterApplied}
            selected={selected}
          />
        );
      default:
        return reportOverviewData ? <ScanReportSummary /> : <Loader />;
    }
  };
  const metaData = reportMetaData.meta
    ? Object.values(reportMetaData.meta)[0]
    : null;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-base-50">
        <div className="flex justify-between px-6 py-4">
          <div className="flex-col">
            <div className="mb-4">
              <Breadcrumb
                data={[
                  { name: 'All Reports', url: '/reports', current: false },
                  {
                    name: 'Website scan',
                    url: '/site-scanner',
                    current: false
                  },
                  {
                    name: metaData?.name,
                    url: `/site-scanner/scan-details/${metaData?.reportId}`,
                    current: false
                  },
                  {
                    name: metaData?.startTimestamp
                      ? dateFormat(
                          new Date(new Date(metaData?.startTimestamp)),
                          'mmmm dS, h:MM TT'
                        ).toLocaleString()
                      : '',
                    url: '/',
                    current: true
                  }
                ]}
                size="default"
              />
            </div>
            <div className="flex items-center">
              <h1 className="mb-2 mr-2 text-2xl font-bold">
                {' '}
                {metaData?.name || 'N/A'}
              </h1>
            </div>
            <span className="mr-2 flex items-center text-sm">
              <span className="mr-0.5">
                <MdPerson color="#9CA3AF" />
              </span>{' '}
              <span className="text-base-500">{metaData?.createdBy?.name}</span>
              <span className="text-base-500 ml-7 flex items-center text-sm">
                <span className="mr-0.5">
                  <MdCalendarToday color="#9CA3AF" className="mr-0.5" />
                </span>{' '}
                {metaData?.startTimestamp
                  ? dateFormat(
                      new Date(new Date(metaData?.startTimestamp)),
                      'mmmm dS, h:MM TT'
                    ).toLocaleString()
                  : ''}
              </span>
              {metaData?.wcagVersion?.label && (
                <Badge
                  text={metaData?.wcagVersion.label}
                  wrapperClassName="ml-2 mr-2 h-6"
                />
              )}
            </span>
          </div>
          <div className="flex items-center">
            <Tooltip
              show={isCopied}
              theme="dark"
              content={
                <TooltipBody>{isCopied ? 'Link copied' : null}</TooltipBody>
              }
            >
              <CopyToClipboard
                onCopy={() => {
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2500);
                }}
                text={window.location.href}
              >
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
              </CopyToClipboard>
            </Tooltip>

            {/* <Button
              onClick={() => {}}
              size="small"
              type="subtle"
              wrapperClassName="h-10 mr-2"
              icon={<MdDownload />}
              iconPlacement="end"
            >
              Export
            </Button> */}
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
            disableFullWidthBorder
          />
        </div>
      </div>
      {getTabContent()}
    </>
  );
}
