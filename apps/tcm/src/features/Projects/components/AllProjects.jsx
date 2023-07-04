/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { CheckCircleRoundedIcon, InfoOutlinedIcon } from 'assets/icons';
import {
  TMAlerts,
  TMButton,
  TMDataTable,
  TMDropdown,
  TMEmptyState,
  TMPageHeadings,
  TMPagination,
  TMTooltip,
  TMTooltipBody,
  TMTruncateText
} from 'common/bifrostProxy';
import Loader from 'common/Loader';
import AppRoute from 'const/routes';
import ImportProgress from 'features/ImportProgress';
import { IMPORT_STATUS } from 'features/ImportProgress/const/immutables';
import { displayReportModal } from 'features/ImportProgress/slices/importProgressThunk';
import { logEventHelper } from 'utils/logEvent';

import { dropDownOptions } from '../const/projectsConst';

import AddProjects from './AddProjects';
import DeleteProjects from './DeleteProjects';
import EditProjects from './EditProjects';
import useProjects from './useProjects';

const AllProjects = () => {
  const {
    isLoading,
    currentPage,
    metaPage,
    allProjects,
    showAddModal,
    showEditModal,
    showDeleteModal,
    importId,
    importStatus,
    showNewProjectBanner,
    countOfProjectsImported,
    currentTestManagementTool,
    isNewProjectBannerDismissed,
    dispatch,
    searchParams,
    handleClickDynamicLink,
    onDropDownChange,
    fetchProjects,
    showAddProjectModal,
    dismissImportProjectAlert,
    isProgressDismissed
  } = useProjects();

  useEffect(() => {
    dispatch(logEventHelper('TM_AllProjectsPageLoaded', {}));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (searchParams.get('import_id')) {
      dispatch(displayReportModal(searchParams.get('import_id')));
    }
  }, [dispatch, searchParams]);

  const tableColumns = [
    {
      name: 'ID',
      key: 'id',
      cell: (rowData) => (
        <div
          role="button"
          className="text-base-700 hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleClickDynamicLink(
            rowData.test_cases_count > 0
              ? AppRoute.DASHBOARD
              : AppRoute.TEST_CASES,
            rowData.id,
            null,
            'ID'
          )}
          onKeyDown={handleClickDynamicLink(
            rowData.test_cases_count > 0
              ? AppRoute.DASHBOARD
              : AppRoute.TEST_CASES,
            rowData.id,
            null,
            'ID'
          )}
        >
          {rowData.identifier}
        </div>
      ),
      class: 'w-[10%]'
    },
    {
      name: 'PROJECT TITLE',
      key: 'name',
      cell: (rowData) => (
        <div
          role="button"
          className="hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleClickDynamicLink(
            rowData.test_cases_count > 0
              ? AppRoute.DASHBOARD
              : AppRoute.TEST_CASES,
            rowData.id,
            rowData.name,
            'Name'
          )}
          onKeyDown={handleClickDynamicLink(
            rowData.test_cases_count > 0
              ? AppRoute.DASHBOARD
              : AppRoute.TEST_CASES,
            rowData.id,
            rowData.name,
            'Name'
          )}
        >
          <div className="flex items-center">
            <div className="text-base-900 hover:text-brand-600 max-w-full font-medium">
              <TMTruncateText
                ignoreClickAndWrapText
                truncateUsingClamp={false}
                hidetooltipTriggerIcon
                isFullWidthTooltip
                headerTooltipProps={{
                  delay: 500
                }}
                wrapperClassName="mr-1"
              >
                {rowData.name}
              </TMTruncateText>
            </div>
            {!isProgressDismissed && importId === rowData.import_id && (
              <TMTooltip
                size="xs"
                placementSide="top"
                theme="dark"
                content={
                  <>
                    <TMTooltipBody>
                      <p className="text-sm">
                        Successfully imported from{' '}
                        {currentTestManagementTool === 'zephyr'
                          ? 'Zephyr Scale'
                          : 'TestRail'}
                      </p>
                    </TMTooltipBody>
                  </>
                }
              >
                <CheckCircleRoundedIcon className="text-success-500 !h-5 !w-5" />
              </TMTooltip>
            )}
          </div>
          {rowData.description && (
            <div className="text-base-500 inline">
              <TMTruncateText
                truncateUsingClamp={false}
                hidetooltipTriggerIcon
                isFullWidthTooltip
                headerTooltipProps={{
                  delay: 500
                }}
              >
                {rowData.description}
              </TMTruncateText>
            </div>
          )}
        </div>
      ),
      class: 'w-[80%]'
    },
    {
      name: 'QUICK LINKS',
      key: 'quickLinks',
      // className: 'w-1/6',
      cell: (rowData) => (
        <div className="flex">
          <div
            onClick={handleClickDynamicLink(
              AppRoute.TEST_CASES,
              rowData.id,
              null,
              'TestCase'
            )}
            onKeyDown={handleClickDynamicLink(
              AppRoute.TEST_CASES,
              rowData.id,
              null,
              'TestCase'
            )}
            role="button"
            tabIndex={0}
            className="text-base-900 hover:text-brand-600 w-28 cursor-pointer"
          >
            {rowData.test_cases_count} Test Cases
          </div>
          <div
            tabIndex={0}
            role="button"
            className="text-base-900 hover:text-brand-600 ml-6  w-1 cursor-pointer"
            onClick={handleClickDynamicLink(
              AppRoute.TEST_RUNS,
              rowData.id,
              null,
              'TestRun'
            )}
            onKeyDown={handleClickDynamicLink(
              AppRoute.TEST_RUNS,
              rowData.id,
              null,
              'TestRun'
            )}
          >
            {rowData.test_runs_count} Test Runs
          </div>
        </div>
      ),
      class: 'w-[25%]'
    },
    {
      name: '',
      key: 'action',
      cell: (data) => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          onClick={(selectedOption) => onDropDownChange(selectedOption, data)}
          options={dropDownOptions}
          optionGroupWrapperClassName="w-40"
        />
      ),
      class: 'w-[5%]'
    }
  ];

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TMPageHeadings
        heading="All Projects"
        actions={
          <>
            <div className="flex">
              <TMButton
                variant="primary"
                size="default"
                onClick={showAddProjectModal}
                wrapperClassName="ml-3 whitespace-nowrap w-full focus:ring-offset-0 focus:z-10"
              >
                Create Project
              </TMButton>
            </div>
          </>
        }
      />
      <div className="flex flex-1 shrink-0 grow flex-col overflow-y-auto p-6">
        {(importStatus === IMPORT_STATUS.ONGOING ||
          importStatus === IMPORT_STATUS.FAILURE ||
          importStatus === IMPORT_STATUS.SUCCESS) &&
          !isProgressDismissed && <ImportProgress />}
        {countOfProjectsImported > 0 &&
          showNewProjectBanner &&
          importStatus === IMPORT_STATUS.COMPLETED &&
          !isNewProjectBannerDismissed && (
            <div className="mb-4">
              <TMAlerts
                modifier="success"
                title={`${countOfProjectsImported} Projects imported from ${
                  currentTestManagementTool === 'zephyr'
                    ? 'Zephyr Scale'
                    : 'TestRail'
                } successfully`}
                dismissButton
                dismissButtonFn={dismissImportProjectAlert}
              />
            </div>
          )}
        <div className="border-base-200 flex w-fit min-w-full grow flex-col justify-start rounded-md border bg-white">
          {isLoading ? (
            <Loader wrapperClassName="grow" />
          ) : (
            <>
              {allProjects?.length ? (
                <>
                  <TMDataTable
                    columns={tableColumns}
                    rows={allProjects}
                    containerWrapperClass="shadow-none border-none min-w-[1040px]"
                    tableWrapperClass="table-fixed w-full"
                  />

                  {metaPage?.count > metaPage?.page_size && (
                    <TMPagination
                      pageNumber={metaPage?.page || 1}
                      count={metaPage?.count || 0}
                      pageSize={metaPage?.page_size}
                    />
                  )}
                </>
              ) : (
                <div className="flex h-full grow flex-col justify-center">
                  <TMEmptyState
                    title="No Projects"
                    description="No project data available. Create a project to get started."
                    mainIcon={
                      <InfoOutlinedIcon className="text-base-500 !h-12 !w-12" />
                    }
                    buttonProps={{
                      children: 'Create Project',
                      onClick: () => showAddProjectModal('emptyState'),
                      colors: 'white'
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <AddProjects show={showAddModal} />
      <EditProjects show={showEditModal} />
      <DeleteProjects show={showDeleteModal} />
    </div>
  );
};

AllProjects.defaultProps = {};

export default AllProjects;
