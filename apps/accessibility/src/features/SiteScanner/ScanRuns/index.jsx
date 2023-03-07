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

const ScanRuns = ({ isLoading, scanRunData }) => {
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }
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
          {scanRunData?.data?.reports.map((row, idx) => (
            <TableRow
              key={row.id}
              onRowClick={() => {
                navigate(`/site-scanner/scan-report?id=${row.id}`);
              }}
              tabIndex="0"
            >
              <TableCell
                wrapperClass={`font-medium text-base-900
                   first:pr-3 last:pl-3 p-5`}
              >
                <div className="text-base-500 flex items-center font-normal">
                  <MdSchedule />
                  <span className="ml-0.5">
                    {dateFormat(
                      new Date(new Date(row.scanDate).toLocaleString()),
                      'mmmm dS, h:MM TT'
                    )}
                  </span>
                </div>
              </TableCell>
              <TableCell
                wrapperClass={`font-medium text-base-900
                   first:pr-3 last:pl-3 p-5`}
              >
                <div className="text-base-500 font-normal">
                  <span>{row.issues} issues</span>
                  <br />
                  <span>in {row.components} components</span>
                </div>
              </TableCell>
              <TableCell
                wrapperClass={`font-medium text-base-900
                   first:pr-3 last:pl-3 p-5`}
              >
                <div>
                  <span className="mr-0.5">
                    <Badge
                      text={`${row?.issueSummary?.critical || 0} Critical`}
                      modifier="error"
                    />
                  </span>
                  <span className="mr-0.5">
                    <Badge
                      text={`${row?.issueSummary?.serious || 0} Serious`}
                    />
                  </span>
                  <span className="mr-0.5">
                    <Badge
                      text={`${row?.issueSummary?.moderate || 0} Moderate`}
                      modifier="warn"
                    />
                  </span>
                  <span>
                    <Badge text={`${row?.issueSummary?.minor || 0} Minor`} />
                  </span>
                </div>
              </TableCell>
              <TableCell
                wrapperClass={`font-medium text-base-900
                   first:pr-3 last:pl-3 p-5`}
              >
                <div className="flex">
                  <span className="mr-2 flex items-center">
                    <MdCheckCircle color="#10B981" className="mr-0.5" />
                    {row?.reportSummary?.success || 0}
                  </span>
                  <span className="mr-2 flex items-center">
                    <MdCancel color="#EF4444" className="mr-0.5" />
                    {row?.reportSummary?.failure || 0}
                  </span>
                  <span className="mr-2 flex items-center">
                    <MdOutlineSync
                      color="#FFF"
                      className="bg-attention-500 mr-0.5 rounded-full"
                    />
                    {row?.reportSummary?.redirect || 0}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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
