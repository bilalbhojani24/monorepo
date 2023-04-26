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
  TMTooltipBody,
  TMTruncateText
} from 'common/bifrostProxy';
import ClampedTags from 'common/ClampedTags';
import AppRoute from 'const/routes';
import { CloseTestRun, DeleteTestRun } from 'features/TestRuns';
import { formatTime, routeFormatter } from 'utils/helperFunctions';

import { TR_DROP_OPTIONS } from '../const/immutableConst';

import useTestRunDetails from './useTestRunDetails';

const TopSection = () => {
  const {
    sourceTab,
    testRunPageQuery,
    projectId,
    testRunId,
    showIssuesHandler,
    testRunDetails,
    onDropDownChange,
    fetchTestRunDetails,
    automationTooltipClicked
  } = useTestRunDetails();

  return (
    <div className="border-base-300 w-full border-b pb-4">
      <TMPageHeadings
        wrapperClassName="px-4 pt-6 bg-transparent"
        breadcrumbs={[
          {
            name: 'Test Runs',
            url:
              routeFormatter(AppRoute.TEST_RUNS, { projectId }) +
              testRunPageQuery
          },
          {
            name: testRunDetails?.identifier || '--'
          }
        ]}
        heading={
          <div className="flex w-full">
            <div className=" overflow-auto">
              <TMTruncateText
                truncateUsingClamp={false}
                hidetooltipTriggerIcon
                isFullWidthTooltip
                headerTooltipProps={{
                  delay: 500
                }}
              >
                {testRunDetails?.name}
              </TMTruncateText>
            </div>
            {testRunDetails?.is_automation &&
              testRunDetails?.observability_url && (
                <div className="basis-8">
                  <TMTooltip
                    size="xs"
                    placementSide="bottom"
                    theme="dark"
                    onOpenChange={(isOpen) => {
                      if (isOpen) automationTooltipClicked();
                    }}
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
                </div>
              )}
          </div>
        }
        actions={
          <>
            <Link
              state={{ sourceTab }}
              to={routeFormatter(AppRoute.TEST_RUN_ISSUES, {
                projectId,
                testRunId
              })}
            >
              <TMButton
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
                  wrapperClassName="ml-4"
                  triggerVariant="menu-button"
                  options={TR_DROP_OPTIONS}
                  onClick={onDropDownChange}
                />
              )}
          </>
        }
        subSection={
          <div className="flex gap-4">
            <TMMetadata
              metaDescription={
                testRunDetails?.assignee?.full_name || 'Unassigned'
              }
              textColorClass="text-base-500 mt-1"
              icon={<MdPersonOutline className="text-base-500 h-5 w-5" />}
            />
            <TMTooltip
              size="xs"
              placementSide="bottom"
              theme="dark"
              delay="200"
              content={
                <>
                  <TMTooltipBody wrapperClassName="flex flex-col">
                    <div className="text-sm ">
                      <div>Created on:</div>
                      {testRunDetails?.created_at
                        ? formatTime(testRunDetails?.created_at, 'timeG')
                        : '--'}
                    </div>
                    <div className="mt-4 text-sm">
                      <div>Last Updated on:</div>
                      {testRunDetails?.updated_at
                        ? formatTime(testRunDetails?.updated_at, 'timeG')
                        : '--'}
                    </div>
                  </TMTooltipBody>
                </>
              }
            >
              <TMMetadata
                metaDescription={
                  testRunDetails?.updated_at
                    ? formatTime(testRunDetails?.updated_at, 'timeG')
                    : '--'
                }
                textColorClass="text-base-500 mt-1"
                icon={<MdOutlineAccessTime className="text-base-500 h-5 w-5" />}
              />
            </TMTooltip>

            <ClampedTags tagsArray={testRunDetails?.tags || []} noTagsText="" />
          </div>
        }
      />
      <CloseTestRun updateCb={() => fetchTestRunDetails(true)} />
      <DeleteTestRun redirectToDetails />
    </div>
  );
};

export default TopSection;
