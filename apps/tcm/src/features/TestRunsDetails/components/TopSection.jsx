import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineAccessTime,
  MdOutlineInsights,
  MdPersonOutline
} from '@browserstack/bifrost';
import {
  TMButton,
  TMDropdown,
  TMMetadata,
  TMPageHeadings,
  TMTooltip,
  TMTooltipBody
} from 'common/bifrostProxy';
import ClampedTags from 'common/ClampedTags';
import AppRoute from 'const/routes';
import { CloseTestRun, DeleteTestRun } from 'features/TestRuns';
import { formatTime, routeFormatter } from 'utils/helperFunctions';

import { TR_DROP_OPTIONS } from '../const/immutableConst';

import useTestRunDetails from './useTestRunDetails';

const TopSection = () => {
  const {
    projectId,
    testRunId,
    showIssuesHandler,
    testRunDetails,
    onDropDownChange
  } = useTestRunDetails();
  return (
    <div className="border-base-300 w-full border-b pb-4">
      <TMPageHeadings
        wrapperClassName="px-4 pt-6 bg-transparent"
        breadcrumbs={[
          {
            name: 'Test Runs',
            url: routeFormatter(AppRoute.TEST_RUNS, { projectId })
          },
          {
            name: testRunDetails?.identifier || testRunId
          }
        ]}
        heading={
          <div className="flex">
            {testRunDetails?.name}
            {testRunDetails?.is_automation &&
              testRunDetails?.observability_url && (
                <TMTooltip
                  size="xs"
                  placementSide="bottom"
                  theme="dark"
                  content={
                    <>
                      <TMTooltipBody>
                        <p className="text-sm ">
                          This in an automated test run created with Test
                          Observability.
                          <br />
                          <br />
                          Build Run:
                        </p>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={testRunDetails?.observability_url}
                          className="mt-1 text-sm font-normal text-white underline"
                        >
                          {testRunDetails?.name}
                        </a>
                      </TMTooltipBody>
                    </>
                  }
                >
                  <a
                    href={testRunDetails?.observability_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MdOutlineInsights className="text-brand-500 ml-3 h-8 w-8" />
                  </a>
                </TMTooltip>
              )}
          </div>
        }
        actions={
          <>
            <Link
              to={routeFormatter(AppRoute.TEST_RUN_ISSUES, {
                projectId,
                testRunId
              })}
            >
              <TMButton
                wrapperClassName="mr-4"
                variant="primary"
                colors="white"
                size="default"
                onClick={showIssuesHandler}
              >
                Issues
              </TMButton>
            </Link>

            {testRunDetails?.run_state &&
              testRunDetails.run_state !== 'closed' && (
                <TMDropdown
                  triggerVariant="menu-button"
                  options={TR_DROP_OPTIONS}
                  onClick={onDropDownChange}
                />
              )}
          </>
        }
        subSection={
          <div className="mt-4 flex gap-4">
            <TMMetadata
              metaDescription={
                testRunDetails?.assignee?.full_name || 'Unassigned'
              }
              textColorClass="text-base-500 mt-1"
              icon={<MdPersonOutline className="text-base-500 h-5 w-5" />}
            />
            <TMMetadata
              metaDescription={
                testRunDetails?.created_at
                  ? formatTime(testRunDetails?.created_at, 'timeG')
                  : '--'
              }
              textColorClass="text-base-500 mt-1"
              icon={<MdOutlineAccessTime className="text-base-500 h-5 w-5" />}
            />
            <ClampedTags tagsArray={testRunDetails?.tags || []} />
          </div>
        }
      />
      <CloseTestRun />
      <DeleteTestRun redirectToDetails />
    </div>
  );
};

export default TopSection;
