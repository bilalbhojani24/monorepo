import React from 'react';
import { Link } from 'react-router-dom';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMDataTable, TMEmptyState, TMTabs } from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import PropTypes from 'prop-types';
import {
  formatTime,
  onSubmitKeyHandler,
  routeFormatter
} from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/testCaseViewConst';

import TestCaseResults from './TestCaseResults';
import useTestCaseMultiData from './useTestCaseMultiData';
import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseMutliData = ({
  isFromTestRun,
  resultUpdatable,
  onResultClick,
  testRunId,
  testResultsArray,
  testRunName
}) => {
  const {
    testRunsCount,
    selectedTab,
    projectId,
    handleTabChange,
    onJiraButtonClick
  } = useTestCaseViewDetails();
  const { testCaseIssues } = useTestCaseMultiData({
    isFromTestRun,
    testResultsArray
  });

  const trTcIssuesTableColumn = [
    {
      name: 'Issue',
      key: 'jira_id',
      cell: (rowData) => (
        <div
          className="text-base-900 cursor-pointer font-medium"
          role="button"
          tabIndex={0}
          onClick={() => onJiraButtonClick(rowData.jira_id)}
          onKeyDown={(e) =>
            onSubmitKeyHandler(e, () => onJiraButtonClick(rowData.jira_id))
          }
        >{`${rowData.jira_id}`}</div>
      )
    },
    {
      name: 'Test Run',
      key: 'testRunName',
      cell: () => (
        <Link
          to={routeFormatter(AppRoute.TEST_RUN_DETAILS, {
            projectId,
            testRunId
          })}
          className="text-base-900"
        >
          {testRunName}
        </Link>
      )
    },
    {
      name: 'Linked On',
      key: 'created_at',
      cell: (rowData) =>
        rowData?.created_at ? formatTime(rowData.created_at, 'date') : '--'
    }
  ];

  const tcIssuesTableColumn = [
    {
      name: 'Issue',
      key: 'jira_id',
      cell: (rowData) => (
        <div
          className="text-base-900 cursor-pointer font-medium"
          role="button"
          tabIndex={0}
          onClick={() => onJiraButtonClick(rowData.test_run_id)}
          onKeyDown={(e) =>
            onSubmitKeyHandler(e, () => onJiraButtonClick(rowData?.jira_id))
          }
        >
          {rowData?.jira_id}
        </div>
      )
    },
    {
      name: 'Test Run',
      key: 'test_run_name',
      cell: (rowData) => (
        <Link
          to={routeFormatter(AppRoute.TEST_RUN_DETAILS, {
            projectId,
            testRunId: rowData?.test_run_id
          })}
          className="text-base-900"
        >
          {rowData?.test_run_name}
        </Link>
      )
    },
    {
      name: 'Linked On',
      key: 'created_at',
      cell: (rowData) =>
        rowData?.test_run_created_at
          ? formatTime(rowData?.test_run_created_at, 'date')
          : '--'
    }
  ];

  return (
    <>
      <TMTabs
        id="project-tabs"
        defaultIndex={null}
        tabsArray={TABS_ARRAY.map((item) => ({
          ...item,
          count:
            item.name === 'Results'
              ? `${isFromTestRun ? '' : testRunsCount || ''}`
              : `${testCaseIssues?.length || ''}`
        }))}
        onTabChange={(data) => handleTabChange(data, isFromTestRun, testRunId)}
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
                columns={
                  isFromTestRun ? trTcIssuesTableColumn : tcIssuesTableColumn
                }
                rows={testCaseIssues}
              />
            </div>
          ) : (
            <div className="mt-10">
              <TMEmptyState
                title="No Issues"
                description="Once you start linking issues for this test case in test runs, they will show here"
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
  testRunId: PropTypes.number,
  onResultClick: PropTypes.bool,
  testResultsArray: PropTypes.arrayOf(PropTypes.object),
  testRunName: PropTypes.string
};

TestCaseMutliData.defaultProps = {
  isFromTestRun: false,
  resultUpdatable: false,
  testRunId: null,
  onResultClick: () => {},
  testResultsArray: [],
  testRunName: ''
};

export default TestCaseMutliData;
