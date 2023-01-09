import React from 'react';
import { DataTable } from '@browserstack/bifrost';
import { arrayOf, node, shape, string } from 'prop-types';

// import { getProjects } from '../../../api/projects.api';

// import useProjects from './useProjects';

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
    // isSortable: true,
  },
  {
    name: 'Project Title',
    key: 'projectTitle',
    style: styles,
    // isSortable: true,
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

  return (
    <div>
      {/* header */}
      <div className="px-4 py-2">
        <div className="mt-4">
          <DataTable
            isHeaderCapitalize
            isHeaderSticky
            columns={COLUMNS}
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
