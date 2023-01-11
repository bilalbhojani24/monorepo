import React from 'react';
import { TMButton, TMDataTable, TMDropdown, TMInputField } from 'bifrostProxy';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon,
  SearchIcon,
} from 'Icons';

import AddTestCase from './AddTestCase';
import BlankPage from './BlankPage';
import InlineAddTestCase from './InlineAddTestCase';
import useTestCases from './useTestCases';

import '../styles/TestCases.scss';

export default function TestCases() {
  const { selectedFolder, allTestCases, isAddTestCasePageVisible } =
    useTestCases();

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <ArrowUpwardOutlinedIcon className="mr-2 text-danger-500" />;
      case 'low':
        return <ArrowDownwardOutlinedIcon className="mr-2 text-success-500" />;
      case 'critical':
        return (
          <KeyboardDoubleArrowUpOutlinedIcon className="mr-2 text-danger-700" />
        );
      case 'medium':
        return <RemoveOutlinedIcon className="mr-2 text-brand-500" />;
      default:
        return '';
    }
  };

  const datatableColumns = [
    {
      name: 'ID',
      key: 'id',
      style: {},
      cell: (rowData) => `TC${rowData?.id}`,
    },
    {
      name: 'TITLE',
      key: 'name',
      style: {},
    },
    {
      name: 'PRIORITY',
      key: 'priority',
      cell: (rowData) => (
        <span className="capitalize">
          {formatPriority(rowData.priority)}
          {rowData.priority}
        </span>
      ),
      style: {},
    },
    {
      name: '',
      key: 'action',
      cell: (rowData) => (
        <TMDropdown
          options={[{ id: '1', name: 'Edit' }]}
          triggerVariant="meatball-button"
          onClick={() => {
            console.log(rowData);
          }}
        >
          Edit
        </TMDropdown>
      ),
      style: {},
    },
  ];

  if (isAddTestCasePageVisible && selectedFolder) return <AddTestCase />;

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-start border-b border-base-300 p-3">
        <TMInputField
          placeholder="Search by Test Case name, ID"
          leadingIcon={<SearchIcon className="text-base-400" />}
        />
        <TMButton
          buttonType="half-rounded-button"
          variant="white"
          wrapperClassName="ml-3"
          size="default"
        >
          Filter
        </TMButton>
      </div>
      <div className="flex w-full flex-1 flex-col border-l border-base-300">
        {selectedFolder && (
          <div className="w-full border-b border-base-200 px-4 py-4">
            <div className="w-full font-medium text-base-800">
              {selectedFolder?.name}
            </div>
            {selectedFolder?.notes && (
              <div className="mt-1 w-full text-base-500">
                {selectedFolder?.notes}
              </div>
            )}
          </div>
        )}

        {allTestCases.length ? (
          <>
            <TMDataTable
              // isSelectable
              // isHeaderSticky
              columns={datatableColumns}
              rows={allTestCases}
              // isSortable={false}
            />
            <InlineAddTestCase />
          </>
        ) : (
          <div className="flex w-full flex-1 items-center justify-center">
            <BlankPage />
          </div>
        )}
      </div>
    </div>
  );
}
