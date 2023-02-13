/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  MdClose,
  MdOutlineArrowForward,
  MdSearch
} from '@browserstack/bifrost';
import Logo from 'assets/accessibility_logo.png';
import NotFound from 'assets/not_found.svg';
import { reportType } from 'constants';
import {
  ASBanner,
  ASButton,
  ASInputField,
  ASModal,
  ASModalBody,
  ASModalFooter,
  ASSelectMenu
} from 'middleware/bifrost';

// import { handleClickByEnterOrSpace } from 'utils/helper';
import ReportRow from './components/ReportRow';
import useReports from './useReports';

export default function Reports() {
  const {
    isOpen,
    isLoading,
    isShowingBanner,
    isMergeDisabled,
    reportList,
    lastIndex,
    selectedReportsLength,
    searchInput,
    resetSelection,
    onCloseClick,
    onDownloadExtensionClick,
    onInputValueChange,
    updateLastIndex,
    onReportConsolidateButtonClick,
    handleClose
  } = useReports();

  const searchFilterList = searchInput
    ? reportList.filter(
        ({ name, createdBy: { name: userName } }) =>
          name.toLowerCase().includes(searchInput.toLowerCase()) ||
          userName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : reportList;

  const isFirstPage = lastIndex === 20;
  const isLastPage =
    Math.ceil(searchFilterList.length / 20) === Math.ceil(lastIndex / 20);

  return (
    <div className="bg-base-50">
      <ASModal show={isOpen} size="lg" onOverlayClick={onCloseClick}>
        <ASModalBody>
          <div className="mb-5 mt-6 flex w-full items-center justify-center">
            <img src={Logo} alt="extension-images" className="h-12 w-12" />
          </div>
          <p className="text-base-900 mb-2 text-center text-lg font-medium">
            Welcome to Accessibility
          </p>
          <p className="text-base-500 mb-2 text-center text-sm">
            To get started with Accessibility testing, download our browser
            extension to scan your workflows and automatically find issues
            across different pages.
          </p>
        </ASModalBody>
        <ASModalFooter position="center">
          <ASButton
            onClick={() => handleClose({ action: 'do-later' })}
            colors="white"
            fullWidth
          >
            I’ll do it later
          </ASButton>
          <ASButton
            onClick={() => {
              window.open(
                window.accessibilityExtensionChromeStoreURL,
                '_target'
              );
              handleClose({ action: 'download-extension' });
            }}
            fullWidth
          >
            Download extension
          </ASButton>
        </ASModalFooter>
      </ASModal>
      <div className="p-6">
        {isShowingBanner ? (
          <div className="fixed inset-x-0 top-0 z-10">
            <ASBanner
              description="Download the Accessibility Toolkit extension from Chrome Web Store
          to scan your workflows for accessibility issues."
              isDismissButton
              ctaButton={
                <ASButton
                  onClick={onDownloadExtensionClick}
                  size="small"
                  colors="white"
                >
                  Download now
                </ASButton>
              }
              onDismissClick={onCloseClick}
            />
          </div>
        ) : null}
        <h1 className="mb-2 text-2xl font-bold">Accessibility reports</h1>
        <h3 className="text-base-500 mb-4 text-sm font-medium">
          Select reports to view them. You can select more than one report to
          consolidate and review reports.
        </h3>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="mr-4 w-80">
                <ASInputField
                  id="search-report"
                  leadingIcon={<MdSearch />}
                  placeholder="Search for name or error..."
                  onChange={onInputValueChange}
                />
              </div>
              <ASSelectMenu
                isMultiSelect
                // onChange={onUpdateImpact}
                options={reportType}
                placeholder="Type"
                // value={reportFilters.impact}
              />
            </div>
            <div className="flex items-center">
              {selectedReportsLength > 0 && (
                <ASButton
                  icon={<MdClose className="text-xl" />}
                  variant="secondary"
                  onClick={resetSelection}
                  wrapperClassName="mr-2"
                >
                  Clear {selectedReportsLength} selected
                </ASButton>
              )}
              <ASButton
                variant="primary"
                iconPlacement="end"
                icon={<MdOutlineArrowForward className="text-xl" />}
                onClick={onReportConsolidateButtonClick}
                disabled={isMergeDisabled}
              >
                View consolidated report
              </ASButton>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {!isLoading && reportList.length === 0 && (
          <div className="flex h-[calc(100vh_-_166px)] flex-col items-center justify-center">
            <div className="flex flex-col">
              <div className="flex items-center justify-center">
                <img src={NotFound} alt="No reports found" />
              </div>
              <p className="text-base-500 mt-4 flex items-center justify-center text-xl">
                No saved reports for the selected WCAG version.
              </p>
            </div>
          </div>
        )}
        <div className="mb-4">
          {searchFilterList.length > 0 &&
            searchFilterList
              .slice(lastIndex - 20, lastIndex)
              .map(({ id }) => <ReportRow key={id} id={id} />)}
        </div>
        <div className="border-base-200 flex items-center justify-between border-t px-6 py-3">
          <p className="text-base-700 text-sm font-medium">
            Showing {lastIndex - 20 + 1} to{' '}
            {isLastPage ? searchFilterList.length : lastIndex} of{' '}
            {searchFilterList.length} results
          </p>
          <div className="flex">
            <ASButton
              disabled={isFirstPage}
              onClick={() => updateLastIndex(lastIndex - 20)}
              colors="white"
              size="small"
              wrapperClassName="mr-3"
            >
              Previous
            </ASButton>
            <ASButton
              disabled={isLastPage}
              onClick={() => updateLastIndex(lastIndex + 20)}
              colors="white"
              size="small"
            >
              Next
            </ASButton>
          </div>
        </div>
      </div>
    </div>
  );
}
