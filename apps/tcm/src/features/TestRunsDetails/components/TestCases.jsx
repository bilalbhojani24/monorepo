import React, { useEffect } from 'react';
import { InfoOutlinedIcon, SearchOffOutlinedIcon } from 'assets/icons';
import {
  TMEmptyState,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';
import CopyButton from 'common/CopyButton';
import Loader from 'common/Loader';

import TestCasesTable from './TestCasesTable';
import useTRTCFolders from './useTRTCFolders';

const TestCases = () => {
  const {
    isTestCasesLoading,
    allTestCases,
    isSearchFilterView, // TODO POST ALPHA
    allFolders,
    selectedFolder,
    isFoldersLoading,
    fetchTestCases
  } = useTRTCFolders();

  useEffect(() => {
    fetchTestCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex h-full w-full  min-w-0 lg:order-last">
      <div className="flex w-full shrink-0 grow flex-col items-start overflow-hidden ">
        {allFolders?.length || isSearchFilterView ? (
          <>
            {/* <Filter onFilterChange={onFilterChange} isMini /> */}
            {selectedFolder && (
              <div className="border-base-300 w-full border-l">
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
                            <div className="text-sm">
                              <p>
                                URL:{' '}
                                {selectedFolder?.links?.self?.slice(7) || ''}
                              </p>
                              <div className="mt-3 flex w-full gap-4">
                                <CopyButton
                                  copyValue={
                                    window.location.origin +
                                    selectedFolder?.links?.self?.slice(7)
                                  }
                                >
                                  Copy URL
                                </CopyButton>
                              </div>
                            </div>
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
              </div>
            )}
          </>
        ) : null}
        {allTestCases?.length ||
        isSearchFilterView ||
        isTestCasesLoading ||
        isFoldersLoading ? (
          <>
            <div className="border-base-300 flex w-full flex-1 shrink-0 grow flex-col overflow-hidden border-l">
              {isTestCasesLoading ? (
                <Loader wrapperClassName="h-full" />
              ) : (
                <>
                  {!allTestCases?.length && isSearchFilterView ? (
                    <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
                      <TMEmptyState
                        title="No Results Found"
                        description="No matching results found. Try searching with another test case name/ID"
                        mainIcon={
                          <SearchOffOutlinedIcon className="text-base-400 !h-12 !w-12" />
                        }
                        buttonProps={null}
                      />
                    </div>
                  ) : (
                    <TestCasesTable />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div className="border-base-300 flex w-full flex-1 items-center justify-center border-l">
            No test cases
          </div>
        )}
      </div>
    </section>
  );
};

export default TestCases;
