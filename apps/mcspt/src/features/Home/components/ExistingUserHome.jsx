import React from 'react';
import {
  Button,
  InputField,
  MdAddCircle,
  MdSearch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useExistingUserHome from './useExistingUserHome';

const columns = [
  {
    name: 'Test Session Name',
    key: 'testSessionName',
    isSortable: true,
    cell: (row) => (
      <>
        <div className="text-sm font-medium leading-5">
          {row.testSessionName}
        </div>
      </>
    )
  },
  {
    name: 'Application',
    key: 'application',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {row.application}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {row.packageDetails}
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
          {row.device}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5 ">
          {row.osDetails}
        </div>
      </>
    )
  }
];

const ExistingUserHome = ({ newTestClickHandler, previousUserSessions }) => {
  const { searchTerm, tableRows, performSearch, sortRows } =
    useExistingUserHome(previousUserSessions);

  return (
    <div className="flex flex-col">
      <div id="existingScreenHeader">
        <div id="buttonContainer" className="p-3">
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
                variant="header"
                sortable={col.isSortable}
                onSort={sortRows}
                sortDirection="desc"
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row) => (
            <TableRow key={row.testSessionName}>
              {columns.map((column, colIdx) => {
                const value = row[column.key];
                return (
                  <TableCell
                    key={column.key + column.id}
                    wrapperClass={
                      colIdx === 0
                        ? 'text-base-900 font-medium'
                        : 'text-base-500'
                    }
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
