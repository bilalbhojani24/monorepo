import React from 'react';
import {
  Badge,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import ChromeIcon from 'assets/icons/components/browsers/ChromeIcon';
import EdgeIcon from 'assets/icons/components/browsers/EdgeIcon';
import FirefoxIcon from 'assets/icons/components/browsers/FirefoxIcon';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import { logHSTEvent } from 'utils/logger';

import DeleteGrid from './DeleteGrid';
import { useGridListing } from './useGridListing';

const GridsListing = () => {
  const {
    activeGridName,
    closeDeleteGridModal,
    deletionCommand,
    deleteDropDownClickHandler,
    gridList,
    gridRowHandler,
    isRounded,
    navigate,
    showDeleteGridModal,
    tableCellWrapperClassName
  } = useGridListing();

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
                const gridSpawnedVia = gridData.spawnedVia;
                const gridStatus = gridData.status;
                const statusModifier =
                  gridData.status === 'Online' ? 'success' : 'base';
                const gridId = gridData.id;

                const supportedBrowsers = {
                  chrome: gridData.stats.browsersUsed.indexOf('chrome') > -1,
                  firefox: gridData.stats.browsersUsed.indexOf('firefox') > -1,
                  edge:
                    gridData.stats.browsersUsed.indexOf('MicrosoftEdge') > -1
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
                  logHSTEvent(['amplitude'], AGAutomationConsoleInteracted, {
                    action: 'grid_selected',
                    grid_name: gridName,
                    grid_id: gridId
                  });
                  gridRowHandler(gridId);
                };

                const filteredOptions = options.filter(
                  (opt) =>
                    (opt.id === 'delete' && !gridData.isTrialGrid) ||
                    opt.id === 'settings'
                );

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
                        {gridData.stats.runningTests}
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
                        {gridData.stats.queuedTests}
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
                          {!supportedBrowsers.chrome &&
                            !supportedBrowsers.firefox &&
                            !supportedBrowsers.edge &&
                            '-'}
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
                              gridName,
                              gridSpawnedVia
                            );
                          } else {
                            navigate(e.url);
                          }
                        }}
                      >
                        <div className="flex">
                          <DropdownTrigger
                            onClick={() =>
                              logHSTEvent(
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
                          {filteredOptions.map((opt) => (
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

        <DeleteGrid
          activeGridName={activeGridName}
          closeDeleteGridModal={closeDeleteGridModal}
          deletionCommand={deletionCommand}
          showDeleteGridModal={showDeleteGridModal}
        />
      </>
    )
  );
};

export default GridsListing;
