import React from 'react';
import {
  Badge,
  MdCancel,
  MdCheckCircle,
  MdFolderOpen,
  MdOutlineError,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { issueTypes } from 'constants';
import PropTypes from 'prop-types';

export default function TestsTable({ testRuns }) {
  const getTestIcon = (status) => {
    const components = {
      passed: <MdCheckCircle className="text-success-500 mt-0.5 h-4 w-4" />,
      failed: <MdCancel className="text-danger-500 mt-0.5 h-4 w-4" />,
      skipped: <MdOutlineError className="text-attention-500 mt-0.5 h-4 w-4" />
    };
    return components[status];
  };

  const columns = [
    {
      name: 'TESTS',
      key: 'test',
      cell: (row) => (
        <div className="flex items-start gap-3">
          {getTestIcon(row.status)}
          <div>
            {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
            <p className="text-base-900 line-clamp-4 inline max-h-[80px] w-[603px] overflow-hidden text-ellipsis">
              {row.name}
            </p>
            <div className="flex items-center gap-1">
              <MdFolderOpen />
              <p className="text-base-500">{row.folder}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'SUMMARY',
      key: 'summary',
      cell: (row) => (
        <>
          {row.status === 'skipped' ? (
            <p className="text-attention-700">Not available</p>
          ) : (
            <>
              {row.status === 'failed' ? (
                <div>
                  <p className="text-base-900">{`${row.summary.issueCount} issues`}</p>
                  <div>
                    <span>{`${row.summary.pageCount} pages, `}</span>
                    <span>{`${row.summary.componentCount} components`}</span>
                  </div>
                </div>
              ) : (
                <p>No issues found</p>
              )}
            </>
          )}
        </>
      )
    },
    {
      name: 'SEVERITY BREAKDOWN',
      key: 'severity',
      cell: (row) => (
        <div className="hidden items-center xl:flex">
          {issueTypes.map(({ modifier, type }) => (
            <div className="mr-2" key={type}>
              <Badge
                wrapperClassName={
                  type === 'serious' ? 'bg-[#FCE7F3] text-[#9D174D]' : ''
                }
                hasDot={false}
                hasRemoveButton={false}
                isRounded
                modifier={modifier}
                text={row.summary.severityBreakdown[type]}
              />
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <Table containerWrapperClass="md:rounded-none shadow-none">
      <TableHead>
        <TableRow wrapperClassName="text-gray-50">
          {columns.map((col) => (
            <TableCell
              key={col.key}
              variant="header"
              wrapperClassName="text-base-500"
            >
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {testRuns?.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => {
              const value = 'what value';
              return (
                <TableCell key={column.id} wrapperClassName="whitespace-normal">
                  {column.cell ? <>{column.cell(row)}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

TestsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  testRuns: PropTypes.array.isRequired
};
