import React from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  DropdownTrigger,
  MdAdd,
  MdBarChart,
  MdCalendarToday,
  MdOutlineMoreVert,
  MdOutlineTableChart,
  MdPerson,
  MdSchedule,
  MdStop,
  Modal,
  ModalFooter,
  ModalHeader,
  Tabs
} from '@browserstack/bifrost';
import Loader from 'common/Loader';
import parser from 'cron-parser';
import cronstrue from 'cronstrue';
import dateFormat from 'dateformat';

import { toHoursAndMinutes } from '../../../utils/helper';
import { dayMap } from '../NewScan/constants';
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
    handleNewScanRun,
    handleStopRecurringScan,
    setStopModal,
    showModal,
    loadingStopState,
    userInfo
  } = useScanDetails();
  /*
    Convert back to Local Timezone
  */
  const convertToLocale = () => {
    const cronStringArray = scanRunDataCommon.schedulePattern.split(' ');
    const timezoneOffset = new Date().getTimezoneOffset();
    const day = cronStringArray[4];
    const minutes =
      parseInt(cronStringArray[1], 10) * 60 + parseInt(cronStringArray[0], 10);
    const diff = minutes - timezoneOffset;

    let finalUTCVal = toHoursAndMinutes(diff);
    let dayVal = cronStringArray[cronStringArray.length - 1];
    // console.log(diff, minutes, timezoneOffset, toHoursAndMinutes(diff), dayMap[day]);
    if (diff < 0) {
      finalUTCVal = toHoursAndMinutes(1440 + diff);
      if (day === '*') {
        dayVal = day;
      } else {
        dayVal = parseInt(day, 10) === 0 ? dayMap[6] : parseInt(day, 10) - 1;
      }
    }
    if (diff > 1439) {
      finalUTCVal = toHoursAndMinutes(diff - 1440);
      if (day === '*') {
        dayVal = day;
      } else {
        dayVal = parseInt(day, 10) === 6 ? dayMap[0] : parseInt(day, 10) + 1;
      }
    }
  
    const adjustedCronExpression = `${finalUTCVal.minutes} ${finalUTCVal.hours} * * ${dayVal}`;
    console.log(
      {
        finalUTCVal,
        day,
        diff,
        dayVal,
        adjustedCronExpression,
        cronStringArray
      },
      cronStringArray[cronStringArray.length -1]
    );
    return cronstrue.toString(adjustedCronExpression);
  };
  if (isLoading || !scanOverviewData) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-base-50">
        <div className="flex justify-between p-6">
          <div className="flex-col">
            <div className="mb-4">
              <Breadcrumb
                data={[
                  {
                    name: 'Website scan',
                    url: '/site-scanner',
                    current: false
                  },
                  { name: scanRunDataCommon?.name, url: '', current: true }
                ]}
                size="default"
              />
            </div>
            <div className="flex items-center">
              <h1 className="mb-2 mr-2 text-2xl font-bold">
                {scanRunDataCommon?.name || 'N/A'}
              </h1>
              <Badge
                text="WCAG 2.1 AA"
                wrapperClassName="mr-2 h-6 bg-base-200"
              />
              {scanRunDataCommon?.nextScanDate ? (
                <Badge
                  text={`Recurring, Next scan: ${
                    scanRunDataCommon.nextScanDate
                      ? dateFormat(
                          new Date(scanRunDataCommon?.nextScanDate),
                          'mmmm dS, h:MM TT'
                        )
                      : 'NA'
                  }`}
                  modifier="primary"
                  wrapperClassName="mr-2 h-6"
                />
              ) : null}
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
              <span className="text-base-500 ml-2 flex items-center text-sm">
                <span className="mr-0.5">
                  <MdCalendarToday color="#9CA3AF" className="mr-0.5" />
                </span>{' '}
                {scanRunDataCommon?.pageCount || '0'} pages
                {scanRunDataCommon?.schedulePattern ? (
                  <span className="ml-2 flex items-center">
                    <MdSchedule className="mr-0.5" />
                    {convertToLocale(scanRunDataCommon.schedulePattern)}
                  </span>
                ) : null}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              colors="white"
              onClick={handleNewScanRun}
              size="small"
              type="subtle"
              icon={<MdAdd />}
              iconPlacement="start"
              wrapperClassName="h-10 mr-2"
            >
              New scan run
            </Button>
            {/* handleStopRecurringScan */}
            {scanRunDataCommon?.nextScanDate &&
              userInfo.user_id === scanRunDataCommon.createdBy.id && (
                <Button
                  colors="white"
                  onClick={() => setStopModal(true)}
                  size="small"
                  type="subtle"
                  icon={<MdStop />}
                  iconPlacement="start"
                  wrapperClassName="h-10 mr-2"
                >
                  Stop recurring
                </Button>
              )}
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
        <div className="border-base-200 border-b  pl-6">
          <Tabs
            defaultIndex={activeTabIndex}
            id="menu"
            onTabChange={tabChangeHandler}
            tabsArray={tabsArray}
            isFullWidth={false}
            disableFullWidthBorder
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
      {showModal ? (
        <div>
          <Modal
            show={showModal}
            size="lg"
            onOverlayClick={() => {
              setStopModal(false);
            }}
          >
            <ModalHeader
              handleDismissClick={() => {
                setStopModal(false);
              }}
              heading="Stop recurring scans"
              subHeading="Are you sure you want to stop recurring scans for this configuration. This action cannot be undone."
            />
            <ModalFooter position="right">
              <Button
                onClick={() => {
                  setStopModal(false);
                }}
                colors="white"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleStopRecurringScan();
                }}
                variant="primary"
                colors="danger"
                disabled={loadingStopState}
              >
                {loadingStopState ? 'Loading' : 'Stop scans'}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      ) : null}
    </>
  );
};

export default ScanDetails;
