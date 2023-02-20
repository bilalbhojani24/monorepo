import React from 'react';
import { OpenInNewIcon } from 'assets/icons';
import { TMButton, TMDataTable } from 'common/bifrostProxy';

const JiraConfigurationAvailable = ({ configuration }) => {
  const COLUMNS = [
    {
      name: 'Connection Name',
      key: 'connectionName'
    },
    {
      name: 'Address',
      key: 'address'
    },
    {
      name: 'Status',
      key: 'status'
    }
  ];

  const rows = [
    {
      connectionName: 'JIRA Integration',
      address: `${configuration?.host}`,
      status: 'Active'
    }
  ];

  return (
    <>
      <div className="flex justify-between">
        <div>
          <div className="text-base-900 text-lg font-medium">
            Active Integrations
          </div>
          <div className="text-base-500 text-sm">
            Below are list of active integrations with your account
          </div>
        </div>
        <div className="self-end">
          <TMButton
            size="large"
            colors="white"
            iconPlacement="end"
            icon={<OpenInNewIcon className="h-4 w-4" />}
          >
            Go to Integrations
          </TMButton>
        </div>
      </div>
      <TMDataTable
        columns={COLUMNS}
        rows={rows}
        containerWrapperClass="mt-6"
        tableWrapperClass="text-base-900"
      />
    </>
  );
};

export default JiraConfigurationAvailable;
