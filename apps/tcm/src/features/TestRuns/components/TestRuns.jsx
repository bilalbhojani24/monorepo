import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMEmptyState,
  TMPageHeadings,
  TMTabs
} from 'common/bifrostProxy';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';
import { logEventHelper } from 'utils/logEvent';

import { TABS_ARRAY } from '../const/immutableConst';

import AddEditTestRun from './AddEditTestRun';
import TestRunsTable from './TestRunsTable';
import useTestRuns from './useTestRuns';

const TestRuns = ({ isEditView }) => {
  const {
    projectId,
    page,
    isEditTestRunsFormVisible,
    isAddTestRunsFormVisible,
    currentTab,
    allTestRuns,
    isTestRunsLoading,
    showTestRunAddFormHandler,
    showTestRunEditForm,
    handleTabChange,
    fetchAllTestRuns
  } = useTestRuns();
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const closed = new URLSearchParams(queryString).get('closed');
  useEffect(() => {
    fetchAllTestRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, currentTab, page]);

  useEffect(() => {
    if (isEditView) showTestRunEditForm();
  }, [isEditView, showTestRunEditForm]);

  useEffect(() => {
    if (closed === true) {
      dispatch(
        logEventHelper('TM_TrClosedPageLoaded', {
          project_id: projectId
        })
      );
    } else {
      dispatch(
        logEventHelper('TM_TrActivePageLoaded', {
          project_id: projectId
        })
      );
    }
  }, [closed, dispatch, projectId]);

  if (isAddTestRunsFormVisible || isEditTestRunsFormVisible)
    return <AddEditTestRun />;

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
            defaultIndex={TABS_ARRAY.findIndex(
              (item) => item.name === currentTab
            )}
            key={TABS_ARRAY.findIndex((item) => item.name === currentTab)}
            id="project-tabs"
            tabsArray={TABS_ARRAY}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      <div className="flex flex-1 shrink-0  grow flex-col overflow-y-auto p-4">
        <div className="border-base-200 flex grow flex-col justify-start  rounded-md border bg-white">
          {isTestRunsLoading ? (
            <div className="flex w-full shrink-0 grow flex-col  justify-center ">
              <Loader wrapperClassName="h-96 w-full" />
            </div>
          ) : (
            <>
              {!allTestRuns?.length && !isTestRunsLoading ? (
                <div className="flex h-96 w-full shrink-0 grow flex-col justify-center">
                  <TMEmptyState
                    title={`No ${currentTab}`}
                    description={
                      currentTab === TABS_ARRAY[0].name
                        ? 'You can get started by creating test runs on clicking Create Test Run Button'
                        : 'When you change status of any test run to closed, they will appear here'
                    }
                    mainIcon={
                      <InfoOutlinedIcon className="text-base-500 !h-12 !w-12" />
                    }
                    buttonProps={
                      currentTab === TABS_ARRAY[0].name
                        ? {
                            children: 'Create Test Run',
                            onClick: (e) => showTestRunAddFormHandler(e, true),
                            colors: 'white'
                          }
                        : null
                    }
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

TestRuns.propTypes = {
  isEditView: PropTypes.bool
};

TestRuns.defaultProps = {
  isEditView: false
};

export default TestRuns;
