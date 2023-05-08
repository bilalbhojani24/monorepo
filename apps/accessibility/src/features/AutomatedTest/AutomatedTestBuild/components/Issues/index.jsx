import React from 'react';
import { twClassNames } from '@browserstack/utils';
import IssuesNotFound from 'assets/not_found.svg';

import SectionsDataContext from '../../context/SectionsDataContext';

import ActiveFilters from './ActiveFilters';
import FilterModal from './FilterModal';
import IssueItem from './IssueItem';
import useIssues from './useIssues';
import ViolationList from './ViolationList';

export default function Issues() {
  const {
    urls,
    componentIds,
    categories,
    activeComponentId,
    isShowingIssue,
    isFilterModalVisible,
    buildFilters,
    sectionData,
    showHiddenIssues,
    activeSwitch,
    onFilterButtonClick,
    setActiveSwitch,
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

  return (
    <SectionsDataContext.Provider
      value={{
        buildFilters,
        isFilterModalVisible,
        sectionData,
        violations,
        activeSwitch,
        setActiveSwitch,
        onCloseClick,
        onFilterButtonClick,
        urls,
        componentIds,
        categories,
        isHalfView
      }}
    >
      <div className="fixed" style={{ top: '171px' }}>
        <ActiveFilters />
        {isFilterModalVisible && <FilterModal />}
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
                <ViolationList />
              </div>
              {isHalfView && sectionData && (
                <div
                  className="fixed right-0 overflow-auto bg-white"
                  style={{
                    height: 'calc(100vh - 228px)',
                    width: 'calc((100vw - 256px) / 2)'
                  }}
                >
                  <IssueItem />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionsDataContext.Provider>
  );
}
