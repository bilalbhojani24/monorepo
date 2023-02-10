import React, { useEffect, useState } from 'react';
import {
  TMButton,
  TMPageHeadings,
  TMTabs,
  TMEmptyState
} from 'common/bifrostProxy';
import { InfoOutlinedIcon } from 'assets/icons';
import Loader from 'common/Loader';

import { TABS_ARRAY } from '../const/immutableConst';

import AddEditTestRun from './AddEditTestRun';
import TestRunsTable from './TestRunsTable';
import useTestRuns from './useTestRuns';

const TestRuns = () => {
  const {
    currentTab,
    allTestRuns,
    isTestRunsLoading,
    showTestRunAddFormHandler,
    isAddTestRunsFormVisible,
    handleTabChange
  } = useTestRuns();

  if (isAddTestRunsFormVisible) return <AddEditTestRun />;

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <div className="border-base-300 border-b">
        <TMPageHeadings
          wrapperClassName="px-4 pt-6 bg-transparent"
          heading="Test Runs"
          actions={
            <>
              <TMButton variant="primary" onClick={showTestRunAddFormHandler}>
                Create Test Run
              </TMButton>
            </>
          }
        />
        <div className="mb-0 w-full px-4">
          <TMTabs
            id="project-tabs"
            tabsArray={TABS_ARRAY}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      <div className="flex flex-1 shrink-0  grow flex-col overflow-y-auto p-4">
        <div className="border-base-200 flex flex-col grow justify-start  rounded-md border bg-white">
          {isTestRunsLoading ? (
            <div className="flex w-full shrink-0 grow flex-col  justify-center ">
              <Loader wrapperClass="h-96 w-full" />
            </div>
          ) : (
            <>
              {!allTestRuns?.length && !isTestRunsLoading ? (
                <div className="flex h-96 w-full shrink-0 grow flex-col justify-center">
                  <TMEmptyState
                    title={`No ${currentTab}`}
                    description="You can get started by creating test run by clicking on Create Test Run button."
                    mainIcon={
                      <InfoOutlinedIcon className="text-base-500 !h-12 !w-12" />
                    }
                    buttonProps={{
                      children: 'Create Test Run',
                      // onClick: showAddProjectModal,
                      colors: 'white'
                    }}
                  />
                </div>
              ) : (
                <TestRunsTable />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

TestRuns.propTypes = {};

TestRuns.defaultProps = {};

export default TestRuns;
