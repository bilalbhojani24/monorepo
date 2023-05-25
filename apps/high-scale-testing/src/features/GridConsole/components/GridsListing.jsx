import React from 'react';
import { useDispatch } from 'react-redux';
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

import { setGridId } from '../slices/index';

import { useGridListing } from './useGridListing';

const GridsListing = () => {
  const { gridList, options, tableCellWrapperClassName } = useGridListing();
  const dispatch = useDispatch();

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
                Running
              </TableCell>
              <TableCell
                variant="header"
                wrapperClassName={tableCellWrapperClassName}
              >
                Queued
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
                Clusters
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {gridList.map((e) => {
              const gridName = e.name;
              const gridStatus = e.status;
              const statusModifier = e.status === 'Online' ? 'success' : 'base';
              const gridId = e.gridProfile.id;

              return (
                <TableRow
                  onRowClick={() => {
                    dispatch(
                      setGridId({
                        gridId
                      })
                    );
                  }}
                >
                  <TableCell wrapperClassName="text-base-900 first:pr-3 last:pl-3 px-2 py-2">
                    <p className="font-normal">{gridName}</p>
                    <p className="text-base-500">b7465tbf76</p>
                  </TableCell>
                  <TableCell wrapperClassName="first:pr-3 last:pl-3 px-2 py-2">
                    <Badge
                      disabled
                      hasDot={false}
                      hasRemoveButton={false}
                      // eslint-disable-next-line react/jsx-boolean-value
                      isRounded={true}
                      modifier={statusModifier}
                      text={gridStatus}
                    />
                  </TableCell>
                  <TableCell wrapperClassName=" first:pr-3 last:pl-3 px-2 py-2">
                    0/50
                  </TableCell>
                  <TableCell wrapperClassName="first:pr-3 last:pl-3 px-2 py-2">
                    0/50
                  </TableCell>
                  <TableCell>
                    <p>Browsers</p>
                  </TableCell>
                  <TableCell>
                    <p>hig-scale-grid-cluster</p>
                    <p>b364rtbc764</p>
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
