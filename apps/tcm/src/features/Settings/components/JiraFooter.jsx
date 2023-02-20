import React from 'react';
import { TMDataTable } from 'common/bifrostProxy';

const JiraFooter = ({ apiKey }) => {
  const COLUMNS = [
    { name: 'API Key', key: 'apiKey' },
    { name: '', key: 'action' }
  ];

  const rows = [
    {
      apiKey: `${apiKey}`,
      action: (
        <button type="button" className="text-brand-400">
          Copy
        </button>
      )
    }
  ];
  return (
    <div className="mt-10">
      <div className="text-base-900 text-lg font-medium">Active API Keys</div>
      <div className="text-base-500 text-sm">
        Below are list of active API keys with your account
      </div>
      <TMDataTable
        columns={COLUMNS}
        rows={rows}
        containerWrapperClass="mt-6"
        tableWrapperClass="text-base-900"
      />
    </div>
  );
};

export default JiraFooter;
