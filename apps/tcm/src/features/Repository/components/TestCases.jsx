import React from 'react';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon,
  SearchIcon,
} from 'assets/icons';
import { TMButton, TMDataTable, TMDropdown, TMInputField } from 'bifrostProxy';

import { dropDownOptions } from '../const/testCaseConst';

import AddEditTestCase from './AddEditTestCase';
import BlankPage from './BlankPage';
import DeleteTestCase from './DeleteTestCase';
import InlineAddTestCase from './InlineAddTestCase';
import useTestCases from './useTestCases';

import '../styles/TestCases.scss';

export default function TestCases() {
  const {
    showDeleteModal,
    onDropDownChange,
    selectedFolder,
    allTestCases,
    isAddTestCasePageVisible,
    handleTestCaseViewClick,
  } = useTestCases();

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <ArrowUpwardOutlinedIcon className="text-danger-500 mr-2" />;
      case 'low':
        return <ArrowDownwardOutlinedIcon className="text-success-500 mr-2" />;
      case 'critical':
        return (
          <KeyboardDoubleArrowUpOutlinedIcon className="text-danger-700 mr-2" />
        );
      case 'medium':
        return <RemoveOutlinedIcon className="text-brand-500 mr-2" />;
      default:
        return '';
    }
  };

  const datatableColumns = [
    {
      name: 'ID',
      key: 'id',

      cell: (rowData) => `TC${rowData?.id}`,
    },
    {
      name: 'TITLE',
      key: 'name',
      cell: (rowData) => (
        <div
          role="button"
          className="hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData)}
          onKeyDown={handleTestCaseViewClick(rowData)}
        >
          {rowData.name}
        </div>
      ),
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
    },
    {
      name: '',
      key: 'action',
      cell: (data) => (
        <TMDropdown
          options={dropDownOptions}
          triggerVariant="meatball-button"
          onClick={(e) => onDropDownChange(e, data)}
        />
      ),
    },
  ];

  if (isAddTestCasePageVisible && selectedFolder) return <AddEditTestCase />;

  return (
    <div className="flex w-full flex-col items-start">
      <div className="border-base-300 flex w-full items-start border-b py-3 pr-3">
        <div className="w-full">
          <TMInputField
            placeholder="Search by Test Case name, ID"
            leadingIcon={<SearchIcon className="text-base-400" />}
          />
        </div>
        <TMButton
          buttonType="half-rounded-button"
          wrapperClassName="ml-3"
          size="default"
          variant="primary"
          colors="white"
        >
          Filter
        </TMButton>
      </div>
      <div className="border-base-300 flex w-full flex-1 flex-col border-l">
        {selectedFolder && (
          <div className="border-base-200 w-full border-b p-4">
            <div className="text-base-800 w-full font-medium">
              {selectedFolder?.name}
            </div>
            {selectedFolder?.notes && (
              <div className="text-base-500 mt-1 w-full">
                {selectedFolder?.notes}
              </div>
            )}
          </div>
        )}

        {allTestCases.length ? (
          <>
            <TMDataTable
              containerWrapperClass="md:rounded-none"
              columns={datatableColumns}
              rows={allTestCases}
            />
            <InlineAddTestCase />
          </>
        ) : (
          <div className="flex w-full flex-1 items-center justify-center">
            <BlankPage />
          </div>
        )}
      </div>
      {showDeleteModal && <DeleteTestCase />}
    </div>
  );
}
