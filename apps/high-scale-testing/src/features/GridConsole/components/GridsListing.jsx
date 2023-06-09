import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  CodeSnippet,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { logEvent } from '@browserstack/utils';
import ChromeIcon from 'assets/icons/components/browsers/ChromeIcon';
import EdgeIcon from 'assets/icons/components/browsers/EdgeIcon';
import FirefoxIcon from 'assets/icons/components/browsers/FirefoxIcon';
import { AGAutomationConsoleInteracted } from 'constants/event-names';

import { useGridListing } from './useGridListing';

const GridsListing = () => {
  const {
    activeGridName,
    closeDeleteGridModal,
    deletionCommand,
    deleteDropDownClickHandler,
    gridList,
    isRounded,
    showDeleteGridModal,
    tableCellWrapperClassName
  } = useGridListing();
  const navigate = useNavigate();

  const gridRowHandler = (gridId) => {
    navigate(`/grid-console/grid/${gridId}/overview`);
  };

  return (
    gridList.length > 0 && (
      <>
        <div className="p-6">
          <Table containerWrapperClass=" border-base-50  rounded-lg  shadow-none">
            <TableHead wrapperClassName="uppercase text-base-500">
              <TableRow>
                <TableCell
                  variant="header"
                  wrapperClassName={tableCellWrapperClassName}
                >
                  Grid
                </TableCell>
                <TableCell
                  variant="header"
                  wrapperClassName={tableCellWrapperClassName}
                >
                  Status
                </TableCell>
                <TableCell
                  variant="header"
                  wrapperClassName={tableCellWrapperClassName}
                >
                  Running Tests
                </TableCell>
                <TableCell
                  variant="header"
                  wrapperClassName={tableCellWrapperClassName}
                >
                  Queued Tests
                </TableCell>
                <TableCell
                  variant="header"
                  wrapperClassName={tableCellWrapperClassName}
                >
                  Browsers
                </TableCell>
                <TableCell
                  variant="header"
                  wrapperClassName={tableCellWrapperClassName}
                >
                  Cluster
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {gridList.map((gridData) => {
                const clusterIdentifier = gridData.cluster.identifier;
                const clusterName = gridData.cluster.name;
                const gridIdentfierRaw = gridData.identifier;
                const gridIdentfier = gridIdentfierRaw.split('-')[0];
                const gridName = gridData.name;
                const gridStatus = gridData.status;
                const statusModifier =
                  gridData.status === 'Online' ? 'success' : 'base';
                const gridId = gridData.id;

                const supportedBrowsers = {
                  chrome:
                    gridData.browserSettings.allowedBrowsers.chrome?.length > 0,
                  firefox:
                    gridData.browserSettings.allowedBrowsers.firefox?.length >
                    0,
                  edge:
                    gridData.browserSettings.allowedBrowsers.MicrosoftEdge
                      ?.length > 0
                };

                const options = [
                  { id: 'delete', body: 'Delete', url: '' },
                  {
                    id: 'settings',
                    body: 'Settings',
                    url: `/grid-console/grid/${gridId}/settings/general`
                  }
                ];

                const cellClickhandler = () => {
                  logEvent(['amplitude'], AGAutomationConsoleInteracted, {
                    action: 'grid_selected',
                    grid_name: gridName,
                    grid_id: gridId
                  });
                  gridRowHandler(gridId);
                };

                return (
                  <TableRow className="cursor-pointer">
                    <TableCell wrapperClassName="px-6 py-4">
                      <div
                        role="button"
                        onClick={cellClickhandler}
                        onKeyDown={cellClickhandler}
                        tabIndex={0}
                      >
                        <p className="text-base-900 font-normal">{gridName}</p>
                        <p className="text-base-500">{gridIdentfier}</p>
                      </div>
                    </TableCell>
                    <TableCell wrapperClassName=" px-6 py-4">
                      <div
                        role="button"
                        onClick={cellClickhandler}
                        onKeyDown={cellClickhandler}
                        tabIndex={0}
                      >
                        <Badge
                          disabled
                          hasDot={false}
                          hasRemoveButton={false}
                          isRounded={isRounded}
                          modifier={statusModifier}
                          text={gridStatus}
                        />
                      </div>
                    </TableCell>
                    <TableCell wrapperClassName="px-6 py-4">
                      <div
                        role="button"
                        onClick={cellClickhandler}
                        onKeyDown={cellClickhandler}
                        tabIndex={0}
                        className="text-base-900 items-center"
                      >
                        {gridData.runningTests}
                      </div>
                    </TableCell>
                    <TableCell wrapperClassName=" px-6 py-4">
                      <div
                        role="button"
                        onClick={cellClickhandler}
                        onKeyDown={cellClickhandler}
                        tabIndex={0}
                        className="text-base-900"
                      >
                        {gridData.queuedTests}
                      </div>
                    </TableCell>
                    <TableCell wrapperClassName=" px-6 py-4">
                      <div
                        role="button"
                        onClick={cellClickhandler}
                        onKeyDown={cellClickhandler}
                        tabIndex={0}
                      >
                        <div className="flex items-center gap-2">
                          {supportedBrowsers.chrome && <ChromeIcon />}
                          {supportedBrowsers.firefox && (
                            <FirefoxIcon width={20} height={20} />
                          )}
                          {supportedBrowsers.edge && (
                            <EdgeIcon width={20} height={20} />
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell wrapperClassName=" px-6 py-4">
                      <div
                        role="button"
                        onClick={cellClickhandler}
                        onKeyDown={cellClickhandler}
                        tabIndex={0}
                      >
                        <p className="text-base-900">{clusterName}</p>
                        <p>{clusterIdentifier}</p>
                      </div>
                    </TableCell>
                    <TableCell
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      role="button"
                    >
                      <Dropdown
                        onClick={(e) => {
                          if (e.id === 'delete') {
                            deleteDropDownClickHandler(
                              gridIdentfierRaw,
                              gridName
                            );
                          } else {
                            navigate(e.url);
                          }
                        }}
                      >
                        <div className="flex">
                          <DropdownTrigger
                            onClick={() =>
                              logEvent(
                                ['ampltidue'],
                                'web_events',
                                AGAutomationConsoleInteracted,
                                {
                                  action: 'gridmenu_selected',
                                  grid_name: gridName,
                                  grid_id: gridId
                                }
                              )
                            }
                            wrapperClassName="p-0 border-0 shadow-none"
                          >
                            <EllipsisVerticalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </DropdownTrigger>
                        </div>

                        <DropdownOptionGroup wrapperClassName="w-full">
                          {options.map((opt) => (
                            <DropdownOptionItem key={opt.value} option={opt} />
                          ))}
                        </DropdownOptionGroup>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <Modal show={showDeleteGridModal} size="xl">
          <ModalBody className="overflow-auto py-5">
            <div className="flex flex-col">
              <div className="bg-danger-100 m-auto flex h-12 w-12 items-center justify-center rounded-full">
                <ExclamationTriangleIcon
                  className="text-danger-600 h-6 w-6"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 flex flex-col text-center">
                <h3 className="text-base-900 text-lg font-medium">
                  Delete Grid
                </h3>
                <p className="text-base-500 mt-2 text-sm">
                  Run the below command to delete the grid '{activeGridName}'
                </p>
              </div>

              <div className="mt-2">
                <CodeSnippet
                  code={deletionCommand}
                  maxHeight="260px"
                  singleLine
                  language="bash"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter position="right">
            <Button
              aria-label="Close"
              colors="white"
              fullWidth
              onClick={closeDeleteGridModal}
              type="button"
              varaint="primary"
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  );
};

export default GridsListing;
