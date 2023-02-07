import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import Loader from 'common/Loader';
import { ISSUES, SUMMARY } from 'constants';
import format from 'date-fns/format';
import { getReportData } from 'features/Report/slice/selector';
import { ASBreadcrumb, ASButton, ASTabs } from 'middleware/bifrost';
import {
  CalendarTodaySharpIcon,
  GetAppIcon,
  PersonIcon,
  ShareIcon
} from 'middleware/icons';
// import { Button } from 'trike/Button';
// import {
//   ArrowBackIcon,
//   GetAppIcon,
//   PersonIcon,
//   ScheduleIcon,
//   ShareIcon
// } from 'trike/Icons';
// import Tabs from 'trike/Tabs';
import { downloadCsv } from 'utils/helper';

import Issues from './components/Issues';
import Summary from './components/Summary';
import useReport from './useReport';

export default function Report() {
  const {
    activeTab,
    defaultIndex,
    isCopied,
    isLoading,
    reportMetaData,
    onBackClick,
    onCopyClick,
    onTabChange
  } = useReport();
  const reportData = useSelector(getReportData);

  const reportsLength = reportData && Object.keys(reportMetaData.meta).length;

  const isSingleReport = reportsLength === 1;

  const csvName = isSingleReport
    ? `${Object.values(reportMetaData.meta)[0].name}-${format(
        new Date(),
        'dd-MM-yyyy'
      )}`
    : `Consolidated_report[${reportsLength}]-${format(
        new Date(),
        'dd-MM-yyyy'
      )}`;

  const reportName = isSingleReport
    ? Object.values(reportMetaData.meta)[0].name
    : `Consolidated report across ${reportsLength} reports`;

  return reportData && !isLoading ? (
    <div className="bg-base-50 h-screen">
      <div className="report__header">
        {/* <Button
          icon={<ArrowBackIcon />}
          modifier="grey"
          onClick={onBackClick}
          size="small"
          text="Back"
          type="subtle"
        /> */}
        <div className="px-6 pt-6">
          <ASBreadcrumb
            data={[
              { name: 'All reports', url: '', current: '' },
              { name: 'Consolidated report', url: '', current: '' }
            ]}
            size="default"
          />
          <div className="flex items-center justify-between">
            <div className="mt-2">
              <p className="mb-2 text-2xl" title={reportName}>
                {reportName}
              </p>
              {isSingleReport ? (
                <div className="flex items-center">
                  <div className="text-base-500 mr-6 flex text-sm">
                    <PersonIcon style={{ height: '20px', width: '20px' }} />
                    <p className="ml-1.5">
                      {Object.values(reportMetaData.meta)[0].createdBy.name}
                    </p>
                  </div>
                  <div className="text-base-500 flex text-sm">
                    <CalendarTodaySharpIcon
                      style={{ height: '20px', width: '20px' }}
                    />
                    <p className="ml-1.5">
                      {format(
                        new Date(
                          Object.values(reportMetaData.meta)[0].startTimestamp
                        ),
                        'MMM dd, yyyy'
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  {Object.values(reportMetaData?.meta).map(
                    ({ name }, index) => (
                      <div>
                        <p title={name}>{name}</p>
                        {index !==
                        Object.values(reportMetaData?.meta).length - 1
                          ? ','
                          : ''}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="flex">
              {isCopied ? (
                <ASButton colors="white" size="small">
                  Copied
                </ASButton>
              ) : (
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={onCopyClick}
                >
                  <ASButton
                    icon={
                      <ShareIcon style={{ height: '16px', width: '16px' }} />
                    }
                    iconPlacement="end"
                    onClick={() => {}}
                    colors="white"
                    size="extra-small"
                  >
                    Share link
                  </ASButton>
                </CopyToClipboard>
              )}
              <ASButton
                icon={<GetAppIcon />}
                wrapperClassName="ml-3"
                iconPlacement="end"
                size="small"
                onClick={() => downloadCsv(reportData, csvName)}
              >
                Export
              </ASButton>
            </div>
          </div>
        </div>
        <div className="text-base-200 border-b pl-6">
          <ASTabs
            tabsArray={[
              {
                name: 'Summary',
                value: SUMMARY
              },
              {
                name: 'All issues',
                value: ISSUES
              }
            ]}
            onTabChange={onTabChange}
            defaultIndex={defaultIndex}
          />
        </div>
      </div>
      {activeTab === 'summary' && <Summary />}
      {activeTab === 'issues' && <Issues />}
    </div>
  ) : (
    <Loader />
  );
}
