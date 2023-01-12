import React, { useEffect, useState } from 'react';
import { TMDataTable, TMDropdown, TMTabs } from 'bifrostProxy';

import { TABS_ARRAY } from '../const/immutableConst';

import useTestRuns from './useTestRuns';

const TestRunsTable = () => {
  const [currentTab, setCurrentTab] = useState(TABS_ARRAY[0]);
  const { allTestRunsArray, projectId, fetchAllTestRuns } = useTestRuns();

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
          TR-{rowData.id}
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
          tabsArray={TABS_ARRAY}
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

TestRunsTable.propTypes = {};

TestRunsTable.defaultProps = {};

export default TestRunsTable;
