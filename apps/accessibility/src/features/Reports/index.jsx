import React from 'react';
import {
  Button,
  InputField,
  MdClose,
  MdKeyboardArrowDown,
  MdOpenInNew,
  MdOutlineArrowForward,
  MdSearch,
  Modal,
  ModalBody,
  ModalFooter,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Tooltip,
  TooltipBody,
  TooltipHeader
} from '@browserstack/bifrost';
import Logo from 'assets/accessibility_logo.png';
import NotFound from 'assets/not_found.svg';
import Loader from 'common/Loader';
import { CHROME_EXTENSION_URL, reportPerPage, reportType } from 'constants';
import { logEvent } from 'utils/logEvent';

import ColdStart from './components/ColdStart';
import ReportRow from './components/ReportRow';
import useReports from './useReports';

import './style.scss';

export default function Reports() {
  const {
    isOpen,
    isLoading,
    isMergeDisabled,
    reportList,
    lastIndex,
    selectedReportsLength,
    searchInput,
    selectedReportType,
    resetSelection,
    onUpdateSelectedReportType,
    onInputValueChange,
    updateLastIndex,
    onReportConsolidateButtonClick,
    handleClose,
    showBanner,
    showColdStart,
    handleScroll,
    scrollRef,
    showExtButtonTooltip,
    setShowExtButtonTooltip
  } = useReports();

  const activeReportsType = selectedReportType.map(({ value }) => value);
  const filteredReportList =
    activeReportsType.length > 0
      ? reportList.filter(({ testType }) =>
          activeReportsType.includes(testType)
        )
      : reportList;

  const searchFilterList = searchInput
    ? filteredReportList.filter(
        ({ name, createdBy: { name: userName } }) =>
          userName.toLowerCase().includes(searchInput.toLowerCase()) ||
          name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : filteredReportList;

  const isFirstPage = lastIndex === reportPerPage;
  const isLastPage =
    Math.ceil(searchFilterList.length / reportPerPage) ===
    Math.ceil(lastIndex / reportPerPage);

  return (
    <div className="bg-base-50">
      <Modal show={isOpen} size="lg">
        <ModalBody>
          <div className="mb-5 mt-6 flex w-full items-center justify-center">
            <img src={Logo} alt="extension-images" className="h-12 w-12" />
          </div>
          <p className="text-base-900 mb-2 text-center text-lg font-medium">
            Welcome to BrowserStack Accessibility Testing!
          </p>
          <p className="text-base-500 mb-2 text-center text-sm">
            To get started, download our browser extension and automatically
            find basic issues with our Workflow scanner or find advanced issues
            using our Assisted tests and Screen readers.
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
            iconPlacement="end"
            icon={<MdOpenInNew />}
            onClick={() => {
              window.open(CHROME_EXTENSION_URL, '_target');
              handleClose({ action: 'download-extension' });
            }}
            fullWidth
          >
            Download extension
          </Button>
        </ModalFooter>
      </Modal>
      <div
        className="border-base-200 fixed z-10 w-full p-6"
        style={{
          width: 'calc(100vw - 256px - 57px)',
          top: showBanner ? '128px' : '64px',
          borderBottomWidth: searchFilterList.length ? '1px' : 0
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Accessibility reports</h1>
            <h3 className="text-base-500 mb-4 text-sm font-medium">
              Select reports to view them. You can select more than one report
              to consolidate and review reports.
            </h3>
          </div>
          {searchFilterList.length ? (
            <Tooltip
              show={showExtButtonTooltip}
              placementAlign="end"
              placementSide="bottom"
              arrowPadding={10}
              content={
                <>
                  <TooltipHeader>
                    Start your Accessibility testing!{' '}
                    <span role="img" aria-label="rocket emoji">
                      🚀
                    </span>
                  </TooltipHeader>
                  <TooltipBody>
                    Use the extension to scan your web pages & workflows for
                    accessibility issues.
                  </TooltipBody>
                </>
              }
              theme="dark"
              onMouseLeave={() => {
                logEvent('OnManualTestReportsDownloadExtensionTooltip');
              }}
              onOpenChange={() => setShowExtButtonTooltip((state) => !state)}
              delay={1000}
            >
              <Button
                iconPlacement="start"
                icon={<MdOpenInNew className="text-base-500 h-5 w-5" />}
                onClick={() => {
                  window.open(CHROME_EXTENSION_URL, '_target');
                  logEvent('ClickedOnDownloadExtensionCTA', {
                    source: 'Manual test reports',
                    noReports: searchFilterList.length === 0
                  });
                }}
                size="small"
                colors="white"
                wrapperClassName="py-2"
              >
                Download extension
              </Button>
            </Tooltip>
          ) : null}
        </div>

        {searchFilterList.length ? (
          <div>
            <div className="flex items-center">
              <div className="mr-4 flex">
                <InputField
                  id="search-report"
                  leadingIcon={<MdSearch />}
                  placeholder="Search for report name or user..."
                  onChange={onInputValueChange}
                  wrapperClassName="mr-4 w-80 bg-white"
                />
                <div className="w-40">
                  <SelectMenu
                    onChange={onUpdateSelectedReportType}
                    value={selectedReportType}
                    isMulti
                  >
                    <SelectMenuTrigger
                      placeholder="Type"
                      triggerIcon={<MdKeyboardArrowDown className="text-xl" />}
                    />
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
              </div>
              <div className="flex items-center">
                {isMergeDisabled ? (
                  <Tooltip
                    theme="dark"
                    placementAlign="center"
                    placementSide="bottom"
                    content={
                      <TooltipBody wrapperClassName="text-center w-56 text-sm text-base-300">
                        Select at least two reports to consolidate them
                      </TooltipBody>
                    }
                  >
                    <Button
                      iconPlacement="end"
                      icon={<MdOutlineArrowForward className="text-xl" />}
                      onClick={onReportConsolidateButtonClick}
                      disabled={isMergeDisabled}
                      size="default"
                      variant="secondary"
                    >
                      Consolidate reports
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    size="default"
                    iconPlacement="end"
                    icon={<MdOutlineArrowForward className="text-xl" />}
                    onClick={onReportConsolidateButtonClick}
                    disabled={isMergeDisabled}
                    size="default"
                    variant="secondary"
                  >
                    Consolidate reports
                  </Button>
                )}
                {selectedReportsLength > 0 && (
                  <Button
                    iconPlacement="end"
                    icon={<MdClose className="text-xl" />}
                    onClick={resetSelection}
                    wrapperClassName="ml-4"
                    variant="minimal"
                    colors="white"
                  >
                    Clear {selectedReportsLength} selected
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {!showColdStart ? (
        <div
          ref={scrollRef}
          className="fixed overflow-auto"
          style={{
            height: showBanner ? 'calc(100vh - 291px)' : 'calc(100vh - 227px)',
            top: showBanner ? '291px' : '227px',
            width: 'calc(100vw - 256px)'
          }}
          onScroll={handleScroll}
        >
          {isLoading && searchFilterList.length === 0 && (
            <Loader wrapperClassName="mt-28 h-96" />
          )}
          {!isLoading && searchFilterList.length === 0 && (
            <div
              className="bg-base-50 mt-12 "
              style={{ height: 'calc(100vh - 228px)' }}
            >
              <div className="mb-5 flex w-full flex-col items-center justify-center">
                <img src={NotFound} alt="No reports found" className="w-80" />
                <p className="text-base-500 text-sm">No reports to show</p>
              </div>
            </div>
          )}
          <div className="mb-4 shadow-sm">
            {searchFilterList.length > 0 &&
              searchFilterList
                .slice(lastIndex - reportPerPage, lastIndex)
                .map(({ uniqueId }) => (
                  <ReportRow key={uniqueId} id={uniqueId} />
                ))}
          </div>
          {!isLoading && searchFilterList.length > 15 && (
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
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <ColdStart />
        </div>
      )}
    </div>
  );
}
