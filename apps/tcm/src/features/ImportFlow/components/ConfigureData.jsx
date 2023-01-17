import React from 'react';
import { TMDataTable, TMSectionHeadings } from 'bifrostProxy';

const projects = [
  {
    id: 1,
    name: 'Local',
    suite_mode: 1,
  },
  {
    id: 2,
    name: 'Dummy Project',
    suite_mode: 1,
  },
  {
    id: 3,
    name: 'automation',
    suite_mode: 1,
  },
  {
    id: 4,
    name: 'example',
    suite_mode: 1,
  },
  {
    id: 5,
    name: 'Desktop platform',
    suite_mode: 1,
  },
  {
    id: 6,
    name: 'Testing import',
    suite_mode: 1,
  },
  {
    id: 7,
    name: 'E1',
    suite_mode: 1,
  },
  {
    id: 8,
    name: 'E2',
    suite_mode: 1,
  },
  {
    id: 9,
    name: 'TestRail Sample',
    suite_mode: 1,
  },
  {
    id: 10,
    name: 'TT1',
    suite_mode: 1,
  },
  {
    id: 11,
    name: 'Tt111',
    suite_mode: 1,
  },
  {
    id: 12,
    name: 'aAAAA',
    suite_mode: 1,
  },
  {
    id: 13,
    name: 'completed project',
    suite_mode: 3,
  },
  {
    id: 14,
    name: 'Example (harsh)',
    suite_mode: 1,
  },
];

const ConfigureData = (props) => {
  //   const { projects } = props;
  const handleRowSelect = (data) => {
    console.log('data', data);
  };
  const tableColumns = [
    {
      name: `All Projects (${projects.length})`,
      key: 'allProjects',
      cell: (rowData) => (
        <>
          <div>{rowData.name}</div>
          {/* <div>{rowData?.description}</div> */}
        </>
      ),
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="shadow-gray-200 mt-4 w-3/4 rounded-md border-2 border-base-100 p-6">
        <TMSectionHeadings
          title="Select Projects you would like to import:"
          variant="buttons"
          primaryButtonProps={{
            children: 'Proceed',
            size: 'default',
          }}
        />
        <TMDataTable
          isFullWhite
          isSelectable
          rows={projects}
          columns={tableColumns}
          onRowSelect={handleRowSelect}
        />
      </div>
    </div>
  );
};
export default ConfigureData;
