/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMDataTable,
  TMDropdown,
  TMEmptyState,
  TMPageHeadings,
  TMPagination,
  TMTruncateText
} from 'common/bifrostProxy';
import Loader from 'common/Loader';
import AppRoute from 'const/routes';

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
    handleClickDynamicLink,
    onDropDownChange,
    fetchProjects,
    showAddProjectModal
  } = useProjects();

  const tableColumns = [
    {
      name: 'ID',
      key: 'id',
      cell: (rowData) => (
        <div
          role="button"
          className="hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
          onKeyDown={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
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
          onClick={
            rowData.test_cases_count > 0
              ? handleClickDynamicLink(AppRoute.DASHBOARD, rowData.id)
              : handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)
          }
          onKeyDown={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
        >
          <div className="text-base-900 hover:text-brand-600 font-medium ">
            <TMTruncateText
              truncateUsingClamp={false}
              hidetooltipTriggerIcon
              isFullWidthTooltip
              headerTooltipProps={{
                delay: 500
              }}
            >
              {rowData.name}
            </TMTruncateText>
          </div>
          {rowData.description && (
            <div className="text-base-500">
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
            onClick={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
            onKeyDown={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
            role="button"
            tabIndex={0}
            className="hover:text-brand-600 w-28 cursor-pointer"
          >
            {rowData.test_cases_count} Test Cases
          </div>
          <div
            tabIndex={0}
            role="button"
            className="hover:text-brand-600 ml-6  w-1 cursor-pointer"
            onClick={handleClickDynamicLink(AppRoute.TEST_RUNS, rowData.id)}
            onKeyDown={handleClickDynamicLink(AppRoute.TEST_RUNS, rowData.id)}
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
      {/* <ImportStatus /> */}
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
      <div className="flex flex-1 shrink-0 grow flex-col overflow-y-auto p-4">
        <div className="border-base-200 flex grow flex-col justify-start rounded-md border bg-white">
          {isLoading ? (
            <Loader wrapperClassName="grow" />
          ) : (
            <>
              {allProjects?.length ? (
                <>
                  <TMDataTable
                    columns={tableColumns}
                    rows={allProjects}
                    containerWrapperClass="shadow-none border-none "
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
                      onClick: showAddProjectModal,
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

AllProjects.propTypes = {};

AllProjects.defaultProps = {};

export default AllProjects;
