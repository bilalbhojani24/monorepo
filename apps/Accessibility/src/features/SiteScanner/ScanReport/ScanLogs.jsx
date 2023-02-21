import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineSync,
  MdSchedule,
  SelectMenu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';

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
    name: 'Scanner Status',
    key: 'scannerStatus'
  },
  {
    name: 'Page Status',
    key: 'pageStatus'
  },
  {
    name: 'Description',
    key: 'description'
  }
];

const ScanLogs = ({ isLoading, logs, onFilterApplied }) => {
  const navigate = useNavigate();
  if (isLoading) {
    return 'Loading';
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-64 px-6 py-4">
          <SelectMenu
            isMultiSelect
            onChange={onFilterApplied}
            options={pageStatus}
            placeholder="Page Status"
          />
        </div>
        <div className="flex text-sm">
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
          {logs?.logs.map((row, idx) => (
            <TableRow key={idx} tabIndex="0">
              <TableCell wrapperClass="font-medium text-base-900 border-l-4 border-success-500 first:pr-3 last:pl-3 p-5">
                <div className="text-base-500 flex items-center font-normal">
                  <MdSchedule />
                  <span className="ml-0.5">
                    {dateFormat(new Date(row.time), 'mmmm dS, h:MM:ss TT')}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="ml-0.5">{row.pageUrl}</span>
              </TableCell>
              <TableCell>
                {row.scannerStatus ? (
                  <MdCheckCircle color="#10B981" />
                ) : (
                  <MdCancel color="#EF4444" />
                )}
              </TableCell>
              <TableCell>
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
              </TableCell>
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
  onFilterApplied: () => {}
};

ScanLogs.propTypes = {
  isLoading: PropTypes.bool,
  logs: PropTypes.instanceOf(Object),
  onFilterApplied: PropTypes.func
};
export default ScanLogs;
