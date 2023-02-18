/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineExpandMore } from '@browserstack/bifrost';
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

import { dropDownOptions } from '../const/projectsConst';

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
    showAddProjectModal,
    onCreateDropClick
  } = useProjects();

  const tableColumns = [
    {
      name: 'ID',
      key: 'id',
      className: 'w-10',
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
      className: 'w-3/6',
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
      )
    },
    {
      name: '',
      key: 'action',
      className: 'w-10',
      cell: (data) => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          onClick={(e, selectedOption) =>
            onDropDownChange(e, selectedOption, data)
          }
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
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
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
            <div className="flex">
              <TMButton
                variant="primary"
                size="default"
                onClick={showAddProjectModal}
                wrapperClassName="ml-3 whitespace-nowrap w-full rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10"
              >
                Create Project
              </TMButton>
              <TMDropdown
                triggerIcon={
                  <MdOutlineExpandMore className="text-2xl text-white" />
                }
                triggerClassName="rounded-tl-none rounded-bl-none focus:ring-offset-0 focus:z-10 bg-brand-600"
                triggerVariant="menu-button"
                options={[
                  { body: 'Create Example Project', id: 'example_project' }
                ]}
                onClick={(e, selectedOption) =>
                  onCreateDropClick(selectedOption)
                }
              />
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
                    containerWrapperClass="shadow-none border-none"
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
