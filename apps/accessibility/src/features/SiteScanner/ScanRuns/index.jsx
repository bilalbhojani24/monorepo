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
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';

import Loader from '../../../common/Loader';

// https://run.mocky.io/v3/85ea0a0f-6b1c-4cb6-993e-7b9252837532
const columns = [
  {
    name: 'Date',
    key: 'date',
    isSortable: true
  },
  {
    name: 'Issue summary',
    key: 'issueSummary',
    isSortable: true
  },
  {
    name: 'Severity breakdown',
    key: 'severity'
  },
  {
    name: 'Page summary',
    key: 'pageSummary'
  }
];

const ScanRuns = ({ isLoading, scanRunData }) => {
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Table containerWrapperClass="mt-4 md:rounded-none shadow">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.key} variant="header">
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {scanRunData?.data?.reports.map((row, idx) => (
          <TableRow
            key={row.id}
            onRowClick={() => {
              navigate(`/site-scanner/scan-report?id=${row.id}`);
            }}
            tabIndex="0"
          >
            <TableCell>
              <div className="text-base-500 flex items-center font-normal">
                <MdSchedule />
                <span className="ml-0.5">
                  {dateFormat(
                    new Date(new Date(row.scanDate)),
                    'mmmm dS, h:MM TT'
                  ).toLocaleString()}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-base-500 text-sm font-normal">
                <p className="text-base-900 mb-1">{row.issues} issues</p>
                <p>in {row.componentCount} components</p>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <Badge
                  text={`${row?.issueSummary?.critical || 0} Critical`}
                  modifier="error"
                  wrapperClassName="mr-1"
                />
                <Badge
                  text={`${row?.issueSummary?.serious || 0} Serious`}
                  wrapperClassName="bg-[#FCE7F3] text-[#9D174D] mr-1"
                />
                <Badge
                  text={`${row?.issueSummary?.moderate || 0} Moderate`}
                  modifier="warn"
                  wrapperClassName="mr-1"
                />
                <Badge
                  text={`${row?.issueSummary?.minor || 0} Minor`}
                  wrapperClassName="mr-1"
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="text-base-900 flex">
                <p className="mr-4 flex items-center">
                  <MdCheckCircle
                    color="#10B981"
                    className="mr-0.5"
                    fontSize="medium"
                  />
                  {row?.reportSummary?.success || 0}
                </p>
                <p className="mr-4 flex items-center">
                  <MdCancel
                    color="#EF4444"
                    className="mr-0.5"
                    fontSize="medium"
                  />
                  {row?.reportSummary?.failure || 0}
                </p>
                <p className="mr-4 flex items-center">
                  <MdOutlineSync
                    color="#FFF"
                    className="bg-attention-500 mr-0.5 rounded-full"
                    fontSize="medium"
                  />
                  {row?.reportSummary?.redirect || 0}
                </p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

ScanRuns.defaultProps = {
  scanRunData: {},
  isLoading: false
};

ScanRuns.propTypes = {
  scanRunData: PropTypes.instanceOf(Object),
  isLoading: PropTypes.bool
};

export default ScanRuns;
