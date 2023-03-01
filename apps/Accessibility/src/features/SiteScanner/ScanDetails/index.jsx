import React from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  DropdownTrigger,
  MdBarChart,
  MdCalendarToday,
  MdOutlineMoreVert,
  MdOutlineTableChart,
  MdPerson,
  Tabs
} from '@browserstack/bifrost';
import dateFormat from 'dateformat';

import ScanRuns from '../ScanRuns';

import Overview from './Overview';
import useScanDetails from './useScanDetails';

export const tabsArray = [
  {
    name: 'Overview',
    icon: () => <MdBarChart className="mt-0.5 mr-2" />,
    id: 'OVERVIEW'
  },
  {
    name: 'Scan runs',
    icon: () => <MdOutlineTableChart className="mt-0.5 mr-2" />,
    id: 'SCANRUNS'
  }
];

const ScanDetails = () => {
  const {
    activeTab,
    tabChangeHandler,
    scanRunData,
    isLoading,
    scanRunDataCommon,
    scanOverviewData,
    activeTabIndex,
    handleNewScanRun
  } = useScanDetails();
  console.log(scanRunDataCommon, scanRunDataCommon.name, activeTabIndex);
  return (
    <>
      <div className="bg-base-50">
        <div className="flex justify-between p-6">
          <div className="flex-col">
            <div className="mb-4">
              <Breadcrumb
                data={[
                  { name: 'Website scan', url: '/site-scanner', current: '' },
                  { name: 'Consolidated report', url: '', current: '' }
                ]}
                size="default"
              />
            </div>
            <div className="flex items-center">
              <h1 className="mb-2 mr-2 text-2xl font-bold">
                {scanRunDataCommon?.name || 'N/A'}
              </h1>
              <Badge text="WCAG 2.1 AA" wrapperClassName="mr-2 h-6" />
              <Badge
                text={`Active, Next scan: ${
                  scanRunDataCommon.nextScanDate
                    ? dateFormat(
                        new Date(scanRunDataCommon?.nextScanDate),
                        'mmmm dS, h:MM:ss TT'
                      )
                    : 'NA'
                }`}
                modifier="primary"
                wrapperClassName="mr-2 h-6"
              />
            </div>
            <div className="flex">
              <span className="mr-2 flex items-center text-sm">
                <span className="mr-0.5">
                  <MdPerson color="#9CA3AF" />
                </span>{' '}
                <span className="text-base-500">
                  {scanRunDataCommon?.createdBy?.name || 'NA'}
                </span>
              </span>
              <span className="text-base-500 ml-7 flex items-center text-sm">
                <span className="mr-0.5">
                  <MdCalendarToday color="#9CA3AF" className="mr-0.5" />
                </span>{' '}
                {scanRunDataCommon?.pageCount || '0'} pages
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              colors="white"
              onClick={handleNewScanRun}
              size="small"
              type="subtle"
              wrapperClassName="h-10 mr-2"
            >
              New scan run
            </Button>
            <Button
              colors="white"
              onClick={() => {}}
              size="small"
              type="subtle"
              wrapperClassName="h-10 mr-2"
            >
              Stop recurring
            </Button>
            <Dropdown
              trigger={
                <DropdownTrigger
                  variant="menu-button"
                  icon={<MdOutlineMoreVert />}
                  wrapperClassName="text-lg"
                />
              }
              options={[{ id: '1', body: 'Clone scan configuration' }]}
              heading="WCAG Version"
              onClick={() => {}}
              className="border-none"
            />
          </div>
        </div>
        <div className="pl-6">
          <Tabs
            defaultIndex={activeTabIndex}
            id="menu"
            onTabChange={tabChangeHandler}
            tabsArray={tabsArray}
          />
        </div>
      </div>
      <div>
        {activeTab === 'OVERVIEW' ? (
          <Overview scanOverviewData={scanOverviewData} />
        ) : (
          <ScanRuns scanRunData={scanRunData} isLoading={isLoading} />
        )}
      </div>
    </>
  );
};

export default ScanDetails;
