import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon,
  InputField,
  MdAdd,
  MdCalendarToday,
  MdCancel,
  MdCheckCircle,
  MdExpandMore,
  MdOutlineContentCopy,
  MdOutlineHistory,
  MdOutlineSync,
  MdPerson,
  MdSearch,
  MdStop,
  MdWebAsset,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import cronstrue from 'cronstrue';
import dateFormat from 'dateformat';
import { logEvent } from 'utils/logEvent';

import {
  fetchScanConfigsById,
  runInstantScan,
  stopRecurringScans
} from '../../api/siteScannerScanConfigs';
import Loader from '../../common/Loader/index';
import NewScanLogo from 'assets/noScans.svg'
import { getWcagVersionFromVal } from '../../utils/helper';

import { getScanConfigs } from './slices/dataSlice';
import NewScan from './NewScan';
import useSiteScanner from './useSiteScanner';

const columns = [
  {
    name: 'Scan summary',
    key: 'scanSummary'
  },
  {
    name: 'Scan type',
    key: 'scanType'
  },
  {
    name: 'Latest scan',
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
    body: 'All scans',
    id: 'allScans'
  },
  {
    body: 'My scans',
    id: 'yourScans'
  }
];

export const rowMenu = [
  {
    id: 'lastScanRun',
    body: (
      <div className="flex items-center">
        <MdOutlineHistory />
        <span className="ml-2">View latest scan run</span>
      </div>
    )
  },
  {
    id: 'newScanRun',
    value: 'newScanRun',
    body: (
      <div className="flex items-center">
        <MdAdd />
        <span className="ml-2">New scan</span>
      </div>
    )
  },
  {
    id: 'stopRecurringScans',
    body: (
      <div className="flex items-center">
        <MdStop />
        <span className="ml-2">Stop recurring scan</span>
      </div>
    )
  },
  {
    id: 'cloneScanConfig',
    body: (
      <div className="flex items-center">
        <MdOutlineContentCopy />
        <span className="ml-2">Clone scan configuration</span>
      </div>
    )
  }
];

const singleMenu = [
  {
    id: 'scanDetails',
    value: 'scanDetails',
    body: (
      <div className="flex items-center">
        <span className="ml-2">View scan details</span>
      </div>
    )
  }
];

const scanDetailsColumn = [
  {
    name: '#',
    key: 'index'
  },
  {
    name: 'URL',
    key: 'url'
  }
];

export default function SiteScanner() {
  const [showNewScan, setShowNewScan] = useState(false);
  const [showStopRecurringModal, setShowStopRecurringModal] = useState(false);
  const [activeRowId, setActiveRowId] = useState(false);
  const [viewScanDetails, setViewScanDetails] = useState(false);
  const [currentScanDetails, setCurrentScanDetails] = useState(false);
  const {
    scanConfigStateData,
    isLoading,
    handleSearch,
    rowMenuOpen,
    setRowMenuOpen,
    preConfigData,
    setPreConfigData,
    handleSearchFilter,
    dataFilter,
    setIsLoading,
    dispatch,
    userInfo
  } = useSiteScanner();
  const navigate = useNavigate();
  /*
    Close Slideover
  */
  const closeSlideover = () => {
    setShowNewScan(false);
  };

  const getRunTypeBadge = (recurring, active, onDemandCount = 0) => {
    if (recurring && active) {
      return (
        <Badge
          text="Recurring: ON"
          wrapperClassName="mr-2"
          modifier="primary"
        />
      );
    }
    if (recurring && !active) {
      return <Badge text="Recurring: OFF" wrapperClassName="mr-2" />;
    }
    const onDemandCountText =
      onDemandCount > 0
        ? `(${onDemandCount} ${onDemandCount > 1 ? 'runs' : 'run'})`
        : '';
    return (
      <Badge text={`On-demand ${onDemandCountText}`} wrapperClassName="mr-2" />
    );
  };

  const getCurrrentStatus = (row) => {
    if (!row.isProcessing && !Object.keys(row.lastScanDetails).length) {
      return <div className="font-medium">N/A</div>;
    }
    if (row.isProcessing && !Object.keys(row.lastScanDetails).length) {
      return (
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="mr-2"
            style={{
              height: '20px',
              width: '20px',
              animation: 'spin 1s linear infinite'
            }}
            viewBox="0 0 100 101"
            fill="#0070F0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="rgba(209, 213, 219, 1)"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          Initializing your scan
        </div>
      );
    }
    if (row?.lastScanDetails && Object.keys(row.lastScanDetails).length) {
      return (
        <div className="flex flex-col font-normal">
          <span className="text-black">
            {row.lastScanDetails.issues} issues
          </span>
          <span className="mt-2 flex items-center">
            <MdOutlineHistory className="mr-0.5" />
            Last scan:{' '}
            {row?.lastScanDetails?.lastScanDate
              ? dateFormat(
                  new Date(row.lastScanDetails.lastScanDate),
                  'mmmm dS, h:MM TT'
                ).toLocaleString()
              : null}
          </span>
        </div>
      );
    }
  };

  const handleStopRecurringScan = (activeRowId) => {
    console.log(activeRowId);
    setIsLoading(true);
    stopRecurringScans(activeRowId.id)
      .then((data) => {
        setIsLoading(false);
        dispatch(getScanConfigs());
        setShowStopRecurringModal(false);
        // alert('Stopped Recurring scan');
      })
      .catch((err) => console.log(err));
  };
  const getActionForAnalytics = (val) => {
    switch (val) {
      case 'newScanRun':
        return 'Trigger an on-demand scan run';
      case 'stopRecurringScans':
        return 'Open stop recurring scans modal';
      case 'cloneScanConfig':
        return 'Clone and open new scan run slide over';
      case 'lastScanRun':
        return 'View latest scan run report';
      case 'scanDetails':
        return 'View scan details';
      default:
        break;
    }
  };

  const handleRowMenuClick = (e, rowData) => {
    const menuItem = e.id;
    logEvent('InteractedWithWSHomepage', {
      actionType: 'Scan changes',
      action: getActionForAnalytics(menuItem),
      scanType: rowData.recurring ? 'Recurring scan' : 'On-demand scan'
    });
    switch (menuItem) {
      case 'newScanRun':
        setIsLoading(true);
        runInstantScan(rowData.id)
          .then((data) => {
            setIsLoading(false);
            dispatch(getScanConfigs());
            // alert('Stopped Recurring scan');
          })
          .catch((err) => console.log(err));
        break;
      case 'cloneScanConfig':
        fetchScanConfigsById(rowData.id)
          .then((config) => {
            setShowNewScan(true);
            setPreConfigData(config.data);
          })
          .catch((err) => console.log(err));
        break;
      case 'stopRecurringScans':
        setShowStopRecurringModal(true);
        setActiveRowId(rowData);
        break;
      case 'lastScanRun':
        navigate(
          `/site-scanner/scan-report?id=${rowData.lastScanDetails.reportId}`
        );
        break;
      case 'scanDetails':
        setPreConfigData();
        setViewScanDetails(true);
        setCurrentScanDetails(rowData);
        fetchScanConfigsById(rowData.id)
          .then((config) => {
            setPreConfigData(config.data);
          })
          .catch((err) => console.log(err));
        break;
      default:
        console.log(menuItem);
        break;
    }
  };
  const currentFilter = typesScan.filter((type) => type.id === dataFilter)[0];
  if (isLoading) {
    return (
      <div className="mt-8 flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const getRowMenu = (row) => {
    let rowMenuCpy = [...rowMenu];
    if (!Object.keys(row.lastScanDetails).length) {
      rowMenuCpy = rowMenuCpy.slice(0, -1);
    }
    if (row.createdBy.id !== userInfo.user_id) {
      rowMenuCpy = [
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
    }
    if (!row.recurring || !row.active) {
      rowMenuCpy = [
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
    }
    return rowMenuCpy.map((opt) => (
      <DropdownOptionItem key={opt.id} option={opt} />
    ));
  };
  console.log(scanConfigStateData);
  return (
    <div className="bg-base-50">
      <div className="flex justify-between p-6 pb-0">
        <div>
          <h1 className="mb-2 text-2xl font-bold">Website scanner</h1>
          <h3 className="text-base-500 mb-4 text-sm font-medium">
            Scan multiple pages in one go and schedule periodic scans to monitor
            your pages for accessibility issues
          </h3>
        </div>
        {scanConfigStateData?.data?.scanConfigs?.length ? (
          <Button
            modifier="primary"
            onClick={() => {
              logEvent('InteractedWithWSHomepage', {
                actionType: 'Configure new scan',
                action: 'Open new website scan slide over'
              });
              setShowNewScan(true);
            }}
            size="small"
            type="subtle"
            wrapperClassName="h-10"
          >
            New website scan
          </Button>
        ):null}
      </div>
      {scanConfigStateData?.data?.scanConfigs?.length ? (
        <>
          <div className="block p-6 pt-0">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="mt-1 mr-4 w-64">
                  <InputField
                    onChange={handleSearch}
                    id="search-scan"
                    placeholder="Search for scan name or user..."
                    leadingIcon={<MdSearch />}
                  />
                </div>
                <div className="mt-1 mr-4">
                  <Dropdown onClick={handleSearchFilter} id="scanFilter">
                    <div className="flex">
                      <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                        {currentFilter.body}
                        <MdExpandMore className="h-5 w-5" aria-hidden="true" />
                      </DropdownTrigger>
                    </div>

                    <DropdownOptionGroup>
                      {typesScan.map((opt) => (
                        <DropdownOptionItem key={opt.id} option={opt} />
                      ))}
                    </DropdownOptionGroup>
                  </Dropdown>
                </div>
              </div>
              {/* <div>
            <Badge
              text={`${
                scanConfigStateData?.data?.numRecurringScans || 0
              } recurring active scans`}
              modifier="primary"
            />
          </div> */}
            </div>
          </div>
          <div
            className="fixed overflow-y-auto"
            style={{
              height: 'calc(100vh - 228px)',
              width: 'calc(100vw - 256px)'
            }}
          >
            <Table>
              <TableHead wrapperClassName="border-t border-base-200">
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      variant="header"
                      wrapperClassName="text-base-500 font-medium"
                    >
                      {col.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {scanConfigStateData?.data?.scanConfigs?.map((row) => (
                  <TableRow
                    key={row.id}
                    onRowClick={() => {
                      if (Object.keys(row.lastScanDetails).length) {
                        logEvent('InteractedWithWSHomepage', {
                          actionType: 'Open Scan',
                          scanType: row.recurring
                            ? 'Recurring scan'
                            : 'On-demand scan',
                          scanName: row.name
                        });
                        navigate(`/site-scanner/scan-details/${row.id}`);
                      }
                    }}
                  >
                    <TableCell
                      key="scanSummary"
                      wrapperClass="font-medium text-base-900 first:pr-3 last:pl-3 p-5"
                    >
                      <div className="flex-col font-normal">
                        <div className="flex">
                          <div
                            title={row.name}
                            className="text-base-700 mr-2 max-w-xs truncate font-medium"
                          >
                            {row.name}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="mr-2 flex items-center">
                            <span>
                              <MdPerson className="mr-0.5" color="#9CA3AF" />
                            </span>{' '}
                            {row?.createdBy?.name}
                          </span>
                          <span className="mr-2 flex items-center">
                            <MdWebAsset color="#9CA3AF" className="mr-1" />
                            {row.pageCount || 0} pages
                          </span>
                          <span>{row.wcagVersion.label}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex-col">
                        {getRunTypeBadge(
                          row.recurring,
                          row.active,
                          row?.onDemandCount
                        )}
                        {row.isProcessing &&
                        Object.keys(row.lastScanDetails).length ? (
                          <div className="mt-2 flex items-center">
                            Scan Ongoing
                            <svg
                              aria-hidden="true"
                              className="ml-2"
                              style={{
                                height: '20px',
                                width: '20px',
                                animation: 'spin 1s linear infinite'
                              }}
                              viewBox="0 0 100 101"
                              fill="#0070F0"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="rgba(209, 213, 219, 1)"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : null}
                        {!row.isProcessing && row.nextScanDate ? (
                          <span className="mr-2 mt-2 flex items-center">
                            Next:{' '}
                            {dateFormat(
                              new Date(row.nextScanDate),
                              'mmmm dS, h:MM TT'
                            ).toLocaleString()}
                          </span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>{getCurrrentStatus(row)}</TableCell>
                    <TableCell>
                      {row?.lastScanDetails?.reportSummary ? (
                        <div className="flex">
                          <Tooltip
                            theme="dark"
                            placementSide="bottom"
                            content={
                              <TooltipBody wrapperClassName="mb-0">
                                {`Success: ${row?.lastScanDetails?.reportSummary?.success} `}
                              </TooltipBody>
                            }
                          >
                            <div className="mr-2 flex items-center">
                              <MdCheckCircle
                                color="#10B981"
                                className="mr-0.5"
                                fontSize="medium"
                              />
                              <p className="w-7">
                                {row?.lastScanDetails?.reportSummary?.success}
                              </p>
                            </div>
                          </Tooltip>
                          <Tooltip
                            theme="dark"
                            placementSide="bottom"
                            content={
                              <TooltipBody wrapperClassName="mb-0">
                                {`Failure: ${row?.lastScanDetails?.reportSummary?.failure}`}
                              </TooltipBody>
                            }
                          >
                            <div className="mr-2 flex items-center">
                              <MdCancel
                                color="#EF4444"
                                className="mr-0.5"
                                fontSize="medium"
                              />
                              <p className="w-7">
                                {row?.lastScanDetails?.reportSummary?.failure}
                              </p>
                            </div>
                          </Tooltip>
                          <Tooltip
                            theme="dark"
                            placementSide="bottom"
                            content={
                              <TooltipBody wrapperClassName="mb-0">
                                {`Redirect: ${row?.lastScanDetails?.reportSummary?.redirect} `}
                              </TooltipBody>
                            }
                          >
                            <div className="flex items-center">
                              <MdOutlineSync
                                color="#FFF"
                                className="bg-attention-500 mr-0.5 rounded-full"
                                fontSize="medium"
                              />
                              <p className="w-7">
                                {row?.lastScanDetails?.reportSummary?.redirect}
                              </p>
                            </div>
                          </Tooltip>
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Dropdown
                        onClick={(val, e) => {
                          e.stopPropagation();
                          handleRowMenuClick(val, row);
                        }}
                        id="scanFilter"
                      >
                        <div className="flex">
                          <DropdownTrigger
                            onClick={(e) => {
                              e.stopPropagation();
                              setRowMenuOpen(!rowMenuOpen);
                            }}
                            wrapperClassName="p-0 border-0 shadow-none"
                          >
                            <EllipsisVerticalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </DropdownTrigger>
                        </div>

                        <DropdownOptionGroup>
                          {row.isProcessing ||
                          !Object.keys(row.lastScanDetails).length
                            ? singleMenu.map((opt) => (
                                <DropdownOptionItem key={opt.id} option={opt} />
                              ))
                            : getRowMenu(row)}
                        </DropdownOptionGroup>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <NewScan
            show={showNewScan}
            closeSlideover={closeSlideover}
            preConfigData={preConfigData}
          />
          {/* View Running Scan Details */}
          <Modal
            show={viewScanDetails}
            size="lg"
            onOverlayClick={() => {
              setViewScanDetails(false);
              setCurrentScanDetails(null);
            }}
          >
            <ModalHeader
              handleDismissClick={() => {
                setViewScanDetails(false);
                setCurrentScanDetails(null);
              }}
              heading={currentScanDetails?.name || ''}
              subHeading={`Scan schedule: ${
                preConfigData?.schedulePattern
                  ? cronstrue.toString(preConfigData?.schedulePattern, {
                      verbose: true
                    })
                  : ''
              }`}
            />
            <ModalBody>
              {!preConfigData ? (
                <p>Loading..</p>
              ) : (
                <>
                  <div className="my-4">
                    <span className="mr-2 flex items-center text-sm">
                      <span className="mr-0.5 flex items-center">
                        <MdPerson color="#9CA3AF" className="mr-2" />
                        <span className="text-base-500 mr-2">
                          {currentScanDetails?.createdBy?.name}
                        </span>
                      </span>{' '}
                      {/* <span className="text-base-500">{preConfigData?.urlSet}</span> */}
                      {preConfigData?.scanData?.wcagVersion && (
                        <Badge
                          text={
                            getWcagVersionFromVal(
                              preConfigData?.scanData?.wcagVersion
                            )?.body
                          }
                          wrapperClassName="mr-2"
                        />
                      )}
                      {preConfigData?.scanData?.bestPractices && (
                        <Badge
                          text="Best practices enabled"
                          wrapperClassName="mr-2"
                        />
                      )}
                    </span>
                  </div>
                  <div className="my-4">
                    <Table>
                      <TableHead>
                        <TableRow>
                          {scanDetailsColumn.map((col) => (
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
                        {preConfigData?.scanData?.urlSet.map((row, idx) => (
                          <TableRow
                            key={idx}
                            onRowClick={() => {
                              // navigate('/site-scanner/scan-report/12');
                            }}
                            tabIndex="0"
                          >
                            <TableCell
                              key={row}
                              wrapperClass="first:pr-3 last:pl-3 p-5"
                            >
                              {idx + 1}
                            </TableCell>
                            <TableCell
                              key={row}
                              wrapperClass="first:pr-3 last:pl-3 p-5"
                            >
                              {row}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter position="right">
              <Button
                onClick={() => {
                  setViewScanDetails(false);
                  setCurrentScanDetails(null);
                }}
                colors="white"
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {showStopRecurringModal ? (
            <div>
              <Modal
                show={showStopRecurringModal}
                size="lg"
                onOverlayClick={() => {
                  setShowStopRecurringModal(false);
                }}
              >
                <ModalHeader
                  handleDismissClick={() => {
                    setShowStopRecurringModal(false);
                  }}
                  heading="Stop recurring scans"
                  subHeading="Are you sure you want to stop recurring scans for this configuration. This action cannot be undone."
                />
                <ModalFooter position="right">
                  <Button
                    onClick={() => {
                      setShowStopRecurringModal(false);
                    }}
                    colors="white"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      handleStopRecurringScan(activeRowId);
                    }}
                    variant="primary"
                    colors="danger"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading' : 'Stop scans'}
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          ) : null}
        </>
      ) : (
        scanConfigStateData.success ? <div
          className="justify-center"
          style={{ height: 'calc(100vh - 320px)' }}
        >
          <div className="mt-8 flex flex-col items-center justify-center w-full mt-40 mb-5">
            <img src={NewScanLogo} alt="new scan logo" className="mb-5" />
            <div className="mb-5 flex flex-col items-center">
              <span>No scans to show.</span>
              <span className="text-base-500">
                Get started by creating a new website scan.
              </span>
            </div>
            <Button
              modifier="primary"
              onClick={() => {
                logEvent('InteractedWithWSHomepage', {
                  actionType: 'Configure new scan',
                  action: 'Open new website scan slide over'
                });
                setShowNewScan(true);
              }}
              size="small"
              type="subtle"
              wrapperClassName="h-10 mb-5"
            >
              New website scan
            </Button>
          </div>
        </div>:null
      )}
    </div>
  );
}
