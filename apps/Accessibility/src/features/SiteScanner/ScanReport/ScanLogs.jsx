import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineSync,
  MdSchedule
} from '@browserstack/bifrost';
import dateFormat from 'dateformat';
import {
  ASSelectMenu,
  ASTable,
  ASTableBody,
  ASTableCell,
  ASTableHead,
  ASTableRow
} from 'middleware/bifrost';
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
          <ASSelectMenu
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
      <ASTable>
        <ASTableHead>
          <ASTableRow>
            {columns.map((col) => (
              <ASTableCell
                key={col.key}
                variant="header"
                wrapperClass="first:pr-3 last:pl-3 px-2"
              >
                {col.name}
              </ASTableCell>
            ))}
          </ASTableRow>
        </ASTableHead>
        <ASTableBody>
          {logs?.logs.map((row, idx) => (
            <ASTableRow
              key={idx}
              onRowClick={() => {
                navigate('/site-scanner/scan-report/12');
              }}
              tabIndex="0"
            >
              <ASTableCell wrapperClass="font-medium text-base-900 border-l-4 border-success-500 first:pr-3 last:pl-3 p-5">
                <div className="text-base-500 flex items-center font-normal">
                  <MdSchedule />
                  <span className="ml-0.5">
                    {dateFormat(new Date(row.time), 'mmmm dS, h:MM:ss TT')}
                  </span>
                </div>
              </ASTableCell>
              <ASTableCell>
                <span className="ml-0.5">{row.pageUrl}</span>
              </ASTableCell>
              <ASTableCell>
                {row.scannerStatus ? (
                  <MdCheckCircle color="#10B981" />
                ) : (
                  <MdCancel color="#EF4444" />
                )}
              </ASTableCell>
              <ASTableCell>
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
              </ASTableCell>
              <ASTableCell>{row.description}</ASTableCell>
            </ASTableRow>
          ))}
        </ASTableBody>
      </ASTable>
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
