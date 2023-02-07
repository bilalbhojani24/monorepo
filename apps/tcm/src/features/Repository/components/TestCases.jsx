/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { HideSourceOutlinedIcon, InfoOutlinedIcon } from 'assets/icons';
import {
  TMEmptyState,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';
import Loader from 'common/Loader';

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
    isSearchFilterView,
    showDeleteModal,
    selectedFolder,
    allTestCases,
    isAddTestCasePageVisible,
    isBulkUpdate,
    isTestCasesLoading
  } = useTestCases();

  if (isAddTestCasePageVisible && isBulkUpdate) return <BulkEditTestCase />;
  if (isAddTestCasePageVisible) return <AddEditTestCase />;

  return (
    <div className="flex w-full flex-col items-start">
      {allTestCases.length || isSearchFilterView || isTestCasesLoading ? (
        <>
          <Filter />
          <div className="border-base-300 flex w-full flex-1 flex-col items-stretch border-l">
            {selectedFolder && !isTestCasesLoading && (
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
            {isTestCasesLoading ? (
              <Loader wrapperClass="h-full" />
            ) : (
              <>
                {!allTestCases.length && isSearchFilterView ? (
                  <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
                    <TMEmptyState
                      title="No Results Found"
                      description="No matching results found. Try searching with another test case name/ID"
                      mainIcon={
                        <HideSourceOutlinedIcon className="text-base-400 !h-12 !w-12" />
                      }
                      buttonProps={null}
                    />
                  </div>
                ) : (
                  <div className="max-h-[calc(100vh-20.5rem)] flex-1 flex-col items-stretch  overflow-y-auto">
                    <TestCasesTable
                      isCondensed
                      containerWrapperClass="md:rounded-none"
                      rows={allTestCases}
                    />
                  </div>
                )}
                {!isSearchFilterView && <InlineAddTestCase />}
              </>
            )}
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
