import React from 'react';
import {
  TMButton,
  TMDataTable,
  TMDropdown,
  TMPageHeadings
} from 'common/bifrostProxy';
import AppRoute from 'const/routes';

import { dropDownOptions } from '../const/projectsConst';

import AddProjects from './AddProjects';
import DeleteProjects from './DeleteProjects';
import EditProjects from './EditProjects';
import ImportStatus from './ImportStatus';
import useProjects from './useProjects';

const AllProjects = () => {
  const {
    activeProjects,
    addingProject,
    showAddModal,
    showEditModal,
    showDeleteModal,
    handleClickDynamicLink,
    onDropDownChange
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
          onClick={handleClickDynamicLink(AppRoute.TEST_CASES, rowData.id)}
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
      <ImportStatus />
      <TMPageHeadings
        heading="All Projects"
        actions={
          <>
            <TMButton variant="primary" onClick={addingProject}>
              Create Project
            </TMButton>
          </>
        }
      />
      <div className="flex flex-1 flex-col items-stretch p-4">
        <div className="border-base-200 flex  flex-1 flex-col items-stretch justify-start">
          <TMDataTable columns={tableColumns} rows={activeProjects} />
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
