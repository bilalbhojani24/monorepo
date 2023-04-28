/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
// import { useDispatch } from 'react-redux';
import { InfoOutlinedIcon, SearchOffOutlinedIcon } from 'assets/icons';
import {
  TMEmptyState,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader,
  TMTruncateText
} from 'common/bifrostProxy';
import CopyButton from 'common/CopyButton';
import Loader from 'common/Loader';

import BulkEditTestCase from './AddEditTestCase/BulkEditTestCase';
import DeleteTestCase from './AddEditTestCase/DeleteTestCase';
import InlineAddTestCase from './AddEditTestCase/InlineAddTestCase';
// import { setTestCaseViewVisibility } from '../../TestCaseDetailsView/slices/testCaseDetailsSlice';
import AddEditTestCase from './AddEditTestCase';
import BlankPage from './BlankPage';
import Filter from './Filter';
import TestCasesTable from './TestCasesTable';
import useTestCases from './useTestCases';

import '../styles/TestCases.scss';

export default function TestCases() {
  const {
    metaPage,
    allFolders,
    isSearchFilterView,
    showDeleteModal,
    selectedFolder,
    allTestCases,
    isAddTestCasePageVisible,
    isBulkUpdate,
    isTestCasesLoading,
    isFoldersLoading,
    handleFilterPagination
  } = useTestCases();

  const focusRef = useRef(null);
  // const dispatch = useDispatch();
  // useEffect(
  //   () =>
  //     // just want this on unmount
  //     () => {
  //       console.log('test case view visibility on unmount');
  //       dispatch(setTestCaseViewVisibility(false));
  //     },
  //   [dispatch]
  // );
  useEffect(() => {
    focusRef?.current?.focus();
  }, [
    allTestCases.length,
    isSearchFilterView,
    isTestCasesLoading,
    isFoldersLoading
  ]);

  if (isAddTestCasePageVisible)
    return isBulkUpdate ? <BulkEditTestCase /> : <AddEditTestCase />;

  return (
    <div className="flex w-full shrink-0 grow flex-col items-start overflow-hidden ">
      {allFolders.length || isSearchFilterView ? (
        <>
          <Filter />
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
                              URL: {selectedFolder?.links?.self?.slice(7) || ''}
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
                  <TMTruncateText
                    wrapperClassName="text-base-500 mt-1 text-sm line-clamp-3"
                    hidetooltipTriggerIcon
                    isFullWidthTooltip
                    headerTooltipProps={{
                      delay: 500
                    }}
                  >
                    {ReactHtmlParser(selectedFolder?.notes)}
                  </TMTruncateText>
                )}
              </div>
            </div>
          )}
        </>
      ) : null}
      {allTestCases.length ||
      isSearchFilterView ||
      isTestCasesLoading ||
      isFoldersLoading ? (
        <>
          <div className="border-base-300 flex w-full flex-1 shrink-0 grow flex-col overflow-hidden border-l">
            {(isTestCasesLoading || isFoldersLoading) && (
              <Loader wrapperClassName="h-full" />
            )}
            {!isTestCasesLoading && !isFoldersLoading && (
              <>
                {!allTestCases.length && isSearchFilterView ? (
                  <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
                    <TMEmptyState
                      title="No Results Found"
                      description="Reset the filters or try again."
                      mainIcon={
                        <SearchOffOutlinedIcon className="text-base-400 !h-12 !w-12" />
                      }
                      buttonProps={null}
                    />
                  </div>
                ) : (
                  <div className=" flex-col   overflow-y-auto">
                    <TestCasesTable
                      isCondensed
                      containerWrapperClass="md:rounded-none"
                      rows={allTestCases}
                      isLoading={isTestCasesLoading}
                      isSearchFilterView={isSearchFilterView}
                      metaPage={metaPage}
                      onPaginationClick={
                        isSearchFilterView ? handleFilterPagination : null
                      }
                    />
                  </div>
                )}
                {!isSearchFilterView && <InlineAddTestCase ref={focusRef} />}
              </>
            )}
          </div>
        </>
      ) : (
        <div className="border-base-300 flex w-full flex-1 items-center justify-center border-l">
          <BlankPage ref={focusRef} />
        </div>
      )}

      <DeleteTestCase show={showDeleteModal} />
    </div>
  );
}
