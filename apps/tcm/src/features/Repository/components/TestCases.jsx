/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  FilterAltOutlinedIcon,
  InfoOutlinedIcon,
  SearchIcon
} from 'assets/icons';
import {
  TMButton,
  TMInputField,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';

import AddEditTestCase from './AddEditTestCase';
import BlankPage from './BlankPage';
import BulkEditTestCase from './BulkEditTestCase';
import DeleteTestCase from './DeleteTestCase';
import Filter from './Filter';
import InlineAddTestCase from './InlineAddTestCase';
import TestCasesTable from './TestCasesTable';
import useTestCases from './useTestCases';

import '../styles/TestCases.scss';

export default function TestCases() {
  const {
    isFilterVisible,
    showDeleteModal,
    selectedFolder,
    allTestCases,
    isAddTestCasePageVisible,
    isBulkUpdate,
    isTestCasesLoading,
    setFilter
  } = useTestCases();

  if (isAddTestCasePageVisible && isBulkUpdate) return <BulkEditTestCase />;
  if (isAddTestCasePageVisible) return <AddEditTestCase />;

  return (
    <div className="flex w-full flex-col items-start">
      {allTestCases.length ? (
        <>
          <div className="border-base-300 relative z-[1] flex w-full items-start border-b py-3 pr-3">
            <div className="w-full">
              <TMInputField
                placeholder="Search by Test Case name, ID"
                leadingIcon={<SearchIcon className="text-base-400" />}
              />
            </div>
            <TMButton
              onClick={() => setFilter(!isFilterVisible)}
              buttonType="half-rounded-button"
              wrapperClassName="ml-3"
              size="default"
              variant="primary"
              colors="white"
              icon={<FilterAltOutlinedIcon className="!h-5 !w-5" />}
            >
              Filter {isFilterVisible}
            </TMButton>
            {isFilterVisible && <Filter onCancel={() => setFilter(false)} />}
          </div>
          <div className="border-base-300 flex w-full flex-1 flex-col items-stretch border-l">
            {selectedFolder && (
              <div className="border-base-200 w-full border-b p-4">
                <div className="text-base-800 w-full font-medium">
                  {selectedFolder?.name}
                  <TMTooltip
                    size="xs"
                    placementSide="bottom"
                    theme="dark"
                    content={
                      <>
                        <TMTooltipHeader>
                          {selectedFolder?.name}
                        </TMTooltipHeader>
                        <TMTooltipBody>
                          <p className="text-sm">
                            URL: {selectedFolder?.links?.self || ''}
                          </p>
                        </TMTooltipBody>
                      </>
                    }
                  >
                    <InfoOutlinedIcon className="ml-1 !h-3.5 !w-3.5" />
                  </TMTooltip>
                </div>
                {selectedFolder?.notes && (
                  <div className="text-base-500 mt-1 text-xs">
                    {selectedFolder?.notes}
                  </div>
                )}
              </div>
            )}
            <>
              <div className="max-h-[calc(100vh-20.5rem)] flex-1 flex-col items-stretch  overflow-y-auto">
                <TestCasesTable
                  isCondensed
                  containerWrapperClass="md:rounded-none"
                  rows={allTestCases}
                  isLoading={isTestCasesLoading}
                />
              </div>
              <InlineAddTestCase />
            </>
          </div>
        </>
      ) : (
        <div className="border-base-300 flex w-full flex-1 items-center justify-center border-l">
          <BlankPage />
        </div>
      )}

      <DeleteTestCase show={showDeleteModal} />
    </div>
  );
}
