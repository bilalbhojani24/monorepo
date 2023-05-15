import React from 'react';
import {
  MdFolderOpen,
  Slideover,
  SlideoverBody,
  Tabs
} from '@browserstack/bifrost';
import { ISSUES, SUMMARY, TESTS } from 'constants';

// import Issues from './components/Issues';
import Overview from './components/Overview';
import useTestIssues from './useTestIssues';

const tabList = [
  {
    name: 'Overview',
    value: SUMMARY
  },
  {
    name: 'All issues',
    value: ISSUES
  },
  {
    name: 'Tests',
    value: TESTS
  }
];

export default function TestIssues() {
  const {
    activeTab,
    actionType,
    testMetaData,
    testData,
    eventName,
    issueSummary,
    isOpen,
    setIsOpen,
    onRowClick,
    onTabChange
  } = useTestIssues();

  let defaultIndex = 0;
  switch (activeTab) {
    case SUMMARY:
      defaultIndex = 0;
      break;
    case ISSUES:
      defaultIndex = 1;
      break;
    case TESTS:
      defaultIndex = 2;
      break;
    default:
      break;
  }

  const handleCloseWithLogEvent = () => {
    setIsOpen(false);
  };

  return (
    <Slideover
      show={isOpen}
      slideoverWidth="max-w-screen-md w-screen overflow-y"
      onOverlayClick={handleCloseWithLogEvent}
      backgroundOverlay
      onClose={handleCloseWithLogEvent}
      size="6xl"
    >
      <SlideoverBody>
        <div>
          <div className="px-6 pt-6">
            <h1 className="text-base-900 mb-1 text-2xl font-bold">
              Mocha awesome build regression #112
            </h1>
            <p className="mb-2 text-sm">Suite / com.ddf.test.PDFInvoiceTest</p>
            <p className="text-sm">
              <MdFolderOpen className="text-base-500" />
              .../test/smoke-test.js
            </p>
          </div>
          <Tabs
            id="build-tabs"
            onTabChange={onTabChange}
            navigationClassName="ml-6"
            tabsArray={tabList}
            defaultIndex={defaultIndex}
          />
          {activeTab === SUMMARY && testMetaData.issueSummary && <Overview />}
          {/* {activeTab === ISSUES && testData && <Issues />} */}
        </div>
      </SlideoverBody>
    </Slideover>
  );
}
