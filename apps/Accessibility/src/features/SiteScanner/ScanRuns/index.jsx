import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  MdCancel,
  MdCheckCircle,
  MdOutlineSync,
  MdSchedule,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

const columns = [
  {
    name: 'Date',
    key: 'date',
    isSortable: true
  },
  {
    name: 'Issue Summary',
    key: 'issueSummary',
    isSortable: true
  },
  {
    name: 'Severity Breakdown',
    key: 'severity'
  },
  {
    name: 'Page Summary',
    key: 'pageSummary'
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
    issueSummary: (
      <div className="text-base-500 font-normal">
        <span>10745 issues</span>
        <br />
        <span>in 200 components</span>
      </div>
    ),
    severity: (
      <div>
        <span className="mr-0.5">
          <Badge text="1500 Critical" modifier="error" />
        </span>
        <span className="mr-0.5">
          <Badge text="174 Serious" />
        </span>
        <span className="mr-0.5">
          <Badge text="9500 Moderate" modifier="warn" />
        </span>
        <span>
          <Badge text="150 Minor" />
        </span>
      </div>
    ),
    pageSummary: (
      <div className="flex">
        <span className="mr-2 flex items-center">
          <MdCheckCircle color="#10B981" className="mr-0.5" />
          40
        </span>
        <span className="mr-2 flex items-center">
          <MdCancel color="#EF4444" className="mr-0.5" />
          23
        </span>
        <span className="mr-2 flex items-center">
          <MdOutlineSync
            color="#FFF"
            className="bg-attention-500 mr-0.5 rounded-full"
          />
          2
        </span>
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
    issueSummary: (
      <div className="text-base-500 font-normal">
        <span>10745 issues</span>
        <br />
        <span>in 200 components</span>
      </div>
    ),
    severity: (
      <div>
        <span className="mr-0.5">
          <Badge text="1500 Critical" modifier="error" />
        </span>
        <span className="mr-0.5">
          <Badge text="174 Serious" />
        </span>
        <span className="mr-0.5">
          <Badge text="9500 Moderate" modifier="warn" />
        </span>
        <span>
          <Badge text="150 Minor" />
        </span>
      </div>
    ),
    pageSummary: (
      <div className="flex">
        <span className="mr-2 flex items-center">
          <MdCheckCircle color="#10B981" className="mr-0.5" />
          40
        </span>
        <span className="mr-2 flex items-center">
          <MdCancel color="#EF4444" className="mr-0.5" />
          23
        </span>
        <span className="mr-2 flex items-center">
          <MdOutlineSync
            color="#FFF"
            className="bg-attention-500 mr-0.5 rounded-full"
          />
          2
        </span>
      </div>
    )
  }
];

const ScanRuns = () => {
  const navigate = useNavigate();
  return (
    <div>
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
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              onRowClick={() => {
                navigate('/site-scanner/scan-report/12');
              }}
              tabIndex="0"
            >
              {columns.map((column, colIdx) => {
                const value = row[column.key];
                return (
                  <TableCell
                    key={column.id}
                    wrapperClass={`
                    ${colIdx === 0 ? 'font-medium text-base-900' : ''}
                   first:pr-3 last:pl-3 p-5`}
                  >
                    {column.cell ? <>{column.cell()}</> : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScanRuns;
