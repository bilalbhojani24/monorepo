import React from 'react';
import { BsCalendar } from 'react-icons/bs';
import { MdOutlineTableChart } from 'react-icons/md';
import { RiBarChartLine, RiUser3Fill } from 'react-icons/ri';
import { Badge, Button, Dropdown, Tabs } from '@browserstack/bifrost';

import ScanRuns from '../ScanRuns';

import useScanDetails from './useScanDetails';

const ScanDetails = () => {
  const { activeTab, tabChangeHandler } = useScanDetails();
  return (
    <>
      <div className="bg-base-50">
        <div className="flex justify-between p-6">
          <div className="flex-col">
            <div className="flex items-center">
              <h1 className="mb-2 mr-2 text-2xl font-bold">Main user flow</h1>
              <Badge text="WCAG 2.1 AA" wrapperClassName="mr-2 h-6" />
              <Badge
                text="Active, Next scan: 2nd Feb, 12:00 PM "
                modifier="primary"
                wrapperClassName="mr-2 h-6"
              />
            </div>
            <div className="flex">
              <span className="mr-2 flex items-center text-sm">
                <span className="mr-0.5">
                  <RiUser3Fill color="#9CA3AF" />
                </span>{' '}
                <span className="text-base-500">Kaustubh Saxena</span>
              </span>
              <span className="text-base-500 ml-7 flex items-center text-sm">
                <span className="mr-0.5">
                  <BsCalendar color="#9CA3AF" className="mr-0.5" />
                </span>{' '}
                25 pages
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              colors="white"
              onClick={() => {}}
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
              Stop scan
            </Button>
            <Dropdown
              triggerVariant="menu-button"
              options={[{ id: '1', body: 'Edit' }]}
              heading="WCAG Version"
              onClick={() => {}}
              className="border-none"
            />
          </div>
        </div>
        <div className="pl-6">
          <Tabs
            defaultIndex="0"
            id="menu"
            onTabChange={tabChangeHandler}
            tabsArray={[
              {
                name: 'Summary',
                icon: () => <RiBarChartLine className="mt-0.5 mr-2" />
              },
              {
                name: 'Scan runs',
                icon: () => <MdOutlineTableChart className="mt-0.5 mr-2" />
              }
            ]}
          />
        </div>
      </div>
      <div>{activeTab === 'Overview' ? 'Overview' : <ScanRuns />}</div>
    </>
  );
};

export default ScanDetails;
