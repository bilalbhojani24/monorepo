import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  FindInPageOutlinedIcon,
  InfoOutlinedIcon,
  SearchOffOutlinedIcon
} from 'assets/icons';
import {
  TMEmptyState,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader,
  TMTruncateText
} from 'common/bifrostProxy';
import CopyButton from 'common/CopyButton';
import FolderExplorer from 'common/FolderExplorer';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';

// import Filter from './Filter';
import TestCasesTable from './TestCasesTable';
import useMiniatureRepository from './useMiniatureRepository';

const MiniatureRepository = ({
  projectId,
  onItemSelectionCb,
  selectedTestCases
}) => {
  const {
    filterOptions,
    metaPage,
    selectedFolder,
    allTestCases,
    isSearchFilterView,
    isFoldersLoading,
    isTestCasesLoading,
    allFolders,
    onFoldersUpdate,
    onFolderClick,
    onPaginationClick
    // onFilterChange
  } = useMiniatureRepository({ projectId });

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="flex h-[calc(75vh-9rem)] flex-1 shrink-0 grow flex-col overflow-hidden">
      <div className="flex flex-1 shrink-0 grow  items-stretch justify-center  overflow-hidden bg-white">
        <main className="w-full min-w-0 shrink-0 grow overflow-hidden lg:flex">
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
                                      {selectedFolder?.links?.self?.slice(7) ||
                                        ''}
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
              {allTestCases?.length ||
              isSearchFilterView ||
              isTestCasesLoading ||
              isFoldersLoading ? (
                <>
                  <div className="border-base-300 flex w-full flex-1 shrink-0 grow flex-col overflow-hidden border-l">
                    {isTestCasesLoading || isFoldersLoading ? (
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
                          <div className=" border-base-300   flex-col overflow-y-auto border-b">
                            <TestCasesTable
                              isCondensed
                              containerWrapperClass="md:rounded-none"
                              rows={allTestCases}
                              isLoading={isTestCasesLoading}
                              metaPage={metaPage}
                              isSearchFilterView={isSearchFilterView}
                              onPaginationClick={onPaginationClick}
                              onItemSelectionCb={onItemSelectionCb}
                              isMini
                              selectedTestCases={selectedTestCases}
                            />
                          </div>
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

          <aside className="lg:order-first lg:block lg:shrink-0">
            <div className="relative flex h-full w-96 flex-col overflow-hidden">
              <div className="border-base-300  flex h-12 w-full  items-center border-b px-3 py-0.5">
                <span className="text-base">Folders</span>
              </div>

              <div className="flex h-full w-full flex-1 shrink  flex-col overflow-y-auto">
                {isSearchFilterView ? (
                  <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
                    <TMEmptyState
                      // title=""
                      title={`We found ${
                        metaPage?.count || 0
                      } Search Results for '${
                        filterOptions?.q || ''
                      }' across all folders`}
                      mainIcon={
                        <FindInPageOutlinedIcon className="text-base-400 !h-12 !w-12" />
                      }
                      buttonProps={null}
                    />
                  </div>
                ) : (
                  <FolderExplorer
                    projectId={projectId}
                    folderId={selectedFolder?.id || null}
                    allFolders={allFolders}
                    isSingleSelect
                    onFolderClick={onFolderClick}
                    onFoldersUpdate={onFoldersUpdate}
                  />
                )}
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

MiniatureRepository.propTypes = {
  projectId: PropTypes.string,
  onItemSelectionCb: PropTypes.func,
  selectedTestCases: PropTypes.arrayOf(PropTypes.number)
};

MiniatureRepository.defaultProps = {
  onItemSelectionCb: () => {},
  projectId: null,
  selectedTestCases: []
};

export default MiniatureRepository;
