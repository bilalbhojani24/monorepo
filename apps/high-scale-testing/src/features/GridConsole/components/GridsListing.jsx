import React from 'react';
import { useNavigate } from 'react-router-dom';
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

import { useGridListing } from './useGridListing';

const GridsListing = () => {
  const { gridList, isRounded, tableCellWrapperClassName } = useGridListing();
  const navigate = useNavigate();

  const gridRowHandler = (gridId) => {
    navigate(`/grid-console/grid/${gridId}/overview`);
  };

  return (
    gridList.length > 0 && (
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
              const gridName = gridData.name;
              const gridStatus = gridData.status;
              const statusModifier =
                gridData.status === 'Online' ? 'success' : 'base';
              const gridId = gridData.id;

              const supportedBrowsers = {
                chrome:
                  gridData.browserSettings.allowedBrowsers.chrome?.length > 0,
                firefox:
                  gridData.browserSettings.allowedBrowsers.firefox?.lenght > 0
              };

              const options = [
                { id: 'delete', body: 'Delete', url: '' },
                {
                  id: 'settings',
                  body: 'Settings',
                  url: `/grid-console/grid/${gridId}/settings/general`
                }
              ];

              return (
                <TableRow className="cursor-pointer">
                  <TableCell wrapperClassName="px-6 py-4">
                    <div
                      role="button"
                      onClick={() => gridRowHandler(gridId)}
                      onKeyDown={() => gridRowHandler(gridId)}
                      tabIndex={0}
                    >
                      <p className="text-base-900 font-normal">{gridName}</p>
                      <p className="text-base-500">b7465tbf76</p>
                    </div>
                  </TableCell>
                  <TableCell wrapperClassName=" px-6 py-4">
                    <div
                      role="button"
                      onClick={() => gridRowHandler(gridId)}
                      onKeyDown={() => gridRowHandler(gridId)}
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
                      onClick={() => gridRowHandler(gridId)}
                      onKeyDown={() => gridRowHandler(gridId)}
                      tabIndex={0}
                      className="text-base-900"
                    >
                      {gridData.runningTests}
                    </div>
                  </TableCell>
                  <TableCell wrapperClassName=" px-6 py-4">
                    <div
                      role="button"
                      onClick={() => gridRowHandler(gridId)}
                      onKeyDown={() => gridRowHandler(gridId)}
                      tabIndex={0}
                      className="text-base-900"
                    >
                      {gridData.queuedTests}
                    </div>
                  </TableCell>
                  <TableCell wrapperClassName=" px-6 py-4">
                    <div
                      role="button"
                      onClick={() => gridRowHandler(gridId)}
                      onKeyDown={() => gridRowHandler(gridId)}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-2">
                        {supportedBrowsers.chrome && <ChromeIcon />}
                        <FirefoxIcon width={20} height={20} />
                        <EdgeIcon width={20} height={20} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell wrapperClassName=" px-6 py-4">
                    <div
                      role="button"
                      onClick={() => gridRowHandler(gridId)}
                      onKeyDown={() => gridRowHandler(gridId)}
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
                        navigate(e.url);
                      }}
                    >
                      <div className="flex">
                        <DropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
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
    )
  );
};

export default GridsListing;
