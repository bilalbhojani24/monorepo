import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TMDataTable, TMDropdown, TMTabs } from 'bifrostProxy';
import AppRoute from 'const/routes';
import { arrayOf, node, shape, string } from 'prop-types';

import useTestRuns from './useTestRuns';

const TestRunsTable = () => {
  const [currentTab, setCurrentTab] = useState('Active Test Runs');
  const navigate = useNavigate();
  const { allTestRunsArray, projectId, fetchAllTestRuns } = useTestRuns();

  // const handleTestRunsClick = (projectId) => () => {
  //   navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_RUNS}`);
  // };

  // const handleTestCasesClick = (projectId) => () => {
  //   navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_CASES}`);
  // };
  const handleTabChange = (tabName) => {
    setCurrentTab(tabName.name);
  };

  useEffect(() => {
    fetchAllTestRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const tableColumns = [
    {
      name: 'ID',
      key: 'id',
      cell: (rowData) => (
        <div
        // role="button"
        // className="cursor-pointer hover:text-brand-600"
        // tabIndex={0}
        // onClick={handleProjectClick(rowData.id)}
        // onKeyDown={handleProjectClick(rowData.id)}
        >
          TC-{rowData.id}
        </div>
      ),
    },
    {
      name: 'TITLE',
      key: 'name',
    },
    {
      name: 'CREATED DATE',
      key: 'id',
    },
    {
      name: 'ASSIGNED TO',
      key: 'owner',
      cell: (rowData) => rowData.owner || 'Unassigned',
    },
    {
      name: 'OVERALL PROGRESS',
      key: '',
      cell: () => <div />,
    },
    {
      name: '',
      key: '',
      cell: () => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          options={[
            { id: '1', name: 'Edit Test Run' },
            { id: '2', name: 'Delete' },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-1  flex-col items-stretch justify-start overflow-hidden border border-base-200 bg-white sm:rounded-lg">
      <div className="mb-4 w-full px-2">
        <TMTabs
          id="project-tabs"
          tabsArray={[
            { name: 'Active Test Runs' },
            { name: 'Closed Test Runs' },
          ]}
          onTabChange={handleTabChange}
        />
      </div>
      <TMDataTable
        isHeaderCapitalize
        isHeaderSticky
        columns={tableColumns}
        rows={allTestRunsArray}
        isFullWhite={false}
      />
    </div>
  );
};

TestRunsTable.propTypes = {
  rowsData: arrayOf(
    shape({
      id: string,
      projectTitle: string,
      quickLinks: node,
      action: node,
    }),
  ),
};

TestRunsTable.defaultProps = {
  rowsData: [],
};

export default TestRunsTable;
