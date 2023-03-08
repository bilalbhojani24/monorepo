import React, { useState } from 'react';
import {
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  MdCancel,
  MdCheckCircle,
  MdExpandMore,
  MdOutlineSync,
  MdSchedule,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';

import Loader from '../../../common/Loader';

import { pageStatus } from './constants';

const columns = [
  {
    name: 'Date',
    key: 'date',
    isSortable: true
  },
  {
    name: 'Page',
    key: 'page',
    isSortable: true
  },
  {
    name: 'Description',
    key: 'description'
  }
];

const ScanLogs = ({ isLoading, logs, onFilterApplied, selected }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-64 px-6 py-4">
          {/* <Dropdown onClick={onFilterApplied} id="scanFilter">
            <div className="flex">
              <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                Status
                <MdExpandMore className="h-5 w-5" aria-hidden="true" />
              </DropdownTrigger>
            </div>

            <DropdownOptionGroup>
              {pageStatus.map((opt) => (
                <DropdownOptionItem key={opt.id} option={opt} />
              ))}
            </DropdownOptionGroup>
          </Dropdown> */}
          <ComboBox onChange={onFilterApplied} value={selected} isMulti>
            <ComboboxTrigger placeholder="Status" />
            <ComboboxOptionGroup>
              {pageStatus.map((item) => (
                <ComboboxOptionItem
                  key={item.value}
                  option={item}
                  wrapperClassName="text-base-500"
                />
              ))}
            </ComboboxOptionGroup>
          </ComboBox>
        </div>
        {/* <div className="flex text-sm">
          <span className="mr-4 flex items-center">
            <MdCheckCircle color="#10B981" className="mr-0.5" />
            Success
          </span>
          <span className="mr-4 flex items-center">
            <MdCancel color="#EF4444" className="mr-0.5" />
            Failure
          </span>
          <span className="mr-8 flex items-center">
            <MdOutlineSync
              color="#FFF"
              className="bg-attention-500 mr-0.5 rounded-full"
            />
            Redirect
          </span>
        </div> */}
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
          {logs?.logs.map((row, idx) => (
            <TableRow key={idx} tabIndex="0">
              <TableCell wrapperClass="font-medium text-base-900 border-l-4 border-success-500 first:pr-3 last:pl-3 p-5">
                <div className="text-base-500 flex items-center font-normal">
                  <MdSchedule />
                  <span className="ml-0.5">
                    {dateFormat(new Date(row.time), 'mmmm dS, h:MM TT')}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="mr-2 flex items-center">
                  {row.cumulativeStatus === 'success' && (
                    <MdCheckCircle color="#10B981" />
                  )}
                  {row.cumulativeStatus === 'redirected' && (
                    <MdOutlineSync
                      color="#FFF"
                      className="bg-attention-500 mr-0.5 rounded-full"
                    />
                  )}
                  {row.cumulativeStatus === 'error' && (
                    <MdCancel color="#EF4444" />
                  )}
                  <span className="ml-2">{row.pageUrl}</span>
                </div>
              </TableCell>
              {/* <TableCell>
                {row.pageStatus === 'success' && (
                  <MdCheckCircle color="#10B981" />
                )}
                {row.pageStatus === 'redirected' && (
                  <MdOutlineSync
                    color="#FFF"
                    className="bg-attention-500 mr-0.5 rounded-full"
                  />
                )}
                {row.pageStatus === 'error' && <MdCancel color="#EF4444" />}
              </TableCell> */}
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

ScanLogs.defaultProps = {
  isLoading: false,
  logs: {},
  onFilterApplied: () => {},
  selected: null
};

ScanLogs.propTypes = {
  isLoading: PropTypes.bool,
  logs: PropTypes.instanceOf(Object),
  selected: PropTypes.instanceOf(Object),
  onFilterApplied: PropTypes.func
};
export default ScanLogs;
