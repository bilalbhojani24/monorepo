/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  MdClose,
  MdOutlineArrowForward,
  MdSearch
} from '@browserstack/bifrost';
// import Logo from 'images/bsA11y/accessibility_logo.png';
// import extensionImage from 'images/bsA11y/dashboard_img1.png';
import NotFound from 'assets/not_found.svg';
import { versions } from 'constants';
// import { Actions, CarouselModal } from 'trike/Modal';
import { ASButton, ASDropdown, ASInputField } from 'middleware/bifrost';
import { handleClickByEnterOrSpace } from 'utils/helper';

import ReportRow from './components/ReportRow';
import useReports from './useReports';

export default function Reports() {
  const {
    isOpen,
    isLoading,
    isShowingBanner,
    activeVersion,
    isMergeDisabled,
    reportList,
    selectedReportsLength,
    searchInput,
    resetSelection,
    onCloseClick,
    onDownloadExtensionClick,
    onInputValueChange,
    onReportConsolidateButtonClick,
    onVersionSelect,
    handleClose
  } = useReports();
  // const filteredReportList = reportList.filter(({ wcagVersion: { label } }) =>
  //   label.includes(activeVersion)
  // );

  const searchFilterList = searchInput
    ? reportList.filter(
        ({ name, createdBy: { name: userName } }) =>
          name.toLowerCase().includes(searchInput.toLowerCase()) ||
          userName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : reportList;

  return (
    <div className="bg-base-50">
      {/* <CarouselModal
        id="landing"
        isOpen={isOpen}
        variant="CAROUSEL"
        title="Welcome to BrowserStack Accessibility!"
        subtitle="To get started with Accessibility testing, download our browser extension to scan your workflows and automatically find issues across different pages."
        images={[{ url: extensionImage, alt: 'test', key: 'extension-image' }]}
        position="center"
        size="md"
        onClose={() => handleClose({ action: 'cross-click' })}
      >
        <Actions position="center">
          <Button
            text="I’ll do it later"
            type="outline"
            onClick={() => handleClose({ action: 'do-later' })}
          />
          <Button
            text="Download Chrome Extension"
            onClick={() => {
              window.open(
                window.accessibilityExtensionChromeStoreURL,
                '_target'
              );
              handleClose({ action: 'download-extension' });
            }}
            icon={<OpenInNewIcon />}
            iconPlacement="right"
          />
        </Actions>
      </CarouselModal> */}
      <div
        // className={classNames('reports__header', {
        //   'reports__header--banner': isShowingBanner
        // })}
        className="p-6"
      >
        {/* {isShowingBanner ? (
          <div className="reports__banner">
            <div className="report__banner-text">
              <img src={Logo} alt="Accessibility logo" />
              Download the Accessibility Toolkit extension from Chrome Web Store
              to scan your workflows for accessibility issues.
            </div>
            <div className="reports__banner-actions">
              <ACButton onClick={onDownloadExtensionClick} size="small">
                Download now
              </ACButton>
              <div
                tabIndex={0}
                role="button"
                aria-label="Close extension banner"
                onKeyDown={(e) => handleClickByEnterOrSpace(e, onCloseClick)}
              >
                <CloseIcon onClick={onCloseClick} />
              </div>
            </div>
          </div>
        ) : null} */}
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
              <ASDropdown
                options={[
                  {
                    id: '1',
                    body: 'Edit'
                  }
                ]}
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
        <div className="">
          <div className="">
            <div className="">
              {/* {versions.map(({ label, value }) => (
                <div
                  className={classNames('reports__version-switch-item', {
                    'reports__version-switch-item--active':
                      activeVersion === value
                  })}
                  onClick={() => onVersionSelect(value)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    handleClickByEnterOrSpace(e, () => onVersionSelect(value))
                  }
                  aria-label={`Select ${label} filter`}
                  key={value}
                >
                  {label}
                </div>
              ))} */}
            </div>
          </div>
        </div>
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
        {searchFilterList.length > 0 &&
          searchFilterList.map(({ id }) => <ReportRow key={id} id={id} />)}
      </div>
    </div>
  );
}
