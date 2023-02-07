import React, { useEffect, useState } from 'react';
import { TMDataTable, TMDropdown } from 'common/bifrostProxy';
import { formatTime } from 'utils/helperFunctions';

import useTestRuns from './useTestRuns';

const TestRunsTable = () => {
  const { allTestRuns, projectId, fetchAllTestRuns } = useTestRuns();

  useEffect(() => {
    fetchAllTestRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const tableColumns = [
    {
      name: 'ID',
      key: 'id',
      cell: (rowData) => <div>TR-{rowData.id}</div>
    },
    {
      name: 'TITLE',
      key: 'name'
    },
    {
      name: 'CREATED DATE',
      key: 'created_at',
      cell: (rowData) => formatTime(rowData.created_at)
    },
    {
      name: 'ASSIGNED TO',
      key: 'owner',
      cell: (rowData) => rowData.owner || 'Unassigned'
    },
    {
      name: 'OVERALL PROGRESS',
      key: '',
      cell: () => <div />
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
            { id: '2', name: 'Delete' }
          ]}
        />
      )
    }
  ];

  return (
    <div className="border-base-200 flex  flex-1 flex-col items-stretch justify-start overflow-hidden border bg-white sm:rounded-lg">
      <TMDataTable
        containerWrapperClass="md:rounded-none"
        columns={tableColumns}
        rows={allTestRuns}
      />
    </div>
  );
};

TestRunsTable.propTypes = {};

TestRunsTable.defaultProps = {};

export default TestRunsTable;
