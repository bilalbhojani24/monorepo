import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Dropdown,
  DropdownTriggerWIcon,
  DropdownTriggerWText,
  InputField,
  MdAdd,
  MdCancel,
  MdCheckCircle,
  MdOutlineContentCopy,
  MdOutlineHistory,
  MdOutlineMoreVert,
  MdOutlineSync,
  MdPerson,
  MdSearch,
  MdStop,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import dateFormat from 'dateformat';

import { fetchScanConfigsById } from '../../api/siteScannerScanConfigs';

// import { rowMenu } from './constants';
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
  },
  {
    name: '',
    key: 'menu'
  }
];

const typesScan = [
  {
    body: 'All Scans',
    id: 'allScans'
  },
  {
    body: 'Your Scans',
    id: 'yourScans'
  },
  {
    body: 'Other Scans',
    id: 'otherScans'
  }
];

export const rowMenu = [
  {
    id: 'newScanRun',
    value: 'newScanRun',
    body: (
      <div className="flex items-center">
        <MdAdd />
        <span className="ml-2">New Scan</span>
      </div>
    )
  },
  {
    id: 'stopRecurringScans',
    body: (
      <div className="flex items-center">
        <MdStop />
        <span className="ml-2">Stop Recurring Scan</span>
      </div>
    )
  },
  {
    id: 'cloneScanConfig',
    body: (
      <div className="flex items-center">
        <MdOutlineContentCopy />
        <span className="ml-2">Clone Scan Configuration</span>
      </div>
    )
  },
  {
    id: 'lastScanRun',
    body: (
      <div className="flex items-center">
        <MdOutlineHistory />
        <span className="ml-2">View last scan run</span>
      </div>
    )
  }
];

const singleMenu = [
  {
    id: 'scanRun',
    value: 'scanRun',
    body: (
      <div className="flex items-center">
        <span className="ml-2">View Scan Details</span>
      </div>
    )
  }
];

export default function SiteScanner() {
  const [showNewScan, setShowNewScan] = useState(false);
  const [viewScanDetails, setViewScanDetails] = useState(false);
  const {
    scanConfigStateData,
    isLoading,
    handleSearch,
    rowMenuOpen,
    setRowMenuOpen,
    preConfigData,
    setPreConfigData,
    handleSearchFilter
  } = useSiteScanner();
  const navigate = useNavigate();
  /*
    Close Slideover
  */
  const closeSlideover = () => {
    setShowNewScan(false);
  };

  const getRunTypeBadge = (recurring, active) => {
    if (recurring && active) {
      return (
        <Badge text="Recurring On" wrapperClassName="mr-2" modifier="primary" />
      );
    }
    if (recurring && !active) {
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
        <span className="text-black">{row.lastScanDetails.issues} issues</span>
        <span className="flex items-center">
          <MdOutlineHistory className="mr-0.5" />
          Last scan:{' '}
          {dateFormat(
            new Date(row.lastScanDetails.lastScanDate),
            'mmmm dS, h:MM:ss TT'
          )}
        </span>
      </div>
    );
  };

  const handleRowMenuClick = (e, rowData) => {
    const menuItem = e.target.textContent;
    switch (menuItem) {
      case 'New Scan':
        setShowNewScan(true);
        break;
      case 'Clone Scan Configuration':
        fetchScanConfigsById()
          .then((config) => {
            setPreConfigData(config.data);
            setShowNewScan(true);
          })
          .catch((err) => console.log(err));
        break;
      case 'View last scan run':
        navigate(
          `/site-scanner/scan-report?id=${rowData.lastScanDetails.reportId}`
        );
        break;
      case 'View Scan Details':
        break;
      default:
        console.log(menuItem);
        break;
    }
  };

  console.log(scanConfigStateData, showNewScan);
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
              <InputField
                onChange={handleSearch}
                id="search-scan"
                placeholder="Search for name or user..."
                leadingIcon={<MdSearch />}
              />
            </div>
            <div className="mt-1 mr-4">
              <Dropdown
                trigger={
                  <DropdownTriggerWText>
                    {typesScan[0].body}
                  </DropdownTriggerWText>
                }
                options={typesScan}
                onClick={handleSearchFilter}
                id="scanFilter"
              />
            </div>
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
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                variant="header"
                wrapperClass="first:pr-3 last:pl-3 px-2"
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading
            ? scanConfigStateData?.data?.reports.map((row) => (
                <TableRow
                  key={row.id}
                  onRowClick={() => {
                    if (!rowMenuOpen) {
                      navigate(`/site-scanner/scan-details/${row.id}`);
                    }
                  }}
                  tabIndex="0"
                >
                  <TableCell
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
                        {getRunTypeBadge(row.recurring, row.active)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCurrrentStatus(row)}</TableCell>
                  <TableCell>
                    {row?.lastScanDetails?.reportSummary ? (
                      <div className="flex">
                        <span className="mr-4 flex items-center">
                          <MdCheckCircle color="#10B981" className="mr-0.5" />
                          {row?.lastScanDetails?.reportSummary?.success} success
                        </span>
                        <span className="mr-4 flex items-center">
                          <MdCancel color="#EF4444" className="mr-0.5" />
                          {row?.lastScanDetails?.reportSummary?.failure} failed
                        </span>
                        <span className="flex items-center">
                          <MdOutlineSync
                            color="#FFF"
                            className="bg-attention-500 mr-0.5 rounded-full"
                          />
                          {row?.lastScanDetails?.reportSummary?.redirect}{' '}
                          redirects
                        </span>
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      trigger={
                        <DropdownTriggerWIcon
                          variant="meatball-button"
                          icon={<MdOutlineMoreVert />}
                          wrapperClassName="text-lg"
                        />
                      }
                      options={
                        row.scanStatus === 'ongoing' ? singleMenu : rowMenu
                      }
                      onClick={(e) => handleRowMenuClick(e, row)}
                      onOpenChange={(e) => {
                        setRowMenuOpen(e);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            : 'Loading'}
        </TableBody>
      </Table>
      <NewScan
        show={showNewScan}
        closeSlideover={closeSlideover}
        preConfigData={preConfigData}
      />
    </div>
  );
}
