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
  const { gridList, isRounded, options, tableCellWrapperClassName } =
    useGridListing();
  const navigate = useNavigate();

  const gridRowHandler = (gridId) => {
    navigate(`/grid-console/grid/${gridId}`);
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
              const gridId = gridData.gridProfile.id;

              const supportedBrowsers = {
                chrome:
                  gridData.browserSettings.allowedBrowsers.chrome?.length > 0,
                firefox:
                  gridData.browserSettings.allowedBrowsers.firefox?.lenght > 0
              };

              return (
                <TableRow onRowClick={() => gridRowHandler(gridId)}>
                  <TableCell wrapperClassName="text-base-900 first:pr-3 last:pl-3 px-2 py-2">
                    <p className="font-normal">{gridName}</p>
                    <p className="text-base-500">b7465tbf76</p>
                  </TableCell>
                  <TableCell wrapperClassName="first:pr-3 last:pl-3 px-2 py-2">
                    <Badge
                      disabled
                      hasDot={false}
                      hasRemoveButton={false}
                      isRounded={isRounded}
                      modifier={statusModifier}
                      text={gridStatus}
                    />
                  </TableCell>
                  <TableCell wrapperClassName=" first:pr-3 last:pl-3 px-2 py-2">
                    {gridData.runningTests}
                  </TableCell>
                  <TableCell wrapperClassName="first:pr-3 last:pl-3 px-2 py-2">
                    {gridData.queuedTests}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {supportedBrowsers.chrome && <ChromeIcon />}
                      <FirefoxIcon width={20} height={20} />
                      <EdgeIcon width={20} height={20} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>{clusterName}</p>
                    <p>{clusterIdentifier}</p>
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      onClick={(value) => {
                        // eslint-disable-next-line no-console
                        console.log(value);
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

                      <DropdownOptionGroup>
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
