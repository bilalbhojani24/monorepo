import React, { useEffect, useState } from 'react';
import { DataTable, Dropdown } from '@browserstack/bifrost';

import { getProjects } from '../../../api/projects.api';

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
    name: 'Priority',
    key: 'priority',
    style: styles,
  },
  {
    name: '',
    key: 'action',
  },
];

const ActiveProjects = (props) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getProjects().then((res) => {
      setRowData(
        res.projects.map((data, idx) => ({
          id: `TC${idx + 1}`,
          projectTitle: data.name,
          priority: '185 Test Cases',
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
        })),
      );
    });
  }, []);

  return (
    <div>
      {/* header */}
      <div className="px-4 py-2">
        <div className="mt-4">
          <DataTable
            isHeaderCapitalize
            isHeaderSticky
            columns={COLUMNS}
            rows={rowData}
            isFullWhite={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveProjects;
