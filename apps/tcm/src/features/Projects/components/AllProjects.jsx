/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMDataTable,
  TMDropdown,
  TMEmptyState,
  TMPageHeadings,
  TMPagination
} from 'common/bifrostProxy';
import Loader from 'common/Loader';
import AppRoute from 'const/routes';

import { dropDownOptions, perPageCount } from '../const/projectsConst';

import AddProjects from './AddProjects';
import DeleteProjects from './DeleteProjects';
import EditProjects from './EditProjects';
import useProjects from './useProjects';

const AllProjects = () => {
  const navigate = useNavigate();

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
      )
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
            {rowData.name}
          </div>
          <div className="text-base-400">{rowData.description}</div>
        </div>
      )
    },
    {
      name: 'QUICK LINKS',
      key: 'quickLinks',
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
      )
    },
    {
      name: '',
      key: 'action',
      cell: (data) => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          onClick={(e) => onDropDownChange(e, data)}
          options={dropDownOptions}
        />
      )
    }
  ];

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="flex flex-1 flex-col">
      {/* <ImportStatus /> */}
      <TMPageHeadings
        heading="All Projects"
        actions={
          <>
            <TMButton
              wrapperClassName="sr-only"
              onClick={() =>
                navigate({
                  pathname: '/import'
                })
              }
            />
            <TMButton
              wrapperClassName="sr-only"
              onClick={() =>
                navigate({
                  pathname: '/import/csv',
                  search: '?project=1&folder=1'
                })
              }
            >
              Import CSV
            </TMButton>
            <TMButton variant="primary" onClick={showAddProjectModal}>
              Create Project
            </TMButton>
          </>
        }
      />
      <div className="flex max-h-[calc(100vh-9.5rem)] flex-1 flex-col overflow-y-auto p-4">
        <div className="border-base-200 flex flex-col justify-start rounded-md border bg-white">
          {isLoading ? (
            <Loader wrapperClass="h-96" />
          ) : (
            <>
              {allProjects?.length ? (
                <>
                  <TMDataTable
                    columns={tableColumns}
                    rows={allProjects}
                    containerWrapperClass="shadow-none border-none"
                  />

                  {metaPage?.count > perPageCount && (
                    <TMPagination
                      pageNumber={metaPage?.page || 1}
                      count={metaPage?.count || 0}
                      pageSize={perPageCount}
                    />
                  )}
                </>
              ) : (
                <div className="flex h-96 flex-col justify-center">
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
