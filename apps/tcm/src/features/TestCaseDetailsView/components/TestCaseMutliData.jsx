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
import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseMutliData = ({
  isFromTestRun,
  resultUpdatable,
  onResultClick,
  testRunId
}) => {
  const {
    testRunsCount,
    selectedTab,
    projectId,
    testCaseIssues,
    handleTabChange,
    onJiraButtonClick
  } = useTestCaseViewDetails();

  const issuesTableColumn = [
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
      key: 'test_run_id',
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
      // isFromTestRun ? (
      //   <div className="text-base-900">{rowData?.test_run_name}</div>
      // ) : (
      //   <div className="flex flex-col">
      //     <div className="text-base-900 font-medium">{`${
      //       rowData?.jira_id || ''
      //     }`}</div>
      //     <div className="text-base-500">{rowData?.test_run_name}</div>
      //   </div>
      // )
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
  testRunId: PropTypes.number,
  onResultClick: PropTypes.bool
};

TestCaseMutliData.defaultProps = {
  isFromTestRun: false,
  resultUpdatable: false,
  testRunId: null,
  onResultClick: () => {}
};

export default TestCaseMutliData;
