import React from 'react';
import {
  Badge,
  Button,
  InputField,
  InputGroupAddOn,
  MdCancel,
  MdCheckCircle,
  MdFolderOpen,
  MdOutlineError,
  MdSearch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import { issueTypes } from 'constants';
import { getBrowserIcon, getOSIcon, getTruncatedFileName } from 'utils/helper';

import TestIssues from '../TestIssues';

import RenderMenu from './RenderMenu';
import useTests from './useTests';

export default function TestsTable() {
  const {
    searchValue,
    onInputValueChange,
    onFilterSearch,
    onSliderClose,
    isSliderOpen,
    handleRowClick,
    testId,
    testFilters,
    menuFilters,
    onFilterBadgeClose,
    searchTests,
    onFilterClear
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
          <Tooltip
            theme="dark"
            placementSide="bottom"
            content={
              <TooltipBody wrapperClassName="mb-0">
                {row.status
                  .charAt(0)
                  .toUpperCase()
                  .concat(row.status.slice(1, row.status.length))}
              </TooltipBody>
            }
          >
            {getTestIcon(row.status)}
          </Tooltip>
          <div>
            <p className="text-base-900 line-clamp-4 inline max-h-[80px] w-[603px] overflow-hidden text-ellipsis">
              {row.name}
            </p>
            <ul className="mt-1 flex items-center gap-3">
              <li className="flex items-center gap-1">
                <img
                  className="h-5 w-5"
                  src={getBrowserIcon(row.browserData.logo)}
                  alt="browser icon"
                />
                <p className="text-base-500">{`${row.browserData.name} ${row.browserData.version}`}</p>
              </li>
              <li className="flex items-center gap-1">
                <img
                  className="h-4 w-3"
                  src={getOSIcon(row.osData.logo)}
                  alt="os icon"
                />
                <p className="text-base-500">{`${row.osData.name} ${row.browserData.version}`}</p>
              </li>
              <li>
                <div className="bg-base-500 h-1 w-1 rounded-lg" />
              </li>
              <li className="flex items-center gap-1">
                <MdFolderOpen />
                <p className="text-base-500">
                  {getTruncatedFileName(row.file)}
                </p>
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
              {row.summary.issueCount > 0 ? (
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
          <RenderMenu
            data={testFilters?.status}
            onFilterSearch={onFilterSearch}
            filterStatus={menuFilters}
            placeholder="Status"
            name="status"
          />
          <RenderMenu
            data={testFilters?.tags}
            onFilterSearch={onFilterSearch}
            filterStatus={menuFilters}
            placeholder="Tags"
            name="tags"
          />
          <RenderMenu
            data={testFilters?.files}
            onFilterSearch={onFilterSearch}
            filterStatus={menuFilters}
            placeholder="Files"
            name="file"
          />
          <RenderMenu
            data={testFilters?.pages}
            onFilterSearch={onFilterSearch}
            filterStatus={menuFilters}
            placeholder="Pages"
            name="pages"
          />
        </div>
      </div>

      {Object.values(menuFilters).some((item) => item.length > 0) ? (
        <div className="bg-base-100 flex flex-wrap gap-2 px-6 py-3">
          <p className="text-base-500 border-base-300 w-fit border-r pr-4 text-sm">
            Filters
          </p>
          {Object.keys(menuFilters).map((key) => {
            if (menuFilters[key].length) {
              return (
                <Badge
                  key={key}
                  hasDot={false}
                  hasRemoveButton
                  isRounded
                  size="large"
                  wrapperClassName="bg-white"
                  onClose={() => onFilterBadgeClose(key)}
                  text={`${menuFilters[key].length} ${key}`}
                />
              );
            }
          })}
          <Button
            onClick={onFilterClear}
            size="small"
            colors="white"
            wrapperClassName="ml-4"
            variant="minimal"
          >
            Clear all
          </Button>
        </div>
      ) : null}

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
          {searchTests?.map((row) => (
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
