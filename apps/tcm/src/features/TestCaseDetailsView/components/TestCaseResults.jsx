import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMBadge,
  TMButton,
  TMDataTable,
  TMDropdown,
  TMEmptyState
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { formatTime } from 'utils/helperFunctions';

import { RESULTS_DROP_OPTIONS } from '../const/testCaseViewConst';

import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseResults = ({ isFromTestRun }) => {
  const { testRunsDetails } = useTestCaseViewDetails();

  const resultsTableColumn = [
    {
      name: 'Test Run Details',
      key: 'test_case_id',
      cell: (rowData) => (
        <div className="flex flex-col">
          <div className="text-base-900 font-medium">{`${rowData.identifier} | ${rowData.name}`}</div>
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
            ?.replace('failed', 'error')}
        />
      )
    }
  ];

  return (
    <>
      {isFromTestRun ? (
        <div className="w-full pb-8">
          <div className="mt-8 mb-4 text-sm">
            You can log results for this test case from the options below:
          </div>
          <div className="flex gap-4">
            <TMButton size="default" variant="secondary" colors="brand">
              Add Result
            </TMButton>

            <div className="flex">
              <TMButton
                size="default"
                variant="primary"
                colors="white"
                wrapperClassName="ml-3 whitespace-nowrap w-full rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10"
              >
                Add Pass Result
              </TMButton>
              <TMDropdown
                triggerClassName="rounded-tl-none rounded-bl-none focus:ring-offset-0 focus:z-10"
                triggerVariant="menu-button"
                options={RESULTS_DROP_OPTIONS}
                //   onClick={onDropDownChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {testRunsDetails?.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={resultsTableColumn}
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
  isFromTestRun: PropTypes.bool
};

TestCaseResults.defaultProps = {
  isFromTestRun: false
};

export default TestCaseResults;
