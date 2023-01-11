import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TMDataTable, TMDropdown } from 'bifrostProxy';
import AppRoute from 'const/routes';
import { arrayOf, node, shape, string } from 'prop-types';

const styles = {
  color: '#6B7280',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
};

const ActiveProjects = (props) => {
  const { rowsData } = props;
  const navigate = useNavigate();
  const handleTestRunsClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_RUNS}`);
  };

  const handleTestCasesClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_CASES}`);
  };

  const handleProjectClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.DASHBOARD}`);
  };

  const tableColumns = [
    {
      name: 'ID',
      key: 'id',
      style: styles,
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
      style: styles,
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
      style: styles,
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
    <div>
      {/* header */}
      <div className="px-4 py-2">
        <div className="bg-white">
          <TMDataTable
            isHeaderCapitalize
            isHeaderSticky
            columns={tableColumns}
            rows={rowsData}
            isFullWhite={false}
          />
        </div>
      </div>
    </div>
  );
};

ActiveProjects.propTypes = {
  rowsData: arrayOf(
    shape({
      id: string,
      name: string,
      quickLinks: node,
      action: node,
    }),
  ),
};

ActiveProjects.defaultProps = {
  rowsData: [],
};

export default ActiveProjects;
