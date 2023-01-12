import React from 'react';
import { TMDataTable, TMDropdown } from 'bifrostProxy';
import { arrayOf, node, shape, string } from 'prop-types';

import { TEST_RUNS_COL } from '../const/testRunsCol';

const ActiveTestRuns = (props) => {
  const { rowsData } = props;

  const rows = rowsData.map((data) => ({
    id: `TR-${data.id}`,
    title: data.name,
    createdDate: data.createdDate,
    assignedTo: data.owner,
    overallProgress: null,
    action: (
      <TMDropdown
        triggerVariant="meatball-button"
        dividerRequired
        options={[
          { id: '1', name: 'Edit Details' },
          { id: '2', name: 'Assign' },
          { id: '3', name: 'Close Run' },
          { id: '4', name: 'Delete' },
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
            columns={TEST_RUNS_COL}
            rows={rows}
            isFullWhite={false}
          />
        </div>
      </div>
    </div>
  );
};

ActiveTestRuns.propTypes = {
  rowsData: arrayOf(
    shape({
      id: string,
      projectTitle: string,
      quickLinks: node,
      action: node,
    }),
  ),
};

ActiveTestRuns.defaultProps = {
  rowsData: [],
};

export default ActiveTestRuns;
