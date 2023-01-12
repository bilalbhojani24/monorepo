import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TMDataTable, TMDropdown } from 'bifrostProxy';
import AppRoute from 'const/routes';
import { arrayOf, node, shape, string } from 'prop-types';

import { PROJECTS_COL } from '../const/projectCol';

const ActiveProjects = (props) => {
  const { rowsData } = props;
  const navigate = useNavigate();
  const handleTestRunsClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_RUNS}`);
  };

  const handleTestCasesClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_CASES}`);
  };

  const rows = rowsData.map((data) => ({
    id: `PR-${data.id}`,
    projectTitle: data.name,
    quickLinks: (
      <>
        <span
          onClick={handleTestCasesClick(data.id)}
          onKeyDown={handleTestCasesClick(data.id)}
          role="button"
          tabIndex={0}
          className="cursor-pointer hover:text-brand-600"
        >
          {data.test_cases_count} Test Cases
        </span>
        <span
          tabIndex={0}
          role="button"
          className="ml-6 cursor-pointer hover:text-brand-600"
          onClick={handleTestRunsClick(data.id)}
          onKeyDown={handleTestRunsClick(data.id)}
        >
          {data.test_runs_count} Test Runs
        </span>
      </>
    ),
    action: (
      <TMDropdown
        triggerVariant="meatball-button"
        dividerRequired
        options={[
          { id: '1', name: 'Edit Project' },
          { id: '2', name: 'Delete' },
        ]}
      />
    ),
  }));

  return (
    <div>
      {/* header */}
      <div className="px-4 py-2">
        <div className="bg-white">
          <TMDataTable
            isHeaderCapitalize
            isHeaderSticky
            columns={PROJECTS_COL}
            rows={rows}
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
      projectTitle: string,
      quickLinks: node,
      action: node,
    }),
  ),
};

ActiveProjects.defaultProps = {
  rowsData: [],
};

export default ActiveProjects;
