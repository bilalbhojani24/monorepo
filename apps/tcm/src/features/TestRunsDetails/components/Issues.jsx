import React, { useEffect } from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMDataTable, TMEmptyState, TMPageHeadings } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import AppRoute from 'const/routes';
import { formatTime, routeFormatter } from 'utils/helperFunctions';

import useIssues from './useIssues';
import useTestRunDetails from './useTestRunDetails';

const Issues = () => {
  const { testRunDetails, isIssuesLoading, issuesArray } = useIssues();
  const {
    projectId,
    testRunId,
    testRunPageQuery,
    sourceTab,
    fetchTestRunDetails
  } = useTestRunDetails();

  useEffect(() => {
    fetchTestRunDetails(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, testRunId]);

  const issuesColumn = [
    {
      name: 'ISSUES',
      key: 'jira_id',
      cell: (data) => <div className="text-black">{data?.jira_id}</div>
    },
    {
      name: 'LINKED ON',
      key: 'created_at',
      cell: (rowData) =>
        rowData?.created_at ? formatTime(rowData.created_at, 'date') : '--'
    }
    // {
    //   name: '',
    //   key: '',
    //   cell: (data) => (
    //     <TMDropdown
    //       triggerVariant="meatball-button"
    //       dividerRequired
    //       options={[]}
    //       onClick={(selectedOption) => onDropDownChange(selectedOption, data)}
    //     />
    //   ),
    //   class: 'w-[5%]'
    // }
  ];

  return (
    <div className="flex w-full flex-1 shrink-0 grow flex-col overflow-hidden pb-4">
      <TMPageHeadings
        wrapperClassName="px-4 py-6 bg-transparent"
        heading="All Linked Issues"
        breadcrumbs={[
          {
            name: 'Test Runs',
            url:
              routeFormatter(AppRoute.TEST_RUNS, { projectId }) +
              testRunPageQuery
          },
          {
            name: testRunDetails?.name || testRunId,
            url: routeFormatter(AppRoute.TEST_RUN_DETAILS, {
              projectId,
              testRunId
            }),
            options: { state: { sourceTab } }
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
              {issuesArray.length ? (
                <>
                  <div className="text-base-900 text-sm">
                    List of all the links which are created while testing test
                    cases within this test run:
                  </div>
                  <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-none">
                    <TMDataTable
                      containerWrapperClass="md:rounded-none"
                      columns={issuesColumn}
                      rows={issuesArray}
                    />
                  </div>
                </>
              ) : (
                <div className="flex h-96 w-full items-center justify-center">
                  <TMEmptyState
                    title=""
                    description="No linked issue"
                    mainIcon={
                      <InfoOutlinedIcon className="text-base-400 !h-12 !w-12" />
                    }
                    buttonProps={null}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Issues;
