import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import {
  Badge,
  Breadcrumb,
  Button,
  MdDownload,
  MdOutlineCalendarToday,
  MdPerson,
  MdShare,
  Tabs
} from '@browserstack/bifrost';
import Loader from 'common/Loader';
import { ISSUES, SUMMARY } from 'constants';
import format from 'date-fns/format';
import { getReportData } from 'features/Report/slice/selector';
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
    onCopyClick,
    onTabChange
  } = useReport();
  const reportData = useSelector(getReportData);

  const {
    location: { search, origin, pathname }
  } = window;
  const params = new URLSearchParams(search);
  const currentPageUrl = `${origin}${pathname}?ids=${params.get(
    'ids'
  )}&wcagVersion=${params.get('wcagVersion')}`;

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
    <div className="bg-base-50 h-full">
      <div
        className="bg-base-50 border-base-200 fixed top-16 z-10 border-b"
        style={{ width: 'calc(100vw - 256px)' }}
      >
        <div className="px-6 pt-6">
          <Breadcrumb
            data={[
              { name: 'All reports', url: '/reports', current: false },
              {
                name: `${
                  isSingleReport
                    ? Object.values(reportMetaData.meta)[0].name
                    : 'Consolidated report'
                }`,
                url: '',
                current: true
              }
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
                    <MdPerson className="text-xl" />
                    <p className="ml-1.5">
                      {Object.values(reportMetaData.meta)[0].createdBy.name}
                    </p>
                  </div>
                  {reportMetaData.meta !== null ? (
                    <div className="text-base-500 mr-6 flex text-sm">
                      <MdOutlineCalendarToday className="text-xl" />
                      <p className="ml-1.5">
                        {format(
                          new Date(
                            Object.values(reportMetaData.meta)[0].startTimestamp
                          ),
                          'MMM dd, yyyy'
                        )}
                      </p>
                    </div>
                  ) : null}
                  {/* <div className="mr-6">
                    <Badge
                      hasDot={false}
                      hasRemoveButton={false}
                      text={Object.values(reportMetaData.meta)[0].scanType}
                      modifier="base"
                    />
                  </div> */}
                  <div className="mr-6">
                    <Badge
                      hasDot={false}
                      hasRemoveButton={false}
                      text={
                        Object.values(reportMetaData.meta)[0].wcagVersion.label
                      }
                      modifier="base"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  {Object.values(reportMetaData?.meta).map(
                    ({ name }, index) => (
                      <div className="text-base-500 mr-4 flex text-sm">
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
                <Button colors="white" size="small">
                  Copied
                </Button>
              ) : (
                <CopyToClipboard text={currentPageUrl} onCopy={onCopyClick}>
                  <Button
                    icon={<MdShare className="text-xl" />}
                    iconPlacement="end"
                    colors="white"
                    size="extra-small"
                  >
                    Share link
                  </Button>
                </CopyToClipboard>
              )}
              <Button
                icon={<MdDownload className="text-xl" />}
                wrapperClassName="ml-3"
                iconPlacement="end"
                size="small"
                onClick={() => downloadCsv(reportData, csvName)}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
        <div className="pl-6">
          <Tabs
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
            disableFullWidthBorder
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
