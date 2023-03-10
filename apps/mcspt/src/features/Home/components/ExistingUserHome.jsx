import React from 'react';
import {
  Button,
  InputField,
  MdAddCircle,
  MdLogin,
  MdLogout,
  MdSearch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { formatReportTime } from 'utils/dateUtils';

import useExistingUserHome from './useExistingUserHome';

const columns = [
  {
    name: 'Test Session Name',
    key: 'testSessionName',
    isSortable: true,
    cell: (row) => (
      <>
        <div className="text-sm font-medium leading-5">{row.name}</div>
      </>
    )
  },

  {
    name: 'Test Conducted',
    key: 'testStartDate',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {formatReportTime(row?.startTime, 'dddd, MMMM, D, YYYY')}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {formatReportTime(row?.startTime, 'h:mma')}
        </div>
      </div>
    )
  },
  {
    name: 'Application',
    key: 'application',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {row?.package?.name}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {`${row?.package?.bundleId} ∙ v${row?.package?.version}`}
        </div>
      </div>
    )
  },
  {
    name: 'Device',
    key: 'device',
    cell: (row) => (
      <>
        <div className="text-base-900 text-sm font-medium leading-5 ">
          {row?.device?.name}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5 ">
          {`${row?.device?.os} ${row?.device?.osVersion}`}
        </div>
      </>
    )
  }
];

const ExistingUserHome = ({ newTestClickHandler, previousUserSessions }) => {
  const {
    searchTerm,
    tableRows,
    performSearch,
    sortRows,
    currentSortDir,
    sessionSelected,
    loginViaSSO,
    isUserLoggedIn,
    logOutUser
  } = useExistingUserHome(previousUserSessions);

  return (
    <div className="flex flex-col">
      <div id="existingScreenHeader">
        <div id="buttonContainer" className="flex justify-between p-3">
          <Button
            icon={
              <div className="mr-3">
                <MdAddCircle />
              </div>
            }
            iconPlacement="start"
            size="large"
            colors="brand"
            variant="primary"
            onClick={newTestClickHandler}
          >
            New Test
          </Button>

          {!isUserLoggedIn && (
            <Button
              icon={
                <div className="mr-3">
                  <MdLogin />
                </div>
              }
              iconPlacement="start"
              size="large"
              colors="brand"
              variant="primary"
              onClick={loginViaSSO}
            >
              Login
            </Button>
          )}

          {isUserLoggedIn && (
            <Button
              icon={
                <div className="mr-3">
                  <MdLogout />
                </div>
              }
              iconPlacement="start"
              size="large"
              colors="brand"
              variant="primary"
              onClick={logOutUser}
            >
              Logout
            </Button>
          )}
        </div>

        <div id="searchContainer" className="bg-base-100 py-2.5 px-4">
          <InputField
            leadingIcon={
              <div className="text-base-400">
                <MdSearch />
              </div>
            }
            value={searchTerm}
            onChange={performSearch}
            id="existingUserSessionSearch"
            placeholder="Search Tests"
          />
        </div>
      </div>

      <Table containerWrapperClass="w-full">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                wrapperClassName="text-xs leading-4 font-medium tracking-wider uppercase text-base-500"
                variant="header"
                sortable={col.isSortable}
                onSort={sortRows}
                sortDirection={currentSortDir}
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row) => (
            <TableRow
              key={row?.name}
              onRowClick={() => {
                sessionSelected(row);
              }}
            >
              {columns.map((column) => {
                const value = row[column.key];
                return (
                  <TableCell
                    key={column.key + column.id}
                    wrapperClassName="text-base-900"
                  >
                    {column.cell ? <>{column.cell(row)}</> : value}
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

ExistingUserHome.propTypes = {
  newTestClickHandler: PropTypes.func,
  previousUserSessions: PropTypes.arrayOf(PropTypes.object)
};

ExistingUserHome.defaultProps = {
  newTestClickHandler: () => {},
  previousUserSessions: []
};

export default ExistingUserHome;
