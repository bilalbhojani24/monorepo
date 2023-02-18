import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAccessTime, MdPersonOutline } from '@browserstack/bifrost';
import {
  TMButton,
  TMDropdown,
  TMMetadata,
  TMPageHeadings
} from 'common/bifrostProxy';
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
        heading={testRunDetails?.name || ''}
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
                onClick={showIssuesHandler}
              >
                Issues
              </TMButton>
            </Link>

            <TMDropdown
              triggerVariant="menu-button"
              options={TR_DROP_OPTIONS}
              onClick={onDropDownChange}
            />
          </>
        }
        subSection={
          <div className="mt-4 flex gap-4">
            <TMMetadata
              metaDescription={testRunDetails?.assignee?.full_name || '--'}
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
          </div>
        }
      />
      <CloseTestRun />
      <DeleteTestRun />
    </div>
  );
};

export default TopSection;
