import React from 'react';
import {
  MdClose,
  MdFolderOpen,
  Slideover,
  SlideoverBody,
  Tabs
} from '@browserstack/bifrost';
import { ISSUES, SUMMARY, TESTS } from 'constants';
import PropTypes from 'prop-types';

import Issues from './components/Issues';
import Overview from './components/Overview';
import useTestIssues from './useTestIssues';

const tabList = [
  {
    name: 'Overview',
    value: SUMMARY,
    id: 'slider-overview'
  },
  {
    name: 'All issues',
    value: ISSUES,
    id: 'slider-issues'
  }
];

export default function TestIssues({ isSliderOpen, onSliderClose, testID }) {
  const {
    activeTab,
    actionType,
    testMetaData,
    testData,
    eventName,
    onRowClick,
    onClosingSlider,
    onTabChange
  } = useTestIssues({ onSliderClose });

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

  return (
    <Slideover
      show={isSliderOpen}
      slideoverWidth="max-w-screen-md w-screen overflow-y bg-base-50"
      onOverlayClick={onClosingSlider}
      backgroundOverlay
      onClose={onClosingSlider}
      size="6xl"
    >
      <SlideoverBody>
        {testMetaData.meta && (
          <div id="slide-over">
            <MdClose
              className="absolute right-8 z-10 cursor-pointer text-2xl"
              onClick={onClosingSlider}
            />
            <div className="fixed z-[2] w-[calc(100vw-256px)] bg-white">
              <div className="px-6 pt-6">
                <h1 className="text-base-900 mb-1 text-2xl font-bold">
                  {Object.values(testMetaData.meta)[0].name}
                </h1>
                <p className="mb-2 text-sm">
                  Suite / com.ddf.test.PDFInvoiceTest
                </p>
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
            </div>
            <div className="bg-base-50 relative top-[176px]">
              {activeTab === SUMMARY && testMetaData.issueSummary && (
                <Overview />
              )}
              {activeTab === ISSUES && testData && <Issues />}
            </div>
          </div>
        )}
      </SlideoverBody>
    </Slideover>
  );
}

TestIssues.propTypes = {
  isSliderOpen: PropTypes.bool.isRequired,
  onSliderClose: PropTypes.func.isRequired,
  testID: PropTypes.string.isRequired
};
