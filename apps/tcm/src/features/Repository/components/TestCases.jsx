import React from 'react';
import { Button, DataTable, Dropdown, InputField } from '@browserstack/bifrost';
import { SearchIcon } from 'Icons';

import AddTestCase from './AddTestCase';
import BlankPage from './BlankPage';
import useTestCases from './useTestCases';

import '../styles/TestCases.scss';

export default function TestCases() {
  const { selectedFolder, allTestCases, isAddTestCasePageVisible } =
    useTestCases();

  const datatableColumns = [
    {
      name: 'ID',
      key: 'id',
      style: {},
      cell: (rowData) => `TC${rowData?.id}`,
    },
    {
      name: 'TITLE',
      key: 'name',
      style: {},
    },
    {
      name: 'PRIORITY',
      key: 'priority',
      cell: (rowData) => <span className="capitalize">{rowData.priority}</span>,
      style: {},
    },
    {
      name: '',
      key: 'action',
      cell: (rowData) => (
        <Dropdown
          options={[{ id: '1', name: 'Edit' }]}
          triggerVariant="meatball-button"
          onClick={() => {
            console.log(rowData);
          }}
        >
          Edit
        </Dropdown>
      ),
      style: {},
    },
  ];

  if (isAddTestCasePageVisible) return <AddTestCase />;

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-start border-b border-base-300 p-3">
        <InputField
          placeholder="Search by Test Case name, ID"
          leadingIcon={<SearchIcon className="text-base-400" />}
        />
        <Button
          buttonType="half-rounded-button"
          variant="white"
          wrapperClassName="ml-3"
          size="default"
        >
          Filter
        </Button>
      </div>
      <div className="flex w-full flex-1 flex-col border-l border-base-300">
        {selectedFolder && (
          <div className="w-full border-b border-base-200 px-4 py-4">
            <div className="w-full font-medium text-base-800">
              {selectedFolder?.name}
            </div>
            {selectedFolder?.notes && (
              <div className="mt-1 w-full text-base-500">
                {selectedFolder?.notes}
              </div>
            )}
          </div>
        )}

        {allTestCases.length ? (
          <DataTable
            isSelectable
            isHeaderSticky
            columns={datatableColumns}
            rows={allTestCases}
            // isSortable={false}
          />
        ) : (
          <div className="flex w-full flex-1 items-center justify-center">
            <BlankPage />
          </div>
        )}
      </div>
    </div>
  );
}
