import React, { useEffect } from 'react';
import { TMDataTable, TMDropdown, TMPageHeadings } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import useIssues from './useIssues';
import useTestRunDetails from './useTestRunDetails';

const Issues = () => {
  const { testRunDetails, isIssuesLoading, issuesArray, onDropDownChange } =
    useIssues();
  const { projectId, testRunId, fetchTestRunDetails } = useTestRunDetails();

  useEffect(() => {
    fetchTestRunDetails(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, testRunId]);

  const issuesColumn = [
    {
      name: 'ISSUE',
      key: 'jira_id',
      cell: (data) => <div className="text-black">{data?.jira_id}</div>
    },
    {
      name: 'TITLE',
      key: 'title',
      cell: () => '--'
    },
    {
      name: '',
      key: '',
      cell: (data) => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          options={[]}
          onClick={(e, selectedOption) =>
            onDropDownChange(e, selectedOption, data)
          }
        />
      ),
      class: 'w-[5%]'
    }
  ];

  return (
    <div className="flex w-full flex-1 shrink-0 grow flex-col overflow-hidden pb-4">
      <TMPageHeadings
        wrapperClassName="px-4 py-6 bg-transparent"
        heading="All Linked Issues"
        breadcrumbs={[
          {
            name: 'Test Runs',
            url: routeFormatter(AppRoute.TEST_RUNS, { projectId })
          },
          {
            name: testRunDetails?.name || testRunId,
            url: routeFormatter(AppRoute.TEST_RUN_DETAILS, {
              projectId,
              testRunId
            })
          },
          { name: 'Issues' }
        ]}
      />
      <div className="flex  shrink-0 grow flex-col overflow-y-auto">
        <div className="border-base-200 flex-col overflow-y-auto border border-l-0 bg-white p-4">
          {isIssuesLoading ? (
            <Loader wrapperClassName="h-96" />
          ) : (
            <div>
              <div className="text-base-900 text-sm">
                List of all the links which are created while testing test cases
                within this test run:
              </div>
              <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-none">
                <TMDataTable
                  containerWrapperClass="md:rounded-none"
                  columns={issuesColumn}
                  rows={issuesArray}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Issues;
