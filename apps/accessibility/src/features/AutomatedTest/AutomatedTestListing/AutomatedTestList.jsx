import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  MdOutlineCancel,
  MdOutlineCheckCircleOutline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { issueTypes } from 'constants';
import formatDistance from 'date-fns/formatDistance';
import PropTypes from 'prop-types';
import { logEvent } from 'utils/logEvent';
export default function AutomatedTestList({ buildList, comboboxItems }) {
  const navigate = useNavigate();
  const now = new Date();

  const formatSuccessTests = (num) => {
    if (num > 999) {
      return `${num / 1000}k +`;
    }
    return num;
  };

  const severityColumnID = 'severity-breakdown';

  const handleRowClick = ({ normalisedName, projectId, buildNumber }) => {
    const project = comboboxItems.find((val) => val.id === projectId);
    const index = normalisedName.lastIndexOf('%');
    navigate(
      `${project.normalisedName}/builds/${normalisedName.slice(
        0,
        index
      )}/${buildNumber}`
    );
    logEvent('InteractedWithAutomatedTestsHomepageView', {
      action: 'View documentation'
    });
  };

  const columns = [
    {
      id: 'build-listing',
      name: 'builds',
      wrapperClassName: '',
      cell: (row) => (
        <div>
          <p className="text-base-900 mb-1 text-sm">{row.name}</p>
          <div className="text-base-500 flex">
            by <p className="ml-1">{row.createdBy.name}</p>,
            <p className="ml-1">
              {formatDistance(new Date(row.createdAt), now)} ago
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'summary',
      name: 'Summary',
      wrapperClassName: 'w-52 table-fixed',
      cell: (row) => (
        <div>
          <p className="text-base-900 mb-1 text-sm">
            {row.summary.issueCount} issues
          </p>
          <p className="text-base-500 text-sm">
            {row.summary.pageCount} pages, {row.summary.componentCount}{' '}
            components
          </p>
        </div>
      )
    },
    {
      id: severityColumnID,
      name: 'Severity breakdown',
      wrapperClassName: 'w-72 table-fixed',
      cell: (row) => (
        <div className="hidden items-center xl:flex">
          {issueTypes.map(({ modifier, type }) => (
            <Tooltip
              theme="dark"
              placementAlign="center"
              placementSide="bottom"
              wrapperClassName="py-2 px-2"
              content={
                <>
                  <TooltipBody wrapperClassName="p-0 text-sm">{`${
                    row.summary.severityBreakdown[type]
                  } ${type.charAt(0).toUpperCase()}${type.slice(
                    1,
                    type.length
                  )}`}</TooltipBody>
                </>
              }
            >
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
            </Tooltip>
          ))}
        </div>
      )
    },
    {
      id: 'build-health',
      name: 'Build health',
      wrapperClassName: 'w-40 table-fixed',
      cell: (row) => (
        <div className="flex items-center gap-0.5">
          {row.summary.health.failed ? (
            <>
              <p className="text-danger-700">{row.summary.health.failed}</p>
              <Tooltip
                theme="dark"
                placementAlign="center"
                placementSide="bottom"
                wrapperClassName="py-2 px-2"
                content={
                  <>
                    <TooltipBody wrapperClassName="p-0 text-sm">{`${row.summary.health.failed}/${row.summary.health.total} failed`}</TooltipBody>
                  </>
                }
              >
                <MdOutlineCancel className="text-danger-700 h-4 w-4" />
              </Tooltip>
              <span>/</span>
              <p>{row.summary.health.total}</p>
            </>
          ) : (
            <>
              <p className="text-success-700">
                {formatSuccessTests(row.summary.health.passed)}
              </p>
              <MdOutlineCheckCircleOutline className="text-success-700 h-4 w-4" />
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <Table containerWrapperClass="md:rounded-none shadow-none overflow-visible overflow-x-visible">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={col.key}
              variant="header"
              textTransform="uppercase"
              wrapperClassName={twClassNames(
                'text-base-500 font-medium text-xs tracking-wider top-[218px]',
                {
                  'hidden items-center xl:table-cell':
                    col.id === severityColumnID
                }
              )}
              isSticky
            >
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {buildList.map((row) => (
          <TableRow onRowClick={() => handleRowClick(row)}>
            {columns.map((column) => {
              const value = row[column.key];
              return (
                <TableCell
                  key={column.id}
                  wrapperClassName={twClassNames(column.wrapperClassName, {
                    'hidden items-center xl:table-cell':
                      column.id === severityColumnID
                  })}
                >
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

AutomatedTestList.propTypes = {
  buildList: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    createdBy: PropTypes.objectOf({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    summary: PropTypes.objectOf({
      pageCount: PropTypes.number.isRequired,
      componentCount: PropTypes.number.isRequired,
      issueCount: PropTypes.number.isRequired,
      severityBreakdown: PropTypes.objectOf({
        critical: PropTypes.number.isRequired,
        serious: PropTypes.number.isRequired,
        moderate: PropTypes.number.isRequired,
        minor: PropTypes.number.isRequired
      }),
      health: PropTypes.objectOf({
        passed: PropTypes.number.isRequired,
        failed: PropTypes.number.isRequired,
        skipped: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
      })
    }).isRequired
  }).isRequired,
  comboboxItems: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};
