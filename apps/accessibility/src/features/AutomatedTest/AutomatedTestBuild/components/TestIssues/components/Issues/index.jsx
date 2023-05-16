import React from 'react';
import { twClassNames } from '@browserstack/utils';
import IssuesNotFound from 'assets/not_found.svg';
import ActiveFilters from 'common/ActiveFilters';
import FilterModal from 'common/FilterModal';
import IssueItem from 'common/IssueItem';
import SectionsDataContext from 'features/AutomatedTest/AutomatedTestBuild/components/TestIssues/context/SectionsDataContext';

import useIssues from './useIssues';
import ViolationList from './ViolationList';

import './customStyle.scss';

export default function Issues() {
  const {
    urls,
    tests,
    componentIds,
    categories,
    activeComponentId,
    isShowingIssue,
    isFilterModalVisible,
    activeIssueIndex,
    testFilters,
    sectionData,
    showHiddenIssues,
    activeSwitch,
    activeComponentNodes,
    testMetaData,
    activeViolation,
    isGuidelineMode,
    headerData,
    issueItem,
    issueNode,
    activeNodes,
    activeViolationId,
    activeIssueSection,
    activeTestFilters,
    wcagVersion,
    onRowClick,
    onTagClose,
    onHiddenIssueClick,
    onNextClick,
    onPreviousClick,
    onIssueCloseClick,
    onTabSelect,
    onApplyFilters,
    onUpdateImpact,
    onFilterButtonClick,
    onUpdateSwitch,
    generateData,
    onCloseClick
  } = useIssues();
  const violations = generateData();
  const showEmptyScreen = violations.every(
    ({ violation }) => violation.nodes.length === 0
  );

  // check if needs review is true OR check if any other filters is applied. Filters are combined as array, hence length check.
  const hasFilters =
    testFilters.showNeedsReviewIssues ||
    Object.values(testFilters).filter((item) => item.length > 0).length > 0;

  const isHalfView = activeComponentId && isShowingIssue;
  const hasFilterOrHiddenView = showHiddenIssues || hasFilters;

  return (
    <SectionsDataContext.Provider
      value={{
        testFilters,
        isFilterModalVisible,
        sectionData,
        violations,
        activeSwitch,
        hasFilters,
        testMetaData,
        activeComponentNodes,
        issueNode,
        headerData,
        issueItem,
        activeNodes,
        activeIssueIndex,
        activeViolation,
        isGuidelineMode,
        activeViolationId,
        activeComponentId,
        activeIssueSection,
        activeTestFilters,
        wcagVersion,
        tests,
        onHiddenIssueClick,
        onTabSelect,
        onRowClick,
        onTagClose,
        onApplyFilters,
        onUpdateSwitch,
        onCloseClick,
        onFilterButtonClick,
        onUpdateImpact,
        onNextClick,
        onPreviousClick,
        onIssueCloseClick,
        urls,
        componentIds,
        categories,
        isHalfView
      }}
    >
      <div className="fixed">
        <ActiveFilters sectionsDataContext={SectionsDataContext} />
        {isFilterModalVisible && (
          <FilterModal sectionsDataContext={SectionsDataContext} />
        )}
        <div
          className="fixed overflow-auto"
          style={{
            top: `${hasFilterOrHiddenView ? '348px' : '300px'}`,
            height: 'calc(100vh - 228px)',
            width: 'calc(100vw - 256px)'
          }}
        >
          {showEmptyScreen ? (
            <div className="mb-5 mt-8 flex w-full flex-col items-center justify-center">
              <img
                src={IssuesNotFound}
                alt="No Issues Found"
                className="w-80"
              />
              <p className="text-base-500 text-sm">No Issues Found</p>
            </div>
          ) : (
            <div className="flex h-full overflow-auto">
              <div
                className={twClassNames(
                  'w-full border-r border-base-200 overflow-auto pb-20 bg-base-50',
                  {
                    'w-2/4': isHalfView && sectionData
                  }
                )}
                style={{ minHeight: 'calc(100vh - 228px)', height: '100%' }}
              >
                <ViolationList sectionsDataContext={SectionsDataContext} />
              </div>
              {isHalfView && sectionData && (
                <div
                  className="fixed right-0 overflow-auto bg-white"
                  style={{
                    height: 'calc(100vh - 228px)',
                    width: 'calc((100vw - 256px) / 2)'
                  }}
                >
                  <IssueItem sectionsDataContext={SectionsDataContext} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionsDataContext.Provider>
  );
}
