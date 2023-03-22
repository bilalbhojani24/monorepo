import React from 'react';
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineSync,
  MdSchedule,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import Loader from 'common/Loader';
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
          <SelectMenu onChange={onFilterApplied} value={selected} isMulti>
            <SelectMenuTrigger placeholder="Status" />
            <SelectMenuOptionGroup>
              {pageStatus.map((item) => (
                <SelectMenuOptionItem
                  key={item.value}
                  option={item}
                  wrapperClassName="text-sm font-semibold text-base-900"
                />
              ))}
            </SelectMenuOptionGroup>
          </SelectMenu>
        </div>
      </div>
      <div
        className="fixed overflow-y-auto pb-28"
        style={{
          height: 'calc(100vh - 228px)',
          width: 'calc(100vw - 256px)'
        }}
      >
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
          <TableBody wrapperClassName="w-full">
            {logs?.logs.map((row, idx) => (
              <TableRow key={idx} tabIndex="0" wrapperClassName="w-full">
                <TableCell wrapperClassName="w-1/5 truncate font-medium text-base-900 border-l-4 border-success-500 first:pr-3 last:pl-3 p-5">
                  <div className="text-base-500 flex w-full items-center truncate font-normal">
                    <MdSchedule />
                    <span className="ml-0.5">
                      {dateFormat(new Date(row.time), 'mmmm dS, h:MM TT')}
                    </span>
                  </div>
                </TableCell>
                <TableCell wrapperClassName="w-2/5">
                  <div className="mr-2 flex items-center">
                    {row.cumulativeStatus === 'success' && (
                      <MdCheckCircle color="#10B981" />
                    )}
                    {row.cumulativeStatus === 'redirect' && (
                      <MdOutlineSync
                        color="#FFF"
                        className="bg-attention-500 mr-0.5 rounded-full"
                      />
                    )}
                    {row.cumulativeStatus === 'failure' && (
                      <MdCancel color="#EF4444" />
                    )}
                    <span className="ml-2 w-96 truncate" title={row.pageUrl}>
                      {row.pageUrl}
                    </span>
                  </div>
                </TableCell>
                <TableCell wrapperClassName="w-2/5">
                  <div className="w-96 truncate" title={row.description}>
                    {row.description}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
