/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Banner,
  Button,
  InputField,
  MdClose,
  MdOutlineArrowForward,
  MdSearch,
  Modal,
  ModalBody,
  ModalFooter,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import Logo from 'assets/accessibility_logo.png';
import NotFound from 'assets/not_found.svg';
import { reportPerPage, reportType } from 'constants';

// import { handleClickByEnterOrSpace } from 'utils/helper';
import ReportRow from './components/ReportRow';
import useReports from './useReports';

import './style.scss';

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
    selectedReportType,
    isSidebarCollapsed,
    resetSelection,
    onCloseClick,
    onDownloadExtensionClick,
    onUpdateSelectedReportType,
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
      <Modal show={isOpen} size="lg" onOverlayClick={onCloseClick}>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter position="center">
          <Button
            onClick={() => handleClose({ action: 'do-later' })}
            colors="white"
            fullWidth
          >
            I’ll do it later
          </Button>
          <Button
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
          </Button>
        </ModalFooter>
      </Modal>
      <div className="border-base-200 fixed top-16 z-10 w-full border-b p-6">
        {isShowingBanner ? (
          <div className="fixed inset-x-0 top-0 z-10">
            <Banner
              description="Download the Accessibility Toolkit extension from Chrome Web Store
          to scan your workflows for accessibility issues."
              isDismissButton
              bannerIcon={
                <img
                  src={Logo}
                  alt="accessibility logo"
                  height={24}
                  width={24}
                />
              }
              ctaButton={
                <Button
                  onClick={onDownloadExtensionClick}
                  size="small"
                  colors="white"
                >
                  Download now
                </Button>
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
                <InputField
                  id="search-report"
                  leadingIcon={<MdSearch />}
                  placeholder="Search for name or error..."
                  onChange={onInputValueChange}
                />
              </div>
              <div className="w-32">
                <SelectMenu
                  onChange={onUpdateSelectedReportType}
                  value={selectedReportType}
                  isMulti
                >
                  <SelectMenuTrigger placeholder="Type" />
                  <SelectMenuOptionGroup>
                    {reportType.map((item) => (
                      <SelectMenuOptionItem
                        key={item.value}
                        option={item}
                        wrapperClassName="text-sm font-semibold text-base-900"
                      />
                    ))}
                  </SelectMenuOptionGroup>
                </SelectMenu>
              </div>
              {/* <SelectMenu
                isMultiSelect
                onChange={onUpdateSelectedReportType}
                options={reportType}
                placeholder="Type"
                wrapperClassName="w-36"
                value={selectedReportType}
              /> */}
            </div>
            <div className="flex items-center">
              {selectedReportsLength > 0 && (
                <Button
                  icon={<MdClose className="text-xl" />}
                  variant="secondary"
                  onClick={resetSelection}
                  wrapperClassName="mr-2"
                >
                  Clear {selectedReportsLength} selected
                </Button>
              )}
              <Button
                variant="primary"
                iconPlacement="end"
                icon={<MdOutlineArrowForward className="text-xl" />}
                onClick={onReportConsolidateButtonClick}
                disabled={isMergeDisabled}
              >
                View consolidated report
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed overflow-auto "
        style={{
          height: 'calc(100vh - 227px)',
          top: '227px',
          width: isSidebarCollapsed ? '100vw' : 'calc(100vw - 256px)'
        }}
      >
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
        <div className="mb-4 shadow-sm">
          {searchFilterList.length > 0 &&
            searchFilterList
              .slice(lastIndex - reportPerPage, lastIndex)
              .map(({ id }) => <ReportRow key={id} id={id} />)}
        </div>
        {!isLoading && (
          <div className="border-base-200 flex items-center justify-between border-t px-6 py-3">
            <p className="text-base-700 text-sm font-medium">
              Showing {lastIndex - reportPerPage + 1} to{' '}
              {isLastPage ? searchFilterList.length : lastIndex} of{' '}
              {searchFilterList.length} results
            </p>
            <div className="flex">
              <Button
                disabled={isFirstPage}
                onClick={() => updateLastIndex(lastIndex - reportPerPage)}
                colors="white"
                size="small"
                wrapperClassName="mr-3"
              >
                Previous
              </Button>
              <Button
                disabled={isLastPage}
                onClick={() => updateLastIndex(lastIndex + reportPerPage)}
                colors="white"
                size="small"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
