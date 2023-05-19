import React from 'react';
import {
  MdClose,
  MdFolderOpen,
  Slideover,
  SlideoverBody,
  SlideoverHeader,
  Tabs
} from '@browserstack/bifrost';
import { ISSUES, SUMMARY, TESTS } from 'constants';
import PropTypes from 'prop-types';
import { getBrowserIcon, getOSIcon } from 'utils/helper';

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

export default function TestIssues({ isSliderOpen, onSliderClose }) {
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
      <>
        <SlideoverHeader
          headingWrapperClassName="flex justify-between w-full"
          heading={
            testMetaData.meta && (
              <>
                <div>
                  <p className="text-base-900 mb-1 w-auto text-lg font-normal">
                    {Object.values(testMetaData.meta)[0].name}
                  </p>

                  <p className="text-base-500 mb-3 text-base font-normal">
                    {Object.values(testMetaData.meta)[0].scopeList.join(' / ')}
                  </p>
                </div>
                <div>
                  <div>
                    <MdClose
                      className="cursor-pointer text-2xl"
                      onClick={onSliderClose}
                    />
                  </div>
                </div>
              </>
            )
          }
          subHeading={
            testMetaData.meta && (
              <>
                <ul className="flex gap-2">
                  <li className="flex items-center gap-1">
                    <img
                      className="h-5 w-5"
                      src={getBrowserIcon(
                        Object.values(testMetaData.meta)[0].browser_data.name
                      )}
                      alt="browser icon"
                    />
                    <p className="text-base-500">{`${
                      Object.values(testMetaData.meta)[0].browser_data.name
                    } ${
                      Object.values(testMetaData.meta)[0].browser_data.version
                    }`}</p>
                  </li>
                  <li className="flex items-center gap-1">
                    <img
                      className="h-4 w-4"
                      src={getOSIcon(
                        Object.values(testMetaData.meta)[0].os_data.name
                      )}
                      alt="windows icon"
                    />
                    <p>{`${Object.values(testMetaData.meta)[0].os_data.name} ${
                      Object.values(testMetaData.meta)[0].os_data.version
                    }`}</p>
                  </li>
                  <li className="flex items-center gap-1">
                    <MdFolderOpen className="text-base-500" />
                    <p>{Object.values(testMetaData.meta)[0].file}</p>
                  </li>
                </ul>
              </>
            )
          }
          dismissButton={false}
          isEllipsisHeader={false}
        />
        <SlideoverBody wrapperClassName="p-0">
          {testMetaData.meta && (
            <div>
              <div className="fixed z-[2] w-[calc(100vw-256px)] bg-white">
                <Tabs
                  id="build-tabs"
                  onTabChange={onTabChange}
                  navigationClassName="ml-6"
                  tabsArray={tabList}
                  defaultIndex={defaultIndex}
                />
              </div>
              <div className="bg-base-50 relative top-14">
                {activeTab === SUMMARY && testMetaData.issueSummary && (
                  <Overview />
                )}
                {activeTab === ISSUES && testData && <Issues />}
              </div>
            </div>
          )}
        </SlideoverBody>
      </>
    </Slideover>
  );
}

TestIssues.propTypes = {
  isSliderOpen: PropTypes.bool.isRequired,
  onSliderClose: PropTypes.func.isRequired
};
