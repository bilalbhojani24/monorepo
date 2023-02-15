import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  MdCancel,
  MdCheckCircle,
  MdOutlineHistory,
  MdOutlineSync,
  MdPerson,
  MdSearch
} from '@browserstack/bifrost';
import dateFormat from 'dateformat';
import {
  ASInputField,
  ASSelectMenu,
  ASTable,
  ASTableBody,
  ASTableCell,
  ASTableHead,
  ASTableRow
} from 'middleware/bifrost';

import NewScan from './NewScan';
import useSiteScanner from './useSiteScanner';

const columns = [
  {
    name: 'Scan summary',
    key: 'scanSummary'
  },
  {
    name: 'Last scan summary',
    key: 'lastScanSummary'
  },
  {
    name: 'Page summary',
    key: 'pageSummary'
  }
];

const typesScan = [
  {
    label: 'All Scans',
    value: 'allScans'
  },
  {
    label: 'Your Scans',
    value: 'youScans'
  },
  {
    label: 'Other Scans',
    value: 'otherScans'
  }
];

const rows = [
  {
    scanSummary: (
      <div className="cursor-pointer flex-col font-normal">
        <div>
          <span className="mr-2">Main Flow</span>
          <Badge text="WCAG 2.0" />
        </div>
        <div className="mt-0.5 flex items-center font-light">
          <span className="mr-2 flex items-center">
            <span>
              <MdPerson className="mr-0.5" color="#9CA3AF" />
            </span>{' '}
            You
          </span>
          <span className="mr-2">25 pages</span>
          <Badge
            text="Recurring On"
            wrapperClassName="mr-2"
            modifier="primary"
          />
          <span className="mr-2">Next: Feb 2, 12 PM</span>
        </div>
      </div>
    ),
    lastScanSummary: (
      <div className="flex flex-col font-normal">
        <span className="text-black">10745 issues</span>
        <span>Last scan: Feb 2, 12 PM</span>
      </div>
    ),
    pageSummary: (
      <div>
        <span className="mr-4">10 success</span>
        <span className="mr-4">2 failed</span>
        <span>3 redirects</span>
      </div>
    )
  },
  {
    scanSummary: (
      <div className="flex-col font-normal">
        <div>
          <span className="mr-2">Main Flow</span>
          <Badge text="WCAG 2.0" />
        </div>
        <div className="mt-0.5 flex items-center font-light">
          <span className="mr-2 flex items-center">
            <span>
              <MdPerson className="mr-0.5" color="#9CA3AF" />
            </span>{' '}
            You
          </span>
          <span className="mr-2">25 pages</span>
          <Badge text="Single Run" wrapperClassName="mr-2" />
        </div>
      </div>
    ),
    lastScanSummary: (
      <div className="text-base-500 flex font-normal">
        <span>Intializing your scan</span>
      </div>
    ),
    pageSummary: (
      <div>
        <span className="mr-4">10 success</span>
        <span className="mr-4">2 failed</span>
        <span>3 redirects</span>
      </div>
    )
  }
];

export default function SiteScanner() {
  const [showNewScan, setShowNewScan] = useState(false);
  const { scanConfigStateData, isLoading, handleSearch } = useSiteScanner();
  const navigate = useNavigate();
  /*
    Close Slideover
  */
  const closeSlideover = () => {
    setShowNewScan(false);
  };

  const getRunTypeBadge = (scheduled) => {
    if (scheduled.label && scheduled.active) {
      return (
        <Badge text="Recurring On" wrapperClassName="mr-2" modifier="primary" />
      );
    }
    if (scheduled.label && !scheduled.active) {
      return <Badge text="Recurring inactive" wrapperClassName="mr-2" />;
    }
    return <Badge text="Single Run" wrapperClassName="mr-2" />;
  };

  const getCurrrentStatus = (row) => {
    if (row.scanStatus === 'ongoing') {
      return (
        <div className="text-base-500 flex font-normal capitalize">
          <span>Intializing your scan</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col font-normal">
        <span className="text-black">{row.issues} issues</span>
        <span className="flex items-center">
          <MdOutlineHistory className="mr-0.5" />
          Last scan:{' '}
          {dateFormat(new Date(row.lastScanDate), 'mmmm dS, h:MM:ss TT')}
        </span>
      </div>
    );
  };

  console.log(scanConfigStateData);
  return (
    <div className="bg-base-50">
      <div className="flex justify-between p-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold">Website Scanner</h1>
          <h3 className="text-base-500 mb-4 text-sm font-medium">
            Select reports to view them. You can select more than one report to
            consolidate and review reports.
          </h3>
        </div>
        <Button
          modifier="primary"
          onClick={() => {
            setShowNewScan(true);
          }}
          size="small"
          type="subtle"
          wrapperClassName="h-10"
        >
          New website scan
        </Button>
      </div>
      <div className="block p-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="mt-1 mr-4 w-64">
              <ASInputField
                onChange={handleSearch}
                id="search-scan"
                placeholder="Search for name or user..."
                leadingIcon={<MdSearch />}
              />
            </div>
            <ASSelectMenu
              onChange={() => {}}
              options={typesScan}
              placeholder="All Scans"
            />
          </div>
          <div>
            <Badge
              text={`${
                scanConfigStateData?.numRecurringScans || 0
              } recurring active scans`}
              modifier="primary"
            />
          </div>
        </div>
      </div>
      <ASTable>
        <ASTableHead>
          <ASTableRow>
            {columns.map((col) => (
              <ASTableCell
                key={col.key}
                variant="header"
                wrapperClass="first:pr-3 last:pl-3 px-2"
              >
                {col.name}
              </ASTableCell>
            ))}
          </ASTableRow>
        </ASTableHead>
        <ASTableBody>
          {!isLoading
            ? scanConfigStateData?.data?.reports.map((row) => (
                <ASTableRow
                  key={row.id}
                  onRowClick={() => {
                    navigate(`/site-scanner/scan-details/${row.id}`);
                  }}
                  tabIndex="0"
                >
                  <ASTableCell
                    key="scanSummary"
                    wrapperClass="font-medium text-base-900 first:pr-3 last:pl-3 p-5"
                  >
                    <div className="flex-col font-normal">
                      <div>
                        <span className="mr-2">{row.name}</span>
                        <Badge text={row.wcagVersion.label} />
                      </div>
                      <div className="mt-0.5 flex items-center font-light">
                        <span className="mr-2 flex items-center">
                          <span>
                            <MdPerson className="mr-0.5" color="#9CA3AF" />
                          </span>{' '}
                          {row.createdBy.name}
                        </span>
                        <span className="mr-2">{row.pageCount} pages</span>
                        {getRunTypeBadge(row.scheduled)}
                      </div>
                    </div>
                  </ASTableCell>
                  <ASTableCell>{getCurrrentStatus(row)}</ASTableCell>
                  <ASTableCell>
                    {row.reportSummary ? (
                      <div className="flex">
                        <span className="mr-4 flex items-center">
                          <MdCheckCircle color="#10B981" className="mr-0.5" />
                          {row.reportSummary.success} success
                        </span>
                        <span className="mr-4 flex items-center">
                          <MdCancel color="#EF4444" className="mr-0.5" />
                          {row.reportSummary.failure} failed
                        </span>
                        <span className="flex items-center">
                          <MdOutlineSync
                            color="#FFF"
                            className="bg-attention-500 mr-0.5 rounded-full"
                          />
                          {row.reportSummary.redirect} redirects
                        </span>
                      </div>
                    ) : null}
                  </ASTableCell>
                </ASTableRow>
              ))
            : 'Loading'}
        </ASTableBody>
      </ASTable>
      <NewScan show={showNewScan} closeSlideover={closeSlideover} />
    </div>
  );
}
