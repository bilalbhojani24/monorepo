import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable, Dropdown } from '@browserstack/bifrost';
import AppRoute from 'const/routes';
import { arrayOf, node, shape, string } from 'prop-types';

const styles = {
  color: '#6B7280',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
};

const COLUMNS = [
  {
    name: 'ID',
    key: 'id',
    style: styles,
  },
  {
    name: 'Project Title',
    key: 'projectTitle',
    style: styles,
  },
  {
    name: 'Quick Links',
    key: 'quickLinks',
    style: styles,
  },
  {
    name: '',
    key: 'action',
  },
];

const ActiveProjects = (props) => {
  const { rowsData } = props;
  const navigate = useNavigate();
  const handleTestRunsClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_RUNS}`);
  };

  const handleTestCasesClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.REPO}`);
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
      <Dropdown
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
        <div className="mt-4">
          <DataTable
            isHeaderCapitalize
            isHeaderSticky
            columns={COLUMNS}
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
