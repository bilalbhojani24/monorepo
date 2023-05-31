import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  CodeSnippet,
  Loader,
  MdClose,
  MdFolderOpen,
  MdShare,
  Slideover,
  SlideoverBody,
  SlideoverHeader,
  Tabs
} from '@browserstack/bifrost';
import { BSTACK_TOPNAV_ELEMENT_ID, ISSUES, SUMMARY, TESTS } from 'constants';
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

export default function TestIssues({ isSliderOpen, onSliderClose, testID }) {
  const {
    activeTab,
    actionType,
    testMetaData,
    testData,
    isCopying,
    eventName,
    onRowClick,
    onClosingSlider,
    onTabChange,
    onShareLinkClick
  } = useTestIssues({ onSliderClose, testID });

  let defaultIndex = 0;
  switch (activeTab) {
    case SUMMARY:
      defaultIndex = 0;
      break;
    case ISSUES:
      defaultIndex = 1;
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
      topMarginElementId={BSTACK_TOPNAV_ELEMENT_ID}
    >
      <SlideoverHeader
        headingWrapperClassName="flex justify-between w-full"
        heading={
          testMetaData.meta && (
            <>
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-base-900 mb-1 w-auto text-lg font-medium">
                    {Object.values(testMetaData.meta)[0].name}
                  </p>
                  <Button
                    colors="white"
                    size="small"
                    variant="minimal"
                    onClick={onSliderClose}
                    icon={<MdClose className="cursor-pointer text-2xl" />}
                  />
                </div>
                <p className="text-base-500 mb-2 text-sm font-normal">
                  {Object.values(testMetaData.meta)[0].scopeList.join(' / ')}
                </p>
                {testMetaData.meta && (
                  <div className="flex justify-between">
                    <ul className="text-base-600 flex gap-2 text-sm font-normal">
                      <li className="flex items-center gap-1">
                        <img
                          className="mr-1 h-5 w-5"
                          src={getBrowserIcon(
                            Object.values(testMetaData.meta)[0].browser_data
                              .name
                          )}
                          alt="browser icon"
                        />
                        <p>{`${
                          Object.values(testMetaData.meta)[0].browser_data.name
                        } ${
                          Object.values(testMetaData.meta)[0].browser_data
                            .version
                        }`}</p>
                      </li>
                      <li className="flex items-center gap-1">
                        <img
                          className="mr-1 h-4 w-4"
                          src={getOSIcon(
                            Object.values(testMetaData.meta)[0].os_data.name
                          )}
                          alt="windows icon"
                        />
                        <p>{`${
                          Object.values(testMetaData.meta)[0].os_data.name
                        } ${
                          Object.values(testMetaData.meta)[0].os_data.version
                        }`}</p>
                      </li>
                      <li className="flex items-center gap-1">
                        <MdFolderOpen className="text-base-500 mr-1" />
                        <p>{Object.values(testMetaData.meta)[0].file}</p>
                      </li>
                    </ul>
                    <CopyToClipboard
                      text={window.location.href}
                      onCopy={onShareLinkClick}
                    >
                      <Button
                        colors="white"
                        size="small"
                        icon={isCopying ? null : <MdShare />}
                      >
                        {isCopying ? 'Copied' : 'Share'}
                      </Button>
                    </CopyToClipboard>
                  </div>
                )}
              </div>
            </>
          )
        }
        dismissButton={false}
        isEllipsisHeader={false}
      />
      <SlideoverBody wrapperClassName="p-0 w-full">
        {testMetaData.meta ? (
          <div className="w-full">
            {Object.values(testMetaData.meta)[0].status === 'skipped' ? (
              <div className="fixed bg-white px-6 py-2">
                <CodeSnippet
                  code={Object.values(testMetaData.meta)[0].error.backtrace}
                  language="java"
                  maxHeight="500"
                />
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Loader wrapperClassName="text-base-300 fill-base-400 w-7 h-7" />
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
