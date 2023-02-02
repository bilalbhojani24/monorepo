/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TMButton,
  TMDataTable,
  TMDropdown,
  TMPageHeadings,
  TMPagination
} from 'common/bifrostProxy';
import AppRoute from 'const/routes';

import { dropDownOptions, perPageCount } from '../const/projectsConst';

import AddProjects from './AddProjects';
import DeleteProjects from './DeleteProjects';
import EditProjects from './EditProjects';
import useProjects from './useProjects';

const AllProjects = () => {
  const {
    totalProjectsCount,
    activeProjects,
    addingProject,
    showAddModal,
    showEditModal,
    showDeleteModal,
    handleClickDynamicLink,
    onDropDownChange,
    tableNextPageHandler,
    tableThisPageHandler,
    tablePrevPageHandler
  } = useProjects();
  const navigate = useNavigate();
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
          PR-{rowData.id}
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
          onClick={rowData.test_cases_count > 0 ? handleClickDynamicLink(AppRoute.DASHBOARD, rowData.id) : handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
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
        <>
          <span
            onClick={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
            onKeyDown={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
            role="button"
            tabIndex={0}
            className="hover:text-brand-600 cursor-pointer"
          >
            {rowData.test_cases_count} Test Cases
          </span>
          <span
            tabIndex={0}
            role="button"
            className="hover:text-brand-600 ml-6 cursor-pointer"
            onClick={handleClickDynamicLink(AppRoute.TEST_RUNS, rowData.id)}
            onKeyDown={handleClickDynamicLink(AppRoute.TEST_RUNS, rowData.id)}
          >
            {rowData.test_runs_count} Test Runs
          </span>
        </>
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

  return (
    <div className="flex flex-1 flex-col items-stretch">
      {/* <ImportStatus /> */}
      <TMPageHeadings
        heading="All Projects"
        actions={
          <>
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
            <TMButton variant="primary" onClick={addingProject}>
              Create Project
            </TMButton>
          </>
        }
      />
      <div className="flex max-h-[calc(100vh-9.5rem)] flex-1 flex-col items-stretch overflow-y-auto p-4">
        <div className="border-base-200 flex  flex-1 flex-col items-stretch justify-start">
          <TMDataTable columns={tableColumns} rows={activeProjects} />
          {totalProjectsCount > perPageCount && (
            <TMPagination
              pageSize={perPageCount}
              onNextClick={tableNextPageHandler}
              onPageNumberClick={tableThisPageHandler}
              onPreviousClick={tablePrevPageHandler}
            />
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
