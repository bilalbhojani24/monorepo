import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineSync,
  MdSchedule
} from '@browserstack/bifrost';
import {
  ASSelectMenu,
  ASTable,
  ASTableBody,
  ASTableCell,
  ASTableHead,
  ASTableRow
} from 'middleware/bifrost';

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

const rows = [
  {
    date: (
      <div className="text-base-500 flex items-center font-normal">
        <MdSchedule />
        <span className="ml-0.5">Nov 02 2022, 12:00 PM</span>
      </div>
    ),
    page: 'www.browserstack.com/',
    scannerStatus: <MdCheckCircle color="#10B981" className="mr-0.5" />,
    pageStatus: (
      <MdOutlineSync
        color="#FFF"
        className="bg-attention-500 mr-0.5 rounded-full"
      />
    ),
    description: (
      <div className="w-64 truncate whitespace-pre-wrap">
        Scan complete, 255 issues{' '}
      </div>
    )
  },
  {
    date: (
      <div className="text-base-500 flex items-center font-normal">
        <MdSchedule />
        <span className="ml-0.5">Nov 02 2022, 12:00 PM</span>
      </div>
    ),
    page: 'www.browserstack.com/',
    scannerStatus: <MdCheckCircle color="#10B981" className="mr-0.5" />,
    pageStatus: (
      <MdOutlineSync
        color="#FFF"
        className="bg-attention-500 mr-0.5 rounded-full"
      />
    ),
    description: (
      <div className="w-64 truncate whitespace-pre-wrap">
        [HTTP 503] Sample error long data exceeding more than 1 line{' '}
      </div>
    )
  }
];

const ScanLogs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <div className="px-6 py-4">
          <ASSelectMenu
            isMultiSelect
            onChange={() => {}}
            options={pageStatus}
            placeholder="Page Status"
            // value={pageStatus.impact}
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
          {rows.map((row, idx) => (
            <ASTableRow
              key={idx}
              onRowClick={() => {
                navigate('/site-scanner/scan-report/12');
              }}
              tabIndex="0"
            >
              {columns.map((column, colIdx) => {
                const value = row[column.key];
                return (
                  <ASTableCell
                    key={column.id}
                    wrapperClass={`
                    ${
                      colIdx === 0
                        ? 'font-medium text-base-900 border-l-4 border-success-500'
                        : ''
                    }
                   first:pr-3 last:pl-3 p-5`}
                  >
                    {column.cell ? <>{column.cell()}</> : value}
                  </ASTableCell>
                );
              })}
            </ASTableRow>
          ))}
        </ASTableBody>
      </ASTable>
    </div>
  );
};

export default ScanLogs;
