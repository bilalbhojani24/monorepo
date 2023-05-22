import React from 'react';
import { Link } from 'react-router-dom';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMBadge,
  TMButton,
  TMDataTable,
  TMDropdown,
  TMEmptyState
} from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import PropTypes from 'prop-types';
import { formatTime, routeFormatter } from 'utils/helperFunctions';

import { RESULTS_DROP_OPTIONS } from '../const/testCaseViewConst';

import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseResults = ({ isFromTestRun, onResultClick, resultUpdatable }) => {
  const { testRunsDetails, testCaseDetails, testResultsArray } =
    useTestCaseViewDetails();

  const resultsTCTableColumn = [
    {
      name: 'Test Run Details',
      key: 'test_run_id',
      cell: (rowData) => (
        <div className="flex flex-col">
          <Link
            to={routeFormatter(AppRoute.TEST_RUN_DETAILS, {
              projectId: testCaseDetails?.project_id,
              testRunId: rowData?.test_run_id
            })}
            className="text-base-900 font-medium"
          >{`${rowData.test_run_identifier} | ${rowData.test_run_name}`}</Link>
          <div className="text-base-500">
            {formatTime(rowData.created_at, 'time')}
          </div>
        </div>
      )
    },
    {
      name: 'Status',
      key: 'latest_status',
      cell: (rowData) => (
        <TMBadge
          isRounded
          wrapperClassName="capitalize"
          text={rowData?.latest_status}
          modifier={rowData?.latest_status
            ?.replace('untested', 'base')
            ?.replace('passed', 'success')
            ?.replace('failed', 'error')
            ?.replace('blocked', 'error')
            ?.replace('retest', 'warn')
            ?.replace('skipped', 'base')}
        />
      )
    }
  ];

  const resultsTRTableColumn = [
    {
      name: 'Remarks',
      key: 'id',
      cell: (rowData) => (
        <div className="flex flex-col">
          <div className="text-base-900 font-medium">
            {`This test is marked as`}{' '}
            <span className="capitalize">{rowData.status}</span>
          </div>
          <div className="text-base-500">
            {formatTime(rowData.updated_at, 'timeG')}
          </div>
          <div className="text-base-500">{rowData?.author?.full_name}</div>
        </div>
      )
    },
    {
      name: 'Status',
      key: 'status',
      cell: (rowData) => (
        <TMBadge
          isRounded
          wrapperClassName="capitalize"
          text={rowData?.status}
          modifier={rowData?.status
            ?.replace('untested', 'base')
            ?.replace('passed', 'success')
            ?.replace('retest', 'warn')
            ?.replace('blocked', 'error')
            ?.replace('skipped', 'base')
            ?.replace('failed', 'error')}
        />
      )
    }
  ];

  return (
    <>
      {isFromTestRun ? (
        <div className="w-full pb-8">
          {resultUpdatable && (
            <>
              <div className="mt-8 mb-4 text-sm">
                You can log results for this test case from the options below:
              </div>
              <div className="flex gap-4">
                <TMButton
                  size="default"
                  variant="secondary"
                  colors="brand"
                  onClick={() => onResultClick(null, testCaseDetails)}
                >
                  Add Result
                </TMButton>

                <div className="flex">
                  <TMButton
                    onClick={() =>
                      onResultClick({ value: 'passed' }, testCaseDetails, true)
                    }
                    size="default"
                    variant="primary"
                    colors="white"
                    wrapperClassName="ml-3 whitespace-nowrap w-full rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10"
                  >
                    Add Pass Result
                  </TMButton>
                  <TMDropdown
                    triggerClassName="rounded-tl-none rounded-bl-none focus:ring-offset-0 focus:z-10 bg-white border-l-0"
                    triggerVariant="menu-button"
                    options={RESULTS_DROP_OPTIONS}
                    onClick={(selectedOption) =>
                      onResultClick(
                        { value: selectedOption.id },
                        testCaseDetails,
                        true
                      )
                    }
                  />
                </div>
              </div>
            </>
          )}

          {testResultsArray?.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={resultsTRTableColumn}
                rows={testResultsArray}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          {testRunsDetails?.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={resultsTCTableColumn}
                rows={testRunsDetails}
              />
            </div>
          ) : (
            <div className="mt-10">
              <TMEmptyState
                title="No Results"
                description="Once you start linking this test case in a test run, historical result will appear here"
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

TestCaseResults.propTypes = {
  isFromTestRun: PropTypes.bool,
  onResultClick: PropTypes.func,
  resultUpdatable: PropTypes.bool
};

TestCaseResults.defaultProps = {
  isFromTestRun: false,
  resultUpdatable: false,
  onResultClick: () => {}
};

export default TestCaseResults;
