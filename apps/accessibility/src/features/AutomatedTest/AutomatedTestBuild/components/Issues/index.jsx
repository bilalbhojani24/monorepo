import React from 'react';
import { twClassNames } from '@browserstack/utils';
import IssuesNotFound from 'assets/not_found.svg';
import ActiveFilters from 'common/ActiveFilters';
import FilterModal from 'common/FilterModal';
import IssueItem from 'common/IssueItem';
import { HOW_TO_FIX_TAB, ISSUE_DETAILS_TAB, SOURCE_TESTS } from 'constants';
import SectionsDataContext from 'features/AutomatedTest/AutomatedTestBuild/context/SectionsDataContext';

import TestIssues from '../TestIssues';

import useIssues from './useIssues';
import ViolationList from './ViolationList';

import './customStyle.scss';

const tabs = [
  {
    name: 'Issue details',
    value: ISSUE_DETAILS_TAB
  },
  {
    name: 'How to fix',
    value: HOW_TO_FIX_TAB
  },
  {
    name: 'Source tests',
    value: SOURCE_TESTS
  }
];

export default function Issues() {
  const {
    urls,
    isSliderOpen,
    tests,
    componentIds,
    categories,
    activeComponentId,
    isShowingIssue,
    isFilterModalVisible,
    activeIssueIndex,
    buildFilters,
    sectionData,
    showHiddenIssues,
    activeSwitch,
    activeComponentNodes,
    buildMetaData,
    activeViolation,
    isGuidelineMode,
    headerData,
    issueItem,
    issueNode,
    activeNodes,
    activeViolationId,
    activeIssueSection,
    activeBuildFilters,
    wcagVersion,
    onSliderOpenClick,
    onSliderClose,
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
    buildFilters.showNeedsReviewIssues ||
    Object.values(buildFilters).filter((item) => item.length > 0).length > 0;

  const isHalfView = activeComponentId && isShowingIssue;
  const hasFilterOrHiddenView = showHiddenIssues || hasFilters;
  const issueHeight = hasFilterOrHiddenView
    ? `calc(100vh - 426px)`
    : `calc(100vh - 378px)`;

  return (
    <>
      {isSliderOpen && (
        <TestIssues onSliderClose={onSliderClose} isSliderOpen={isSliderOpen} />
      )}
      <SectionsDataContext.Provider
        value={{
          buildFilters,
          isFilterModalVisible,
          sectionData,
          violations,
          activeSwitch,
          hasFilters,
          buildMetaData,
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
          activeBuildFilters,
          wcagVersion,
          tests,
          tabs,
          issueHeight,
          onSliderOpenClick,
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
          <ActiveFilters
            sectionsDataContext={SectionsDataContext}
            wrapperClassName="w-[calc(100vw-256px)]"
          />
          {isFilterModalVisible && (
            <FilterModal sectionsDataContext={SectionsDataContext} />
          )}
          <div
            className="fixed"
            style={{
              top: `${hasFilterOrHiddenView ? '344px' : '296px'}`,
              height: 'calc(100vh - 296px)',
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
                <p className="text-base-500 text-sm">No Issues Found..</p>
              </div>
            ) : (
              <div className="flex h-full">
                <div
                  className={twClassNames(
                    'w-full border-r border-base-200 overflow-auto pb-20 bg-base-50',
                    {
                      'w-2/4': isHalfView && sectionData
                    }
                  )}
                >
                  <ViolationList sectionsDataContext={SectionsDataContext} />
                </div>
                {isHalfView && sectionData && (
                  <div
                    className={twClassNames({
                      'w-2/4': isHalfView && sectionData
                    })}
                  >
                    <div className="bg-white">
                      <IssueItem sectionsDataContext={SectionsDataContext} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SectionsDataContext.Provider>
    </>
  );
}
