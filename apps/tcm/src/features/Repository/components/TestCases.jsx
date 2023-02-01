import React from 'react';
import { SearchIcon } from 'assets/icons';
import { TMButton, TMInputField } from 'common/bifrostProxy';

import AddEditTestCase from './AddEditTestCase';
import BlankPage from './BlankPage';
import BulkEditTestCase from './BulkEditTestCase';
import DeleteTestCase from './DeleteTestCase';
import InlineAddTestCase from './InlineAddTestCase';
import TestCasesTable from './TestCasesTable';
import useTestCases from './useTestCases';

import '../styles/TestCases.scss';

export default function TestCases() {
  const {
    showDeleteModal,
    selectedFolder,
    allTestCases,
    isAddTestCasePageVisible,
    isBulkUpdate
  } = useTestCases();

  if (isAddTestCasePageVisible && isBulkUpdate) return <BulkEditTestCase />;
  if (isAddTestCasePageVisible) return <AddEditTestCase />;

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
      <div className="border-base-300 flex w-full flex-1 flex-col items-stretch border-l">
        {selectedFolder && (
          <div className="border-base-200 w-full border-b p-4">
            <div className="text-base-800 w-full font-medium">
              {selectedFolder?.name}
            </div>
            {selectedFolder?.notes && (
              <div className="text-base-500 mt-1 text-xs">
                {selectedFolder?.notes}
              </div>
            )}
          </div>
        )}

        {allTestCases.length ? (
          <>
            <div className="flex-1 flex-col items-stretch overflow-y-auto ">
              <TestCasesTable
                isCondensed
                containerWrapperClass="md:rounded-none"
                rows={allTestCases}
              />
            </div>
            <InlineAddTestCase />
          </>
        ) : (
          <div className="flex w-full flex-1 items-center justify-center">
            <BlankPage />
          </div>
        )}
      </div>
      <DeleteTestCase show={showDeleteModal} />
    </div>
  );
}
