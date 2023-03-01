import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMDataTable,
  TMEmptyState,
  TMTabs
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { formatTime } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/testCaseViewConst';

import TestCaseResults from './TestCaseResults';
import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseMutliData = ({
  isFromTestRun,
  resultUpdatable,
  onResultClick
}) => {
  const {
    testRunsCount,
    selectedTab,
    testCaseIssues,
    handleTabChange,
    onJiraButtonClick,
    testRunButtonClick
  } = useTestCaseViewDetails();

  const issuesTableColumn = [
    {
      name: 'Issue',
      key: 'jira_id',
      cell: (rowData) => (
        <div className="text-base-900 font-medium">
          <TMButton
            variant="minimal"
            wrapperClassName="text-base-900 focus:ring-0"
            onClick={() => {
              onJiraButtonClick(rowData?.jira_id);
            }}
          >
            {`${rowData.jira_id}`}
          </TMButton>
        </div>
      )
    },
    {
      name: 'Test Run',
      key: 'jira_id',
      cell: (rowData) => (
        <div className="text-base-900">
          <TMButton
            variant="minimal"
            wrapperClassName="text-base-900 focus:ring-0"
            onClick={() => {
              testRunButtonClick(rowData?.test_run_id);
            }}
          >
            {rowData?.test_run_name}
          </TMButton>
        </div>
      )
    },
    {
      name: 'Linked On',
      key: 'created_at',
      cell: (rowData) => formatTime(rowData.created_at, 'date')
    }
  ];

  return (
    <>
      <TMTabs
        id="project-tabs"
        tabsArray={TABS_ARRAY.map((item) => ({
          ...item,
          count:
            item.name === 'Results'
              ? `${isFromTestRun ? '' : testRunsCount || ''}`
              : `${testCaseIssues?.length || ''}`
        }))}
        onTabChange={handleTabChange}
      />

      {selectedTab.name === TABS_ARRAY[0].name && (
        <TestCaseResults
          isFromTestRun={isFromTestRun}
          resultUpdatable={resultUpdatable}
          onResultClick={onResultClick}
        />
      )}

      {selectedTab.name === TABS_ARRAY[1].name && (
        <>
          {isFromTestRun}
          {testCaseIssues?.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={issuesTableColumn}
                rows={testCaseIssues}
              />
            </div>
          ) : (
            <div className="mt-10">
              <TMEmptyState
                title="No Issues"
                description="Once you start linking issues with this test run, it will show here"
                mainIcon={
                  <InfoOutlinedIcon className="text-base-400 !h-12 !w-12" />
                }
                buttonProps={null}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

TestCaseMutliData.propTypes = {
  isFromTestRun: PropTypes.bool,
  resultUpdatable: PropTypes.bool,
  onResultClick: PropTypes.bool
};

TestCaseMutliData.defaultProps = {
  isFromTestRun: false,
  resultUpdatable: false,
  onResultClick: () => {}
};

export default TestCaseMutliData;
