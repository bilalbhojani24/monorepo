import React from 'react';
import { TMDataTable, TMDropdown, TMPageHeadings } from 'bifrostProxy';
import { string } from 'prop-types';

import AddProjects from './AddProjects';
import useProjects from './useProjects';

const AllProjects = () => {
  const {
    activeProjects,
    addingProject,
    showAddModal,
    handleTestRunsClick,
    handleTestCasesClick,
    handleProjectClick,
  } = useProjects();
  const tableColumns = [
    {
      name: 'ID',
      key: 'id',
      cell: (rowData) => (
        <div
          role="button"
          className="cursor-pointer hover:text-brand-600"
          tabIndex={0}
          onClick={handleProjectClick(rowData.id)}
          onKeyDown={handleProjectClick(rowData.id)}
        >
          PR-{rowData.id}
        </div>
      ),
    },
    {
      name: 'Project Title',
      key: 'name',
      cell: (rowData) => (
        <div
          role="button"
          className="cursor-pointer hover:text-brand-600"
          tabIndex={0}
          onClick={handleProjectClick(rowData.id)}
          onKeyDown={handleProjectClick(rowData.id)}
        >
          {rowData.name}
        </div>
      ),
    },
    {
      name: 'Quick Links',
      key: 'quickLinks',
      cell: (rowData) => (
        <>
          <span
            onClick={handleTestCasesClick(rowData.id)}
            onKeyDown={handleTestCasesClick(rowData.id)}
            role="button"
            tabIndex={0}
            className="cursor-pointer hover:text-brand-600"
          >
            {rowData.test_cases_count} Test Cases
          </span>
          <span
            tabIndex={0}
            role="button"
            className="ml-6 cursor-pointer hover:text-brand-600"
            onClick={handleTestRunsClick(rowData.id)}
            onKeyDown={handleTestRunsClick(rowData.id)}
          >
            {rowData.test_runs_count} Test Runs
          </span>
        </>
      ),
    },
    {
      name: '',
      key: 'action',
      cell: () => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          options={[
            { id: '1', name: 'Edit Project' },
            { id: '2', name: 'Delete' },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="border-b border-base-300">
        <TMPageHeadings
          heading="All Projects"
          actionsData={[
            {
              id: 'node-1',
              actionsNode: <>Add project</>,
              actionFn: addingProject,
              variant: 'primary',
            },
          ]}
        />
      </div>
      <div className="flex flex-1 flex-col items-stretch bg-base-100 p-5">
        <div className="flex flex-1  flex-col items-stretch justify-start overflow-hidden border border-base-200 bg-white sm:rounded-lg">
          <TMDataTable
            isHeaderCapitalize
            isHeaderSticky
            columns={tableColumns}
            rows={activeProjects}
            isFullWhite={false}
          />
        </div>
      </div>
      {showAddModal && <AddProjects />}
    </div>
  );
};

AllProjects.propTypes = {
  defaultTab: string,
};

AllProjects.defaultProps = {
  defaultTab: 'Active Projects',
};

export default AllProjects;
