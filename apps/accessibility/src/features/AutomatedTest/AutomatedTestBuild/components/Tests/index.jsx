import React from 'react';
import {
  Badge,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  InputField,
  InputGroupAddOn,
  MdCancel,
  MdCheckCircle,
  MdExpandMore,
  MdFolderOpen,
  MdOutlineError,
  MdSearch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { issueTypes } from 'constants';
import { getBrowserIcon, getOSIcon } from 'utils/helper';

import TestIssues from '../TestIssues';

import useTests from './useTests';

const status = [
  {
    body: 'Status',
    id: 'status'
  }
];

const tags = [
  {
    body: 'Tags',
    id: 'tags'
  }
];

const folders = [
  {
    body: 'Folders',
    id: 'folders'
  }
];

const pages = [
  {
    body: 'Pages',
    id: 'pages'
  }
];

export default function TestsTable() {
  const {
    searchValue,
    filteredTestRuns,
    onInputValueChange,
    onFilterSearch,
    onSliderClose,
    isSliderOpen,
    handleRowClick,
    testId
  } = useTests();

  const getTestIcon = (statusValue) => {
    const components = {
      passed: <MdCheckCircle className="text-success-500 mt-0.5 h-4 w-4" />,
      failed: <MdCancel className="text-danger-500 mt-0.5 h-4 w-4" />,
      skipped: <MdOutlineError className="text-attention-500 mt-0.5 h-4 w-4" />
    };
    return components[statusValue];
  };

  const columns = [
    {
      name: 'TESTS',
      key: 'test',
      cell: (row) => (
        <div className="flex items-start gap-3">
          {getTestIcon(row.status)}
          <div>
            <p className="text-base-900 line-clamp-4 inline max-h-[80px] w-[603px] overflow-hidden text-ellipsis">
              {row.name}
            </p>
            <ul className="mt-1 flex items-center gap-3">
              <li className="flex items-center gap-1">
                <img
                  className="h-5 w-5"
                  src={getBrowserIcon(row.browserData.name)}
                  alt="android icon"
                />
                <p className="text-base-500">{`${row.browserData.name} ${row.browserData.version}`}</p>
              </li>
              <li className="flex items-center gap-1">
                <img
                  className="h-4 w-3"
                  src={getOSIcon(row.osData.name)}
                  alt="android icon"
                />
                <p className="text-base-500">{`${row.osData.name} ${row.browserData.version}`}</p>
              </li>
              <li>
                <div className="bg-base-500 h-1 w-1 rounded-lg" />
              </li>
              <li className="flex items-center gap-1">
                <MdFolderOpen />
                <p className="text-base-500">{row.file}</p>
              </li>
            </ul>
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
    <div>
      {isSliderOpen && (
        <TestIssues
          onSliderClose={onSliderClose}
          isSliderOpen={isSliderOpen}
          testID={testId}
        />
      )}
      <div className="flex justify-between px-6 py-4">
        <div>
          <InputField
            id="search-test"
            addOnBeforeInline={
              <InputGroupAddOn inline>
                <MdSearch className="h-5 w-5" />
              </InputGroupAddOn>
            }
            value={searchValue}
            placeholder="Search by name or error"
            onChange={onInputValueChange}
            wrapperClassName="mr-4 w-80 bg-white"
          />
        </div>

        <div className="flex gap-4">
          <Dropdown onClick={onFilterSearch} id="scanFilter">
            <div className="flex">
              <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                Status
                <MdExpandMore className="h-5 w-5" aria-hidden="true" />
              </DropdownTrigger>
            </div>
            <DropdownOptionGroup>
              {status.map((opt) => (
                <DropdownOptionItem key={opt.id} option={opt} />
              ))}
            </DropdownOptionGroup>
          </Dropdown>

          <Dropdown onClick={onFilterSearch} id="scanFilter">
            <div className="flex">
              <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                Tags
                <MdExpandMore className="h-5 w-5" aria-hidden="true" />
              </DropdownTrigger>
            </div>
            <DropdownOptionGroup>
              {tags.map((opt) => (
                <DropdownOptionItem key={opt.id} option={opt} />
              ))}
            </DropdownOptionGroup>
          </Dropdown>

          <Dropdown onClick={onFilterSearch} id="scanFilter">
            <div className="flex">
              <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                Folders
                <MdExpandMore className="h-5 w-5" aria-hidden="true" />
              </DropdownTrigger>
            </div>
            <DropdownOptionGroup>
              {folders.map((opt) => (
                <DropdownOptionItem key={opt.id} option={opt} />
              ))}
            </DropdownOptionGroup>
          </Dropdown>

          <Dropdown onClick={onFilterSearch} id="scanFilter">
            <div className="flex">
              <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                Pages
                <MdExpandMore className="h-5 w-5" aria-hidden="true" />
              </DropdownTrigger>
            </div>
            <DropdownOptionGroup>
              {pages.map((opt) => (
                <DropdownOptionItem key={opt.id} option={opt} />
              ))}
            </DropdownOptionGroup>
          </Dropdown>
        </div>
      </div>
      <Table containerWrapperClass="md:rounded-none shadow-none">
        <TableHead>
          <TableRow wrapperClassName="text-gray-50">
            {columns.map((col) => (
              <TableCell
                key={col.key}
                variant="header"
                wrapperClassName="text-base-500 font-medium text-xs tracking-wider"
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTestRuns?.map((row) => (
            <TableRow key={row.id} onRowClick={() => handleRowClick(row.id)}>
              {columns.map((column) => {
                const value = 'what value';
                return (
                  <TableCell
                    key={column.id}
                    wrapperClassName="whitespace-normal"
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
}
